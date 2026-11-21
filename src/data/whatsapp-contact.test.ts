import { describe, expect, it } from "vitest";

import { medicalClinicJsonLd } from "~/lib/json-ld";
import { buildReservaWhatsAppHref } from "~/lib/whatsapp-reserva";

import {
  bookingWhatsAppHref,
  catalogCardWhatsAppHref,
  cta,
  locations,
  site,
  whatsappContact,
} from "./content";

const DISPLAY = "+51 922 798 480";
const DIGITS = "51922798480";

describe("WhatsApp de contacto de la clínica", () => {
  it("publica +51 922 798 480 como único número visible", () => {
    expect(whatsappContact.confirmed).toBe(true);
    expect(whatsappContact.display).toBe(DISPLAY);
    expect(whatsappContact.number).toBe(DIGITS);
    expect(site.whatsappDisplay).toBe(DISPLAY);
    expect(site.whatsappNumber).toBe(DIGITS);
    expect(site.email).toBeNull();
    expect(site.phoneDisplay).toBeNull();
  });

  it("usa el número nuevo en JSON-LD, tel: y enlaces wa.me", () => {
    const sede = locations[0];
    expect(sede).toBeDefined();

    expect(medicalClinicJsonLd().telephone).toBe(`+${DIGITS}`);
    expect(sede?.phone).toBe(DISPLAY);
    expect(sede?.phoneHref).toBe(`tel:+${DIGITS}`);
    expect(sede?.whatsapp).toBe(DISPLAY);
    expect(sede?.whatsappHref).toBe(`https://wa.me/${DIGITS}`);

    for (const href of [
      bookingWhatsAppHref(),
      catalogCardWhatsAppHref("Toxina botulínica facial"),
      cta.whatsapp.getHref(),
      buildReservaWhatsAppHref({
        nombre: "Ana Ejemplo",
        tratamiento: "Limpieza facial profunda",
        diaHoraPreferida: "20/11/2026 · Tarde",
      }),
    ]) {
      const url = new URL(href);
      expect(url.origin).toBe("https://wa.me");
      expect(url.pathname).toBe(`/${DIGITS}`);
    }
  });
});
