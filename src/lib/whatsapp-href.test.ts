import { describe, expect, it } from "vitest";

import { whatsappInquiryMessage } from "~/data/content";

import {
  buildWaMeHref,
  buildWebWhatsAppHref,
  hrefForWhatsAppClick,
  isMobileOrTouchWhatsApp,
  toWebWhatsAppHref,
  type WhatsAppClientHints,
} from "./whatsapp-href";

const PHONE = "51922798480";
const PHRASE = whatsappInquiryMessage;
const DESKTOP: WhatsAppClientHints = {
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0",
  userAgentDataMobile: false,
  pointerCoarse: false,
};
const PHONE_TOUCH: WhatsAppClientHints = {
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
  userAgentDataMobile: true,
  pointerCoarse: true,
};

describe("href de WhatsApp", () => {
  it("deja wa.me en el HTML, con el texto codificado", () => {
    const href = buildWaMeHref(PHONE, PHRASE);
    const encoded = encodeURIComponent(PHRASE);
    expect(href).toBe(`https://wa.me/${PHONE}?text=${encoded}`);
    expect(href.split("text=")[1]).toBe(encoded);
    expect(encoded).not.toContain("%25");
    expect(decodeURIComponent(encoded)).toBe(PHRASE);
    expect(new URL(href).searchParams.get("text")).toBe(PHRASE);
    expect(buildWaMeHref(PHONE)).toBe(`https://wa.me/${PHONE}`);
  });

  it("en escritorio abre web.whatsapp.com/send con la misma frase", () => {
    const wa = buildWaMeHref(PHONE, PHRASE);
    const href = hrefForWhatsAppClick(wa, DESKTOP);
    expect(href).toBe(buildWebWhatsAppHref(PHONE, PHRASE));
    expect(href).toBe(
      `https://web.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(PHRASE)}`,
    );
    const url = new URL(href);
    expect(url.origin).toBe("https://web.whatsapp.com");
    expect(url.pathname).toBe("/send");
    expect(url.searchParams.get("phone")).toBe(PHONE);
    expect(url.searchParams.get("text")).toBe(PHRASE);
    expect(href.split("text=")[1]).toBe(encodeURIComponent(PHRASE));
    expect(href.split("text=")[1]).not.toContain("%25");
    expect(toWebWhatsAppHref(buildWaMeHref(PHONE))).toBe(
      `https://web.whatsapp.com/send?phone=${PHONE}`,
    );
  });

  it("copia el text ya codificado, también si trae un par sustituto", () => {
    const withEmoji = `Hola ${String.fromCodePoint(0x1f60a)}`;
    const wa = buildWaMeHref(PHONE, withEmoji);
    const web = toWebWhatsAppHref(wa);
    const encoded = encodeURIComponent(withEmoji);
    expect(wa.split("text=")[1]).toBe(encoded);
    expect(web.split("text=")[1]).toBe(encoded);
    expect(decodeURIComponent(web.split("text=")[1] ?? "")).toBe(withEmoji);
    expect(web.split("text=")[1]).not.toContain("%25");
  });

  it("en móvil, tablet táctil o sin ventana conserva wa.me", () => {
    const wa = buildWaMeHref(PHONE, PHRASE);
    expect(hrefForWhatsAppClick(wa, PHONE_TOUCH)).toBe(wa);
    expect(
      hrefForWhatsAppClick(wa, {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        userAgentDataMobile: false,
        pointerCoarse: true,
      }),
    ).toBe(wa);
    expect(
      hrefForWhatsAppClick(wa, {
        userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36",
        userAgentDataMobile: false,
        pointerCoarse: false,
      }),
    ).toBe(wa);
    expect(hrefForWhatsAppClick(wa, null)).toBe(wa);
    expect(isMobileOrTouchWhatsApp(DESKTOP)).toBe(false);
    expect(isMobileOrTouchWhatsApp(PHONE_TOUCH)).toBe(true);
  });

  it("no reescribe un enlace que no es wa.me", () => {
    const other = "https://example.com/chat";
    expect(hrefForWhatsAppClick(other, DESKTOP)).toBe(other);
  });
});
