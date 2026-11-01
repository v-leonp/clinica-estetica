// ---------------------------------------------------------------------------
// Lumina Estética — single source of truth for all editorial content.
// Marca, teléfonos, direcciones, promociones, tratamientos y testimonios son
// completamente ficticios con fines demostrativos.
// ---------------------------------------------------------------------------

export const site = {
  brand: "Lumina Estética",
  tagline: "Medicina estética y cirugía plástica en Lima",
  description:
    "Clínica de medicina estética y cirugía plástica en Lima. Tratamientos faciales, corporales, depilación láser y cirugía estética con tecnología de alta gama y médicos certificados.",
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
  whatsappDisplay: "+51 999 000 111",
  whatsappNumber: "51999000111",
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

// Legacy single-URL export was removed. Use `getSiteUrl()` from
// src/lib/site-url.ts for anything that needs the canonical origin.

// ---- Hero / shared blocks -------------------------------------------------

export const hero = {
  eyebrow: "Clínica supervisada • Lima, Perú",
  title: "Realza tu belleza natural con medicina estética de alta gama",
  subtitle:
    "Más de 12 años acompañando a nuestras pacientes con tratamientos faciales, corporales y cirugía plástica realizados por médicos certificados en un entorno cálido y seguro.",
  ctaPrimary: { label: "Agenda tu consulta", href: "/contacto" },
  ctaSecondary: {
    label: "Conoce nuestros tratamientos",
    href: "/tratamientos",
  },
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

// ---- Catalog --------------------------------------------------------------

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

export const categoriesFull: Category[] = [
  {
    slug: "limpiezas-faciales",
    title: "Limpiezas faciales",
    icon: "sparkles",
    short:
      "Rutinas profundas de limpieza, exfoliación e hidratación para una piel luminosa y equilibrada.",
    long: "Nuestras limpiezas faciales están diseñadas para purificar la piel en profundidad, equilibrar la producción de sebo y preparar el rostro para rutinas de cuidado más avanzadas. Cada protocolo se adapta al tipo de piel y a las necesidades de cada paciente.",
    treatments: [
      {
        slug: "limpieza-facial-profunda",
        name: "Limpieza facial profunda",
        short:
          "Protocolo clásico de limpieza, extracción y mascarilla calmante para pieles con poros congestionados.",
        long: "Un ritual completo que incluye higiene con limpiador adecuado al tipo de piel, exfoliación enzimática, vapor ozonizado, extracción manual asistida y una mascarilla calmante para cerrar los poros y dejar la piel luminosa.",
        benefits: [
          "Reduce puntos negros y comedones",
          "Equilibra la producción de sebo",
          "Mejora la textura y la luminosidad",
          "Prepara la piel para tratamientos posteriores",
        ],
        whoFor:
          "Ideal para pieles mixtas, grasas o congestionadas que buscan una base de cuidado mensual.",
        duration: "60 min",
        sessions: "1 sesión mensual recomendada",
        recovery: "Sin tiempo de recuperación. Evita exposición solar directa por 24 h.",
        priceFrom: "desde S/ 180",
        faq: [
          {
            q: "¿Con qué frecuencia debo hacerme una limpieza facial?",
            a: "Lo recomendable es una vez al mes para mantener la piel equilibrada, aunque esto se ajusta según tu tipo de piel.",
          },
          {
            q: "¿Es doloroso?",
            a: "La extracción puede ser levemente molesta en zonas con muchos comedones, pero no es dolorosa. Trabajamos con técnica controlada.",
          },
        ],
      },
      {
        slug: "hydraglow-facial",
        name: "HydraGlow Facial",
        short:
          "Hidratación profunda, limpieza y luminosidad instantánea con tecnología de infusión.",
        long: "El HydraGlow combina limpieza en vórtex, exfoliación suave, extracción al vacío y una infusión de sérums personalizados. El resultado es piel radiante desde la primera sesión, sin irritación ni downtime.",
        benefits: [
          "Hidratación intensa",
          "Luminosidad visible desde la primera sesión",
          "Mejora la apariencia de poros",
          "Suaviza líneas finas",
        ],
        whoFor:
          "Todos los tipos de piel, incluyendo pieles sensibles y pre-eventos sociales.",
        duration: "60 min",
        sessions: "1 sesión al mes como mantenimiento",
        recovery: "Ninguno. Puedes maquillarte el mismo día.",
        priceFrom: "desde S/ 290",
        faq: [
          {
            q: "¿Cuándo veré los resultados?",
            a: "Al terminar la sesión notarás la piel más hidratada y luminosa. El efecto se potencia con sesiones mensuales.",
          },
          {
            q: "¿Puedo hacerlo antes de un evento?",
            a: "Sí, es ideal para eventos. Recomendamos hacerlo entre 24 y 48 horas antes.",
          },
        ],
      },
      {
        slug: "alta-frecuencia",
        name: "Limpieza con alta frecuencia",
        short:
          "Protocolo con corriente de alta frecuencia para pieles con tendencia acneica.",
        long: "Combinamos limpieza profunda con la aplicación controlada de corriente de alta frecuencia para desinfectar, calmar inflamaciones y acelerar la reparación de la piel con acné activo.",
        benefits: [
          "Acción bactericida sobre la piel",
          "Reduce inflamación de brotes",
          "Acelera la cicatrización",
          "Oxigena los tejidos",
        ],
        whoFor:
          "Pieles con tendencia acneica, brotes hormonales o rosácea leve.",
        duration: "70 min",
        sessions: "Protocolo de 4 sesiones quincenales",
        recovery:
          "Ligero enrojecimiento que desaparece en pocas horas. Protector solar obligatorio.",
        priceFrom: "desde S/ 220",
        faq: [
          {
            q: "¿Puedo combinarlo con mi tratamiento dermatológico?",
            a: "Sí, lo adaptamos a tu rutina y, de ser necesario, coordinamos con tu dermatóloga.",
          },
          {
            q: "¿Elimina las cicatrices del acné?",
            a: "Las atenúa y mejora la textura; para cicatrices marcadas combinamos con peeling o radiofrecuencia.",
          },
        ],
      },
      {
        slug: "punta-diamante",
        name: "Dermolimpieza con punta de diamante",
        short:
          "Microdermabrasión suave para renovar la capa superficial y pulir la textura.",
        long: "Una exfoliación mecánica controlada con punta de diamante que remueve células muertas, mejora la textura, atenúa manchas superficiales y potencia la absorción de activos.",
        benefits: [
          "Piel más suave al tacto",
          "Mejora la luminosidad",
          "Reduce manchas superficiales",
          "Potencia la absorción de activos",
        ],
        whoFor:
          "Pieles opacas, con poros dilatados o textura irregular. Evitar en acné activo severo.",
        duration: "50 min",
        sessions: "Protocolo de 3 a 5 sesiones mensuales",
        recovery:
          "Sin downtime. Posible sensación de piel más sensible por 24 h.",
        priceFrom: "desde S/ 240",
        faq: [
          {
            q: "¿Es seguro para todas las pieles?",
            a: "La intensidad se gradúa, por lo que es seguro para la mayoría de las pieles. Se evalúa en consulta.",
          },
          {
            q: "¿Se puede hacer en verano?",
            a: "Sí, siempre con protector solar diario y evitando exposición directa inmediata.",
          },
        ],
      },
    ],
  },
  {
    slug: "tratamientos-faciales",
    title: "Tratamientos faciales",
    icon: "face",
    short:
      "Rejuvenecimiento, firmeza y luminosidad con protocolos personalizados según tu tipo de piel.",
    long: "Protocolos de medicina estética facial para prevenir y tratar signos de envejecimiento, mejorar la firmeza, suavizar líneas de expresión y devolver la luminosidad natural del rostro.",
    treatments: [
      {
        slug: "radiofrecuencia-lift",
        name: "Radiofrecuencia Lift",
        short:
          "Reafirma y tonifica la piel del rostro y cuello estimulando la producción de colágeno.",
        long: "La radiofrecuencia calienta las capas profundas de la piel de forma controlada, estimulando la neocolagénesis y produciendo un efecto lifting progresivo sin cirugía.",
        benefits: [
          "Reafirma la piel del rostro y cuello",
          "Mejora el óvalo facial",
          "Reduce la flacidez incipiente",
          "Resultados progresivos y naturales",
        ],
        whoFor:
          "Pacientes a partir de los 30 años con los primeros signos de flacidez.",
        duration: "45 min",
        sessions: "Protocolo de 6 a 8 sesiones semanales",
        recovery: "Sin downtime. Posible rubor que cede en minutos.",
        priceFrom: "desde S/ 350",
        faq: [
          {
            q: "¿Cuándo se ven los resultados?",
            a: "Hay un efecto inmediato de tensado y los resultados definitivos aparecen a las 8–12 semanas al madurar el nuevo colágeno.",
          },
          {
            q: "¿Es doloroso?",
            a: "No, es una sensación de calor confortable. Siempre se trabaja dentro del rango de tolerancia.",
          },
        ],
      },
      {
        slug: "peeling-quimico",
        name: "Peeling químico medio",
        short:
          "Renueva la piel, mejora manchas y textura con un protocolo controlado por médicos.",
        long: "Aplicación controlada de ácidos (glicólico, mandélico, salicílico o combinaciones) para renovar la capa superficial de la piel, mejorar manchas, textura y luminosidad.",
        benefits: [
          "Atenúa manchas y melasma",
          "Mejora cicatrices superficiales",
          "Unifica el tono de la piel",
          "Potencia luminosidad",
        ],
        whoFor:
          "Pieles con manchas, melasma o secuelas de acné. Se evalúa el fototipo en consulta.",
        duration: "45 min",
        sessions: "Protocolo de 3 a 5 sesiones mensuales",
        recovery:
          "Descamación leve a moderada de 3 a 7 días. Protector solar estricto.",
        priceFrom: "desde S/ 320",
        faq: [
          {
            q: "¿Se me caerá la piel?",
            a: "Hay una descamación controlada parecida a una leve quemadura solar; es parte del proceso de renovación.",
          },
          {
            q: "¿Puedo hacerlo en verano?",
            a: "Preferimos otoño o invierno, aunque hay peelings suaves aptos para todo el año.",
          },
        ],
      },
      {
        slug: "toxina-botulinica",
        name: "Toxina botulínica",
        short:
          "Suaviza líneas de expresión en frente, entrecejo y patas de gallo con resultado natural.",
        long: "Aplicación precisa de toxina botulínica tipo A en los músculos de la expresión para suavizar arrugas dinámicas y prevenir que se marquen con el tiempo. Enfoque en resultados naturales.",
        benefits: [
          "Suaviza arrugas de expresión",
          "Previene arrugas futuras",
          "Resultado natural, sin rostro congelado",
          "Procedimiento rápido",
        ],
        whoFor:
          "Pacientes a partir de los 25 años con arrugas dinámicas en frente, entrecejo o patas de gallo.",
        duration: "30 min",
        sessions: "Una sesión; refuerzo cada 4 a 6 meses",
        recovery:
          "Puedes retomar tu día inmediatamente. Evita masajes faciales por 24 h.",
        priceFrom: "desde S/ 790",
        faq: [
          {
            q: "¿Me quedará la cara congelada?",
            a: "No. Dosificamos para mantener expresividad; buscamos resultados naturales.",
          },
          {
            q: "¿En cuánto tiempo veo el efecto?",
            a: "Entre el día 3 y el 14. El resultado final se evalúa a los 15 días.",
          },
        ],
      },
      {
        slug: "relleno-acido-hialuronico",
        name: "Rellenos con ácido hialurónico",
        short:
          "Devuelve volumen, suaviza surcos y perfila labios y pómulos de forma natural.",
        long: "Infiltraciones con ácido hialurónico reticulado de distintas densidades para restaurar volúmenes, perfilar contornos y suavizar surcos del rostro con un enfoque natural y armónico.",
        benefits: [
          "Restaura volúmenes perdidos",
          "Perfila labios, pómulos y mentón",
          "Suaviza surcos nasogenianos",
          "Resultado inmediato",
        ],
        whoFor:
          "Pacientes que buscan perfilar o restaurar volúmenes sin cirugía. Se evalúa en consulta.",
        duration: "45 min",
        sessions: "Una sesión; retoque cada 9 a 12 meses",
        recovery:
          "Posible edema leve 24–48 h. Evita ejercicio intenso por 48 h.",
        priceFrom: "desde S/ 990",
        faq: [
          {
            q: "¿Es reversible?",
            a: "Sí, el ácido hialurónico puede disolverse con hialuronidasa si fuese necesario.",
          },
          {
            q: "¿Duele?",
            a: "Trabajamos con anestesia tópica y productos con lidocaína para que sea confortable.",
          },
        ],
      },
      {
        slug: "mesoterapia-facial",
        name: "Mesoterapia facial",
        short:
          "Microinyecciones de vitaminas y ácido hialurónico no reticulado para revitalizar la piel.",
        long: "Protocolo de microinyecciones superficiales con un cóctel de vitaminas, aminoácidos y ácido hialurónico no reticulado para hidratar en profundidad y aportar luminosidad.",
        benefits: [
          "Hidratación profunda",
          "Mayor luminosidad",
          "Mejora la calidad de la piel",
          "Preparación ideal para eventos",
        ],
        whoFor:
          "Pieles deshidratadas, apagadas o con los primeros signos de envejecimiento.",
        duration: "45 min",
        sessions: "Protocolo de 3 sesiones mensuales",
        recovery:
          "Pequeños puntos rojos que ceden en pocas horas. Evita maquillaje por 6 h.",
        priceFrom: "desde S/ 490",
        faq: [
          {
            q: "¿Es doloroso?",
            a: "Aplicamos anestesia tópica. La sensación es tolerable para la mayoría de pacientes.",
          },
          {
            q: "¿Puedo hacerlo si tengo acné?",
            a: "Lo evaluamos; si hay acné activo severo, lo tratamos primero.",
          },
        ],
      },
    ],
  },
  {
    slug: "tratamientos-corporales",
    title: "Tratamientos corporales",
    icon: "body",
    short:
      "Modelado corporal, reducción de medidas y reafirmación con tecnología no invasiva.",
    long: "Programas corporales diseñados para reducir medidas, modelar el contorno, mejorar la calidad de la piel y combatir la celulitis con tecnología no invasiva y protocolos combinados.",
    treatments: [
      {
        slug: "criolipolisis",
        name: "Criolipólisis",
        short:
          "Reducción de grasa localizada en abdomen, flancos o brazos sin cirugía ni downtime.",
        long: "Enfría de forma controlada la grasa localizada hasta cristalizar los adipocitos, que luego se eliminan de manera natural. Un procedimiento no invasivo con resultados visibles a partir de las 4 semanas.",
        benefits: [
          "Reduce grasa localizada",
          "Sin cirugía ni downtime",
          "Resultados progresivos y duraderos",
          "Aplicadores adaptados a cada zona",
        ],
        whoFor:
          "Personas con grasa localizada resistente a dieta y ejercicio. No reemplaza un tratamiento para obesidad.",
        duration: "60 min por zona",
        sessions: "1 a 2 sesiones por zona, separadas 60 días",
        recovery:
          "Sin downtime. Puede quedar sensibilidad o leve enrojecimiento algunos días.",
        priceFrom: "desde S/ 650",
        faq: [
          {
            q: "¿En cuánto tiempo veo resultados?",
            a: "Entre la 4ª y la 12ª semana. El cuerpo elimina los adipocitos de forma gradual.",
          },
          {
            q: "¿Pierdo peso?",
            a: "No es un tratamiento para bajar de peso, sino para reducir medidas en zonas localizadas.",
          },
        ],
      },
      {
        slug: "radiofrecuencia-corporal",
        name: "Radiofrecuencia corporal",
        short:
          "Reafirma piel flácida, combate la celulitis y modela el contorno.",
        long: "La radiofrecuencia corporal calienta las capas profundas de la piel, estimula colágeno y mejora la circulación, trabajando sobre flacidez y celulitis.",
        benefits: [
          "Reafirma la piel",
          "Mejora la apariencia de la celulitis",
          "Favorece el drenaje",
          "Sin downtime",
        ],
        whoFor:
          "Pacientes con flacidez leve a moderada o celulitis en abdomen, muslos o brazos.",
        duration: "60 min por zona",
        sessions: "Protocolo de 8 a 10 sesiones semanales",
        recovery: "Ninguno. Puedes retomar tu rutina normal.",
        priceFrom: "desde S/ 290",
        faq: [
          {
            q: "¿Se combina con otros tratamientos?",
            a: "Sí, suele combinarse con drenaje linfático y masaje reductor para potenciar resultados.",
          },
          {
            q: "¿Cuántas sesiones necesito?",
            a: "Normalmente de 8 a 10, dependiendo de la zona y objetivos.",
          },
        ],
      },
      {
        slug: "masaje-reductor",
        name: "Masaje reductor y modelador",
        short:
          "Técnicas manuales profundas para movilizar grasa localizada y modelar el contorno.",
        long: "Masaje profundo con maniobras específicas para movilizar la grasa localizada, mejorar la circulación y favorecer el drenaje. Se complementa con aparatología cuando es necesario.",
        benefits: [
          "Reduce medidas",
          "Mejora el contorno corporal",
          "Favorece el drenaje",
          "Relaja la musculatura",
        ],
        whoFor:
          "Pacientes que buscan complementar un plan reductor o posoperatorio.",
        duration: "60 min",
        sessions: "Protocolo de 10 sesiones, 2 veces por semana",
        recovery: "Sin downtime. Puede quedar sensibilidad leve.",
        priceFrom: "desde S/ 150",
        faq: [
          {
            q: "¿Deja moretones?",
            a: "La técnica es intensa pero controlada; es posible algún moretón leve que cede en pocos días.",
          },
          {
            q: "¿Debo seguir una dieta?",
            a: "Recomendamos acompañarlo con alimentación equilibrada e hidratación para potenciar resultados.",
          },
        ],
      },
      {
        slug: "drenaje-linfatico",
        name: "Drenaje linfático manual",
        short:
          "Técnica suave y rítmica para desinflamar, oxigenar y mejorar la circulación.",
        long: "Masaje suave con maniobras rítmicas que estimulan el sistema linfático, ideal para desinflamar, mejorar la retención y acompañar postoperatorios.",
        benefits: [
          "Desinflama",
          "Mejora la retención",
          "Ideal como complemento posoperatorio",
          "Relaja y descansa",
        ],
        whoFor:
          "Pacientes con retención de líquidos, postoperatorio o estrés físico.",
        duration: "60 min",
        sessions: "Protocolo variable según objetivo",
        recovery: "Ninguno. Hidratación posterior recomendada.",
        priceFrom: "desde S/ 160",
        faq: [
          {
            q: "¿Es doloroso?",
            a: "No, es un masaje suave y relajante.",
          },
          {
            q: "¿Puedo hacerlo si estoy embarazada?",
            a: "Lo evaluamos en consulta; existen protocolos adaptados para gestantes.",
          },
        ],
      },
      {
        slug: "carboxiterapia",
        name: "Carboxiterapia",
        short:
          "Infiltraciones de CO₂ medicinal para mejorar celulitis, estrías y flacidez.",
        long: "Aplicación de CO₂ medicinal con microagujas que mejora la oxigenación de los tejidos, estimula colágeno y mejora el aspecto de celulitis, estrías y flacidez.",
        benefits: [
          "Mejora celulitis",
          "Atenúa estrías",
          "Reafirma la piel",
          "Mejora la oxigenación",
        ],
        whoFor:
          "Pacientes con celulitis, estrías o flacidez corporal localizada.",
        duration: "45 min",
        sessions: "Protocolo de 8 a 10 sesiones semanales",
        recovery:
          "Sin downtime. Posible sensación de hinchazón leve que cede en minutos.",
        priceFrom: "desde S/ 240",
        faq: [
          {
            q: "¿Duele?",
            a: "Es tolerable; puede haber una sensación de calor o leve molestia pasajera.",
          },
          {
            q: "¿Para qué estrías funciona mejor?",
            a: "Mejora especialmente estrías rojas o recientes; en estrías blancas combinamos con otras técnicas.",
          },
        ],
      },
    ],
  },
  {
    slug: "depilacion-laser",
    title: "Depilación láser",
    icon: "laser",
    short:
      "Depilación duradera, segura y confortable para todo tipo de piel con equipos de última generación.",
    long: "Programas de depilación láser con equipos de diodo de alta potencia y sistema de enfriamiento continuo, aptos para la mayoría de fototipos y zonas del cuerpo.",
    treatments: [
      {
        slug: "full-body",
        name: "Depilación láser full body",
        short:
          "Protocolo de cuerpo completo para mujeres: piernas, axilas, brazos, línea alba y zona íntima.",
        long: "Protocolo integral de 6 sesiones que cubre las zonas más solicitadas. Programado con la frecuencia adecuada para cada zona y tipo de pelo.",
        benefits: [
          "Depilación duradera",
          "Equipo con enfriamiento continuo",
          "Apto para la mayoría de fototipos",
          "Resultados visibles desde la 3ª sesión",
        ],
        whoFor:
          "Pacientes que buscan una solución duradera para múltiples zonas.",
        duration: "90 min por sesión",
        sessions: "6 sesiones espaciadas según zona",
        recovery:
          "Sin downtime. Protector solar obligatorio en zonas expuestas.",
        priceFrom: "desde S/ 490 / sesión",
        faq: [
          {
            q: "¿Es definitivo?",
            a: "Es depilación duradera: elimina la mayoría del vello y los que queden serán más finos y claros. Puede requerir sesiones de mantenimiento.",
          },
          {
            q: "¿Puedo hacerlo si tengo la piel bronceada?",
            a: "Preferimos piel sin bronceado reciente; en consulta evaluamos tu caso.",
          },
        ],
      },
      {
        slug: "axilas",
        name: "Depilación axilas",
        short:
          "Elimina el vello de axilas con sesiones rápidas y confortables.",
        long: "Zona pequeña y de rápido tratamiento. Suele notarse mejora clara desde la segunda o tercera sesión.",
        benefits: [
          "Sesión de pocos minutos",
          "Reducción progresiva del vello",
          "Mejora la calidad de la piel",
          "Evita irritación por rasurado",
        ],
        whoFor:
          "Cualquier persona que quiera eliminar el vello axilar de forma duradera.",
        duration: "10–15 min",
        sessions: "6 a 8 sesiones mensuales",
        recovery: "Sin downtime. Posible rubor que cede en minutos.",
        priceFrom: "desde S/ 90 / sesión",
        faq: [
          {
            q: "¿Puedo depilarme con cera entre sesiones?",
            a: "No. Entre sesiones solo se puede rasurar; la cera o pinza eliminan la raíz y hacen menos efectivo el láser.",
          },
          {
            q: "¿Se puede hacer durante la menstruación?",
            a: "Sí, no hay contraindicación.",
          },
        ],
      },
      {
        slug: "piernas",
        name: "Depilación piernas completas",
        short:
          "Protocolo para piernas enteras con equipo de alta potencia y enfriamiento continuo.",
        long: "Trabajamos pierna entera (muslo + pantorrilla) por sesión. Se recomienda planificar en meses sin exposición solar intensa.",
        benefits: [
          "Reducción marcada del vello",
          "Mejora la textura de la piel",
          "Evita foliculitis por rasurado",
          "Resultados duraderos",
        ],
        whoFor: "Pacientes con vello visible en piernas que buscan una solución duradera.",
        duration: "60 min",
        sessions: "6 a 8 sesiones espaciadas 4–6 semanas",
        recovery: "Sin downtime. Evitar exposición solar directa 48 h.",
        priceFrom: "desde S/ 290 / sesión",
        faq: [
          {
            q: "¿Puedo hacerlo todo el año?",
            a: "Sí, cuidando la protección solar. Muchas pacientes prefieren iniciar en otoño.",
          },
          {
            q: "¿Puedo depilarme con cera entre sesiones?",
            a: "No, solo se recomienda rasurar.",
          },
        ],
      },
      {
        slug: "zona-intima",
        name: "Depilación zona íntima",
        short:
          "Protocolo íntimo con máxima higiene y confort en entorno privado.",
        long: "Depilación láser en zona íntima con cabina individual y protocolo riguroso de higiene. Se adapta al estilo preferido por la paciente.",
        benefits: [
          "Mayor higiene y comodidad",
          "Reduce irritación y foliculitis",
          "Entorno privado y confortable",
          "Resultados duraderos",
        ],
        whoFor: "Mujeres que buscan depilación íntima duradera.",
        duration: "20 min",
        sessions: "6 a 8 sesiones mensuales",
        recovery:
          "Sin downtime. Evitar prendas ajustadas por 24 h y exposición solar directa.",
        priceFrom: "desde S/ 150 / sesión",
        faq: [
          {
            q: "¿Es doloroso?",
            a: "Nuestro equipo cuenta con enfriamiento continuo, la molestia es mínima.",
          },
          {
            q: "¿Se puede hacer embarazada?",
            a: "No se recomienda durante el embarazo.",
          },
        ],
      },
      {
        slug: "rostro",
        name: "Depilación facial / bozo",
        short:
          "Protocolo delicado para rostro: bozo, patillas o mentón.",
        long: "Trabajamos las zonas del rostro con parámetros adaptados a piel facial y evitando zonas sensibles.",
        benefits: [
          "Afina el vello facial",
          "Mejora la textura",
          "Sin pigmentación posterior",
          "Sesión muy rápida",
        ],
        whoFor:
          "Pacientes con vello facial notorio o hirsutismo leve. Casos hormonales se evalúan en consulta.",
        duration: "15 min",
        sessions: "6 a 10 sesiones",
        recovery: "Sin downtime. Protector solar diario.",
        priceFrom: "desde S/ 110 / sesión",
        faq: [
          {
            q: "¿Puede manchar la piel?",
            a: "No, los parámetros se ajustan al fototipo para evitarlo.",
          },
          {
            q: "¿Qué pasa si es hormonal?",
            a: "Puede requerir mantenimiento más frecuente; lo coordinamos con tu médico tratante.",
          },
        ],
      },
    ],
  },
  {
    slug: "cirugia-facial",
    title: "Cirugía estética facial",
    icon: "surgery",
    short:
      "Rinoplastia, blefaroplastia, lifting y más con enfoque en resultados naturales.",
    long: "Procedimientos quirúrgicos faciales realizados por cirujanos plásticos certificados, con enfoque en resultados naturales, armónicos y seguros.",
    treatments: [
      {
        slug: "rinoplastia",
        name: "Rinoplastia",
        short:
          "Remodela la nariz respetando la armonía del rostro y la función respiratoria.",
        long: "Cirugía estética y funcional de la nariz. Se diseña en consulta con imagen y simulación para proyectar resultados realistas, respetando siempre la función respiratoria.",
        benefits: [
          "Armoniza la nariz con el rostro",
          "Corrige giba, punta ancha o desviaciones",
          "Puede mejorar la respiración",
          "Resultado natural y duradero",
        ],
        whoFor:
          "Pacientes mayores de 18 años con desarrollo facial completo que buscan mejorar forma y/o función nasal.",
        duration: "2 a 3 h en quirófano",
        sessions: "Única cirugía con controles postoperatorios",
        recovery:
          "7 a 10 días de reposo. Inflamación residual se asienta en meses.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Queda la cara muy hinchada?",
            a: "La inflamación es mayor la primera semana y cede progresivamente. Se dan indicaciones específicas para acelerar la recuperación.",
          },
          {
            q: "¿Cuándo veo el resultado final?",
            a: "Un 80% a los 3 meses; el resultado definitivo se asienta en 12 meses.",
          },
        ],
      },
      {
        slug: "blefaroplastia",
        name: "Blefaroplastia",
        short:
          "Cirugía de párpados para rejuvenecer la mirada eliminando piel y bolsas sobrantes.",
        long: "Procedimiento para eliminar el exceso de piel y, si es necesario, grasa de párpados superiores e inferiores. Rejuvenece la mirada de forma natural.",
        benefits: [
          "Mirada más descansada y rejuvenecida",
          "Elimina párpados caídos",
          "Reduce bolsas de los ojos",
          "Resultados muy naturales",
        ],
        whoFor:
          "Pacientes con exceso de piel palpebral o bolsas que generan aspecto cansado.",
        duration: "1 a 2 h con anestesia local sedada",
        sessions: "Única cirugía con controles postoperatorios",
        recovery:
          "Reposo relativo de 7 días. Posible edema y hematoma que ceden en 2 semanas.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Queda cicatriz visible?",
            a: "La cicatriz se oculta en el pliegue natural del párpado y suele ser casi imperceptible.",
          },
          {
            q: "¿Es doloroso?",
            a: "Es un procedimiento muy bien tolerado; usamos analgesia pautada en el postoperatorio.",
          },
        ],
      },
      {
        slug: "lifting-facial",
        name: "Lifting facial",
        short:
          "Reposiciona los tejidos del rostro y cuello para un resultado armónico y natural.",
        long: "Cirugía que reposiciona los tejidos profundos del rostro y cuello, corrigiendo flacidez y restaurando el óvalo facial sin perder la expresión natural.",
        benefits: [
          "Rejuvenece el tercio medio e inferior del rostro",
          "Define el óvalo facial",
          "Resultado natural y duradero",
          "Puede combinarse con blefaroplastia",
        ],
        whoFor:
          "Pacientes con flacidez facial moderada a avanzada que no mejora con tratamientos no invasivos.",
        duration: "3 a 5 h en quirófano",
        sessions: "Única cirugía con controles postoperatorios",
        recovery:
          "10 a 14 días. Masajes y controles para optimizar resultados.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Cuántos años dura el resultado?",
            a: "El efecto rejuvenecedor es duradero; el envejecimiento continúa pero desde un punto más joven.",
          },
          {
            q: "¿Dejará cicatrices visibles?",
            a: "Las incisiones se diseñan ocultas en el nacimiento del cabello y detrás de la oreja.",
          },
        ],
      },
      {
        slug: "otoplastia",
        name: "Otoplastia",
        short:
          "Corrige orejas prominentes o despegadas con una cirugía corta y segura.",
        long: "Cirugía para corregir orejas prominentes o asimétricas, remodelando el cartílago para una posición natural.",
        benefits: [
          "Corrige orejas prominentes",
          "Mejora autoestima",
          "Cirugía corta",
          "Resultados definitivos",
        ],
        whoFor: "Niños desde los 7 años y adultos con orejas prominentes.",
        duration: "1 a 2 h",
        sessions: "Única cirugía con controles postoperatorios",
        recovery:
          "Vendaje por una semana. Reposo relativo de 7 a 10 días.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Queda cicatriz visible?",
            a: "La incisión se hace detrás de la oreja y es prácticamente invisible.",
          },
          {
            q: "¿Se puede hacer en niños?",
            a: "Sí, a partir de los 7 años cuando el cartílago está desarrollado.",
          },
        ],
      },
    ],
  },
  {
    slug: "cirugia-corporal",
    title: "Cirugía estética corporal",
    icon: "body-surgery",
    short:
      "Lipoescultura, aumento mamario y abdominoplastia con el respaldo de un equipo quirúrgico experto.",
    long: "Procedimientos quirúrgicos corporales realizados en entorno acreditado, con anestesiólogo propio y protocolos de seguridad estrictos.",
    treatments: [
      {
        slug: "lipoescultura",
        name: "Lipoescultura",
        short:
          "Esculpe el contorno removiendo grasa localizada y modelando múltiples zonas.",
        long: "Técnica de liposucción con enfoque escultural, trabajando varias zonas en una misma cirugía para definir el contorno corporal.",
        benefits: [
          "Define cintura y contorno",
          "Reduce grasa localizada",
          "Resultados duraderos con cuidados",
          "Se puede combinar con transferencia de grasa",
        ],
        whoFor:
          "Pacientes con peso estable, grasa localizada y piel con buena elasticidad.",
        duration: "3 a 5 h",
        sessions: "Única cirugía",
        recovery:
          "7 a 10 días de reposo. Faja postoperatoria y masajes durante 4 a 8 semanas.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Puedo volver a engordar?",
            a: "La grasa removida no vuelve, pero sí puede aumentar en otras zonas si no se mantiene el peso.",
          },
          {
            q: "¿Cuándo veo el resultado?",
            a: "A los 3 meses se aprecia bien y a los 6 meses es definitivo.",
          },
        ],
      },
      {
        slug: "aumento-mamario",
        name: "Aumento mamario",
        short:
          "Aumenta el volumen y proyecta el busto con implantes de última generación.",
        long: "Cirugía con implantes mamarios de última generación. Se eligen forma, perfil y tamaño según la anatomía y las expectativas de cada paciente.",
        benefits: [
          "Aumenta y proyecta el busto",
          "Mejora la armonía corporal",
          "Implantes con garantía de por vida",
          "Diseño personalizado",
        ],
        whoFor:
          "Pacientes con hipoplasia mamaria o asimetría que desean mayor volumen.",
        duration: "2 a 3 h",
        sessions: "Única cirugía",
        recovery:
          "7 a 10 días de reposo. Evitar ejercicio de brazos por 4 a 6 semanas.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Puedo dar de lactar luego?",
            a: "Sí, en la mayoría de los casos. Se puede conversar la vía quirúrgica según tus planes.",
          },
          {
            q: "¿Debo cambiarme los implantes cada cierto tiempo?",
            a: "No necesariamente. Los implantes modernos no tienen fecha de caducidad obligatoria si no hay complicaciones.",
          },
        ],
      },
      {
        slug: "abdominoplastia",
        name: "Abdominoplastia",
        short:
          "Restaura el abdomen eliminando piel sobrante y reparando la pared abdominal.",
        long: "Cirugía que elimina piel y grasa del abdomen, repara la musculatura y reposiciona el ombligo para un abdomen firme y plano.",
        benefits: [
          "Elimina exceso de piel",
          "Repara diastasis de rectos",
          "Abdomen más firme y plano",
          "Mejora la silueta",
        ],
        whoFor:
          "Pacientes post embarazo o post pérdida de peso con exceso de piel abdominal.",
        duration: "3 a 4 h",
        sessions: "Única cirugía",
        recovery:
          "10 a 14 días de reposo. Faja por 6 a 8 semanas.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Deja cicatriz?",
            a: "Sí, horizontal baja que puede ocultarse con la ropa interior. Mejora significativamente con los meses.",
          },
          {
            q: "¿Puedo embarazarme después?",
            a: "Se recomienda esperar y completar la familia antes de esta cirugía.",
          },
        ],
      },
      {
        slug: "gluteoplastia",
        name: "Gluteoplastia / aumento de glúteos",
        short:
          "Modela y aumenta los glúteos con transferencia de grasa o implantes.",
        long: "Técnica que modela y proyecta los glúteos mediante transferencia de grasa autóloga (BBL) o implantes, según la anatomía y preferencias de la paciente.",
        benefits: [
          "Modela y proyecta los glúteos",
          "Opción con grasa propia",
          "Resultados personalizados",
          "Mejora la silueta global",
        ],
        whoFor:
          "Pacientes que buscan modelar y proyectar glúteos. Se evalúa anatomía en consulta.",
        duration: "3 a 4 h",
        sessions: "Única cirugía",
        recovery:
          "10 a 14 días de reposo. Evitar sentarse directamente por 2 a 3 semanas.",
        priceFrom: "cotización personalizada",
        faq: [
          {
            q: "¿Es seguro?",
            a: "Lo realizamos en entorno acreditado con anestesiólogo. Seguimos protocolos de seguridad estrictos para transferencia de grasa.",
          },
          {
            q: "¿Dura toda la vida?",
            a: "Los resultados son duraderos; en técnicas con grasa parte se reabsorbe los primeros meses y el resto es definitivo.",
          },
        ],
      },
    ],
  },
];

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
  { categorySlug: "limpiezas-faciales", treatmentSlug: "hydraglow-facial" },
  { categorySlug: "tratamientos-faciales", treatmentSlug: "radiofrecuencia-lift" },
  { categorySlug: "tratamientos-faciales", treatmentSlug: "toxina-botulinica" },
  { categorySlug: "depilacion-laser", treatmentSlug: "full-body" },
  { categorySlug: "tratamientos-corporales", treatmentSlug: "criolipolisis" },
  { categorySlug: "tratamientos-faciales", treatmentSlug: "peeling-quimico" },
];

