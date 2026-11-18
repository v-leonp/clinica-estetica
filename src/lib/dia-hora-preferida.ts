const PREFERENCIA =
  /^(?:(\d{2})\/(\d{2})\/(\d{4})(?: · (Mañana|Tarde))?|(Mañana|Tarde))$/;

/** Cadena vacía, una fecha DD/MM/AAAA, una franja, o las dos unidas con « · ». */
export function isDiaHoraPreferida(value: string): boolean {
  if (value === "") return true;
  const match = PREFERENCIA.exec(value);
  if (!match) return false;
  if (!match[1]) return true;
  return isCalendarDate(Number(match[1]), Number(match[2]), Number(match[3]));
}

/**
 * Arma el texto que se guarda y se envía al aviso.
 * `fechaIso` es el valor de `<input type="date">` (AAAA-MM-DD).
 * Una fecha imposible o una franja desconocida se descartan.
 */
export function formatDiaHoraPreferida(fechaIso: string, franja: string): string {
  const fecha = formatFechaIso(fechaIso);
  const franjaOk = franja === "Mañana" || franja === "Tarde" ? franja : "";
  if (fecha && franjaOk) return `${fecha} · ${franjaOk}`;
  return fecha || franjaOk;
}

export function formatFechaIso(fechaIso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaIso.trim());
  if (!match) return "";
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!isCalendarDate(day, month, year)) return "";
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}/${mm}/${year}`;
}

function isCalendarDate(day: number, month: number, year: number): boolean {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return false;
  }
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
