import { describe, expect, it } from "vitest";

import { whatsappInquiryMessage } from "~/data/content";

import { buildWaMeHref } from "./whatsapp-href";

const PHONE = "51922798480";
const PHRASE = whatsappInquiryMessage;

describe("href de WhatsApp", () => {
  it("arma wa.me con el texto codificado una sola vez", () => {
    const encoded = encodeURIComponent(PHRASE);
    const href = buildWaMeHref(PHONE, PHRASE);

    expect(PHRASE).toBe(
      "¡Hola! Vi su página web y me gustaría conocer más sobre sus tratamientos. ¿Me podrían orientar?",
    );
    expect(PHRASE.endsWith(" ")).toBe(false);
    expect(href).toBe(`https://wa.me/${PHONE}?text=${encoded}`);
    expect(href.startsWith("https://wa.me/")).toBe(true);
    expect(href).not.toContain("web.whatsapp.com");
    expect(href.split("text=")[1]).toBe(encoded);
    expect(encoded).not.toContain("%25");
    expect(decodeURIComponent(href.split("text=")[1] ?? "")).toBe(PHRASE);
    expect(new URL(href).searchParams.get("text")).toBe(PHRASE);
  });

  it("omite el texto cuando no hay mensaje", () => {
    expect(buildWaMeHref(PHONE)).toBe(`https://wa.me/${PHONE}`);
  });
});
