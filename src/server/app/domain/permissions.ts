import { AppError } from "./errors";
import type { RoleCode } from "./roles";

/**
 * Permisos del Sprint 1.
 * El administrador gestiona usuarios, tratamientos y el registro.
 * El médico no administra: solo entra a su módulo (aún en construcción).
 * Una persona con ambos roles suma los permisos.
 */
export type Permission =
  | "users.manage"
  | "treatments.manage"
  | "audit.read"
  | "clinical.placeholder";

const MATRIX: Record<RoleCode, readonly Permission[]> = {
  ADMINISTRADOR: ["users.manage", "treatments.manage", "audit.read"],
  MEDICO: ["clinical.placeholder"],
};

export function permissionsFor(roles: readonly RoleCode[]): Set<Permission> {
  const granted = new Set<Permission>();
  for (const role of roles) {
    for (const permission of MATRIX[role]) granted.add(permission);
  }
  return granted;
}

export function can(roles: readonly RoleCode[], permission: Permission): boolean {
  return permissionsFor(roles).has(permission);
}

export function assertCan(roles: readonly RoleCode[], permission: Permission): void {
  if (!can(roles, permission)) {
    throw new AppError(
      "FORBIDDEN",
      "No tienes permiso para esta acción. Solo el administrador gestiona usuarios y tratamientos.",
    );
  }
}
