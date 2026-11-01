// ---------------------------------------------------------------------------
// Lumina Estética — single source of truth for all editorial content.
// Marca, teléfonos, direcciones, promociones, tratamientos y testimonios son
// completamente ficticios con fines demostrativos.
// ---------------------------------------------------------------------------

export const site = {
  brand: "Lumina Estética",
  tagline: "Medicina estética, dermatología y láser en Lima",
  description:
    "Clínica de medicina estética en Lima, Perú. Toxina botulínica, ácido hialurónico, dermatología estética, faciales, corporales, depilación láser y paquetes premium con valoración médica.",
  // Canonical origin is resolved at runtime from NEXT_PUBLIC_SITE_URL
  // (with Vercel + localhost fallbacks). See src/lib/site-url.ts.
  // Company metadata used in /privacidad and legal notices.
  legal: {
    companyName: "Lumina Estética S.A.C.",
    ruc: "20000000000",
    jurisdiction: "Lima, Perú",
  },
  phoneDisplay: "+51 1 555 0123",
  phoneHref: "+5115550123",
  whatsappDisplay: "+51 981 237 361",
  whatsappNumber: "51981237361",
  email: "hola@lumina-estetica.example",
  address: "Av. Ejemplo 123, Miraflores, Lima — Perú",
  socials: {
    instagram: "https://instagram.com/example-lumina",
    facebook: "https://facebook.com/example-lumina",
    tiktok: "https://tiktok.com/@example-lumina",
  },
};

// ---- Navigation -----------------------------------------------------------

export const nav: Array<{ label: string; href: string }> = [
  { label: "Inicio", href: "/" },
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Promociones", href: "/promociones" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Tecnología", href: "/tecnologia" },
  { label: "Sedes", href: "/sedes" },
  { label: "Contacto", href: "/contacto" },
];

