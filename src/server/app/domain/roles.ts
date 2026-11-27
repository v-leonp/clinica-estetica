export const ROLE_CODES = ["ADMINISTRADOR", "MEDICO"] as const;

export type RoleCode = (typeof ROLE_CODES)[number];

export type Actor = {
  id: string;
  name: string;
  email: string;
  roles: RoleCode[];
};

export function isRoleCode(value: string): value is RoleCode {
  return (ROLE_CODES as readonly string[]).includes(value);
}

export function sortRoles(roles: readonly RoleCode[]): RoleCode[] {
  return [...new Set(roles)].sort((a, b) => a.localeCompare(b, "es"));
}

export function roleLabel(roles: readonly RoleCode[]): string {
  const admin = roles.includes("ADMINISTRADOR");
  const medico = roles.includes("MEDICO");
  if (admin && medico) return "Administrador y médico";
  if (admin) return "Administrador";
  if (medico) return "Médico";
  return "Sin rol";
}
