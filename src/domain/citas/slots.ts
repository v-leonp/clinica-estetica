import { ocupaCalendario, type Cita, type EstadoCita } from "./cita";
import {
  desdeLimaLocal,
  diaSemanaLima,
  fechaLima,
  horaAMinutos,
  minutosAHora,
  sumarDiasIso,
  type DiaSemana,
} from "./tiempo";

export type Ventana = {
  readonly profesionalId: string;
  readonly sedeId: string | null;
  readonly inicio: Date;
  readonly fin: Date;
};

export type ReglaDisponibilidad = {
  readonly profesionalId: string;
  readonly sedeId: string | null;
  readonly diaSemana: DiaSemana;
  readonly horaInicio: string;
  readonly horaFin: string;
};

export type FilaDisponibilidad = {
  readonly profesionalId: string;
  readonly sedeId: string | null;
  readonly diaSemana: number;
  readonly inicioMinuto: number;
  readonly finMinuto: number;
};

export type Intervalo = {
  readonly inicio: Date;
  readonly fin: Date;
};

export type Ocupacion = {
  readonly profesionalId: string;
  readonly inicio: Date;
  readonly fin: Date;
  readonly estado: EstadoCita;
};

/** Traduce la fila de Prisma al horario de reloj que usa el dominio. */
export function reglaDesdeFila(fila: FilaDisponibilidad): ReglaDisponibilidad {
  if (!Number.isInteger(fila.diaSemana) || fila.diaSemana < 1 || fila.diaSemana > 7) {
    throw new Error("DIA_INVALIDO");
  }
  return {
    profesionalId: fila.profesionalId,
    sedeId: fila.sedeId,
    diaSemana: fila.diaSemana as DiaSemana,
    horaInicio: minutosAHora(fila.inicioMinuto),
    horaFin: minutosAHora(fila.finMinuto),
  };
}

export function filaDesdeRegla(regla: ReglaDisponibilidad): FilaDisponibilidad {
  return {
    profesionalId: regla.profesionalId,
    sedeId: regla.sedeId,
    diaSemana: regla.diaSemana,
    inicioMinuto: horaAMinutos(regla.horaInicio),
    finMinuto: horaAMinutos(regla.horaFin),
  };
}

/**
 * Expande reglas semanales a ventanas concretas dentro de `[desde, hasta)`.
 * Cada ventana conserva la hora de inicio de la regla para alinear los slots.
 */
export function ventanasDesdeReglas(
  reglas: readonly ReglaDisponibilidad[],
  desde: Date,
  hasta: Date,
): Ventana[] {
  if (hasta.getTime() <= desde.getTime()) return [];
  const primerDia = fechaLima(desde);
  const ultimoDia = fechaLima(new Date(hasta.getTime() - 1));
  const ventanas: Ventana[] = [];
  for (let fecha = primerDia; fecha <= ultimoDia; fecha = sumarDiasIso(fecha, 1)) {
    const dia = diaSemanaLima(desdeLimaLocal(fecha, "12:00"));
    for (const regla of reglas) {
      if (regla.diaSemana !== dia) continue;
      const inicio = desdeLimaLocal(fecha, regla.horaInicio);
      const fin = desdeLimaLocal(fecha, regla.horaFin);
      if (fin.getTime() <= inicio.getTime()) continue;
      if (fin.getTime() <= desde.getTime() || inicio.getTime() >= hasta.getTime()) continue;
      ventanas.push({
        profesionalId: regla.profesionalId,
        sedeId: regla.sedeId,
        inicio,
        fin,
      });
    }
  }
  return ventanas;
}

export function seSolapan(a: Intervalo, b: Intervalo): boolean {
  return a.inicio.getTime() < b.fin.getTime() && b.inicio.getTime() < a.fin.getTime();
}

/**
 * Slots ofrecibles de un profesional.
 * El paso es la duración, así que los slots contiguos se tocan y no se solapan.
 * Un slot cuyo inicio ya pasó no se ofrece. Confirmada y Atendida lo retiran;
 * Solicitada, Cancelada y No asistió lo dejan libre.
 */
export function slotsLibres(input: {
  profesionalId: string;
  ventanas: readonly Ventana[];
  citas: readonly Ocupacion[];
  duracionMinutos: number;
  ahora: Date;
}): Intervalo[] {
  if (!Number.isInteger(input.duracionMinutos) || input.duracionMinutos <= 0) {
    throw new Error("DURACION_INVALIDA");
  }
  const duracionMs = input.duracionMinutos * 60_000;
  const propias = fusionar(
    input.ventanas.filter(
      (ventana) =>
        ventana.profesionalId === input.profesionalId &&
        ventana.fin.getTime() > ventana.inicio.getTime(),
    ),
  );
  const ocupadas = input.citas.filter(
    (cita) => cita.profesionalId === input.profesionalId && ocupaCalendario(cita.estado),
  );
  const slots: Intervalo[] = [];
  for (const ventana of propias) {
    let cursor = ventana.inicio.getTime();
    while (cursor + duracionMs <= ventana.fin.getTime()) {
      const inicio = new Date(cursor);
      const fin = new Date(cursor + duracionMs);
      cursor += duracionMs;
      if (inicio.getTime() < input.ahora.getTime()) continue;
      const candidato = { inicio, fin };
      if (ocupadas.some((ocupada) => seSolapan(candidato, ocupada))) continue;
      slots.push(candidato);
    }
  }
  return slots;
}

export function ocupacionDe(cita: Cita): Ocupacion {
  return {
    profesionalId: cita.profesionalId,
    inicio: cita.inicio,
    fin: cita.fin,
    estado: cita.estado,
  };
}

function fusionar(ventanas: readonly Ventana[]): Ventana[] {
  const ordenadas = [...ventanas].sort(
    (a, b) => a.inicio.getTime() - b.inicio.getTime() || a.fin.getTime() - b.fin.getTime(),
  );
  const resultado: Ventana[] = [];
  for (const ventana of ordenadas) {
    const ultima = resultado[resultado.length - 1];
    if (ultima && ventana.inicio.getTime() <= ultima.fin.getTime()) {
      if (ventana.fin.getTime() > ultima.fin.getTime()) {
        resultado[resultado.length - 1] = { ...ultima, fin: new Date(ventana.fin.getTime()) };
      }
      continue;
    }
    resultado.push({
      ...ventana,
      inicio: new Date(ventana.inicio.getTime()),
      fin: new Date(ventana.fin.getTime()),
    });
  }
  return resultado;
}
