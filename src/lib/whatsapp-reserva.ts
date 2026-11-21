import { whatsappContact } from "~/data/content";
import { buildWaMeHref } from "~/lib/whatsapp-href";

export type ReservaWhatsAppInput = {
  nombre: string;
  tratamiento?: string;
  diaHoraPreferida?: string;
};

/**
 * Mismo orden que pide el saludo de WhatsApp Business de la clínica:
 * nombre, tratamiento o zona, día y hora.
 * El texto lo envía la propia persona desde su WhatsApp.
 */
export function buildReservaWhatsAppMessage(input: ReservaWhatsAppInput): string {
  const nombre = unaLinea(input.nombre) || "Por definir";
  const tratamiento = unaLinea(input.tratamiento) || "Por definir";
  const diaHora = unaLinea(input.diaHoraPreferida) || "Por definir";
  return [
    "Hola, quisiera reservar una cita.",
    `Nombre: ${nombre}`,
    `Tratamiento o zona: ${tratamiento}`,
    `Día y hora: ${diaHora}`,
  ].join("\n");
}

export function buildReservaWhatsAppHref(input: ReservaWhatsAppInput): string {
  const text = buildReservaWhatsAppMessage(input);
  return buildWaMeHref(whatsappContact.number, text);
}

function unaLinea(value: string | undefined): string {
  return (value ?? "").replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}
