// ---------------------------------------------------------------------------
// Dra. Melissa Vigo — Médico Estético. Fuente editorial del sitio.
// Solo datos confirmados. Lo que el consultorio aún no entrega queda en null,
// en listas vacías o con un texto de “pendiente”, nunca como dato ficticio.
// ---------------------------------------------------------------------------

import {
  categoriesFull,
  catalogDisclaimer,
  catalogIntro,
} from "./treatments-catalog";
import type { Category, Treatment, FAQ } from "./treatments-catalog";
import { homeSeo } from "./seo-copy";

export type { FAQ, Treatment, Category } from "./treatments-catalog";
export { categoriesFull, catalogIntro, catalogDisclaimer };

/** Petición cliente: no mostrar precios en la UI del catálogo. */
export const catalogShowsPrices = false;

export const BOTOX_TREATMENT_SLUG = "toxina-botulinica-facial";

export function treatmentPromoBadge(treatmentSlug: string): string | null {
  if (treatmentSlug === BOTOX_TREATMENT_SLUG) {
    return "PROMOCION 2x1 a los primeros 50 pacientes";
  }
  return null;
}

export const doctorProfile = {
  name: "Dra. Melissa Vigo Ruiz",
  role: "Médico cirujano · Medicina estética",
  lead: "Médico cirujano con formación en una Maestría Internacional en Medicina Estética",
  commitment: {
    before:
      "Mi compromiso es cuidar tu seguridad y realzar tus rasgos con resultados naturales y armónicos. Para ello, trabajo con un enfoque ",
    emphasis: "ético, personalizado y de alta precisión",
    after: ".",
  },
  approachTitle: "Mi enfoque",
  approach: [
    {
      emphasis: "Evaluación personalizada.",
      text: " Escucho lo que buscas, evalúo tus rasgos y te explico qué opciones son adecuadas para ti.",
    },
    {
      emphasis: "Técnicas y tecnología médica.",
      text: " Utilizo técnicas avanzadas de neuromodulación y rellenos faciales, así como tecnología médica de última generación, según las necesidades de cada paciente.",
    },
    {
      emphasis: "Formación continua.",
      text: " Actualizo mis conocimientos y técnicas para incorporar avances que aporten valor al cuidado de mis pacientes.",
    },
  ],
  quote: "Creo en una medicina estética que realza tu belleza sin perder tu esencia.",
  closing: {
    before: "En este espacio comparto información sobre ",
    emphasis: "medicina estética, cuidado de la piel y bienestar integral",
    after: " para ayudarte a tomar decisiones informadas.",
  },
} as const;

/**
 * Única fuente del WhatsApp y del teléfono de contacto.
 * wa.me/51998398995
 */
export const whatsappContact = {
  confirmed: true as const,
  display: "+51 998 398 995",
  /** Dígitos para wa.me, sin + */
  number: "51998398995",
} as const;

/** Dirección visible en todo el sitio y base del JSON-LD. */
export const clinicAddress = {
  street: "Calle Manuel Pérez Oblitas 190",
  locality: "San Miguel",
  region: "Lima",
  full: "Calle Manuel Pérez Oblitas 190, San Miguel, Lima",
  reference: "Ref. cuadra 10 de la Av. La Marina",
} as const;

/** Mensaje de bienvenida del widget (documento cliente, petición 06). */
export const whatsappWidget = {
  welcomeMessage:
    "Hola! Bienvenidos a Vigo Medical Estetic tú consultorio estético en el distrito de San Miguel. ¿En qué podemos ayudarte?",
} as const;

export const bookingCallMotives = [
  "Consulta médica",
  "Informes",
  "Cita",
] as const;

export const bookingContactModes = ["Teléfono", "WhatsApp"] as const;

/** Clave de sessionStorage del asistente de reserva. Neutral, sin marca. */
export const BOOKING_STORAGE_KEY = "booking-confirmed";

