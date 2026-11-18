import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";

import {
  buildLeadWebhookPayload,
  serializeLeadWebhook,
  signLeadWebhook,
  webhookSignaturesMatch,
  webhookUrlWithSignature,
  type LeadWebhookPayload,
} from "./notify-lead";

const secret = "secreto-de-prueba-1234";

function payload(origen: "reserva" | "contacto" = "reserva"): LeadWebhookPayload {
  return buildLeadWebhookPayload({
    id: "lead_1",
    createdAt: new Date("2026-11-18T15:00:00.000Z"),
    nombre: "Ana Ejemplo",
    telefono: "999000111",
    tratamiento: "Limpieza facial profunda",
    diaHoraPreferida: "20/11/2026 · Tarde",
    origen,
  });
}

describe("firma HMAC del aviso", () => {
  it("firma timestamp y cuerpo, y detecta un cuerpo alterado", () => {
    const body = serializeLeadWebhook(payload());
    const timestamp = "1763478000000";
    const expected = createHmac("sha256", secret)
      .update(`${timestamp}.${body}`)
      .digest("hex");

    expect(signLeadWebhook(secret, timestamp, body)).toBe(expected);
    expect(webhookSignaturesMatch(expected, expected)).toBe(true);
    expect(webhookSignaturesMatch(expected, signLeadWebhook(secret, timestamp, `${body} `))).toBe(
      false,
    );
    expect(webhookSignaturesMatch(expected, "abc")).toBe(false);
    expect(signLeadWebhook(secret, "1763478000001", body)).not.toBe(expected);
  });

  it("deja la firma en la query, que es lo que puede leer Apps Script", () => {
    const url = webhookUrlWithSignature(
      "https://script.google.com/macros/s/DEMO/exec?foo=1",
      "1763478000000",
      "ab".repeat(32),
    );
    const parsed = new URL(url);
    expect(parsed.searchParams.get("foo")).toBe("1");
    expect(parsed.searchParams.get("timestamp")).toBe("1763478000000");
    expect(parsed.searchParams.get("signature")).toBe("ab".repeat(32));
  });
});

describe("payload del aviso", () => {
  it("incluye solo los datos de la hoja, sin correo ni notas clínicas", () => {
    const body = serializeLeadWebhook(payload());
    expect(JSON.parse(body)).toEqual({
      id: "lead_1",
      registradoEn: "2026-11-18T15:00:00.000Z",
      nombre: "Ana Ejemplo",
      celular: "999000111",
      tratamiento: "Limpieza facial profunda",
      diaHoraPreferida: "20/11/2026 · Tarde",
      origen: "Reserva",
    });
    expect(body).not.toContain("email");
    expect(body).not.toContain("mensaje");
    expect(body).not.toContain("ip");
    expect(serializeLeadWebhook(payload("contacto"))).toContain('"origen":"Contacto"');
  });
});
