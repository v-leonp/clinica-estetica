/** America/Lima no observa horario de verano: el desplazamiento es siempre UTC−5. */
export const ZONA_LIMA = "America/Lima" as const;

export type DiaSemana = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const DIA_POR_NOMBRE: Record<string, DiaSemana> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

function partes(fecha: string, hora: string): { anio: number; mes: number; dia: number; horas: number; minutos: number } {
  const fechaPartes = fecha.split("-");
  const horaPartes = hora.split(":");
  const anio = Number(fechaPartes[0]);
  const mes = Number(fechaPartes[1]);
  const dia = Number(fechaPartes[2]);
  const horas = Number(horaPartes[0]);
  const minutos = Number(horaPartes[1] ?? "0");
  if (
    fechaPartes.length !== 3 ||
    horaPartes.length < 2 ||
    [anio, mes, dia, horas, minutos].some((n) => Number.isNaN(n))
  ) {
    throw new Error("FECHA_INVALIDA");
  }
  return { anio, mes, dia, horas, minutos };
}

/** Interpreta una fecha y hora de reloj en Lima y devuelve el instante UTC. `24:00` es el cierre del día. */
export function desdeLimaLocal(fecha: string, hora: string): Date {
  const { anio, mes, dia, horas, minutos } = partes(fecha, hora);
  if (horas < 0 || horas > 24 || minutos < 0 || minutos > 59 || (horas === 24 && minutos !== 0)) {
    throw new Error("HORA_INVALIDA");
  }
  return new Date(Date.UTC(anio, mes - 1, dia, horas + 5, minutos, 0, 0));
}

export function fechaLima(fecha: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA_LIMA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(fecha);
}

export function diaSemanaLima(fecha: Date): DiaSemana {
  const nombre = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONA_LIMA,
    weekday: "short",
  }).format(fecha);
  const dia = DIA_POR_NOMBRE[nombre];
  if (!dia) throw new Error("DIA_INVALIDO");
  return dia;
}

export function sumarDiasIso(fecha: string, dias: number): string {
  const { anio, mes, dia } = partes(fecha, "00:00");
  return new Date(Date.UTC(anio, mes - 1, dia + dias)).toISOString().slice(0, 10);
}

/**
 * Instantáneo en ISO-8601 con el reloj de Lima y el offset fijo −05:00.
 * El instante `ocurridoEn` sigue siendo UTC; esta cadena es la lectura local.
 */
export function formatearLima(fecha: Date): string {
  const partesFecha = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA_LIMA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(fecha);
  const leer = (tipo: Intl.DateTimeFormatPartTypes) =>
    partesFecha.find((parte) => parte.type === tipo)?.value ?? "";
  let hora = leer("hour");
  if (hora === "24") hora = "00";
  const ms = fecha.getUTCMilliseconds();
  const fraccion = ms ? `.${String(ms).padStart(3, "0")}` : "";
  return `${leer("year")}-${leer("month")}-${leer("day")}T${hora}:${leer("minute")}:${leer("second")}${fraccion}-05:00`;
}

export function horaAMinutos(hora: string): number {
  const [horasTexto, minutosTexto] = hora.split(":");
  const horas = Number(horasTexto);
  const minutos = Number(minutosTexto ?? "0");
  if (
    horasTexto === undefined ||
    Number.isNaN(horas) ||
    Number.isNaN(minutos) ||
    horas < 0 ||
    horas > 24 ||
    minutos < 0 ||
    minutos > 59 ||
    (horas === 24 && minutos !== 0)
  ) {
    throw new Error("HORA_INVALIDA");
  }
  return horas * 60 + minutos;
}

export function minutosAHora(minutos: number): string {
  if (!Number.isInteger(minutos) || minutos < 0 || minutos > 1440) {
    throw new Error("HORA_INVALIDA");
  }
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return `${String(horas).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}