/** Enlaces secundarios (footer y utilidades). */
export const navSecondary: Array<{ label: string; href: string }> = [
  { label: "Equipo médico", href: "/equipo" },
  { label: "Solicitar valoración", href: "/reservar" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
];

export const cta = {
  primary: { label: "Solicitar valoración", href: "/reservar" },
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

// Legacy single-URL export was removed. Use `getSiteUrl()` from
// src/lib/site-url.ts for anything that needs the canonical origin.

// ---- Hero / shared blocks -------------------------------------------------

export const hero = {
  eyebrow: "Medicina estética • Lima, Perú",
  title: "Realza tu belleza natural con ciencia y acompañamiento cercano",
  subtitle:
    "Medicina estética facial, dermatología, faciales, corporales y láser en Lima. Valoración previa, protocolos claros y seguimiento posterior.",
  ctaPrimary: cta.primary,
  ctaSecondary: cta.treatments,
};

export const trustBadges = [
  {
    title: "Equipo médico colegiado",
    subtitle: "Dermatología, estética y cirugía",
  },
  {
    title: "Primera evaluación sin costo",
    subtitle: "Diagnóstico y plan a medida",
  },
  {
    title: "Insumos y equipos certificados",
    subtitle: "Trazabilidad y lote verificable",
  },
  {
    title: "Protocolos basados en evidencia",
    subtitle: "Revisados cada temporada",
  },
  {
    title: "Más de una década atendiendo en Lima",
    subtitle: "Pacientes nacionales y del extranjero",
  },
  {
    title: "Seguimiento posterior incluido",
    subtitle: "Acompañamiento después del alta",
  },
];

export const differentialBenefits = [
  {
    title: "Valoración antes de vender",
    description:
      "Priorizamos indicación médica y expectativas realistas sobre promociones impulsivas.",
  },
  {
    title: "Equipo multidisciplinar",
    description:
      "Dermatología, medicina estética y cirugía coordinadas en un mismo plan cuando corresponde.",
  },
  {
    title: "Tecnología trazable",
    description:
      "Equipos de alta gama con protocolos documentados; te explicamos qué se usa y por qué.",
  },
  {
    title: "Experiencia premium",
    description:
      "Instalaciones cálidas, tiempos respetados y comunicación clara en cada visita.",
  },
] as const;

export const successCases = {
  title: "Casos de éxito responsables",
  intro:
    "En producción, esta sección solo debe publicar casos con consentimiento expreso y contexto clínico. Esta demo usa textos ilustrativos sin imágenes comparativas.",
  disclaimer:
    "Los resultados varían según cada persona. Las imágenes clínicas reales requieren autorización documentada y condiciones de luz/encuadre homogéneas.",
  items: [
    {
      tag: "Facial",
      title: "Luminosidad y textura",
      description:
        "Protocolos combinados de limpieza profunda e hidratación con seguimiento mensual.",
    },
    {
      tag: "Corporal",
      title: "Contorno y firmeza",
      description:
        "Planes graduales con tecnología de apoyo y hábitos en casa; sin promesas absolutas.",
    },
    {
      tag: "Depilación",
      title: "Láser progresivo",
      description:
        "Sesiones programadas según fototipo; educación sobre sol y cuidados entre visitas.",
    },
  ],
} as const;

// ---- Catalog --------------------------------------------------------------
export type { FAQ, Treatment, Category } from "./treatments-catalog";
export { categoriesFull } from "./treatments-catalog";
import { categoriesFull } from "./treatments-catalog";
import type { Category, Treatment, FAQ } from "./treatments-catalog";


// Index of all treatments as flat records, useful for sitemaps & lookups.
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

// Summary list used by the homepage categories grid.
export const categories = categoriesFull.map((c) => ({
  slug: c.slug,
  title: c.title,
  description: c.short,
  icon: c.icon,
}));

// ---- Featured treatments (homepage grid) ---------------------------------

export const featured: Array<{
  categorySlug: string;
  treatmentSlug: string;
}> = [
  { categorySlug: "medicina-estetica-facial", treatmentSlug: "toxina-botulinica" },
  { categorySlug: "medicina-estetica-facial", treatmentSlug: "acido-hialuronico-labios" },
  { categorySlug: "medicina-estetica-facial", treatmentSlug: "marcaje-mandibular" },
  { categorySlug: "medicina-estetica-facial", treatmentSlug: "bioestimulador-colageno" },
  { categorySlug: "tecnologia-laser", treatmentSlug: "depilacion-nd-yag" },
  { categorySlug: "paquetes-especiales", treatmentSlug: "paquete-corporal-premium" },
];

// ---- Monthly promos ------------------------------------------------------

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
    tag: "Facial",
    title: "Skinbooster + valoración incluida",
    sessionInfo: "1 sesión · incluye valoración previa",
    priceBefore: "S/ 320",
    priceNow: "S/ 249",
    description:
      "Hidratación profunda y luminosidad. Si el tratamiento no está indicado, orientamos alternativas.",
    cta: "Reservar valoración",
    href: "/reservar?tratamiento=skinbooster",
  },
  {
    tag: "Armonización",
    title: "Ácido hialurónico en labios",
    sessionInfo: "Sesión única · retoque opcional",
    priceBefore: "S/ 890",
    priceNow: "S/ 690",
    description: "Volumen y contorno con criterio natural. Plan definido en consulta.",
    cta: "Ver tratamiento",
    href: "/tratamientos/medicina-estetica-facial/acido-hialuronico-labios",
  },
  {
    tag: "Láser",
    title: "Depilación ND:YAG",
    sessionInfo: "Pack promocional · valoración previa",
    priceBefore: "S/ 180",
    priceNow: "S/ 129",
    description: "Zonas pequeñas o sesión de prueba. Indicación según fototipo en consulta.",
    cta: "Solicitar cupo",
    href: "/reservar?tratamiento=depilacion-nd-yag",
  },
  {
    tag: "Combo",
    title: "Limpieza profunda + alta frecuencia",
    sessionInfo: "1 sesión combinada",
    priceBefore: "S/ 260",
    priceNow: "S/ 199",
    description: "Ideal para piel congestionada o con tendencia acneica leve.",
    cta: "Reservar",
    href: "/reservar?tratamiento=limpieza-facial-profunda",
  },
];

export const partnerBrands = [
  "Equipos de última generación",
  "Insumos trazables",
  "Protocolos médicos",
  "Formación continua",
  "Seguimiento post-tratamiento",
] as const;

export const homePillars = [
  {
    title: "Belleza con criterio",
    description:
      "Realzamos tu imagen sin exagerar resultados. Planes personalizados y expectativas claras.",
  },
  {
    title: "Bienestar en consulta",
    description:
      "Te explicamos cada paso antes de decidir. Ambiente calmado y tiempos respetados.",
  },
  {
    title: "Tu mejor versión",
    description:
      "Combinamos tecnología y manos expertas para acompañarte con seguridad en Lima.",
  },
] as const;

export const homeGiftBanner = {
  title: "Regala cuidado, no impulsos",
  description:
    "Tarjetas regalo para valoraciones y tratamientos seleccionados. Perfectas para fechas especiales.",
  cta: "Consultar tarjetas",
  href: "/contacto",
} as const;

export const homeEditorialIntro = {
  eyebrow: "El tratamiento que buscas",
  title: "Medicina estética facial, dermatología, láser y corporales en Lima",
  description:
    "Explora protocolos destacados con lenguaje claro. La indicación final siempre la define tu valoración médica.",
} as const;

