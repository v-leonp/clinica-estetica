/**
 * Enlaces de WhatsApp de la clínica.
 * El HTML publica wa.me (sirve en móvil y si el clic no llega a ejecutarse).
 * En escritorio, el clic lo cambia a WhatsApp Web para no pasar por la
 * página intermedia de wa.me. La detección ocurre en el cliente, nunca
 * durante el render, para no desajustar la hidratación.
 */

export type WhatsAppClientHints = {
  userAgent?: string;
  /** `navigator.userAgentData.mobile`, si el navegador lo expone. */
  userAgentDataMobile?: boolean;
  /** `matchMedia("(pointer: coarse)")`. Cubre móvil y tablet táctil. */
  pointerCoarse?: boolean;
};

const MOBILE_UA =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;

export function buildWaMeHref(phone: string, text?: string): string {
  const base = `https://wa.me/${phone}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function buildWebWhatsAppHref(phone: string, text?: string): string {
  const params = [`phone=${encodeURIComponent(phone)}`];
  if (text) params.push(`text=${encodeURIComponent(text)}`);
  return `https://web.whatsapp.com/send?${params.join("&")}`;
}

export function isMobileOrTouchWhatsApp(hints: WhatsAppClientHints): boolean {
  if (hints.userAgentDataMobile === true) return true;
  if (hints.pointerCoarse === true) return true;
  return MOBILE_UA.test(hints.userAgent ?? "");
}

export function readWhatsAppClientHints(): WhatsAppClientHints | null {
  if (typeof window === "undefined" || typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean } };
  let pointerCoarse = false;
  try {
    pointerCoarse = window.matchMedia("(pointer: coarse)").matches;
  } catch {
    pointerCoarse = false;
  }
  return {
    userAgent: nav.userAgent,
    userAgentDataMobile: nav.userAgentData?.mobile,
    pointerCoarse,
  };
}

/**
 * Convierte un wa.me de la clínica a WhatsApp Web.
 * El `text` ya viene de un solo encodeURIComponent: se copia tal cual,
 * sin decodificarlo, para no volver a codificar ni partir un par sustituto.
 * Otros hrefs se devuelven igual.
 */
export function toWebWhatsAppHref(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.protocol !== "https:" || url.hostname !== "wa.me") return href;
  const phone = url.pathname.replace(/^\/+/, "");
  if (!/^\d{8,15}$/.test(phone)) return href;
  const params = [`phone=${encodeURIComponent(phone)}`];
  const text = rawQueryParam(href, "text");
  if (text) params.push(`text=${text}`);
  return `https://web.whatsapp.com/send?${params.join("&")}`;
}

/** Valor ya codificado de un parámetro, sin decodeURIComponent. */
function rawQueryParam(href: string, name: string): string | undefined {
  const query = href.split("#")[0]?.split("?")[1];
  if (!query) return undefined;
  for (const part of query.split("&")) {
    const eq = part.indexOf("=");
    const key = eq === -1 ? part : part.slice(0, eq);
    if (key === name) return eq === -1 ? "" : part.slice(eq + 1);
  }
  return undefined;
}

/**
 * Href que debe seguir el clic. En SSR o en móvil/tablet táctil queda el
 * wa.me del HTML. En escritorio pasa a web.whatsapp.com/send.
 */
export function hrefForWhatsAppClick(
  href: string,
  hints: WhatsAppClientHints | null = readWhatsAppClientHints(),
): string {
  if (!hints || isMobileOrTouchWhatsApp(hints)) return href;
  return toWebWhatsAppHref(href);
}

/** Reescribe el href del ancla en el clic de escritorio, antes de navegar. */
export function applyDesktopWhatsAppHref(anchor: HTMLAnchorElement): void {
  const href = anchor.getAttribute("href");
  if (!href) return;
  const next = hrefForWhatsAppClick(href);
  if (next !== href) anchor.href = next;
}
