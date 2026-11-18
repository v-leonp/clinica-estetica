import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Aviso best-effort a un Google Apps Script.
 *
 * Apps Script no recibe cabeceras propias, así que la firma y el timestamp
 * van en la query. El cuerpo es solo el JSON. La firma es
 * HMAC-SHA256 hex de `${timestamp}.${cuerpo}` con APPS_SCRIPT_SECRET.
 * También se mandan las cabeceras X-VME-* por si el receptor cambia.
 *
 * Si faltan las variables, o el aviso falla, no se lanza: la reserva ya
 * está guardada. El timeout es corto para no retener el formulario.
 */

export const WEBHOOK_TIMEOUT_MS = 2_500;
export const WEBHOOK_TIMESTAMP_PARAM = "timestamp";
export const WEBHOOK_SIGNATURE_PARAM = "signature";

export type LeadWebhookPayload = {
  id: string;
  registradoEn: string;
  nombre: string;
  celular: string;
  tratamiento: string;
  diaHoraPreferida: string;
  origen: "Reserva" | "Contacto";
};

type LeadWebhookSource = {
  id: string;
  createdAt: Date;
  nombre: string;
  telefono: string;
  tratamiento: string;
  diaHoraPreferida: string;
  origen?: "reserva" | "contacto";
};

export function buildLeadWebhookPayload(input: LeadWebhookSource): LeadWebhookPayload {
  return {
    id: input.id,
    registradoEn: input.createdAt.toISOString(),
    nombre: input.nombre,
    celular: input.telefono,
    tratamiento: input.tratamiento,
    diaHoraPreferida: input.diaHoraPreferida,
    origen: input.origen === "reserva" ? "Reserva" : "Contacto",
  };
}

/** Orden de claves fijo: es el cuerpo exacto que se firma. */
export function serializeLeadWebhook(payload: LeadWebhookPayload): string {
  return JSON.stringify({
    id: payload.id,
    registradoEn: payload.registradoEn,
    nombre: payload.nombre,
    celular: payload.celular,
    tratamiento: payload.tratamiento,
    diaHoraPreferida: payload.diaHoraPreferida,
    origen: payload.origen,
  });
}

export function signLeadWebhook(
  secret: string,
  timestamp: string,
  body: string,
): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

export function webhookSignaturesMatch(received: string, expected: string): boolean {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function webhookUrlWithSignature(
  webhookUrl: string,
  timestamp: string,
  signature: string,
): string {
  const url = new URL(webhookUrl);
  url.searchParams.set(WEBHOOK_TIMESTAMP_PARAM, timestamp);
  url.searchParams.set(WEBHOOK_SIGNATURE_PARAM, signature);
  return url.toString();
}

export async function notifyNewLead(payload: LeadWebhookPayload): Promise<void> {
  try {
    await deliverLeadWebhook(payload);
  } catch {
    console.error(
      "[reservas] El aviso al Apps Script falló. La solicitud sí quedó guardada.",
    );
  }
}

async function deliverLeadWebhook(payload: LeadWebhookPayload): Promise<void> {
  const config = readWebhookConfig();
  if (!config) return;

  const body = serializeLeadWebhook(payload);
  const timestamp = Date.now().toString();
  const signature = signLeadWebhook(config.secret, timestamp, body);
  const url = webhookUrlWithSignature(config.url, timestamp, signature);

  const response = await fetch(url, {
    method: "POST",
    redirect: "follow",
    cache: "no-store",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-vme-timestamp": timestamp,
      "x-vme-signature": signature,
    },
    body,
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  const code = await readResultCode(response);
  if (code) {
    console.error(
      `[reservas] El Apps Script no confirmó el aviso (${code}). La solicitud sí quedó guardada.`,
    );
  }
}

type WebhookConfig = { url: string; secret: string };

function readWebhookConfig(): WebhookConfig | null {
  const url = process.env.APPS_SCRIPT_WEBHOOK_URL?.trim() ?? "";
  const secret = process.env.APPS_SCRIPT_SECRET?.trim() ?? "";

  if (!url && !secret) {
    console.info(
      "[reservas] Aviso no enviado: faltan APPS_SCRIPT_WEBHOOK_URL y APPS_SCRIPT_SECRET. La solicitud sí quedó guardada.",
    );
    return null;
  }
  if (!url || !secret) {
    console.warn(
      "[reservas] Aviso no enviado: hay que definir juntas APPS_SCRIPT_WEBHOOK_URL y APPS_SCRIPT_SECRET. La solicitud sí quedó guardada.",
    );
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    console.warn(
      "[reservas] Aviso no enviado: APPS_SCRIPT_WEBHOOK_URL no es una URL válida. La solicitud sí quedó guardada.",
    );
    return null;
  }
  if (parsed.protocol !== "https:") {
    console.warn(
      "[reservas] Aviso no enviado: APPS_SCRIPT_WEBHOOK_URL tiene que ser https. La solicitud sí quedó guardada.",
    );
    return null;
  }
  if (secret.length < 16) {
    console.warn(
      "[reservas] Aviso no enviado: APPS_SCRIPT_SECRET debe tener al menos 16 caracteres. La solicitud sí quedó guardada.",
    );
    return null;
  }

  return { url, secret };
}

async function readResultCode(response: Response): Promise<string | null> {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text) as {
      ok?: boolean;
      error?: unknown;
      correo?: boolean;
    };
    if (
      parsed.ok === false &&
      typeof parsed.error === "string" &&
      /^[a-z-]{1,40}$/.test(parsed.error)
    ) {
      return parsed.error;
    }
    if (parsed.ok === true && parsed.correo === false) return "correo";
    if (!response.ok) return `http-${response.status}`;
    return null;
  } catch {
    return response.ok ? "respuesta" : `http-${response.status}`;
  }
}
