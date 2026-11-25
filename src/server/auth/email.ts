import "server-only";

import { Resend } from "resend";

import type { EmailPurpose } from "./email-purpose";

/**
 * Envía el enlace de un solo uso. Si falta Resend, no falla: lo deja en el log
 * del servidor para que se pueda usar en una preview sin API key.
 */
export async function deliverAccessLink(input: {
  to: string;
  name: string;
  url: string;
  purpose: EmailPurpose;
}): Promise<"email" | "log"> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!apiKey || !from) {
    const missing = apiKey ? "EMAIL_FROM" : "RESEND_API_KEY";
    console.info(
      `[acceso-interno] Enlace de un solo uso sin correo (falta ${missing}). purpose=${input.purpose} destinatario=${input.to} url=${input.url}`,
    );
    return "log";
  }

  const resend = new Resend(apiKey);
  const subject =
    input.purpose === "invite"
      ? "Invitación al sistema interno de la clínica"
      : "Restablece tu contraseña del sistema interno";
  const intro =
    input.purpose === "invite"
      ? `${input.name}, te invitaron al sistema interno de Vigo Medical Estetic. Con este enlace creas tu contraseña. Quien administra no la ve ni la escribe.`
      : `${input.name}, usa este enlace para elegir una contraseña nueva. Quien administra no la ve ni la escribe.`;
  const text = `${intro}\n\n${input.url}\n\nEl enlace es de un solo uso y caduca en 24 horas. Si no lo pediste, ignora este mensaje.\n`;

  const result = await resend.emails.send({
    from,
    to: input.to,
    subject,
    text,
  });

  if (result.error) {
    console.error("[acceso-interno] Resend no envió el correo.", result.error);
    console.info(
      `[acceso-interno] Enlace de respaldo purpose=${input.purpose} destinatario=${input.to} url=${input.url}`,
    );
    return "log";
  }

  return "email";
}
