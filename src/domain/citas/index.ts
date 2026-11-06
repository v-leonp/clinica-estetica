export {
  ESTADOS_CITA,
  ROLES,
  CODIGOS_ERROR,
  etiquetaEstado,
  ocupaCalendario,
  transicionPermitida,
  solicitarCita,
  transicionarCita,
  congelarCita,
} from "./cita";
export type {
  EstadoCita,
  Rol,
  Actor,
  CodigoError,
  Resultado,
  EntradaHistorial,
  Cita,
  SolicitudCita,
} from "./cita";

export {
  reglaDesdeFila,
  filaDesdeRegla,
  ventanasDesdeReglas,
  seSolapan,
  slotsLibres,
  ocupacionDe,
} from "./slots";
export type {
  Ventana,
  ReglaDisponibilidad,
  FilaDisponibilidad,
  Intervalo,
  Ocupacion,
} from "./slots";

export { Agenda } from "./agenda";

export {
  ZONA_LIMA,
  desdeLimaLocal,
  fechaLima,
  diaSemanaLima,
  sumarDiasIso,
  formatearLima,
  horaAMinutos,
  minutosAHora,
} from "./tiempo";
export type { DiaSemana } from "./tiempo";

/** Identidad publicada. No incluye sede, horario ni contacto: siguen sin confirmarse. */
export const DRA_MELISSA_VIGO = {
  nombre: "Dra. Melissa Vigo",
  cmp: "101245",
  especialidad: "Medicina estética",
} as const;
