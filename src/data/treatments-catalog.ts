/** Catálogo real de la Dra. Melissa Vigo. Tiempos y precios del listado entregado. */

export type FAQ = { q: string; a: string };

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  long: string;
  benefits: string[];
  whoFor: string;
  duration: string;
  /** Solo si el listado indica un dato de sesiones. No se inventan conteos. */
  sessions?: string;
  recovery?: string;
  priceFrom: string;
  /** Marcas de producto del listado, sin asteriscos, € ni “(S)”. */
  brands?: string;
  /** Condición comercial que sí figura en el listado. */
  offer?: string;
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

export const catalogIntro =
  "En la consulta, la Doctora revisa tus necesidades, explica el procedimiento recomendado y confirma si es adecuado para ti. Los tiempos son aproximados e incluyen la aplicación; pueden variar según la zona y la valoración.";

export const catalogDisclaimer =
  "Información orientativa. La indicación y el procedimiento se confirman en valoración médica.";

const SEPARA =
  "Separa tu cita con el 10% de tu procedimiento y obtén tu evaluación integral gratuita.";

const QUIEN =
  "La indicación la confirma la doctora en consulta. Este texto no sustituye una valoración presencial.";

function faqs(extra: FAQ[] = []): FAQ[] {
  return [
    ...extra,
    {
      q: "¿Los tiempos y el precio son cerrados?",
      a: "Los tiempos son aproximados e incluyen la aplicación; pueden variar según la zona y la valoración. El precio es el publicado en el listado de la doctora.",
    },
    {
      q: "¿Hace falta valoración previa?",
      a: "Sí. En la consulta, la doctora revisa tus necesidades, explica el procedimiento recomendado y confirma si es adecuado para ti.",
    },
  ];
}