export const site = {
  brand: "Dra. Melissa Vigo",
  brandFull: "Dra. Melissa Vigo – Médico Estético",
  tagline: "Médico Estético",
  description:
    "Medicina estética en San Miguel, Lima, Perú, a cargo de la Dra. Melissa Vigo, médico cirujano (CMP 101245). Catálogo con tiempos de cada tratamiento.",
  legal: {
    companyName: null as string | null,
    ruc: null as string | null,
    jurisdiction: "Lima, Perú",
  },
  phoneDisplay: null as string | null,
  phoneHref: null as string | null,
  whatsappDisplay: whatsappContact.display,
  whatsappNumber: whatsappContact.number,
  email: null as string | null,
  address: clinicAddress.full,
  addressReference: clinicAddress.reference,
  socials: {
    facebook: "https://www.facebook.com/dra.melissavigor",
    instagram: "https://www.instagram.com/dra.melissavigor",
    tiktok: "https://www.tiktok.com/@dra.melissavigo",
  },
};

export const nav: Array<{ label: string; href: string }> = [
  { label: "Inicio", href: "/" },
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Promociones", href: "/promociones" },
  { label: "Dra. Melissa Vigo", href: "/nosotros" },
];

export const cta = {
  primary: { label: "Reservar cita", href: "/reservar" },
  book: { label: "Reservar cita", href: "/reservar" },
  secondary: { label: "Ver tratamientos", href: "/tratamientos" },
  whatsapp: {
    label: "WhatsApp",
    getHref: (text?: string) =>
      `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
        text ?? `Hola ${site.brand}, me gustaría solicitar información.`,
      )}`,
  },
  treatments: { label: "Ver tratamientos", href: "/tratamientos" },
} as const;

