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
  labiosTratamiento: {
    src: "/fotos/tratamientos/acido-hialuronico-labios.webp",
    alt: "Aplicación de ácido hialurónico en los labios, con guantes y jeringa, durante una consulta.",
    ratio: "landscape",
  },
  rinomodelacion: {
    src: "/fotos/tratamientos/rinomodelacion-menton.webp",
    alt: "Valoración del perfil de nariz y mentón en camilla, con guantes, antes de una rinomodelación.",
    ratio: "landscape",
  },
  toxinaFacial: {
    src: "/fotos/tratamientos/toxina-botulinica-facial.webp",
    alt: "Aplicación de toxina botulínica en la frente, con guantes, durante una consulta facial.",
    ratio: "landscape",
  },
  limpiezaProfunda: {
    src: "/fotos/tratamientos/limpieza-facial-profunda.webp",
    alt: "Limpieza facial profunda: se retira un producto de la mejilla con una gasa.",
    ratio: "landscape",
  },
  peelingEnzimatico: {
    src: "/fotos/tratamientos/peeling-enzimatico.webp",
    alt: "Aplicación de un peeling con brocha sobre el rostro, en consulta.",
    ratio: "landscape",
  },
  depilacionIpl: {
    src: "/fotos/tratamientos/depilacion-ipl-diodo.webp",
    alt: "Depilación con luz en la axila. Profesional y paciente usan protección ocular.",
    ratio: "landscape",
  },
  enzimasCorporales: {
    src: "/fotos/tratamientos/enzimas-recombinantes-corporales.webp",
    alt: "Aplicación de un tratamiento corporal con jeringa en el abdomen, con guantes.",
    ratio: "landscape",
  },
  estriasDermapen: {
    src: "/fotos/tratamientos/estrias-dermapen.webp",
    alt: "Tratamiento de estrías en el abdomen con un dispositivo tipo Dermapen.",
    ratio: "landscape",
  },
  estriasFibroblast: {
    src: "/fotos/tratamientos/estrias-fibroblast.webp",
    alt: "Tratamiento de estrías en el brazo con un dispositivo de plasma superficial.",
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
  "toxina-botulinica-facial": clinicPhotos.toxinaFacial,
  "acido-hialuronico-labios": clinicPhotos.labiosTratamiento,
  "acido-hialuronico-rinomodelacion-y-menton": clinicPhotos.rinomodelacion,
  "limpieza-facial-profunda": clinicPhotos.limpiezaProfunda,
  "peeling-enzimatico": clinicPhotos.peelingEnzimatico,
  "enzimas-recombinantes-corporales": clinicPhotos.enzimasCorporales,
  "depilacion-ipl-o-diodo": clinicPhotos.depilacionIpl,
  "estrias-dermapen": clinicPhotos.estriasDermapen,
  "estrias-fibroblast": clinicPhotos.estriasFibroblast,
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