export const categoriesFull: Category[] = [
  {
    slug: "medicina-estetica-facial",
    title: "Medicina estética facial",
    icon: "face",
    short:
      "Toxina botulínica, ácido hialurónico, bioestimulador de colágeno y skinbooster.",
    long: "Procedimientos faciales del listado de la Dra. Melissa Vigo: toxina botulínica y ácido hialurónico en las zonas indicadas, además de bioestimulador de colágeno y skinbooster.",
    treatments: [
      {
        slug: "toxina-botulinica-facial",
        name: "Toxina botulínica facial",
        short:
          "Evaluación de las líneas de expresión y, si está indicado, inyecciones en músculos seleccionados. El precio ya incluye la promoción 2x1 para los primeros 50 clientes.",
        long: `La doctora evalúa las líneas de expresión y, si está indicado, aplica pequeñas inyecciones en músculos seleccionados para suavizar su movimiento. El efecto del producto tarda en promedio 15 días. Promoción: los primeros 50 clientes obtienen 2x1. El precio de S/ 1,300 ya incluye esa promoción. ${SEPARA}`,
        benefits: [
          "Evaluación de las líneas de expresión",
          "Inyecciones en músculos seleccionados, si está indicado",
          "Efecto del producto en promedio a los 15 días",
        ],
        whoFor: QUIEN,
        duration: "15–20 min",
        priceFrom: "S/ 1,300",
        brands: "Reage® · Laboratorio Abbott",
        offer: `2x1 para los primeros 50 clientes, ya incluido en S/ 1,300. ${SEPARA}`,
        faq: faqs([
          {
            q: "¿El precio de S/ 1,300 es aparte de la promoción?",
            a: "No. S/ 1,300 ya incluye la promoción 2x1 para los primeros 50 clientes. Se separa la cita con el 10% del procedimiento y la evaluación integral es gratuita.",
          },
        ]),
      },
      {
        slug: "acido-hialuronico-rinomodelacion-y-menton",
        name: "Ácido hialurónico: rinomodelación y mentón",
        short:
          "Relleno en puntos seleccionados de nariz o mentón, tras valorar el perfil facial. El efecto del producto es inmediato.",
        long: `Tras valorar el perfil facial, se puede aplicar relleno en puntos seleccionados de nariz o mentón para mejorar contorno y proporción según el procedimiento. El efecto del producto es inmediato. ${SEPARA}`,
        benefits: [
          "Valoración del perfil facial",
          "Relleno en puntos seleccionados de nariz o mentón",
          "Efecto inmediato del producto",
        ],
        whoFor: QUIEN,
        duration: "35 min",
        priceFrom: "S/ 1,500",
        brands: "Neauvia®, Croma©",
        offer: SEPARA,
        faq: faqs(),
      },
      {
        slug: "acido-hialuronico-labios",
        name: "Ácido hialurónico: labios",
        short:
          "Conversación sobre el resultado deseado, evaluación de proporciones y relleno para definir o aportar volumen.",
        long: `La doctora conversa sobre el resultado deseado, evalúa proporciones y aplica el relleno para definir o aportar volumen de forma personalizada. ${SEPARA}`,
        benefits: [
          "Conversación sobre el resultado deseado",
          "Evaluación de proporciones",
          "Relleno para definir o aportar volumen",
        ],
        whoFor: QUIEN,
        duration: "35 min",
        priceFrom: "S/ 1,300",
        brands: "Neauvia®, Croma©",
        offer: SEPARA,
        faq: faqs(),
      },
      {
        slug: "marcaje-mandibular",
        name: "Marcaje mandibular con ácido hialurónico",
        short:
          "Revisión del contorno facial y relleno en zonas seleccionadas de la mandíbula para mejorar su definición.",
        long: "Se revisa el contorno facial y se aplica relleno en zonas seleccionadas de la mandíbula para mejorar su definición.",
        benefits: [
          "Revisión del contorno facial",
          "Relleno en zonas seleccionadas de la mandíbula",
        ],
        whoFor: QUIEN,
        duration: "35 min",
        priceFrom: "S/ 2,500",
        brands: "Neauvia®",
        faq: faqs(),
      },
      {
        slug: "hidratacion-profunda-acido-hialuronico",
        name: "Hidratación profunda con ácido hialurónico",
        short:
          "Valoración de la piel y pequeñas cantidades de producto en las zonas indicadas para hidratación y aspecto.",
        long: "Se valora la piel y se aplican pequeñas cantidades de producto en zonas indicadas para mejorar hidratación y aspecto de la piel.",
        benefits: [
          "Valoración de la piel",
          "Aplicación en las zonas indicadas",
          "Objetivo de hidratación y aspecto de la piel",
        ],
        whoFor: QUIEN,
        duration: "35 min",
        priceFrom: "S/ 1,500",
        brands: "Neauvia®, Croma©, Sciela",
        faq: faqs(),
      },
      {
        slug: "puntos-de-anclaje",
        name: "Puntos de anclaje con ácido hialurónico",
        short:
          "Evaluación del soporte facial y producto en puntos seleccionados para dar apoyo y armonizar el contorno.",
        long: "La doctora evalúa el soporte facial y aplica producto en puntos seleccionados para dar apoyo y armonizar el contorno.",
        benefits: [
          "Evaluación del soporte facial",
          "Producto en puntos seleccionados",
          "Apoyo y armonización del contorno",
        ],
        whoFor: QUIEN,
        duration: "35 min",
        priceFrom: "S/ 1,800",
        brands: "Neauvia®, Croma©",
        faq: faqs(),
      },
      {
        slug: "bioestimulador-de-colageno",
        name: "Bioestimulador de colágeno",
        short:
          "Tras evaluar la piel y el objetivo, aplicación en las zonas indicadas para una respuesta gradual de colágeno.",
        long: "Luego de evaluar la piel y el objetivo, se aplica el producto en las zonas indicadas para estimular una respuesta gradual de colágeno.",
        benefits: [
          "Evaluación de la piel y del objetivo",
          "Aplicación en las zonas indicadas",
          "Respuesta gradual de colágeno",
        ],
        whoFor: QUIEN,
        duration: "20–30 min",
        priceFrom: "S/ 1,900",
        brands: "Neauvia®, Radiesse®",
        faq: faqs(),
      },
      {
        slug: "skinbooster",
        name: "Skinbooster",
        short:
          "Aplicaciones superficiales y distribuidas para hidratar la piel y mejorar su aspecto. Producto e indicación se definen en consulta.",
        long: "Se realizan aplicaciones superficiales y distribuidas para hidratar la piel y mejorar su aspecto. La indicación y el producto se definen en consulta.",
        benefits: [
          "Aplicaciones superficiales y distribuidas",
          "Hidratación y aspecto de la piel",
          "Producto e indicación definidos en consulta",
        ],
        whoFor: QUIEN,
        duration: "30–45 min",
        priceFrom: "S/ 999",
        brands: "Neauvia®, Exel",
        faq: faqs(),
      },
    ],
  },
  {
    slug: "cuidado-de-la-piel",
    title: "Cuidado de la piel",
    icon: "sparkles",
    short:
      "Limpieza facial profunda, peeling enzimático, despigmentante y retiro de lesiones.",
    long: "Cuidados de piel del listado: limpieza facial profunda, peeling enzimático, despigmentante y retiro de acrocordones, verrugas, lunares o manchas pigmentadas.",
    treatments: [
      {
        slug: "limpieza-facial-profunda",
        name: "Limpieza facial profunda",
        short:
          "Limpieza de la piel, exfoliación y extracción cuando corresponda, con productos calmantes e hidratantes.",
        long: "Se limpia la piel, se realiza exfoliación y extracción cuando corresponda, y se aplican productos calmantes e hidratantes.",
        benefits: [
          "Limpieza de la piel",
          "Exfoliación y extracción cuando corresponda",
          "Productos calmantes e hidratantes",
        ],
        whoFor: QUIEN,
        duration: "60–75 min",
        priceFrom: "S/ 130",
        brands: "Neauvia®",
        faq: faqs(),
      },
      {
        slug: "peeling-enzimatico",
        name: "Peeling enzimático",
        short:
          "Limpieza de la piel, producto enzimático por el tiempo indicado, retiro y productos de cuidado.",
        long: "Se limpia la piel y se aplica un producto enzimático por el tiempo indicado; luego se retira y se colocan productos de cuidado.",
        benefits: [
          "Limpieza previa de la piel",
          "Producto enzimático por el tiempo indicado",
          "Retiro y productos de cuidado",
        ],
        whoFor: QUIEN,
        duration: "30–45 min",
        priceFrom: "S/ 280",
        brands: "Exel",
        faq: faqs(),
      },
      {
        slug: "despigmentante",
        name: "Despigmentante",
        short:
          "Evaluación de la mancha y del tipo de piel. El protocolo puede incluir productos tópicos o tecnología, según indicación. Incluye mesoterapia.",
        long: "Se evalúa la mancha y el tipo de piel; el protocolo puede incluir productos tópicos o tecnología, según indicación. Incluye mesoterapia.",
        benefits: [
          "Evaluación de la mancha y del tipo de piel",
          "Productos tópicos o tecnología, según indicación",
          "Mesoterapia",
        ],
        whoFor: QUIEN,
        duration: "15–60 min según zona",
        priceFrom: "S/ 100 por zona",
        faq: faqs(),
      },
      {
        slug: "retiro-de-lesiones",
        name: "Retiro de acrocordones, verrugas, lunares o manchas pigmentadas",
        short:
          "Examen de la lesión para ver si puede tratarse en consulta o si requiere evaluación adicional. Láser con anestesia local.",
        long: "Primero se examina la lesión para determinar si puede tratarse en consulta o requiere evaluación adicional. El método depende del diagnóstico. En el listado figura láser con anestesia local.",
        benefits: [
          "Examen de la lesión",
          "Criterio para tratar en consulta o pedir más evaluación",
          "Láser con anestesia local, según diagnóstico",
        ],
        whoFor: QUIEN,
        duration: "5–10 min",
        priceFrom: "S/ 450",
        faq: faqs([
          {
            q: "¿Toda lesión se retira en la misma consulta?",
            a: "No. Primero se examina la lesión. Puede tratarse en consulta o requerir evaluación adicional. El método depende del diagnóstico.",
          },
        ]),
      },
    ],
  },
  {
    slug: "tratamientos-corporales",
    title: "Tratamientos corporales",
    icon: "body",
    short:
      "Enzimas recombinantes y tratamiento de estrías con Dermapen o Fibroblast, por zonas.",
    long: "Procedimientos corporales del listado: enzimas recombinantes y tratamiento de estrías hipertróficas e hipotróficas con Dermapen o Fibroblast.",
    treatments: [
      {
        slug: "enzimas-recombinantes-corporales",
        name: "Enzimas recombinantes corporales",
        short:
          "Evaluación de la zona y del objetivo. Si es apropiado, aplicación del producto y explicación del seguimiento.",
        long: "Se evalúa la zona y el objetivo. Si es apropiado, la doctora aplica el producto en el área indicada y explica el seguimiento.",
        benefits: [
          "Evaluación de la zona y del objetivo",
          "Aplicación en el área indicada, si es apropiado",
          "Explicación del seguimiento",
        ],
        whoFor: QUIEN,
        duration: "45–60 min",
        priceFrom: "S/ 999",
        brands: "Sciela",
        faq: faqs(),
      },
      {
        slug: "estrias-dermapen",
        name: "Tratamiento de estrías con Dermapen por zonas",
        short:
          "Limpieza de la zona, microcanales controlados con Dermapen, productos indicados y cuidados posteriores. Estrías hipertróficas e hipotróficas.",
        long: "Se limpia la zona y se realizan microcanales controlados con Dermapen; después se aplican productos indicados y cuidados posteriores. Aplica a estrías hipertróficas e hipotróficas.",
        benefits: [
          "Limpieza de la zona",
          "Microcanales controlados con Dermapen",
          "Productos indicados y cuidados posteriores",
        ],
        whoFor: QUIEN,
        duration: "45–60 min",
        priceFrom: "S/ 320",
        brands: "Dermapen",
        faq: faqs([
          {
            q: "¿Qué tipo de estrías contempla el listado?",
            a: "Hipertróficas e hipotróficas. La indicación se confirma en valoración.",
          },
        ]),
      },
      {
        slug: "estrias-fibroblast",
        name: "Tratamiento de estrías con Fibroblast por zonas",
        short:
          "Evaluación de la zona y procedimiento con equipo de plasma superficial si la doctora confirma que es adecuado.",
        long: "Se evalúa la zona y se realiza el procedimiento con equipo de plasma superficial si la doctora confirma que es adecuado. La técnica indicada es Fibroblast; el equipo y la marca concreta no están especificados en el listado.",
        benefits: [
          "Evaluación de la zona",
          "Plasma superficial si la doctora lo confirma",
          "Técnica Fibroblast",
        ],
        whoFor: QUIEN,
        duration: "60–90 min",
        priceFrom: "S/ 320",
        brands: "Fibroblast",
        faq: faqs(),
      },
    ],
  },
  {
    slug: "laser-y-depilacion",
    title: "Láser y depilación",
    icon: "laser",
    short:
      "Atenuación de tatuajes con láser ND:YAG y depilación con IPL o diodo, por zona.",
    long: "Láser y luz del listado: atenuación de tatuajes con ND:YAG por zona y depilación con IPL o diodo por zona, incluida la depilación facial y la zona bikini anterior.",
    treatments: [
      {
        slug: "atenuacion-de-tatuajes-nd-yag",
        name: "Atenuación de tatuajes con láser ND:YAG por zona",
        short:
          "Protección de la piel y láser sobre la zona del tatuaje. Tamaño máximo de 5 centímetros. Sesiones y respuesta según valoración.",
        long: "Se protege la piel y se dirige el láser a la zona del tatuaje. El número de sesiones y la respuesta dependen de la valoración. El listado considera un tamaño máximo de 5 centímetros. El equipo y la marca del láser no están especificados.",
        benefits: [
          "Protección de la piel",
          "Láser dirigido a la zona del tatuaje",
          "Tamaño máximo de 5 centímetros en el listado",
        ],
        whoFor: QUIEN,
        duration: "15–30 min por sesión",
        priceFrom: "S/ 100 por zona",
        faq: faqs([
          {
            q: "¿Cuántas sesiones hacen falta?",
            a: "El listado no fija un número. El número de sesiones y la respuesta dependen de la valoración.",
          },
        ]),
      },
      {
        slug: "depilacion-ipl-o-diodo",
        name: "Depilación IPL o diodo, por zona",
        short:
          "Limpieza, protección y luz pulsada en la zona acordada. Incluye depilación facial (bozo, patillas y zona mandibular) y zona bikini anterior.",
        long: "Se limpia y protege el área; se aplica luz pulsada en la zona acordada para reducir progresivamente el vello. Incluye depilación facial (bozo, patillas y zona mandibular) y depilación de zona bikini (zona anterior).",
        benefits: [
          "Limpieza y protección del área",
          "Luz pulsada en la zona acordada",
          "Depilación facial y zona bikini anterior",
        ],
        whoFor: QUIEN,
        duration: "15–60 min según zona",
        priceFrom: "S/ 100 por zona",
        faq: faqs([
          {
            q: "¿Qué zonas nombra el listado?",
            a: "Depilación facial (bozo, patillas y zona mandibular) y depilación de zona bikini (zona anterior). El precio publicado es por zona.",
          },
        ]),
      },
    ],
  },
];
