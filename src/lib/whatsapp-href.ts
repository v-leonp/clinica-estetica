/**
 * Enlace wa.me de la clínica. El texto se codifica una sola vez.
 * El llamador pasa el mensaje en claro, no una cadena ya codificada.
 */
export function buildWaMeHref(phone: string, text?: string): string {
  const base = `https://wa.me/${phone}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Enlace oficial api.whatsapp.com/send. Úsalo cuando el mensaje lleva emojis:
 * la redirección de wa.me hacia WhatsApp Web los convierte en «�».
 */
export function buildWhatsAppSendHref(phone: string, text?: string): string {
  const params = new URLSearchParams({ phone });
  if (text) params.set("text", text);
  return `https://api.whatsapp.com/send?${params.toString()}`;
}
