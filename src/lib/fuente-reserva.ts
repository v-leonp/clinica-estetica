/** Opciones de «¿Cómo te enteraste de nosotros?». El valor vacío significa que no eligió. */
export const FUENTES_RESERVA = [
  "TikTok",
  "Facebook",
  "Instagram",
  "Recomendación de alguien",
  "Google",
  "Otro",
] as const;

export type FuenteReserva = (typeof FUENTES_RESERVA)[number];

export function isFuenteReserva(value: string): value is FuenteReserva {
  return (FUENTES_RESERVA as readonly string[]).includes(value);
}
