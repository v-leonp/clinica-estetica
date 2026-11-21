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
  whatsappInquiryMessage,
  whatsappWidget,
} from "./content";

const CONSULTA_WEB =
  "¡Hola! Vi su página web y me gustaría conocer más sobre sus tratamientos. ¿Me podrían orientar? 😊";

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

  it("prellena el chat general con el mensaje de la paciente, no con el saludo del globo", () => {
    expect(whatsappInquiryMessage).toBe(CONSULTA_WEB);
    expect(whatsappWidget.welcomeMessage).toBe(
      "Hola! Bienvenidos a Vigo Medical Estetic tú consultorio estético en el distrito de San Miguel. ¿En qué podemos ayudarte?",
    );

    const href = cta.whatsapp.getHref();
    const encoded = encodeURIComponent(CONSULTA_WEB);
    expect(href).toBe(`https://wa.me/${DIGITS}?text=${encoded}`);
    expect(encoded).toContain("%C2%A1");
    expect(encoded).toContain("%C2%BF");
    expect(encoded).toContain("%F0%9F%98%8A");
    expect(new URL(href).searchParams.get("text")).toBe(CONSULTA_WEB);
    expect(href).not.toContain("Bienvenidos");
    expect(decodeURIComponent(href)).not.toContain(whatsappWidget.welcomeMessage);

    const propio = "Hola, quiero consultar por un tratamiento concreto.";
    expect(new URL(cta.whatsapp.getHref(propio)).searchParams.get("text")).toBe(
      propio,
    );
  });
});
