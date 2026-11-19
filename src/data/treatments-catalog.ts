/** Catálogo real de la Dra. Melissa Vigo. Tiempos y precios del listado entregado. */

export type FAQ = { q: string; a: string };

export type Treatment = {
  slug: string;
  name: string;
  /** Texto de la tarjeta. No reemplaza `short`, que sigue usándose como meta. */
  cardText: string;
  short: string;
  long: string;
  benefits: string[];
  whoFor: string;
  duration: string;
  /** Solo si el listado indica un dato de sesiones. No se inventan conteos. */
  sessions?: string;
  /** Controles que el listado describe después de la aplicación. */
  followUp?: string[];
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
  "En la consulta, la doctora revisa tus necesidades, explica el procedimiento recomendado y confirma si es adecuado para ti.";

export const catalogDisclaimer =
  "Información orientativa. La indicación y el procedimiento se confirman en valoración médica.";

const ANTICIPO =
  "Para garantizar tu atención personalizada, tu cita se confirma con el anticipo del 20%. El monto se descuenta del total de tu procedimiento, que incluye la evaluación especializada y la aplicación por el especialista.";

const DUO =
  "Promoción 2x1. Experiencia exclusiva para nuestros pacientes: Dúo perfecto (toxina botulínica para ti y tu acompañante).";

const SEGUIMIENTO = [
  "Control a las 24–48 horas para verificar tu evolución.",
  "Control a los 7 días para evaluar tu resultado.",
  "Control a los 15 días para retoque, si es necesario.",
  "Acompañamiento por WhatsApp para resolver tus dudas.",
];

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
      a: "Sí. Recibe una evaluación personalizada según tus necesidades y objetivos. En la consulta se explica el procedimiento recomendado y se confirma si es adecuado.",
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
        cardText:
          "Suaviza las líneas de expresión con pequeñas inyecciones en músculos seleccionados, si está indicado. El efecto tarda en promedio 15 días.",
        short:
          "Evaluación de las líneas de expresión y, si está indicado, inyecciones en músculos seleccionados. Incluye la promoción 2x1, el dúo perfecto para ti y tu acompañante.",
        long: `La doctora evalúa las líneas de expresión y, si está indicado, aplica pequeñas inyecciones en músculos seleccionados para suavizar su movimiento. El efecto del producto tarda en promedio 15 días. ${DUO}`,
        benefits: [
          "Evaluación de las líneas de expresión",
          "Inyecciones en músculos seleccionados, si está indicado",
          "Efecto del producto en promedio a los 15 días",
          "Promoción 2x1 para ti y tu acompañante",
        ],
        whoFor: QUIEN,
        duration: "15–25 min",
        priceFrom: "S/ 1,300",
        brands: "Reage® · Laboratorio Abbott",
        offer: `${DUO} ${ANTICIPO}`,
        faq: faqs([
          {
            q: "¿En qué consiste la promoción 2x1?",
            a: "Es el dúo perfecto: toxina botulínica para ti y tu acompañante. La cita se confirma con el anticipo del 20%, que se descuenta del total del procedimiento. Ese total incluye la evaluación especializada y la aplicación por el especialista.",
          },
        ]),
      },
      {
        slug: "acido-hialuronico-rinomodelacion-y-menton",
        name: "Ácido hialurónico: rinomodelación y mentón",
        cardText:
          "Define con suavidad la nariz y proyecta el mentón para un perfil más equilibrado, con resultado inmediato y aspecto natural.",
        short:
          "Rinomodelación y mentón sin cirugía: un perfil más equilibrado, con resultado inmediato, aspecto natural y seguimiento postaplicación.",
        long: "Un toque sutil que realza tu belleza natural, sin cirugía y sin cambiar quién eres. Definimos suavemente tu nariz y proyectamos tu mentón para lograr un perfil más equilibrado y delicado. Es un procedimiento rápido, con resultados inmediatos y un aspecto natural. Porque tu rostro merece verse en armonía, no transformado. Te acompañamos en todo el proceso. Tu experiencia incluye seguimiento personalizado postaplicación. «No solo te aplicamos, te cuidamos».",
        benefits: [
          "Definición suave de la nariz y proyección del mentón",
          "Resultado inmediato y aspecto natural",
          "Sin cirugía",
          "Seguimiento personalizado postaplicación",
        ],
        whoFor: QUIEN,
        duration: "20–35 min",
        followUp: SEGUIMIENTO,
        priceFrom: "S/ 1,500",
        brands: "Neauvia®, Croma©",
        offer: ANTICIPO,
        faq: faqs(),
      },
      {
        slug: "acido-hialuronico-labios",
        name: "Ácido hialurónico: labios",
        cardText:
          "Realza el contorno, la hidratación y la simetría de los labios, con un resultado natural y efecto inmediato.",
        short:
          "Labios hidratados y definidos con ácido hialurónico, respetando la anatomía. Efecto inmediato y seguimiento postaplicación.",
        long: "Labios suaves, hidratados y naturalmente definidos, sin perder tu naturalidad. Realzamos el contorno, la hidratación y la simetría de tus labios con ácido hialurónico de alta calidad, respetando siempre la anatomía y la delicadeza de tu rostro. El resultado es natural, elegante y con efecto inmediato. El procedimiento es ambulatorio y lo realiza el especialista. Porque la belleza está en los detalles más sutiles. Tu cuidado no termina en la aplicación: te acompañamos en todo el proceso, con seguimiento personalizado postaplicación. Tu tranquilidad es parte de tu resultado.",
        benefits: [
          "Contorno, hidratación y simetría de los labios",
          "Resultado natural, con efecto inmediato",
          "Procedimiento ambulatorio",
          "Seguimiento personalizado postaplicación",
        ],
        whoFor: QUIEN,
        duration: "30–45 min",
        followUp: SEGUIMIENTO,
        priceFrom: "S/ 1,300",
        brands: "Neauvia®, Croma©",
        offer: ANTICIPO,
        faq: faqs(),
      },
      {
        slug: "marcaje-mandibular",
        name: "Marcaje mandibular con ácido hialurónico",
        cardText:
          "Estiliza la línea mandibular y puede proyectar el mentón, con un enfoque distinto para rasgos femeninos o masculinos.",
        short:
          "Marcaje mandibular no quirúrgico para definir el óvalo facial, con seguimiento postaplicación y control presencial el día 14.",
        long: "Este tratamiento no quirúrgico permite corregir la pérdida de volumen óseo asociada al paso del tiempo, suavizar la apariencia de la papada o proyectar la mandíbula para lograr un perfil estructurado y simétrico. En el rostro femenino, se busca estilizar con sutileza la línea mandibular y proyectar el mentón para destacar la elegancia del óvalo facial, manteniendo la suavidad, la delicadeza y la naturalidad de los rasgos. En el masculino, se orienta hacia una estructura más recta, angulada y definida, aportando firmeza a la línea maxilar y reforzando la masculinidad del rostro de manera equilibrada. La evaluación de control del día 14 es una cita presencial para valorar la integración del tejido, verificar la simetría y realizar un retoque de precisión si se considera clínicamente oportuno. Te acompañamos en todo el proceso, con seguimiento personalizado postaplicación.",
        benefits: [
          "Definición de la línea mandibular y del óvalo facial",
          "Enfoque distinto para rasgos femeninos o masculinos",
          "Control presencial el día 14",
          "Seguimiento personalizado postaplicación",
        ],
        whoFor: QUIEN,
        duration: "35–55 min",
        followUp: [
          "Evaluación de control el día 14: cita presencial para valorar la integración del tejido, verificar la simetría y realizar un retoque de precisión si se considera clínicamente oportuno.",
          ...SEGUIMIENTO,
        ],
        priceFrom: "S/ 2,500",
        brands: "Neauvia®",
        offer: ANTICIPO,
        faq: faqs(),
      },
      {
        slug: "hidratacion-profunda-acido-hialuronico",
        name: "Hidratación profunda con ácido hialurónico",
        cardText:
          "Restaura vitalidad, elasticidad y firmeza desde las capas más profundas, para un rostro más fresco y terso.",
        short:
          "Hidratación profunda con ácido hialurónico para damas y caballeros: vitalidad, elasticidad y un aspecto más fresco.",
        long: "Revela la luminosidad natural de tu piel con la hidratación profunda con ácido hialurónico. Está pensado para damas y caballeros que valoran el cuidado de la piel: restaura la vitalidad, la elasticidad y la firmeza desde las capas más profundas. Mediante una infusión de alta pureza se nutren y revitalizan los tejidos, se atenúan las líneas de expresión y el rostro recupera un aspecto fresco, terso y sobrio.",
        benefits: [
          "Hidratación desde las capas más profundas",
          "Vitalidad, elasticidad y firmeza",
          "Atenuación de las líneas de expresión",
          "Indicado para damas y caballeros",
        ],
        whoFor: QUIEN,
        duration: "25–45 min",
        priceFrom: "S/ 1,500",
        brands: "Neauvia®, Croma©, Ruspharma",
        faq: faqs(),
      },
      {
        slug: "puntos-de-anclaje",
        name: "Puntos de anclaje con ácido hialurónico",
        cardText:
          "Microinyecciones en puntos de soporte para restaurar tono, firmeza y estructura, con un efecto tensor sutil.",
        short:
          "Puntos de anclaje en pómulos, marco mandibular y mentón para devolver soporte al rostro sin restar expresividad.",
        long: "El tratamiento de puntos de anclaje con ácido hialurónico es un procedimiento de rejuvenecimiento y redefinición facial pensado para restaurar el tono, la firmeza y la estructura natural del rostro, respetando la armonía y la anatomía de cada persona. Mediante microinyecciones en vectores de soporte —como los pómulos, el marco mandibular y el mentón— busca un efecto tensor de sustentación sin restar expresividad ni naturalidad. En el rostro femenino acentúa la delicadeza del contorno y suaviza las líneas de expresión; en el masculino proyecta ángulos definidos, estructura y definición de manera sobria.",
        benefits: [
          "Soporte en pómulos, marco mandibular y mentón",
          "Efecto tensor sin restar expresividad",
          "Enfoque distinto para el rostro femenino o masculino",
        ],
        whoFor: QUIEN,
        duration: "35–55 min",
        priceFrom: "S/ 1,800",
        brands: "Neauvia®, Croma©",
        faq: faqs(),
      },
      {
        slug: "bioestimulador-de-colageno",
        name: "Bioestimulador de colágeno",
        cardText:
          "Estimula tu propio colágeno para recuperar densidad y firmeza de forma gradual. Los resultados parten de los 21 días.",
        short:
          "Bioestimulación de colágeno en las capas profundas de la piel. Resultados a partir de 21 días, con seguimiento durante el proceso.",
        long: "El bioestimulador de colágeno está pensado para hombres y mujeres que desean rejuvenecer el rostro sin perder la esencia de sus facciones ni su naturalidad. A diferencia de las soluciones temporales, actúa desde las capas más profundas y estimula la producción propia de colágeno para restaurar de forma gradual la densidad, la elasticidad y la tersura del tejido. Cada aplicación se realiza con precisión. Al revitalizar la estructura interna de la piel, el rostro puede recobrar un aspecto más fresco. Los resultados parten de los 21 días y el paciente tiene seguimiento durante el proceso.",
        benefits: [
          "Estímulo de la producción propia de colágeno",
          "Densidad, elasticidad y tersura de forma gradual",
          "Resultados a partir de 21 días",
          "Seguimiento durante el proceso",
        ],
        whoFor: QUIEN,
        duration: "20–30 min",
        priceFrom: "S/ 1,900",
        brands: "Neauvia®, Radiesse®",
        faq: faqs([
          {
            q: "¿Cuándo pueden notarse los resultados?",
            a: "El listado indica resultados a partir de 21 días. La respuesta es individual y no está garantizada.",
          },
        ]),
      },
      {
        slug: "skinbooster",
        name: "Skinbooster",
        cardText:
          "Aplicaciones superficiales para hidratar la piel y mejorar su aspecto. El producto se define en consulta.",
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
      "Limpieza facial profunda, peeling enzimático, despigmentante y PlasmaPen.",
    long: "Cuidados de piel del listado: limpieza facial profunda, peeling enzimático, despigmentante y PlasmaPen para el retiro de acrocordones, verrugas, lunares o manchas pigmentadas.",
    treatments: [
      {
        slug: "limpieza-facial-profunda",
        name: "Limpieza facial profunda",
        cardText:
          "Protocolo de higiene facial que purifica los poros y restaura la vitalidad de la piel, adaptado a cada rostro.",
        short:
          "Higiene facial profunda para piel femenina o masculina: purifica los poros y deja el cutis más fresco y equilibrado.",
        long: "La higiene facial profunda está pensada tanto para la piel femenina como para la masculina, y adapta cada etapa a las necesidades del rostro. El protocolo purifica los poros, desintoxica el tejido y restaura la vitalidad natural de la piel. El resultado que describe el listado es un cutis visiblemente renovado, fresco y equilibrado.",
        benefits: [
          "Protocolo adaptado a piel femenina o masculina",
          "Purificación de los poros",
          "Piel más fresca y equilibrada",
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
        cardText:
          "Producto enzimático para homogeneizar el rostro y uniformar el color, sin irritar la piel.",
        short:
          "Peeling enzimático para aclarar y uniformar el color del rostro. El listado propone 4 sesiones semanales y luego 1 cada 15 días durante 1 mes.",
        long: "Se limpia la piel y se aplica un producto enzimático como parte del protocolo, durante el tiempo indicado. Luego se retira y se colocan productos de cuidado, sin irritar la piel, para conseguir homogeneidad en el rostro, aclarando y uniformando el color. El listado propone 4 sesiones semanales y, después, 1 sesión cada 15 días durante 1 mes.",
        benefits: [
          "Producto enzimático por el tiempo indicado",
          "Homogeneidad del color, sin irritar la piel",
          "Productos de cuidado al finalizar",
        ],
        whoFor: QUIEN,
        duration: "45–55 min",
        sessions:
          "4 sesiones semanales y, luego, 1 sesión cada 15 días durante 1 mes",
        priceFrom: "S/ 150",
        brands: "Exel",
        faq: faqs([
          {
            q: "¿Cuántas sesiones indica el listado?",
            a: "4 sesiones semanales y, luego, 1 sesión cada 15 días durante 1 mes. La indicación se confirma en valoración.",
          },
        ]),
      },
      {
        slug: "despigmentante",
        name: "Despigmentante",
        cardText:
          "Evalúa la mancha y el tipo de piel. El protocolo puede incluir productos tópicos, tecnología o mesoterapia.",
        short:
          "Evaluación de la mancha y del tipo de piel. El protocolo puede incluir productos tópicos o tecnología, según indicación. Incluye mesoterapia.",
        long: "Se evalúa la mancha y el tipo de piel. El protocolo puede incluir productos tópicos o tecnología, según indicación, e incluye mesoterapia.",
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
        name: "PlasmaPen (retiro de acrocordones, verrugas, lunares o manchas pigmentadas)",
        cardText:
          "Primero se examina la lesión. Si puede tratarse en consulta, el método de extracción depende del diagnóstico.",
        short:
          "PlasmaPen para acrocordones, verrugas, lunares o manchas pigmentadas. Primero se examina la lesión. El listado indica láser con anestesia local.",
        long: "Primero se examina la lesión para determinar si puede tratarse en consulta o si requiere evaluación adicional. El método de extracción depende del diagnóstico. En el listado, este procedimiento figura como PlasmaPen y el producto indicado es láser con anestesia local.",
        benefits: [
          "Examen de la lesión antes de decidir",
          "Criterio para tratar en consulta o pedir más evaluación",
          "Láser con anestesia local, según diagnóstico",
        ],
        whoFor: QUIEN,
        duration: "5–10 min",
        priceFrom: "S/ 450",
        brands: "Láser con anestesia local",
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
        cardText:
          "Se evalúa la zona y, si es apropiado, se aplica el producto y se explica el seguimiento.",
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
        cardText:
          "Microcanales controlados con Dermapen para estrías hipertróficas e hipotróficas, por zonas.",
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
        cardText:
          "Plasma superficial en la zona de las estrías, si la doctora confirma que es adecuado.",
        short:
          "Evaluación de la zona y procedimiento con equipo de plasma superficial si la doctora confirma que es adecuado.",
        long: "Se evalúa la zona y se realiza el procedimiento con equipo de plasma superficial si la doctora confirma que es adecuado. La técnica indicada es Fibroblast; el equipo concreto no está especificado en el listado.",
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
        cardText:
          "Láser sobre el tatuaje, hasta 5 cm. Los cambios pueden notarse desde la primera sesión; las sesiones dependen de la valoración.",
        short:
          "Protección de la piel y láser sobre la zona del tatuaje. Tamaño máximo de 5 centímetros. El listado indica que pueden verse cambios notorios desde la primera sesión.",
        long: "Se protege la piel y se dirige el láser a la zona del tatuaje. El número de sesiones y la respuesta dependen de la valoración. El listado considera un tamaño máximo de 5 centímetros y señala que se podrán visualizar cambios notorios desde la primera sesión. El equipo y la marca del láser no están especificados.",
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
            a: "El listado no fija un número. El número de sesiones y la respuesta dependen de la valoración. Sí indica que pueden visualizarse cambios notorios desde la primera sesión.",
          },
        ]),
      },
      {
        slug: "depilacion-ipl-o-diodo",
        name: "Depilación IPL o diodo, por zona",
        cardText:
          "Luz pulsada para reducir el vello de forma progresiva. Incluye rostro y zona bikini anterior.",
        short:
          "Limpieza, protección y luz pulsada (IPL o diodo) en la zona acordada. Incluye depilación facial (bozo, patillas y zona mandibular) y zona bikini anterior.",
        long: "Se limpia y protege el área; se aplica luz pulsada (IPL o diodo) en la zona acordada para reducir progresivamente el vello. Incluye depilación facial (bozo, patillas y zona mandibular) y depilación de zona bikini (zona anterior).",
        benefits: [
          "Limpieza y protección del área",
          "Luz pulsada (IPL o diodo) en la zona acordada",
          "Depilación facial y zona bikini anterior",
        ],
        whoFor: QUIEN,
        duration: "15–60 min según zona",
        priceFrom: "S/ 100 por zona",
        faq: faqs([
          {
            q: "¿Qué zonas nombra el listado?",
            a: "Depilación facial (bozo, patillas y zona mandibular) y depilación de zona bikini (zona anterior).",
          },
        ]),
      },
    ],
  },
];
