export function formatLima(date: Date | null): string {
  if (!date) return "Sin registro";
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function withQuery(
  pathname: string,
  current: Record<string, string | undefined>,
  patch: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  const next = { ...current, ...patch };
  for (const [key, value] of Object.entries(next)) {
    if (!value || value === "all") continue;
    params.set(key, value);
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
