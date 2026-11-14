/**
 * Textos del mapa de palabras clave aprobado (12 de noviembre de 2026).
 * No añadir precios, cifras, técnicas ni promesas que ese documento no traiga.
 */
import type { FAQ } from "./treatments-catalog";

export const neighborPhrase =
  "a pocos minutos de Magdalena del Mar y Pueblo Libre";

export const attendNeighbors = `Atendemos en San Miguel, ${neighborPhrase}.`;

export type InternalLink = { href: string; label: string };

export type TreatmentNote = { heading: string; text: string };

export type TreatmentSeo = {
  title: string;
  description?: string;
  h1?: string;
  /** Sustituye la bajada del hero cuando el primer párrafo tiene que ser un texto concreto. */
  heroSubtitle?: string;
  lead?: string[];
  locationLine?: string;
  notes?: TreatmentNote[];
  faqs?: FAQ[];
  whatsappCta?: string;
  links?: InternalLink[];
};

const facial = "/tratamientos/medicina-estetica-facial";
const piel = "/tratamientos/cuidado-de-la-piel";
const laser = "/tratamientos/laser-y-depilacion";
const tratamientos = "/tratamientos";
const reservar = "/reservar";

export const homeSeo = {
  title: "Medicina estética en San Miguel | Dra. Melissa Vigo",
  description:
    "Consultorio de medicina estética en San Miguel, Lima. Dra. Melissa Vigo (CMP 101245): toxina botulínica, ácido hialurónico y cuidado de la piel.",
  h1: "Medicina estética en San Miguel",
  h2Location: "Cómo llegar a San Miguel",
  body: "El consultorio de la Dra. Melissa Vigo, médico cirujano (CMP 101245), está en Calle Manuel Pérez Oblitas 190, San Miguel, Lima, a pocos minutos de Magdalena del Mar y Pueblo Libre. En consulta se valoran opciones como toxina botulínica, ácido hialurónico, limpieza facial, cuidado de manchas y depilación, cuando están indicadas.",
};

export const tratamientosSeo = {
  title: "Tratamientos faciales en San Miguel | Dra. Melissa Vigo",
  description:
    "Catálogo de tratamientos faciales en San Miguel: toxina botulínica, ácido hialurónico, limpieza profunda, manchas y depilación. Valoración médica previa.",
  h1: "Tratamientos faciales en San Miguel",
  locationLine:
    "Atención en San Miguel, a pocos minutos de Magdalena del Mar y Pueblo Libre.",
  body: "Este es el listado de tratamientos faciales y de medicina estética que se ofrecen en el consultorio de San Miguel. La Dra. Melissa Vigo indica en consulta cuál es adecuado en cada caso. También atendemos a quienes nos visitan desde Magdalena del Mar o Pueblo Libre.",
  whatsappCta:
    "¿Quieres ver qué tratamiento puede ser adecuado para ti? Escríbenos por WhatsApp y coordinamos tu cita en San Miguel.",
  faqs: [
    {
      q: "¿Qué diferencia hay entre medicina estética facial y cuidado de la piel?",
      a: "Medicina estética facial agrupa toxina botulínica y ácido hialurónico. Cuidado de la piel agrupa limpiezas, despigmentante y procedimientos afines, según el catálogo.",
    },
    {
      q: "¿Puedo reservar si vivo en Pueblo Libre?",
      a: "Sí. La cita es en el consultorio de San Miguel.",
    },
    {
      q: "¿Los precios y tiempos del listado son definitivos?",
      a: "Son orientativos; se confirman en valoración.",
    },
  ] satisfies FAQ[],
  links: [
    { href: facial, label: "Medicina estética facial" },
    { href: piel, label: "Cuidado de la piel" },
    {
      href: "/tratamientos/tratamientos-corporales",
      label: "Tratamientos corporales",
    },
    { href: laser, label: "Láser y depilación" },
    {
      href: `${facial}/toxina-botulinica-facial`,
      label: "Toxina botulínica (bótox) en San Miguel",
    },
    { href: facial, label: "Ácido hialurónico en San Miguel" },
    {
      href: `${facial}/acido-hialuronico-labios`,
      label: "Ácido hialurónico: labios",
    },
    {
      href: `${facial}/acido-hialuronico-rinomodelacion-y-menton`,
      label: "Ácido hialurónico: rinomodelación y mentón",
    },
    {
      href: `${piel}/limpieza-facial-profunda`,
      label: "Limpieza facial profunda en San Miguel",
    },
    {
      href: `${piel}/despigmentante`,
      label: "Tratamiento facial para manchas en San Miguel",
    },
    {
      href: `${laser}/depilacion-ipl-o-diodo`,
      label: "Depilación IPL o diodo en San Miguel",
    },
    { href: reservar, label: "Reservar cita" },
  ] satisfies InternalLink[],
};

