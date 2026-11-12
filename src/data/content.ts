// ---------------------------------------------------------------------------
// Dra. Melissa Vigo — Médico Estético. Fuente editorial del sitio.
// Solo datos confirmados. Lo que la clínica aún no entrega queda en null,
// en listas vacías o con un texto de “pendiente”, nunca como dato ficticio.
// ---------------------------------------------------------------------------

import {
  categoriesFull,
  catalogDisclaimer,
  catalogIntro,
} from "./treatments-catalog";
import type { Category, Treatment, FAQ } from "./treatments-catalog";

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
  closing: {
    before: "En este espacio comparto información sobre ",
    emphasis: "medicina estética, cuidado de la piel y bienestar integral",
    after: " para ayudarte a tomar decisiones informadas.",
  },
} as const;

/**
 * Única fuente del WhatsApp. El número todavía no está confirmado por la
 * clínica: no lo copies en sedes, componentes ni textos sueltos.
 */
export const WHATSAPP_PENDIENTE_DE_CONFIRMAR = {
  confirmed: false as const,
  display: "+51 981 237 361",
  /** Dígitos para wa.me, sin + */
  number: "51981237361",
  note: "Número pendiente de confirmar por la clínica.",
};

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
  whatsappDisplay: WHATSAPP_PENDIENTE_DE_CONFIRMAR.display,
  whatsappNumber: WHATSAPP_PENDIENTE_DE_CONFIRMAR.number,
  whatsappNote: WHATSAPP_PENDIENTE_DE_CONFIRMAR.note,
  email: null as string | null,
  address: "Calle Manuel Pérez Oblitas 190, San Miguel",
  addressReference: "Ref. cuadra 10 de la Av. La Marina",
  socials: null as {
    instagram: string;
    facebook: string;
    tiktok: string;
  } | null,
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
  eyebrow: "Medicina estética · Lima",
  title: "Realza tus rasgos con naturalidad",
  /** Nombre en cursiva, el estilo del subtítulo anterior. Gabriola no tiene licencia web. */
  name: "Dra. Melissa Vigo Ruiz",
  credential: "Médico cirujano · CMP 101245",
  support: "Tratamientos personalizados, previa evaluación médica.",
  ctaPrimary: { label: "Solicitar cita", href: cta.book.href },
};

export const trustBadges = [
  { title: "Médico cirujano", subtitle: "CMP 101245" },
  { title: "Una sola profesional", subtitle: "Melissa Vigo" },
  { title: "Catálogo publicado", subtitle: "17 tratamientos con tiempo publicado" },
  { title: "Indicación en consulta", subtitle: "Nada se aplica sin valoración" },
  { title: "San Miguel, Lima", subtitle: "Calle Manuel Pérez Oblitas 190" },
  {
    title: "Promoción publicada",
    subtitle: "Toxina botulínica 2x1, primeros 50 clientes",
  },
];

export const differentialBenefits = [
  {
    title: "Una profesional",
    description:
      "La atención del catálogo corresponde a la Dra. Melissa Vigo. No hay un equipo adicional publicado.",
  },
  {
    title: "Listado concreto",
    description:
      "Tiempos y protocolos salen del documento de la doctora. No hay paquetes ni promociones de ejemplo.",
  },
  {
    title: "Lo que falta, se dice",
    description:
      "Horario, razón social, RUC, teléfono, correo y redes se publicarán cuando existan.",
  },
] as const;

export const successCases = {
  title: "Resultados",
  intro:
    "Aún no hay casos publicados. Esta sección se activará solo con autorización expresa de cada paciente.",
  disclaimer:
    "Los resultados varían según cada persona. No se muestran imágenes comparativas sin consentimiento.",
  items: [] as Array<{ tag: string; title: string; description: string }>,
};

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

export const promos: Array<{
  tag: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  sessionInfo?: string;
  priceBefore?: string;
  priceNow?: string;
}> = [
  {
    tag: "2x1",
    title: "Toxina botulínica facial",
    sessionInfo: "15–20 min · primeros 50 clientes",
    priceNow: "S/ 1,300",
    description:
      "Para los primeros 50 clientes, S/ 1,300 ya incluye la promoción 2x1. Si separas la cita con el 10% del procedimiento, la evaluación integral es gratuita. No hay otras promociones publicadas.",
    cta: "Ver tratamiento",
    href: "/tratamientos/medicina-estetica-facial/toxina-botulinica-facial",
  },
];

export const homeEditorialIntro = {
  eyebrow: "Tratamientos",
  title: "Tratamientos de medicina estética",
  description: "Faciales, corporales, cuidado de la piel y láser.",
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
    description: "La doctora revisa tus necesidades.",
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
    q: "¿Dónde quedan y en qué horario atienden?",
    a: `Consultorio en ${site.address}. ${site.addressReference}. El horario de atención aún no está publicado.`,
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

export const promosDisclaimer = catalogDisclaimer;

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

export const testimonials: Array<{
  name: string;
  treatment: string;
  quote: string;
}> = [];

export const locations: Array<{
  slug: string;
  name: string;
  address: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  hours: string;
  mapHref: string;
}> = [
  {
    slug: "san-miguel",
    name: "Consultorio San Miguel",
    address: "Calle Manuel Pérez Oblitas 190, San Miguel",
    phone: site.whatsappDisplay,
    phoneHref: site.whatsappNumber ? `tel:+${site.whatsappNumber}` : "",
    whatsapp: site.whatsappDisplay,
    whatsappHref: `https://wa.me/${site.whatsappNumber}`,
    hours: "Horario por confirmar",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Calle+Manuel+Pérez+Oblitas+190,+San+Miguel,+Lima",
  },
];

export const footer = {
  hours: "Horario por confirmar",
  hoursNote: "El horario de atención aún no está publicado.",
  legal: `© ${new Date().getFullYear()} Dra. Melissa Vigo. Medicina estética en San Miguel, Lima. Razón social, RUC y horario pendientes de publicación.`,
};

export const freeConsult = {
  eyebrow: "Siguiente paso",
  title: "Reserva tu cita",
  subtitle:
    "La doctora revisa tus necesidades en consulta. Escríbenos por WhatsApp y te respondemos para coordinar tu cita, o déjanos tus datos.",
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