/** Slugs de tratamientos para bloques editoriales en home (patrón clínica premium). */
export const homeEditorialSlugs: Array<{ categorySlug: string; treatmentSlug: string }> =
  [
    { categorySlug: "medicina-estetica-facial", treatmentSlug: "toxina-botulinica" },
    { categorySlug: "medicina-estetica-facial", treatmentSlug: "acido-hialuronico-labios" },
    { categorySlug: "medicina-estetica-facial", treatmentSlug: "marcaje-mandibular" },
    { categorySlug: "tecnologia-laser", treatmentSlug: "depilacion-nd-yag" },
  ];

// ---- Doctors / Team ------------------------------------------------------

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
    slug: "valentina-rivera",
    name: "Dra. Valentina Rivera",
    role: "Directora médica • Medicina estética",
    bio: "Enfocada en tratamientos faciales y corporales no invasivos con resultados naturales. Acompaña cada plan con seguimiento y educación sobre cuidados en casa.",
    credentials: [
      "CMP colegiatura ficticia N.º 000000 [PENDIENTE DE VALIDACIÓN]",
      "Formación en medicina estética — Lima y Buenos Aires [PENDIENTE DE VALIDACIÓN]",
    ],
    focus: ["Rejuvenecimiento facial", "Bioestimulación", "Protocolos combinados"],
  },
  {
    slug: "mateo-salcedo",
    name: "Dr. Mateo Salcedo",
    role: "Cirujano plástico",
    bio: "Prioriza seguridad, indicación correcta y expectativas realistas en procedimientos quirúrgicos y revisiones estéticas.",
    credentials: [
      "CMP colegiatura ficticia N.º 000000 [PENDIENTE DE VALIDACIÓN]",
      "Membresía en sociedad científica [PENDIENTE DE VALIDACIÓN]",
    ],
    focus: ["Cirugía estética facial", "Contorno corporal", "Revisión de resultados"],
  },
  {
    slug: "camila-nunez",
    name: "Dra. Camila Núñez",
    role: "Dermatología estética",
    bio: "Trabaja piel sensible, acné adulto y manchas con enfoque gradual, evitando promesas absolutas y combinando tecnología con hábitos.",
    credentials: [
      "CMP colegiatura ficticia N.º 000000 [PENDIENTE DE VALIDACIÓN]",
      "Diplomado en dermatología estética [PENDIENTE DE VALIDACIÓN]",
    ],
    focus: ["Manchas y textura", "Acné y rosácea leve", "Peelings médicos"],
  },
];

/** Compatibilidad con componentes existentes. */
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
    description:
      "Revisamos tu historial general, objetivos y contraindicaciones evidentes. No sustituye una consulta presencial completa.",
  },
  {
    step: "02",
    title: "Plan personalizado",
    description:
      "Te explicamos opciones, tiempos orientativos y qué puede esperarse razonablemente. Sin presión para decidir el mismo día.",
  },
  {
    step: "03",
    title: "Tratamiento",
    description:
      "Aplicamos el protocolo acordado con consentimiento informado y productos trazables cuando corresponda.",
  },
  {
    step: "04",
    title: "Seguimiento",
    description:
      "Indicaciones de cuidado posterior y controles según el procedimiento. Los resultados pueden variar según cada persona.",
  },
] as const;

export const globalFAQ: FAQ[] = [
  {
    q: "¿La valoración tiene costo?",
    a: "En esta demo indicamos valoración sin costo. En producción debe confirmarse el precio y publicarse antes de reservar [PENDIENTE DE VALIDACIÓN].",
  },
  {
    q: "¿Puedo reservar sin saber qué tratamiento necesito?",
    a: "Sí. Elige “Consulta general” o cuéntanos qué te gustaría mejorar. La indicación final la define el equipo médico en consulta.",
  },
  {
    q: "¿Los resultados están garantizados?",
    a: "No. Compartimos resultados esperables y factores que influyen, pero la respuesta de cada persona es individual.",
  },
  {
    q: "¿Cómo preparo mi primera visita?",
    a: "Llega unos minutos antes, trae identificación y lista de medicamentos o alergias relevantes. Evita exponerte al sol intenso si vendrás por un peeling o láser.",
  },
  {
    q: "¿Puedo cancelar o reprogramar?",
    a: "Sí. Consulta las condiciones de reserva. Recomendamos avisar con la mayor anticipación posible para reasignar el horario.",
  },
  {
    q: "¿Atienden urgencias médicas?",
    a: "Somos un centro de medicina estética programada. Ante urgencias, acude a un servicio de emergencias o a tu médico de cabecera.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "[PENDIENTE DE VALIDACIÓN] Indica aquí medios de pago, cuotas y políticas de abono por paquetes.",
  },
  {
    q: "¿Usan productos originales?",
    a: "Trabajamos con insumos trazables cuando corresponde y te informamos antes de aplicarlos. Solicita verificar lote en consulta si lo deseas.",
  },
];