// ---- Monthly promos ------------------------------------------------------

export const promos: Array<{
  tag: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}> = [
  {
    tag: "Octubre",
    title: "20% dto. en HydraGlow Facial",
    description:
      "Agenda tu sesión antes del 31 y recibe un sérum post-tratamiento de regalo.",
    cta: "Reservar promo",
    href: "/tratamientos/limpiezas-faciales/hydraglow-facial",
  },
  {
    tag: "Pack 3",
    title: "Radiofrecuencia Lift x3 sesiones",
    description:
      "Protocolo completo de reafirmación facial a precio preferencial.",
    cta: "Ver detalle",
    href: "/tratamientos/tratamientos-faciales/radiofrecuencia-lift",
  },
  {
    tag: "Verano",
    title: "Depilación láser 2x1 en zonas pequeñas",
    description: "Axilas, bozo o línea alba: paga una y llévate dos sesiones.",
    cta: "Aprovechar",
    href: "/tratamientos/depilacion-laser/axilas",
  },
];

// ---- Doctors / Team ------------------------------------------------------

export const doctors = [
  {
    name: "Dra. Valentina Rivera",
    role: "Directora médica • Medicina estética",
    bio: "Especialista con más de 12 años en tratamientos faciales y corporales no invasivos, formada en Lima y Buenos Aires.",
  },
  {
    name: "Dr. Mateo Salcedo",
    role: "Cirujano plástico certificado",
    bio: "Miembro de sociedades internacionales de cirugía plástica, enfocado en resultados naturales y seguros.",
  },
  {
    name: "Dra. Camila Núñez",
    role: "Dermatología estética",
    bio: "Experta en manejo de piel sensible, acné y pigmentación con enfoque integral y personalizado.",
  },
];

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
    whatsapp: "+51 999 000 111",
    whatsappHref: "51999000111",
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
  eyebrow: "Evaluación personalizada",
  title: "Diseñemos juntas tu plan de cuidado",
  subtitle:
    "Agenda una cita de evaluación sin costo. Revisamos tu historia, tu piel y tus objetivos para recomendarte únicamente los tratamientos que de verdad necesitas.",
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
