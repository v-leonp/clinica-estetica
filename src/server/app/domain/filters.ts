import type { RoleCode } from "./roles";

export type UserStatusFilter = "all" | "active" | "inactive";

export type UserListFilter = {
  query?: string;
  role?: RoleCode | "all";
  status?: UserStatusFilter;
};

export type UserLike = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  roles: readonly RoleCode[];
};

export function filterUsers<T extends UserLike>(users: readonly T[], filter: UserListFilter): T[] {
  const query = filter.query?.trim().toLowerCase() ?? "";
  return users.filter((user) => {
    if (filter.status === "active" && !user.active) return false;
    if (filter.status === "inactive" && user.active) return false;
    if (filter.role && filter.role !== "all" && !user.roles.includes(filter.role)) return false;
    if (query) {
      const haystack = `${user.name} ${user.email}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export type UserStats = {
  total: number;
  activeAdmins: number;
  activeMedicos: number;
  inactive: number;
};

export function userStats(users: readonly UserLike[]): UserStats {
  return {
    total: users.length,
    activeAdmins: users.filter((user) => user.active && user.roles.includes("ADMINISTRADOR")).length,
    activeMedicos: users.filter((user) => user.active && user.roles.includes("MEDICO")).length,
    inactive: users.filter((user) => !user.active).length,
  };
}

export function countOtherActiveAdmins(users: readonly UserLike[], userId: string): number {
  return users.filter(
    (user) => user.id !== userId && user.active && user.roles.includes("ADMINISTRADOR"),
  ).length;
}

export type TreatmentLike = {
  name: string;
  category: string;
  active: boolean;
};

export type TreatmentListFilter = {
  query?: string;
  category?: string | "all";
  status?: UserStatusFilter;
};

export function filterTreatments<T extends TreatmentLike>(
  treatments: readonly T[],
  filter: TreatmentListFilter,
): T[] {
  const query = filter.query?.trim().toLowerCase() ?? "";
  return treatments.filter((treatment) => {
    if (filter.status === "active" && !treatment.active) return false;
    if (filter.status === "inactive" && treatment.active) return false;
    if (filter.category && filter.category !== "all" && treatment.category !== filter.category) {
      return false;
    }
    if (query && !treatment.name.toLowerCase().includes(query)) return false;
    return true;
  });
}

export type TreatmentStats = {
  total: number;
  active: number;
  inactive: number;
};

export function treatmentStats(treatments: readonly TreatmentLike[]): TreatmentStats {
  return {
    total: treatments.length,
    active: treatments.filter((treatment) => treatment.active).length,
    inactive: treatments.filter((treatment) => !treatment.active).length,
  };
}