export type CategorySeo = {
  title: string;
  description: string;
  h1?: string;
  lead?: string;
  whatsappCta?: string;
  faqs?: FAQ[];
  links?: InternalLink[];
  groups?: { heading: string; slugs: string[] }[];
};

export const categorySeo: Record<string, CategorySeo> = {
  "medicina-estetica-facial": {
    title: "Ácido hialurónico en San Miguel | Dra. Melissa Vigo",
    description:
      "Ácido hialurónico en San Miguel: labios, rinomodelación, mentón, hidratación y contorno facial. La Dra. Melissa Vigo indica el tratamiento en consulta.",
    h1: "Ácido hialurónico y medicina estética facial",
    lead: "El ácido hialurónico se utiliza, cuando está indicado, para hidratar, aportar volumen o definir zonas del rostro. En este consultorio de San Miguel se valoran, entre otras, rinomodelación y mentón, labios, marcaje mandibular, hidratación profunda y puntos de anclaje. El producto, la zona y la cantidad se definen en la consulta presencial.",
    whatsappCta:
      "Escríbenos por WhatsApp para agendar una valoración de ácido hialurónico en San Miguel.",
    groups: [
      {
        heading: "Ácido hialurónico en San Miguel",
        slugs: [
          "acido-hialuronico-rinomodelacion-y-menton",
          "acido-hialuronico-labios",
          "marcaje-mandibular",
          "hidratacion-profunda-acido-hialuronico",
          "puntos-de-anclaje",
        ],
      },
      {
        heading: "Otros tratamientos de medicina estética facial",
        slugs: [
          "toxina-botulinica-facial",
          "bioestimulador-de-colageno",
          "skinbooster",
        ],
      },
    ],
    faqs: [
      {
        q: "¿El ácido hialurónico sirve para cualquier zona del rostro?",
        a: "No de forma automática. La indicación es individual.",
      },
      {
        q: "¿El efecto es inmediato?",
        a: "En la ficha de rinomodelación y mentón se indica que el efecto del producto es inmediato. Ese dato no se generaliza al resto de fichas de ácido hialurónico.",
      },
      {
        q: "¿Es lo mismo que la toxina botulínica?",
        a: "No. Son tratamientos distintos.",
      },
    ],
    links: [
      {
        href: `${facial}/acido-hialuronico-rinomodelacion-y-menton`,
        label: "Rinomodelación y mentón",
      },
      { href: `${facial}/acido-hialuronico-labios`, label: "Labios" },
      { href: `${facial}/marcaje-mandibular`, label: "Marcaje mandibular" },
      {
        href: `${facial}/hidratacion-profunda-acido-hialuronico`,
        label: "Hidratación profunda",
      },
      { href: `${facial}/puntos-de-anclaje`, label: "Puntos de anclaje" },
      {
        href: `${facial}/toxina-botulinica-facial`,
        label: "Toxina botulínica (bótox) en San Miguel",
      },
      { href: tratamientos, label: "Tratamientos faciales en San Miguel" },
      { href: reservar, label: "Reservar cita" },
    ],
  },
  "cuidado-de-la-piel": {
    title: "Cuidado de la piel en San Miguel | Dra. Melissa Vigo",
    description:
      "Cuidado de la piel en San Miguel: limpieza facial profunda, peeling enzimático, despigmentante y retiro de lesiones. Valoración con la Dra. Melissa Vigo.",
  },
  "laser-y-depilacion": {
    title: "Láser y depilación en San Miguel | Dra. Melissa Vigo",
    description:
      "Depilación IPL o diodo y atenuación de tatuajes con láser en San Miguel, Lima. La Dra. Melissa Vigo indica el tratamiento en consulta.",
  },
  "tratamientos-corporales": {
    title: "Tratamientos corporales en San Miguel | Dra. Melissa Vigo",
    description:
      "Enzimas recombinantes y tratamiento de estrías con Dermapen o Fibroblast, por zonas, en el consultorio de San Miguel.",
  },
};

const hubLink: InternalLink = {
  href: facial,
  label: "Ácido hialurónico en San Miguel",
};

