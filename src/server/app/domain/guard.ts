import { can } from "./permissions";
import type { RoleCode } from "./roles";

/** Rutas de /app que se abren sin sesión. */
export const PUBLIC_APP_PATHS = ["/app/login", "/app/recuperar", "/app/restablecer"] as const;

export function isPublicAppPath(pathname: string): boolean {
  return PUBLIC_APP_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function homeFor(roles: readonly RoleCode[]): string {
  if (can(roles, "users.manage")) return "/app/admin/usuarios";
  if (can(roles, "clinical.placeholder")) return "/app/medico";
  return "/app/login";
}

export type PathGuard =
  | { type: "allow" }
  | { type: "redirect"; to: string };

/**
 * Autorización de rutas en el servidor.
 * Ocultar un enlace no basta: esta función decide el acceso.
 */
export function guardPrivatePath(
  roles: readonly RoleCode[] | null,
  pathname: string,
): PathGuard {
  if (!roles || roles.length === 0) {
    return { type: "redirect", to: "/app/login" };
  }
  if (pathname.startsWith("/app/admin")) {
    const manages =
      can(roles, "users.manage") ||
      can(roles, "treatments.manage") ||
      can(roles, "audit.read");
    if (!manages) return { type: "redirect", to: "/app/medico" };
  }
  if (pathname.startsWith("/app/medico") && !can(roles, "clinical.placeholder")) {
    return { type: "redirect", to: "/app/admin/usuarios" };
  }
  return { type: "allow" };
}

/** Evita que ?next= mande a otro sitio después del login. */
export function safeNextPath(value: string | null | undefined): string | null {
  if (!value) return null;
  if (!value.startsWith("/app/")) return null;
  if (value.startsWith("//") || value.startsWith("/\\")) return null;
  if (value.includes("\\") || value.includes("://")) return null;
  return value;
}
