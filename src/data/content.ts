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

/** Clave de sessionStorage del asistente de reserva. Neutral, sin marca. */
export const BOOKING_STORAGE_KEY = "booking-confirmed";

export const site = {
  brand: "Dra. Melissa Vigo",
  brandFull: "Dra. Melissa Vigo – Médico Estético",
  tagline: "Médico Estético",
  description:
    "Medicina estética en San Miguel, Lima, Perú, a cargo de la Dra. Melissa Vigo, médico cirujano (CMP 101245). Catálogo con tiempos y precios.",
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

export const navSecondary: Array<{ label: string; href: string }> = [
  { label: "Equipo médico", href: "/equipo" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
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

export const hero = {
  eyebrow: "Medicina estética · Lima",
  title: "Cuidado médico para tu piel",
  /** Línea profesional en cursiva. Gabriola no tiene licencia web. */
  subtitle: "Médico cirujano · CMP 101245",
  /**
   * Aviso necesario: la reserva de esta web es una solicitud, y sede,
   * horario y WhatsApp siguen sin confirmarse. No afirma que el video
   * del hero sea la clínica ni una paciente.
   */
  support:
    "Cada tratamiento publicado indica su tiempo y su precio. Reservar deja una solicitud: la cita se confirma solo cuando te escribamos.",
  ctaPrimary: cta.book,
};

export const trustBadges = [
  { title: "Médico cirujano", subtitle: "CMP 101245" },
  { title: "Una sola profesional", subtitle: "Melissa Vigo" },
  { title: "Catálogo publicado", subtitle: "17 tratamientos con tiempo y precio" },
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
      "Tiempos y precios salen del documento de la doctora. No hay paquetes ni promociones de ejemplo.",
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

export const featured: Array<{
  categorySlug: string;
  treatmentSlug: string;
}> = [
  { categorySlug: "medicina-estetica-facial", treatmentSlug: "toxina-botulinica-facial" },
  { categorySlug: "medicina-estetica-facial", treatmentSlug: "acido-hialuronico-labios" },
  { categorySlug: "cuidado-de-la-piel", treatmentSlug: "limpieza-facial-profunda" },
  { categorySlug: "tratamientos-corporales", treatmentSlug: "enzimas-recombinantes-corporales" },
  { categorySlug: "laser-y-depilacion", treatmentSlug: "depilacion-ipl-o-diodo" },
  { categorySlug: "tratamientos-corporales", treatmentSlug: "estrias-dermapen" },
];

export const featuredHeading = {
  eyebrow: "Precios",
  title: "Una selección del catálogo",
  subtitle:
    "Tiempo y precio de cada ficha. La indicación se confirma en consulta, antes de cualquier procedimiento.",
};

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

export const partnerBrands = [
  "Reage®",
  "Abbott",
  "Neauvia®",
  "Croma©",
  "Sciela",
  "Radiesse®",
  "Exel",
  "Dermapen",
  "Fibroblast",
] as const;

export const homePillars = [
  {
    title: "Primero, la consulta",
    description:
      "La Dra. Melissa Vigo revisa lo que buscas, explica el procedimiento y confirma si es adecuado para ti.",
  },
  {
    title: "Tiempo y precio a la vista",
    description:
      "Cada tratamiento publicado indica su duración y su precio. No hay paquetes extra en esta web.",
  },
  {
    title: "San Miguel, Lima",
    description:
      "Consultorio en Calle Manuel Pérez Oblitas 190. El horario de atención se publicará cuando esté confirmado.",
  },
] as const;

export const homeEditorialIntro = {
  eyebrow: "Tratamientos",
  title: "Cuatro caminos para empezar",
  description:
    "Facial, piel, cuerpo y láser. La indicación se confirma en consulta.",
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
    bio: "Médico cirujano, CMP 101245. Medicina estética. La biografía extendida se publicará cuando la doctora la confirme.",
    credentials: ["Médico cirujano", "CMP 101245", "Medicina estética"],
    focus: categoriesFull.map((c) => c.title),
  },
];

export const doctors = teamMembers.map(({ name, role, bio, slug }) => ({
  name,
  role,
  bio,
  slug,
}));

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
    "Flujo para dejar una solicitud. No es un diagnóstico en línea ni una cita confirmada: la revisaremos y te escribiremos por WhatsApp.",
  valuationCost:
    "La evaluación integral gratuita aplica al separar la cita con el 10% del procedimiento en los tratamientos del listado que lo indican. La política de reembolso de ese 10% aún no está publicada.",
  cancellation:
    "La política de cancelación y el reembolso del 10% aún no están publicados.",
  fallback: "Si el formulario falla, escríbenos por WhatsApp.",
} as const;

export const legalLinks = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
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
    "La doctora revisa tus necesidades en consulta. Si prefieres no usar el formulario, escríbenos por WhatsApp.",
};

const extraTreatmentOptions = ["Otro", "Consulta general"] as const;

export const allowedTratamientos = [
  ...categoriesFull.map((c) => c.title),
  ...categoriesFull.flatMap((c) => c.treatments.map((t) => t.name)),
  ...extraTreatmentOptions,
] as const;

export const allowedSedes = [
  "Sin preferencia",
  ...locations.map((l) => l.name),
] as const;
