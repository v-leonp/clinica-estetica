import { formatearLima, ZONA_LIMA } from "./tiempo";

/**
 * Estados de una cita.
 * `NoAsistio` es el estado «No asistió». El alta siempre es `Solicitada`.
 */
export const ESTADOS_CITA = [
  "Solicitada",
  "Confirmada",
  "Atendida",
  "Cancelada",
  "NoAsistio",
] as const;

export type EstadoCita = (typeof ESTADOS_CITA)[number];

export const ROLES = ["ADMIN", "PACIENTE", "PROFESIONAL"] as const;

export type Rol = (typeof ROLES)[number];

export type Actor = {
  readonly id: string;
  readonly rol: Rol;
};

export const CODIGOS_ERROR = [
  "TRANSICION_INVALIDA",
  "REQUIERE_ADMIN",
  "SLOT_OCUPADO",
  "SLOT_EN_EL_PASADO",
  "FUERA_DE_DISPONIBILIDAD",
  "INTERVALO_INVALIDO",
  "CITA_NO_ENCONTRADA",
] as const;

export type CodigoError = (typeof CODIGOS_ERROR)[number];

export type Resultado<T> =
  | { ok: true; valor: T }
  | { ok: false; codigo: CodigoError };

export type EntradaHistorial = {
  readonly id: string;
  readonly citaId: string;
  readonly usuarioId: string;
  readonly rol: Rol;
  readonly antes: EstadoCita;
  readonly despues: EstadoCita;
  readonly ocurridoEn: Date;
  readonly zonaHoraria: typeof ZONA_LIMA;
  /** Misma lectura que `ocurridoEn`, en reloj de America/Lima. */
  readonly ocurridoEnLima: string;
};

export type Cita = {
  readonly id: string;
  readonly pacienteId: string;
  readonly profesionalId: string;
  readonly servicioId: string;
  readonly sedeId: string | null;
  readonly inicio: Date;
  readonly fin: Date;
  readonly estado: EstadoCita;
  readonly historial: readonly EntradaHistorial[];
};

export type SolicitudCita = {
  readonly id: string;
  readonly pacienteId: string;
  readonly profesionalId: string;
  readonly servicioId: string;
  readonly sedeId: string | null;
  readonly inicio: Date;
  readonly fin: Date;
};

/**
 * Salidas permitidas.
 * No asistió solo cabe cuando ya hubo una cita confirmada: una solicitud
 * que nunca se confirmó se cancela, no se marca como inasistencia.
 */
const TRANSICIONES: Record<EstadoCita, readonly EstadoCita[]> = {
  Solicitada: ["Confirmada", "Cancelada"],
  Confirmada: ["Atendida", "Cancelada", "NoAsistio"],
  Atendida: [],
  Cancelada: [],
  NoAsistio: [],
};

/** Confirmada y Atendida retienen el horario. El resto deja el slot libre. */
const ESTADOS_QUE_OCUPAN: ReadonlySet<EstadoCita> = new Set([
  "Confirmada",
  "Atendida",
]);

export function etiquetaEstado(estado: EstadoCita): string {
  if (estado === "NoAsistio") return "No asistió";
  return estado;
}

export function ocupaCalendario(estado: EstadoCita): boolean {
  return ESTADOS_QUE_OCUPAN.has(estado);
}

export function transicionPermitida(desde: EstadoCita, hacia: EstadoCita): boolean {
  return TRANSICIONES[desde].includes(hacia);
}

export function solicitarCita(input: SolicitudCita, ahora: Date): Resultado<Cita> {
  if (!(input.fin.getTime() > input.inicio.getTime())) {
    return { ok: false, codigo: "INTERVALO_INVALIDO" };
  }
  if (input.inicio.getTime() < ahora.getTime()) {
    return { ok: false, codigo: "SLOT_EN_EL_PASADO" };
  }
  return {
    ok: true,
    valor: congelarCita({
      id: input.id,
      pacienteId: input.pacienteId,
      profesionalId: input.profesionalId,
      servicioId: input.servicioId,
      sedeId: input.sedeId,
      inicio: input.inicio,
      fin: input.fin,
      estado: "Solicitada",
      historial: [],
    }),
  };
}

/**
 * Cambia el estado y agrega una fila de historial.
 * Sin rol ADMIN no muta la cita. Una salida fuera del grafo responde
 * `TRANSICION_INVALIDA` y tampoco muta la cita.
 */
export function transicionarCita(
  cita: Cita,
  destino: EstadoCita,
  actor: Actor,
  ahora: Date,
): Resultado<Cita> {
  if (actor.rol !== "ADMIN" || actor.id.trim() === "") {
    return { ok: false, codigo: "REQUIERE_ADMIN" };
  }
  if (!transicionPermitida(cita.estado, destino)) {
    return { ok: false, codigo: "TRANSICION_INVALIDA" };
  }
  const entrada: EntradaHistorial = {
    id: crypto.randomUUID(),
    citaId: cita.id,
    usuarioId: actor.id,
    rol: actor.rol,
    antes: cita.estado,
    despues: destino,
    ocurridoEn: new Date(ahora.getTime()),
    zonaHoraria: ZONA_LIMA,
    ocurridoEnLima: formatearLima(ahora),
  };
  return {
    ok: true,
    valor: congelarCita({
      ...cita,
      estado: destino,
      historial: [...cita.historial, entrada],
    }),
  };
}

export function congelarCita(cita: Cita): Cita {
  const historial = Object.freeze(
    cita.historial.map((entrada) =>
      Object.freeze({
        ...entrada,
        ocurridoEn: new Date(entrada.ocurridoEn.getTime()),
      }),
    ),
  );
  return Object.freeze({
    ...cita,
    inicio: new Date(cita.inicio.getTime()),
    fin: new Date(cita.fin.getTime()),
    historial,
  });
}
