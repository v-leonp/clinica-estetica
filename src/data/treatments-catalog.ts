/** Catálogo clínico — fuente para rutas dinámicas, SEO, formularios y sitemap. */

export type FAQ = { q: string; a: string };

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  long: string;
  benefits: string[];
  whoFor: string;
  duration: string;
  sessions: string;
  recovery: string;
  priceFrom: string;
  faq: FAQ[];
};

export type Category = {
  slug: string;
  title: string;
  short: string;
  long: string;
  icon: string;
  treatments: Treatment[];
};

const LIMA = "Lima, Perú";

function build(input: {
  slug: string;
  name: string;
  short: string;
  long?: string;
  benefits?: string[];
  whoFor?: string;
  duration?: string;
  sessions?: string;
  recovery?: string;
  priceFrom?: string;
  faq?: FAQ[];
}): Treatment {
  return {
    slug: input.slug,
    name: input.name,
    short: input.short,
    long:
      input.long ??
      `${input.name} en ${LIMA}. ${input.short} Indicación y plan personalizado tras valoración médica.`,
    benefits: input.benefits ?? [
      "Valoración médica previa",
      "Productos trazables cuando corresponde",
      "Seguimiento según protocolo",
    ],
    whoFor:
      input.whoFor ??
      "Adultos con indicación médica tras consulta presencial. No sustituye diagnóstico en línea.",
    duration: input.duration ?? "30–60 min",
    sessions: input.sessions ?? "Según evaluación",
    recovery:
      input.recovery ??
      "Orientación específica al finalizar. Los tiempos varían según cada persona.",
    priceFrom: input.priceFrom ?? "Consultar en valoración",
    faq: input.faq ?? [
      {
        q: "¿Necesito valoración previa?",
        a: `Sí. En ${LIMA} revisamos salud, expectativas y contraindicaciones antes de indicar el tratamiento.`,
      },
      {
        q: "¿Los resultados son iguales en todos?",
        a: "No. La respuesta es individual. Te explicamos qué es razonable esperar en tu caso.",
      },
    ],
  };
}