export const bookingCopy = {
  title: "Solicitar valoración",
  intro:
    "Flujo breve para coordinar una primera valoración. No es un diagnóstico en línea: revisaremos tu solicitud y te confirmaremos horario por teléfono, email o WhatsApp.",
  valuationCost:
    "Valoración inicial sin costo en esta demostración [PENDIENTE DE VALIDACIÓN en clínica real].",
  cancellation:
    "Puedes reprogramar o cancelar según nuestras condiciones de reserva. Te recomendamos avisar con al menos 24 horas [PENDIENTE DE VALIDACIÓN].",
  fallback:
    "Si el formulario falla, escríbenos por WhatsApp o llámanos y guardaremos tu solicitud manualmente.",
} as const;

export const legalLinks = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Condiciones de reserva", href: "/condiciones-reserva" },
] as const;

export const promosDisclaimer =
  "Promociones sujetas a valoración médica y disponibilidad. No acumulables salvo indicación expresa. Precios referenciales en demo.";

// ---- Technology ----------------------------------------------------------

export const technology = [
  {
    name: "Láser diodo de alta potencia",
    description:
      "Depilación eficaz y confortable para todo tipo de piel, con sistema de enfriamiento continuo.",
  },
  {
    name: "Radiofrecuencia fraccionada",
    description:
      "Tensado profundo de la piel y estimulación de colágeno sin tiempo de recuperación.",
  },
  {
    name: "Criolipólisis de 4ta generación",
    description:
      "Reducción focalizada de adipocitos con aplicadores anatómicos de última generación.",
  },
  {
    name: "HIFU facial y corporal",
    description:
      "Ultrasonido focalizado de alta intensidad para lifting sin cirugía.",
  },
];

// ---- Testimonials --------------------------------------------------------

export const testimonials = [
  {
    name: "Lucía M.",
    treatment: "HydraGlow Facial",
    quote:
      "Noté la diferencia desde la primera sesión. El equipo es muy profesional y el espacio es realmente acogedor.",
  },
  {
    name: "Andrea P.",
    treatment: "Depilación láser",
    quote:
      "Después de 5 sesiones los resultados son increíbles. Me explicaron todo con mucha paciencia.",
  },
  {
    name: "Rafaela S.",
    treatment: "Toxina botulínica",
    quote:
      "Resultado súper natural, nadie nota que me hice algo pero yo me veo descansada. Repetiría sin dudar.",
  },
];

// ---- Locations -----------------------------------------------------------

export const locations = [
  {
    slug: "miraflores",
    name: "Sede Miraflores",
    address: "Av. Ejemplo 123, Miraflores, Lima",
    phone: "+51 1 555 0123",
    phoneHref: "+5115550123",
    whatsapp: "+51 981 237 361",
    whatsappHref: "51981237361",
    hours: "Lun a Sáb · 9:00 – 20:00",
    mapHref: "https://maps.google.com/?q=Miraflores+Lima",
  },
  {
    slug: "san-isidro",
    name: "Sede San Isidro",
    address: "Calle Ejemplo 456, San Isidro, Lima",
    phone: "+51 1 555 0456",
    phoneHref: "+5115550456",
    whatsapp: "+51 999 000 222",
    whatsappHref: "51999000222",
    hours: "Lun a Sáb · 10:00 – 20:00",
    mapHref: "https://maps.google.com/?q=San+Isidro+Lima",
  },
  {
    slug: "surco",
    name: "Sede Surco",
    address: "Av. Ejemplo 789, Santiago de Surco, Lima",
    phone: "+51 1 555 0789",
    phoneHref: "+5115550789",
    whatsapp: "+51 999 000 333",
    whatsappHref: "51999000333",
    hours: "Mar a Sáb · 10:00 – 19:00",
    mapHref: "https://maps.google.com/?q=Surco+Lima",
  },
];

// ---- Footer --------------------------------------------------------------

export const footer = {
  hours: "Lunes a Sábado · 9:00 – 20:00 h",
  legal: `© ${new Date().getFullYear()} Lumina Estética. Marca ficticia creada con fines de demostración. Todos los datos de contacto, direcciones y promociones son de ejemplo.`,
};

// ---- Free-consult CTA ----------------------------------------------------
// Reworked wording and position (now shown further down the page, after the
// visitor has had a chance to browse the catalog).

export const freeConsult = {
  eyebrow: "Siguiente paso",
  title: "Solicita una valoración personalizada",
  subtitle:
    "Te explicaremos qué opciones tienen sentido para ti, tiempos orientativos y cuidados posteriores. Sin compromiso de iniciar tratamiento el mismo día.",
};

// ---- Allowed values for contact form validation --------------------------
// Server-side we validate `tratamiento` and `sede` against these lists so
// nobody can POST arbitrary strings into the database.

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
