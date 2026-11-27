import { describe, expect, it } from "vitest";

import { parseTreatmentWrite, treatmentWriteSchema } from "./treatment-rules";

describe("catálogo interno de tratamientos", () => {
  const valid = {
    name: "Toxina botulínica facial",
    category: "Medicina estética facial",
    estimatedMinutes: 25,
    internalDescription: "Nota para el equipo.",
  };

  it("guarda nombre, categoría, duración y descripción interna", () => {
    const parsed = parseTreatmentWrite(valid);
    expect(parsed).toMatchObject({
      name: "Toxina botulínica facial",
      category: "Medicina estética facial",
      estimatedMinutes: 25,
    });
  });

  it("rechaza un precio: este módulo no lleva tarifas", () => {
    const parsed = treatmentWriteSchema.safeParse({ ...valid, price: "S/ 1300" });
    expect(parsed.success).toBe(false);
    const precio = treatmentWriteSchema.safeParse({ ...valid, precio: 100 });
    expect(precio.success).toBe(false);
  });

  it("exige duración en minutos dentro de un rango de consulta", () => {
    expect(() => parseTreatmentWrite({ ...valid, estimatedMinutes: 0 })).toThrow(/duración/i);
    expect(() => parseTreatmentWrite({ ...valid, estimatedMinutes: "treinta" })).toThrow(/duración/i);
    expect(parseTreatmentWrite({ ...valid, estimatedMinutes: "40" }).estimatedMinutes).toBe(40);
  });

  it("solo acepta categorías del listado", () => {
    expect(() => parseTreatmentWrite({ ...valid, category: "Oferta" })).toThrow(/categoría/i);
  });
});
