import { describe, expect, it } from "vitest";

import { resolveTratamientoFromSlug } from "~/data/content";

import {
  buildReservaWhatsAppHref,
  buildReservaWhatsAppMessage,
} from "./whatsapp-reserva";

describe("WhatsApp prellenado de la reserva", () => {
  it("sigue el orden nombre, tratamiento o zona, día y hora", () => {
    const message = buildReservaWhatsAppMessage({
      nombre: "Ana Ejemplo",
      tratamiento: "Limpieza facial profunda",
      diaHoraPreferida: "20/11/2026 · Tarde",
    });

    expect(message).toBe(
      [
        "Hola, quisiera reservar una cita.",
        "Nombre: Ana Ejemplo",
        "Tratamiento o zona: Limpieza facial profunda",
        "Día y hora: 20/11/2026 · Tarde",
      ].join("\n"),
    );

    const nombre = message.indexOf("Nombre:");
    const tratamiento = message.indexOf("Tratamiento o zona:");
    const dia = message.indexOf("Día y hora:");
    expect(nombre).toBeLessThan(tratamiento);
    expect(tratamiento).toBeLessThan(dia);
  });

  it("arma el enlace de la clínica y no mete saltos de línea dentro de un dato", () => {
    const href = buildReservaWhatsAppHref({
      nombre: "Ana\nEjemplo",
      tratamiento: "",
      diaHoraPreferida: "",
    });
    const url = new URL(href);

    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/51998398995");
    expect(url.searchParams.get("text")).toBe(
      [
        "Hola, quisiera reservar una cita.",
        "Nombre: Ana Ejemplo",
        "Tratamiento o zona: Por definir",
        "Día y hora: Por definir",
      ].join("\n"),
    );
  });

  it("preselecciona el tratamiento por slug y no confunde una categoría", () => {
    expect(resolveTratamientoFromSlug("limpieza-facial-profunda")).toBe(
      "Limpieza facial profunda",
    );
    expect(resolveTratamientoFromSlug("medicina-estetica-facial")).toBe(
      "Medicina estética facial",
    );
    expect(resolveTratamientoFromSlug("no-existe")).toBe("");
    expect(resolveTratamientoFromSlug("")).toBe("");
  });
});