export const treatmentSeo: Record<string, TreatmentSeo> = {
  "toxina-botulinica-facial": {
    title: "Toxina botulínica (bótox) en San Miguel | Dra. Melissa Vigo",
    description:
      "Toxina botulínica (bótox) en San Miguel, previa valoración de la Dra. Melissa Vigo. Si está indicado, se suavizan líneas de expresión. Consultorio en Lima.",
    h1: "Toxina botulínica (bótox) en San Miguel",
    lead: [
      "En el consultorio de San Miguel, la Dra. Melissa Vigo evalúa las líneas de expresión y, si está indicado, aplica toxina botulínica —el procedimiento que muchas personas buscan como bótox— en músculos seleccionados. Bótox es una marca comercial; el producto concreto se confirma en la valoración. También nos visitan pacientes de Pueblo Libre y distritos cercanos. El efecto descrito en el sitio tarda en promedio 15 días; la respuesta es individual.",
    ],
    locationLine: attendNeighbors,
    notes: [
      {
        heading: "Marca y producto",
        text: "La toxina botulínica —buscada a menudo como bótox— se valora en consulta. Bótox es una marca comercial; el producto y la indicación los confirma la Dra. Melissa Vigo en la valoración presencial.",
      },
    ],
    whatsappCta:
      "Escríbenos por WhatsApp para coordinar tu valoración de toxina botulínica en San Miguel.",
    faqs: [
      {
        q: "¿Bótox y toxina botulínica son lo mismo?",
        a: "Bótox es una marca comercial. El término genérico es toxina botulínica. El producto concreto se confirma en la valoración.",
      },
      {
        q: "¿Cuánto tarda en notarse el efecto?",
        a: "En esta ficha se indica un promedio de 15 días. La respuesta es individual. No se garantiza un plazo ni un resultado.",
      },
      {
        q: "¿Atienden consultas de Pueblo Libre?",
        a: "La atención es en San Miguel, a pocos minutos de Magdalena del Mar y Pueblo Libre.",
      },
    ],
    links: [
      hubLink,
      { href: tratamientos, label: "Tratamientos faciales en San Miguel" },
      { href: "/promociones", label: "Promociones para ti" },
      { href: reservar, label: "Reservar cita" },
      { href: "/nosotros", label: "Dra. Melissa Vigo" },
    ],
  },
  "limpieza-facial-profunda": {
    title: "Limpieza facial profunda en San Miguel | Dra. Melissa Vigo",
    description:
      "Limpieza facial profunda en San Miguel, con exfoliación y extracción cuando corresponda. Consultorio de la Dra. Melissa Vigo, cerca de Magdalena del Mar.",
    h1: "Limpieza facial profunda en San Miguel",
    lead: [
      "La limpieza facial profunda se realiza en el consultorio de San Miguel e incluye limpieza de la piel, exfoliación y extracción cuando corresponda, con productos calmantes e hidratantes. Quienes viven en Magdalena del Mar pueden llegar en pocos minutos. El tiempo publicado es de 60 a 75 minutos y puede variar según la valoración.",
    ],
    locationLine: attendNeighbors,
    whatsappCta:
      "Escríbenos por WhatsApp para agendar tu limpieza facial profunda en San Miguel.",
    faqs: [
      {
        q: "¿En qué consiste la limpieza facial profunda?",
        a: "Limpieza de la piel, exfoliación y extracción cuando corresponda.",
      },
      {
        q: "¿Es lo mismo que un peeling enzimático?",
        a: "No. Son fichas distintas.",
      },
      {
        q: "¿Puedo ir si estoy en Magdalena del Mar?",
        a: "Sí. La cita es en San Miguel, a pocos minutos de Magdalena del Mar y Pueblo Libre.",
      },
    ],
    links: [
      { href: piel, label: "Cuidado de la piel en San Miguel" },
      { href: `${piel}/peeling-enzimatico`, label: "Peeling enzimático" },
      {
        href: `${piel}/despigmentante`,
        label: "Tratamiento facial para manchas en San Miguel",
      },
      { href: tratamientos, label: "Tratamientos faciales en San Miguel" },
      { href: reservar, label: "Reservar cita" },
    ],
  },
  despigmentante: {
    title: "Tratamiento para manchas en San Miguel | Dra. Melissa Vigo",
    description:
      "Tratamiento facial para manchas en San Miguel. La Dra. Melissa Vigo evalúa tu tipo de piel y define el protocolo, que puede incluir mesoterapia.",
    h1: "Tratamiento facial para manchas en San Miguel",
    heroSubtitle:
      "El tratamiento facial para manchas, publicado como despigmentante, comienza con la evaluación de la mancha y del tipo de piel en el consultorio de San Miguel. El protocolo puede incluir productos tópicos o tecnología, según indicación, y contempla mesoterapia. No se adelanta un resultado ni un número de sesiones: eso se define en la valoración. Si la necesidad es retirar una lesión concreta, se valora el procedimiento de retiro de lesiones.",
    notes: [
      {
        heading: "Relación con otros tratamientos",
        text: "El retiro de lunares, verrugas o manchas pigmentadas es otro procedimiento (láser con anestesia local) y no es el mismo servicio que el despigmentante.",
      },
    ],
    whatsappCta:
      "Escríbenos por WhatsApp para coordinar una valoración de manchas en San Miguel.",
    faqs: [
      {
        q: "¿Qué incluye el tratamiento para manchas?",
        a: "Evaluación de la mancha y del tipo de piel. El protocolo puede incluir productos tópicos o tecnología, según indicación, y contempla mesoterapia.",
      },
      {
        q: "¿Es lo mismo que retirar una mancha pigmentada con láser?",
        a: "No. El retiro de lunares, verrugas o manchas pigmentadas es otro procedimiento, con láser y anestesia local.",
      },
      {
        q: "¿Cuántas sesiones voy a necesitar?",
        a: "No hay un número publicado. Se define en consulta.",
      },
    ],
    links: [
      {
        href: `${piel}/limpieza-facial-profunda`,
        label: "Limpieza facial profunda en San Miguel",
      },
      { href: `${piel}/peeling-enzimatico`, label: "Peeling enzimático" },
      {
        href: `${piel}/retiro-de-lesiones`,
        label: "Retiro de acrocordones, verrugas, lunares o manchas pigmentadas",
      },
      { href: piel, label: "Cuidado de la piel en San Miguel" },
      { href: reservar, label: "Reservar cita" },
    ],
  },
  "depilacion-ipl-o-diodo": {
    title: "Depilación IPL o diodo en San Miguel | Dra. Melissa Vigo",
    description:
      "Depilación con IPL o diodo en San Miguel, por zona. Incluye depilación facial y bikini anterior, previa valoración de la Dra. Melissa Vigo.",
    h1: "Depilación IPL o diodo en San Miguel",
    lead: [
      "La depilación se ofrece en el consultorio de San Miguel con IPL o diodo, por zona, previa valoración. El procedimiento publicado incluye limpieza, protección y aplicación de luz en la zona acordada, con opción de depilación facial y de zona bikini anterior. El número de sesiones y la respuesta de cada persona se definen en consulta.",
    ],
    whatsappCta:
      "Escríbenos por WhatsApp para agendar tu valoración de depilación en San Miguel.",
    faqs: [
      {
        q: "¿Qué zonas incluye?",
        a: "Depilación facial (bozo, patillas y zona mandibular) y zona bikini anterior. El precio es por zona.",
      },
      {
        q: "¿Es depilación láser?",
        a: "Se publica como IPL o diodo. No se afirma que todo el servicio sea láser.",
      },
      {
        q: "¿Cuántas sesiones se necesitan?",
        a: "No hay un número publicado. El número de sesiones y la respuesta de cada persona se definen en consulta.",
      },
    ],
    links: [
      { href: laser, label: "Láser y depilación en San Miguel" },
      {
        href: `${laser}/atenuacion-de-tatuajes-nd-yag`,
        label: "Atenuación de tatuajes con láser ND:YAG por zona",
      },
      { href: tratamientos, label: "Tratamientos faciales en San Miguel" },
      { href: reservar, label: "Reservar cita" },
    ],
  },
  "acido-hialuronico-rinomodelacion-y-menton": {
    title: "Rinomodelación y mentón en San Miguel | Dra. Vigo",
    links: [hubLink],
  },
  "acido-hialuronico-labios": {
    title: "Ácido hialurónico en labios | San Miguel",
    links: [hubLink],
  },
  "marcaje-mandibular": {
    title: "Marcaje mandibular en San Miguel | Dra. Vigo",
    links: [hubLink],
  },
  "hidratacion-profunda-acido-hialuronico": {
    title: "Hidratación profunda en San Miguel | Dra. Vigo",
    links: [hubLink],
  },
  "puntos-de-anclaje": {
    title: "Puntos de anclaje en San Miguel | Dra. Vigo",
    links: [hubLink],
  },
};

export const supportSeo = {
  nosotros: {
    title: "Sobre nosotros | Dra. Melissa Vigo en San Miguel",
    description:
      "La Dra. Melissa Vigo, médico cirujano (CMP 101245), atiende medicina estética en San Miguel, Lima, cerca de Magdalena del Mar y Pueblo Libre.",
  },
  reservar: {
    title: "Reservar cita en San Miguel | Dra. Melissa Vigo",
    description:
      "Reserva una cita en el consultorio de la Dra. Melissa Vigo en San Miguel, Lima. No es un diagnóstico en línea ni una cita confirmada.",
  },
  preguntas: {
    title: "Preguntas frecuentes | Dra. Melissa Vigo en San Miguel",
    description:
      "Dudas sobre valoración, tratamientos y cómo llegar al consultorio de la Dra. Melissa Vigo en San Miguel, Lima.",
  },
};
