/**
 * Enlace wa.me de la clínica. El texto se codifica una sola vez.
 * El llamador pasa el mensaje en claro, no una cadena ya codificada.
 */
export function buildWaMeHref(phone: string, text?: string): string {
  const base = `https://wa.me/${phone}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
