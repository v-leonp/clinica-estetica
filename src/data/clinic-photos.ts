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
    alt: "Aplicación de ácido hialurónico en el labio, con guantes y jeringa.",
    ratio: "landscape",
  },
  rinomodelacion: {
    src: "/fotos/tratamientos/rinomodelacion-menton.webp",
    alt: "Valoración del perfil de nariz y mentón, con guantes, durante una consulta.",
    ratio: "landscape",
  },
  toxinaFacial: {
    src: "/fotos/tratamientos/toxina-botulinica-facial.webp",
    alt: "Primer plano de la frente y las líneas de expresión, zona habitual de la toxina botulínica.",
    ratio: "landscape",
  },
  marcajeMandibular: {
    src: "/fotos/tratamientos/marcaje-mandibular.webp",
    alt: "Perfil de un rostro en el que se aprecia la línea mandibular.",
    ratio: "landscape",
  },
  hidratacionProfunda: {
    src: "/fotos/tratamientos/hidratacion-profunda.webp",
    alt: "Retrato de un rostro luminoso, ilustración de la hidratación profunda de la piel.",
    ratio: "landscape",
  },
  puntosAnclaje: {
    src: "/fotos/tratamientos/puntos-de-anclaje.webp",
    alt: "Retrato frontal de un rostro, ilustración de la armonía facial de los puntos de anclaje.",
    ratio: "landscape",
  },
  bioestimulador: {
    src: "/fotos/tratamientos/bioestimulador-colageno.webp",
    alt: "Retrato de un rostro con líneas de expresión, ilustración del bioestimulador de colágeno.",
    ratio: "landscape",
  },
  skinbooster: {
    src: "/fotos/tratamientos/skinbooster.webp",
    alt: "Rostro con gotas sobre la piel, ilustración de la hidratación del skinbooster.",
    ratio: "landscape",
  },
  limpiezaProfunda: {
    src: "/fotos/tratamientos/limpieza-facial-profunda.webp",
    alt: "Persona con cinta en el cabello, preparada para una limpieza facial.",
    ratio: "landscape",
  },
  peelingEnzimatico: {
    src: "/fotos/tratamientos/peeling-enzimatico.webp",
    alt: "Producto en crema aplicado sobre el rostro, ilustración del peeling enzimático.",
    ratio: "landscape",
  },
  despigmentante: {
    src: "/fotos/tratamientos/despigmentante.webp",
    alt: "Primer plano de una mejilla con manchas, en el contexto del despigmentante.",
    ratio: "landscape",
  },
  plasmapen: {
    src: "/fotos/tratamientos/plasmapen.webp",
    alt: "Dispositivo de plasma junto al cuello y el hombro, en el contexto de PlasmaPen.",
    ratio: "landscape",
  },
  depilacionIpl: {
    src: "/fotos/tratamientos/depilacion-ipl-diodo.webp",
    alt: "Piernas sobre la camilla, ilustración de una piel suave asociada a la depilación.",
    ratio: "landscape",
  },
  enzimasCorporales: {
    src: "/fotos/tratamientos/enzimas-recombinantes-corporales.webp",
    alt: "Valoración de la zona del flanco y el abdomen en una consulta corporal.",
    ratio: "landscape",
  },
  estriasDermapen: {
    src: "/fotos/tratamientos/estrias-dermapen.webp",
    alt: "Dispositivo tipo Dermapen junto al abdomen, en un tratamiento de estrías.",
    ratio: "landscape",
  },
  estriasFibroblast: {
    src: "/fotos/tratamientos/estrias-fibroblast.webp",
    alt: "Dispositivo de plasma sobre estrías, en un tratamiento con Fibroblast.",
    ratio: "landscape",
  },
  atenuacionTatuajes: {
    src: "/fotos/tratamientos/atenuacion-tatuajes-laser.webp",
    alt: "Láser sobre un tatuaje del antebrazo. Profesional y paciente usan protección ocular.",
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
  "acido-hialuronico-rinomodelacion-y-menton": clinicPhotos.rinomodelacion,
  "acido-hialuronico-labios": clinicPhotos.labiosTratamiento,
  "marcaje-mandibular": clinicPhotos.marcajeMandibular,
  "hidratacion-profunda-acido-hialuronico": clinicPhotos.hidratacionProfunda,
  "puntos-de-anclaje": clinicPhotos.puntosAnclaje,
  "bioestimulador-de-colageno": clinicPhotos.bioestimulador,
  skinbooster: clinicPhotos.skinbooster,
  "limpieza-facial-profunda": clinicPhotos.limpiezaProfunda,
  "peeling-enzimatico": clinicPhotos.peelingEnzimatico,
  despigmentante: clinicPhotos.despigmentante,
  "retiro-de-lesiones": clinicPhotos.plasmapen,
  "enzimas-recombinantes-corporales": clinicPhotos.enzimasCorporales,
  "estrias-dermapen": clinicPhotos.estriasDermapen,
  "estrias-fibroblast": clinicPhotos.estriasFibroblast,
  "atenuacion-de-tatuajes-nd-yag": clinicPhotos.atenuacionTatuajes,
  "depilacion-ipl-o-diodo": clinicPhotos.depilacionIpl,
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
