/** Fotos reales de la consulta. No identifican por nombre a quien recibe el tratamiento. */

export type ClinicPhoto = {
  src: string;
  alt: string;
  /** 3:2 horizontal o 3:4 vertical. */
  ratio: "landscape" | "portrait";
};

export const clinicPhotos = {
  labios: {
    src: "/fotos/clinica/01-consulta-labios.jpg",
    alt: "Consulta de labios: la Dra. Melissa Vigo junto a una persona en camilla.",
    ratio: "landscape",
  },
  perfilNariz: {
    src: "/fotos/clinica/02-valoracion-perfil-nariz.jpg",
    alt: "Valoración del perfil de la nariz durante una consulta.",
    ratio: "landscape",
  },
  laserTatuaje: {
    src: "/fotos/clinica/03-laser-tatuaje.jpg",
    alt: "Láser sobre un tatuaje en el antebrazo, en consulta.",
    ratio: "landscape",
  },
  laserMandibula: {
    src: "/fotos/clinica/04-laser-mandibula-ipl.jpg",
    alt: "Láser en la zona mandibular, con protección ocular.",
    ratio: "landscape",
  },
  doctoraTratando: {
    src: "/fotos/clinica/05-doctora-tratando-rostro.jpg",
    alt: "La Dra. Melissa Vigo, con bata y placa, aplica un dispositivo en el rostro de una persona.",
    ratio: "portrait",
  },
  doctoraRetrato: {
    src: "/fotos/clinica/06-retrato-doctora-brazos-cruzados.jpg",
    alt: "Retrato de la Dra. Melissa Vigo con los brazos cruzados, frente al letrero de su marca.",
    ratio: "portrait",
  },
  consultaBrazo: {
    src: "/fotos/clinica/08-consulta-brazo.jpg",
    alt: "Consulta en el brazo de una persona, en camilla.",
    ratio: "landscape",
  },
  mascarilla: {
    src: "/fotos/clinica/09-mascarilla-facial.jpg",
    alt: "Aplicación de una mascarilla facial en consulta.",
    ratio: "landscape",
  },
  frente: {
    src: "/fotos/clinica/10-valoracion-frente.jpg",
    alt: "Valoración de la frente en consulta.",
    ratio: "landscape",
  },
  dermapen: {
    src: "/fotos/clinica/11-dermapen-brazo-estrias.jpg",
    alt: "Tratamiento con Dermapen en el brazo, sobre estrías.",
    ratio: "landscape",
  },
} as const satisfies Record<string, ClinicPhoto>;

const categoryPhoto: Record<string, ClinicPhoto> = {
  "medicina-estetica-facial": clinicPhotos.perfilNariz,
  "cuidado-de-la-piel": clinicPhotos.mascarilla,
  "tratamientos-corporales": clinicPhotos.dermapen,
  "laser-y-depilacion": clinicPhotos.laserTatuaje,
};

const treatmentPhoto: Record<string, ClinicPhoto> = {
  "toxina-botulinica-facial": clinicPhotos.frente,
  "acido-hialuronico-labios": clinicPhotos.labios,
  "acido-hialuronico-rinomodelacion-y-menton": clinicPhotos.perfilNariz,
  "limpieza-facial-profunda": clinicPhotos.mascarilla,
  "enzimas-recombinantes-corporales": clinicPhotos.consultaBrazo,
  "depilacion-ipl-o-diodo": clinicPhotos.laserMandibula,
  "estrias-dermapen": clinicPhotos.dermapen,
  "estrias-fibroblast": clinicPhotos.dermapen,
  "atenuacion-de-tatuajes-nd-yag": clinicPhotos.laserTatuaje,
};

export function photoForCategory(slug: string): ClinicPhoto | undefined {
  return categoryPhoto[slug];
}

export function photoForTreatment(
  treatmentSlug: string,
  categorySlug?: string,
): ClinicPhoto | undefined {
  return (
    treatmentPhoto[treatmentSlug] ??
    (categorySlug ? categoryPhoto[categorySlug] : undefined)
  );
}
