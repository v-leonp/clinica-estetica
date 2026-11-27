import { whatsappContact } from "~/data/content";
import { buildWaMeHref } from "~/lib/whatsapp-href";

/**
 * Promoción que aparece como pop-up en la portada.
 * Para una campaña nueva: cambia imagen, textos, endsAt e id
 * (el id evita reutilizar el aviso de «ya visto» de la campaña anterior).
 *
 * endsAt está en America/Lima (UTC-5, Perú no usa horario de verano).
 * Fecha por confirmar con Victor: 30 de noviembre de 2026, 23:59.
 */
export const promoPopup = {
  enabled: true,
  id: "black-friday-2026",
  image: "/promociones/black-friday.webp",
  imageWidth: 1920,
  imageHeight: 1440,
  alt: "Promoción Black Friday de Vigo Medical Estetic: hasta 50% de descuento. Promociones por tiempo limitado, según el tratamiento elegido en consulta. Agenda tu cita.",
  message:
    "¡Hola! 👋😊 Vi su promoción de Black Friday 🖤🛍️ y me gustaría aprovecharla. ¿Podrían brindarme información sobre los horarios disponibles para agendar una cita? 📅✨\n\n¡Muchas gracias! 💕",
  /** Inclusive: el pop-up se muestra hasta este instante (America/Lima). */
  endsAt: "2026-11-30T23:59:59-05:00",
  /** Espera antes de mostrar el diálogo, en milisegundos (1,5–3 s). */
  delayMs: 2000,
} as const;

export type PromoPopupConfig = typeof promoPopup;

export const PROMO_POPUP_STORAGE_KEY = `promo-popup:${promoPopup.id}`;

export function isPromoPopupActive(
  now: Date = new Date(),
  config: { enabled: boolean; endsAt: string } = promoPopup,
): boolean {
  if (!config.enabled) return false;
  const ends = Date.parse(config.endsAt);
  if (Number.isNaN(ends)) return false;
  return now.getTime() <= ends;
}

export function promoPopupWhatsAppHref(
  config: Pick<PromoPopupConfig, "message"> = promoPopup,
): string {
  return buildWaMeHref(whatsappContact.number, config.message);
}
