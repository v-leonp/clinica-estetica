import type { RoleCode } from "./roles";

export type AdminAccessChange = {
  /** La persona es administrador y su acceso está activo ahora. */
  targetIsActiveAdmin: boolean;
  /** Otros administradores activos, sin contar a esta persona. */
  otherActiveAdmins: number;
  nextRoles: readonly RoleCode[];
  nextActive: boolean;
};

export const LAST_ADMIN_MESSAGE =
  "No se puede desactivar ni quitar el rol al último administrador activo. Tiene que quedar al menos uno.";

/**
 * Impide dejar el sistema sin un administrador activo.
 * Devuelve el motivo si el cambio está bloqueado.
 */
export function blocksLastAdminRemoval(change: AdminAccessChange): string | null {
  if (!change.targetIsActiveAdmin) return null;
  const staysActiveAdmin =
    change.nextActive && change.nextRoles.includes("ADMINISTRADOR");
  if (staysActiveAdmin) return null;
  if (change.otherActiveAdmins > 0) return null;
  return LAST_ADMIN_MESSAGE;
}
