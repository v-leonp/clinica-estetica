import { describe, expect, it } from "vitest";

import { photoForTreatment } from "./clinic-photos";
import { catalogShowsPrices, resolveTratamientoFromSlug } from "./content";
import { categoriesFull } from "./treatments-catalog";

const all = categoriesFull.flatMap((category) => category.treatments);

function bySlug(slug: string) {
  const treatment = all.find((item) => item.slug === slug);
  if (!treatment) throw new Error(`Falta el tratamiento ${slug}`);
  return treatment;
}

describe("catálogo actualizado de tratamientos", () => {
  it("conserva los 17 slugs que usa el formulario y las fichas", () => {
    expect(all.map((treatment) => treatment.slug)).toEqual([
      "toxina-botulinica-facial",
      "acido-hialuronico-rinomodelacion-y-menton",
      "acido-hialuronico-labios",
      "marcaje-mandibular",
      "hidratacion-profunda-acido-hialuronico",
      "puntos-de-anclaje",
      "bioestimulador-de-colageno",
      "skinbooster",
      "limpieza-facial-profunda",
      "peeling-enzimatico",
      "despigmentante",
      "retiro-de-lesiones",
      "enzimas-recombinantes-corporales",
      "estrias-dermapen",
      "estrias-fibroblast",
      "atenuacion-de-tatuajes-nd-yag",
      "depilacion-ipl-o-diodo",
    ]);
  });

  it("no muestra precios en la interfaz, aunque el dato siga en el catálogo", () => {
    expect(catalogShowsPrices).toBe(false);
    expect(bySlug("peeling-enzimatico").priceFrom).toBe("S/ 150");
    expect(bySlug("toxina-botulinica-facial").priceFrom).toBe("S/ 1,300");
  });

  it("actualiza tiempos, marcas, sesiones y el anticipo del 20%", () => {
    expect(bySlug("toxina-botulinica-facial").duration).toBe("15–25 min");
    expect(bySlug("acido-hialuronico-labios").duration).toBe("30–45 min");
    expect(bySlug("acido-hialuronico-rinomodelacion-y-menton").duration).toBe(
      "20–35 min",
    );
    expect(bySlug("marcaje-mandibular").duration).toBe("35–55 min");
    expect(bySlug("peeling-enzimatico").duration).toBe("45–55 min");
    expect(bySlug("peeling-enzimatico").sessions).toMatch(/4 sesiones semanales/);
    expect(bySlug("hidratacion-profunda-acido-hialuronico").brands).toBe(
      "Neauvia®, Croma©, Ruspharma",
    );
    expect(bySlug("toxina-botulinica-facial").offer).toMatch(/20%/);
    expect(bySlug("toxina-botulinica-facial").offer).toMatch(/Dúo perfecto/);
    expect(bySlug("marcaje-mandibular").offer).toMatch(/20%/);
    expect(bySlug("skinbooster").offer).toBeUndefined();
    expect(bySlug("acido-hialuronico-labios").followUp).toHaveLength(4);
  });

  it("limpia marcas y corrige el nombre visible de PlasmaPen sin cambiar el slug", () => {
    for (const treatment of all) {
      expect(treatment.brands ?? "").not.toMatch(/[*€]|\(S\)/);
      expect(treatment.long + (treatment.offer ?? "")).not.toMatch(/\b10%/);
    }
    expect(resolveTratamientoFromSlug("retiro-de-lesiones")).toMatch(
      /^PlasmaPen/,
    );
    expect(bySlug("retiro-de-lesiones").brands).toBe("Láser con anestesia local");
  });

  it("asigna una imagen propia, con texto alternativo, a cada tratamiento", () => {
    for (const treatment of all) {
      const photo = photoForTreatment(treatment.slug);
      expect(photo?.src, treatment.slug).toMatch(
        /^\/fotos\/tratamientos\/.+\.webp$/,
      );
      expect(photo?.alt.length ?? 0).toBeGreaterThan(20);
      expect(photo?.ratio).toBe("landscape");
    }
  });
});