/** WhatsApp de la tarjeta del catálogo. El evento no lleva el nombre del tratamiento. */
export function catalogCardWhatsAppHref(treatmentName: string): string {
  const text = `Hola, quisiera reservar una cita para ${treatmentName}.`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Reserva general. El evento no incluye datos de la persona. */
export function bookingWhatsAppHref(): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    "Hola, quisiera reservar una cita.",
  )}`;
}

export const hero = {
  /** Visible dentro del H1, junto al titular emocional. */
  eyebrow: `${homeSeo.h1} · Lima`,
  title: "Tu belleza natural, nuestra inspiración",
  support:
    "Tratamientos estéticos personalizados que combinan ciencia, precisión médica y técnicas avanzadas para realzar tu belleza con armonía y naturalidad.",
  ctaPrimary: { label: "Agenda tu evaluación", href: cta.book.href },
};

export const partnerBrands = {
  heading: "Calidad y confianza en cada tratamiento",
  text: "Seleccionamos productos de marcas internacionales reconocidas, priorizando su calidad, trazabilidad y respaldo técnico para cada procedimiento.",
  names: [
    "NEAUVIA",
    "Reage",
    "EXEL",
    "RADIESSE",
    "Avalon",
    "Sciela",
    "QF",
    "Lolasting",
  ],
} as const;

export const whyUs = {
  eyebrow: "¿Por qué elegirnos?",
  title: "Tu bienestar, nuestra prioridad",
  subtitle: "Medicina estética con ciencia, precisión y sensibilidad",
  items: [
    {
      title: "Criterio médico",
      description: "Cada procedimiento parte de una evaluación individual.",
      icon: "stethoscope",
    },
    {
      title: "Atención personalizada",
      description: "Escuchamos tus objetivos y respetamos tu esencia.",
      icon: "heart",
    },
    {
      title: "Calidad y confianza",
      description: "Priorizamos productos apropiados y protocolos responsables.",
      icon: "shield",
    },
    {
      title: "Armonía natural",
      description: "Buscamos resultados equilibrados, sin exageraciones.",
      icon: "spark",
    },
  ],
} as const;

export const doctorIntro = {
  title: "Medicina estética y cuidado facial",
  paragraphs: [
    "Queremos acompañarte a sentirte bien contigo, respetando siempre tu esencia.",
    "La Dra. Melissa Vigo te escucha y orienta sobre el cuidado de tu piel y tu imagen. En una evaluación presencial conversarán sobre lo que buscas, revisarán tus antecedentes y conocerás las opciones disponibles, sus cuidados y costos antes de decidir. La intención es que te sientas más a gusto y segura contigo misma, sin presiones y a tu propio ritmo.",
  ],
  quote: doctorProfile.quote,
  cta: { label: "Conoce más sobre mí", href: "/nosotros" },
} as const;

export const allTreatments = categoriesFull.flatMap((c) =>
  c.treatments.map((t) => ({ category: c, treatment: t })),
);

export function getCategory(slug: string): Category | undefined {
  return categoriesFull.find((c) => c.slug === slug);
}

export function getTreatment(
  categorySlug: string,
  treatmentSlug: string,
): { category: Category; treatment: Treatment } | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const treatment = category.treatments.find((t) => t.slug === treatmentSlug);
  if (!treatment) return undefined;
  return { category, treatment };
}

export const categories = categoriesFull.map((c) => ({
  slug: c.slug,
  title: c.title,
  description: c.short,
  icon: c.icon,
}));

export const promoPage = {
  eyebrow: "Promociones",
  title: "Promociones para ti",
  intro:
    "Descubre nuestras promociones y comienza a cuidar tu belleza con atención médica personalizada.",
  badge: "Promoción de lanzamiento",
  offerTitle: "2x1 en toxina botulínica facial",
  lines: [
    "Promoción para los primeros 50 pacientes, previa evaluación médica.",
    "Zonas: frente, entrecejo, patas de gallo.",
    "Separa tu cita con el 10% y accede a una evaluación integral gratuita.",
  ],
  cta: "Quiero aprovechar la promoción",
} as const;

export const homeEditorialIntro = {
  eyebrow: "Explora nuestros tratamientos",
  title: "Tratamientos diseñados para ti",
  description:
    "Cada piel y cada rostro son únicos. Descubre nuestros tratamientos faciales y corporales, diseñados para cuidar tu piel, armonizar tus rasgos y resaltar tu belleza natural.",
} as const;

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  focus: string[];
};

export const teamMembers: TeamMember[] = [
  {
    slug: "melissa-vigo",
    name: "Dra. Melissa Vigo",
    role: "Médico cirujano · Medicina estética",
    bio: "Soy la Dra. Melissa Vigo Ruiz, médico cirujano con formación en Maestría Internacional en Medicina estética.",
    credentials: ["Médico cirujano", "CMP 101245", "Medicina estética"],
    focus: categoriesFull.map((c) => c.title),
  },
];

export function getTeamMember(slug: string) {
  return teamMembers.find((m) => m.slug === slug);
}

export const careProcess = [
  {
    step: "01",
    title: "Valoración",
    description:
      "Recibe una evaluación personalizada según tus necesidades y objetivos.",
  },
  {
    step: "02",
    title: "Explicación",
    description: "Explica el procedimiento recomendado.",
  },
  {
    step: "03",
    title: "Confirmación",
    description: "Confirma si es adecuado para ti.",
  },
  {
    step: "04",
    title: "Aplicación",
    description:
      "Si corresponde, el tiempo publicado incluye la aplicación y puede variar según la zona y la valoración.",
  },
] as const;

export const globalFAQ: FAQ[] = [
  {
    q: "¿La valoración tiene costo?",
    a: "En toxina botulínica facial y en ácido hialurónico de rinomodelación y mentón y de labios, al separar la cita con el 10% del procedimiento la evaluación integral es gratuita. No hay una tarifa general de valoración publicada para el resto de tratamientos.",
  },
  {
    q: "¿Puedo reservar sin saber qué tratamiento necesito?",
    a: "Sí. Elige “Consulta general” o cuenta qué te gustaría consultar. La indicación la define la doctora en consulta.",
  },
  {
    q: "¿Los resultados están garantizados?",
    a: "No. La indicación y el procedimiento se confirman en valoración médica. La respuesta de cada persona es individual.",
  },
  {
    q: "¿Cómo preparo mi primera visita?",
    a: "Todavía no hay indicaciones de preparación publicadas. Te las compartiremos al coordinar la cita.",
  },
  {
    q: "¿Puedo cancelar o reprogramar?",
    a: "La política de cancelación aún no está publicada. Tampoco hay una regla publicada sobre el reembolso del 10% con el que se separan algunas citas.",
  },
  {
    q: "¿Atienden urgencias médicas?",
    a: "No. Es medicina estética programada. Ante una urgencia, acude a un servicio de emergencias.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Los medios de pago aún no están publicados.",
  },
  {
    q: "¿Dónde queda el consultorio?",
    a: `En ${site.address}. ${site.addressReference}.`,
  },
];

export const bookingCopy = {
  title: "Reservar cita",
  intro:
    "Déjanos tus datos y nos comunicaremos contigo. No es un diagnóstico en línea ni una cita confirmada.",
  callFormTitle: "Déjanos tus datos",
  callFormLead: "La cita se confirma cuando te escribamos.",
  valuationCost:
    "La evaluación integral gratuita aplica al separar la cita con el 10% del procedimiento en los tratamientos del listado que lo indican. La política de reembolso de ese 10% aún no está publicada.",
  cancellation:
    "La política de cancelación y el reembolso del 10% aún no están publicados.",
  fallback: "Si el formulario falla, escríbenos por WhatsApp.",
} as const;

export const legalLinks = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Condiciones de reserva", href: "/condiciones-reserva" },
] as const;

export const technology = [
  {
    name: "Láser ND:YAG",
    description:
      "Se usa en la atenuación de tatuajes por zona. El catálogo no publica la marca del equipo.",
  },
  {
    name: "IPL o diodo",
    description:
      "Se usa en la depilación por zona. El catálogo no publica una marca de equipo.",
  },
  {
    name: "Dermapen",
    description:
      "Se usa en estrías por zonas, hipertróficas e hipotróficas.",
  },
  {
    name: "Fibroblast",
    description:
      "Se usa en estrías por zonas, con plasma superficial. El equipo concreto no está especificado.",
  },
];

export const locations: Array<{
  slug: string;
  name: string;
  address: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  mapHref: string;
}> = [
  {
    slug: "san-miguel",
    name: "Consultorio San Miguel",
    address: clinicAddress.full,
    phone: site.whatsappDisplay,
    phoneHref: site.whatsappNumber ? `tel:+${site.whatsappNumber}` : "",
    whatsapp: site.whatsappDisplay,
    whatsappHref: `https://wa.me/${site.whatsappNumber}`,
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Calle+Manuel+Pérez+Oblitas+190,+San+Miguel,+Lima",
  },
];

export const footer = {
  legal: `© ${new Date().getFullYear()} Dra. Melissa Vigo. Medicina estética en San Miguel, Lima.`,
};

export const freeConsult = {
  eyebrow: "Comienza tu experiencia",
  title: "Tu mejor versión comienza con una decisión",
  subtitle:
    "Descubre cómo podemos ayudarte a realzar tu belleza natural. Agenda tu evaluación y recibe una atención diseñada especialmente para ti.",
  whatsappCta: "Agenda tu cita por WhatsApp",
};

const extraTreatmentOptions = [
  "Otro",
  "Consulta general",
  ...bookingCallMotives,
] as const;

export const allowedTratamientos = [
  ...categoriesFull.map((c) => c.title),
  ...categoriesFull.flatMap((c) => c.treatments.map((t) => t.name)),
  ...extraTreatmentOptions,
] as const;

export const allowedSedes = [
  "Sin preferencia",
  ...locations.map((l) => l.name),
] as const;
