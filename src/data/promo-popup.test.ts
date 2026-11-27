import { describe, expect, it } from "vitest";

import { whatsappContact } from "~/data/content";

import {
  isPromoPopupActive,
  promoPopup,
  promoPopupWhatsAppHref,
  PROMO_POPUP_STORAGE_KEY,
} from "./promo-popup";

describe("configuración del pop-up de promoción", () => {
  it("define un solo objeto con los campos que se cambian en cada campaña", () => {
    expect(promoPopup.enabled).toBe(true);
    expect(promoPopup.id).toBe("black-friday-2026");
    expect(promoPopup.image).toBe("/promociones/black-friday.webp");
    expect(promoPopup.imageWidth).toBe(1920);
    expect(promoPopup.imageHeight).toBe(1440);
    expect(promoPopup.alt).toMatch(/Black Friday/i);
    expect(promoPopup.alt).toMatch(/50%/);
    expect(promoPopup.message).toBe(
      "¡Hola! 👋😊 Vi su promoción de Black Friday 🖤🛍️ y me gustaría aprovecharla. ¿Podrían brindarme información sobre los horarios disponibles para agendar una cita? 📅✨\n\n¡Muchas gracias! 💕",
    );
    expect(promoPopup.message).not.toMatch(/\d{6,}/);
    expect(promoPopup.endsAt).toBe("2026-11-30T23:59:59-05:00");
    expect(Date.parse(promoPopup.endsAt)).toBe(
      Date.parse("2026-12-01T04:59:59.000Z"),
    );
    expect(promoPopup.delayMs).toBeGreaterThanOrEqual(1500);
    expect(promoPopup.delayMs).toBeLessThanOrEqual(3000);
    expect(PROMO_POPUP_STORAGE_KEY).toBe(`promo-popup:${promoPopup.id}`);
  });

  it("arma el enlace de WhatsApp con el número de la clínica y el mensaje, sin doble codificación", () => {
    const href = promoPopupWhatsAppHref();
    const encoded = encodeURIComponent(promoPopup.message);

    expect(whatsappContact.number).toBe("51922798480");
    expect(href).toBe(
      `https://wa.me/${whatsappContact.number}?text=${encoded}`,
    );
    expect(href).not.toContain("web.whatsapp.com");
    expect(encoded).not.toContain("%25");
    expect(new URL(href).searchParams.get("text")).toBe(promoPopup.message);
  });
});

describe("isPromoPopupActive", () => {
  const limaBefore = new Date("2026-11-30T23:59:59-05:00");
  const limaAfter = new Date("2026-12-01T00:00:00-05:00");

  it("está activo hasta el 30 de noviembre de 2026 a las 23:59 en Lima", () => {
    expect(isPromoPopupActive(limaBefore)).toBe(true);
  });

  it("expira al día siguiente en Lima", () => {
    expect(isPromoPopupActive(limaAfter)).toBe(false);
  });

  it("no se muestra si está desactivado, aunque la fecha siga vigente", () => {
    expect(
      isPromoPopupActive(limaBefore, {
        enabled: false,
        endsAt: promoPopup.endsAt,
      }),
    ).toBe(false);
  });

  it("no se muestra si la fecha de cierre no es válida", () => {
    expect(
      isPromoPopupActive(limaBefore, {
        enabled: true,
        endsAt: "fecha-invalida",
      }),
    ).toBe(false);
  });
});