export const categoriesFull: Category[] = [
  {
    slug: "medicina-estetica-facial",
    title: "Medicina Estética Facial",
    icon: "face",
    short:
      "Armonización facial, relajación de líneas de expresión e hidratación médica con criterio clínico.",
    long: `Medicina estética facial en ${LIMA}: toxina botulínica, ácido hialurónico, bioestimuladores y skinboosters con enfoque natural.`,
    treatments: [
      build({
        slug: "toxina-botulinica",
        name: "Toxina Botulínica",
        short:
          "Suaviza líneas de expresión en frente, entrecejo y contorno de ojos con aplicación médica precisa.",
        duration: "20–30 min",
        sessions: "1 sesión · mantenimiento cada 4–6 meses orientativo",
        recovery: "Sin downtime. Evitar acostarse o masajear la zona 4 h.",
        benefits: [
          "Aspecto descansado y natural",
          "Expresión más suave",
          "Procedimiento ambulatorio",
        ],
      }),
      build({
        slug: "acido-hialuronico-rinomodelacion-menton",
        name: "Ácido Hialurónico para Rinomodelación y Mentón",
        short:
          "Perfilado no quirúrgico de nariz y mentón para mejorar proporciones faciales.",
        duration: "30–45 min",
        sessions: "1 sesión · retoques según evolución",
      }),
      build({
        slug: "acido-hialuronico-labios",
        name: "Ácido Hialurónico en Labios",
        short:
          "Volumen, contorno e hidratación labial con resultados graduales y naturales.",
        duration: "30–45 min",
        recovery: "Posible inflamación leve 24–48 h.",
      }),
      build({
        slug: "marcaje-mandibular",
        name: "Marcaje Mandibular",
        short:
          "Definición del ángulo mandibular y contorno inferior del rostro con ácido hialurónico.",
        duration: "30–45 min",
      }),
      build({
        slug: "puntos-de-anclaje",
        name: "Puntos de Anclaje",
        short:
          "Soporte estructural en puntos estratégicos para lifting sutil sin cirugía.",
        duration: "45–60 min",
      }),
      build({
        slug: "hidratacion-profunda-acido-hialuronico",
        name: "Hidratación Profunda con Ácido Hialurónico",
        short:
          "Mejora de luminosidad, elasticidad y calidad de piel con hidratación dérmica.",
        duration: "30–45 min",
      }),
      build({
        slug: "bioestimulador-colageno",
        name: "Bioestimulador de Colágeno",
        short:
          "Estimula colágeno propio para firmeza y calidad de piel a mediano plazo.",
        duration: "45–60 min",
        sessions: "Protocolo de 1–3 sesiones según plan",
      }),
      build({
        slug: "skinbooster",
        name: "Skinbooster",
        short:
          "Microinyecciones de ácido hialurónico para hidratación profunda y glow natural.",
        duration: "30–45 min",
        sessions: "Protocolo inicial + mantenimiento",
      }),
    ],
  },
  {
    slug: "dermatologia-estetica",
    title: "Dermatología Estética",
    icon: "sparkles",
    short:
      "Procedimientos dermatológicos para lesiones benignas, manchas y uniformidad del tono.",
    long: `Dermatología estética en ${LIMA} con evaluación previa de cada lesión antes de retirar o tratar.`,
    treatments: [
      build({
        slug: "retiro-acrocordones",
        name: "Retiro de Acrocordones",
        short: "Eliminación médica de acrocordones en cuello, axilas u otras zonas indicadas.",
        duration: "15–40 min",
      }),
      build({
        slug: "retiro-verrugas",
        name: "Retiro de Verrugas",
        short: "Tratamiento de verrugas cutáneas según tipo y localización.",
        duration: "15–30 min",
      }),
      build({
        slug: "retiro-lunares",
        name: "Retiro de Lunares",
        short:
          "Evaluación dermatoscópica y retiro de lunares cuando está médicamente indicado.",
        whoFor: "Solo tras valoración dermatológica y criterio de seguridad.",
        duration: "20–45 min",
      }),
      build({
        slug: "retiro-manchas-pigmentadas",
        name: "Retiro de Manchas Pigmentadas",
        short: "Tratamiento focal de manchas con protocolo médico personalizado.",
        sessions: "Varias sesiones posibles",
      }),
      build({
        slug: "tratamiento-despigmentante",
        name: "Tratamiento Despigmentante",
        short:
          "Plan médico para uniformar tono y tratar hiperpigmentaciones seleccionadas.",
        sessions: "Protocolo progresivo + fotoprotección",
      }),
    ],
  },
  {
    slug: "faciales",
    title: "Faciales",
    icon: "sparkles",
    short: "Rituales faciales médicos y estéticos para purificar, renovar e iluminar la piel.",
    long: `Tratamientos faciales en ${LIMA} adaptados a tu tipo de piel y objetivos.`,
    treatments: [
      build({
        slug: "limpieza-facial-profunda",
        name: "Limpieza Facial Profunda",
        short:
          "Extracción, exfoliación e hidratación para poros congestionados y piel apagada.",
        duration: "60–75 min",
        sessions: "Mantenimiento mensual orientativo",
        priceFrom: "desde S/ 180",
      }),
      build({
        slug: "peeling-enzimatico",
        name: "Peeling Enzimático",
        short:
          "Renovación suave de la capa superficial con enzimas, ideal para piel sensible.",
        duration: "45–60 min",
        recovery: "Leve descamación posible 2–3 días.",
      }),
    ],
  },
  {
    slug: "tratamientos-corporales",
    title: "Tratamientos Corporales",
    icon: "body",
    short: "Protocolos corporales para textura, estrías y calidad de piel.",
    long: `Tratamientos corporales en ${LIMA} con tecnología y técnicas médico-estéticas.`,
    treatments: [
      build({
        slug: "enzimas-recombinantes-corporales",
        name: "Enzimas Recombinantes Corporales",
        short:
          "Reducción de adiposidad localizada y mejora de contorno con enzimas de alta pureza.",
        duration: "45–60 min",
        sessions: "Protocolo de varias sesiones",
      }),
      build({
        slug: "estrias-dermapen",
        name: "Tratamiento de Estrías con Dermapen",
        short:
          "Microneedling controlado para mejorar textura y color de estrías seleccionadas.",
        sessions: "4–6 sesiones orientativas",
        recovery: "Enrojecimiento 24–72 h.",
      }),
      build({
        slug: "estrias-fibroblast",
        name: "Tratamiento de Estrías con Fibroblast",
        short:
          "Técnica con plasma para estimular regeneración en estrías atróficas.",
        sessions: "Según evaluación",
        recovery: "Costras leves y cuidados específicos",
      }),
    ],
  },
  {
    slug: "tecnologia-laser",
    title: "Tecnología Láser",
    icon: "laser",
    short: "Depilación avanzada y tratamientos láser en piel y tatuajes.",
    long: `Tecnología láser en ${LIMA}: IPL, ND:YAG y atenuación de tatuajes con valoración de fototipo.`,
    treatments: [
      build({
        slug: "depilacion-ipl",
        name: "Depilación IPL",
        short:
          "Luz pulsada intensa para reducción progresiva del vello en zonas indicadas.",
        sessions: "6–10 sesiones orientativas",
        whoFor: "Según fototipo y zona; valoración obligatoria.",
      }),
      build({
        slug: "depilacion-nd-yag",
        name: "Depilación ND:YAG",
        short:
          "Láser de alta precisión, apto para diversos fototipos con enfriamiento de contacto.",
        sessions: "6–10 sesiones orientativas",
      }),
      build({
        slug: "atenuacion-tatuajes",
        name: "Atenuación de Tatuajes",
        short:
          "Sesiones láser progresivas para aclarar tatuajes según color y profundidad.",
        sessions: "Múltiples sesiones espaciadas",
        recovery: "Cuidado de la zona y fotoprotección estricta",
      }),
    ],
  },
  {
    slug: "paquetes-especiales",
    title: "Paquetes Especiales",
    icon: "sparkles",
    short: "Combinaciones premium con mejor condición frente a sesiones sueltas.",
    long: `Paquetes integrales en ${LIMA} diseñados para objetivos corporales concretos.`,
    treatments: [
      build({
        slug: "paquete-corporal-premium",
        name: "Paquete Corporal Premium",
        short:
          "Programa combinado: radiofrecuencia, drenaje linfático, enzimas recombinantes y maderoterapia abdominal.",
        long: `Paquete corporal premium en ${LIMA}. Incluye radiofrecuencia, drenaje linfático, enzimas recombinantes y maderoterapia abdominal en plan secuenciado tras valoración médica. No sustituye hábitos saludables; resultados variables.`,
        benefits: [
          "Radiofrecuencia para firmeza",
          "Drenaje linfático",
          "Enzimas recombinantes",
          "Maderoterapia abdominal",
        ],
        duration: "Sesiones de 60–90 min",
        sessions: "Plan de 6–10 sesiones orientativo",
        priceFrom: "Pack preferencial · consultar",
      }),
    ],
  },
];
