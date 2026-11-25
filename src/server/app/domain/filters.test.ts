import { describe, expect, it } from "vitest";

import { filterTreatments, filterUsers, treatmentStats, userStats } from "./filters";

const users = [
  {
    id: "1",
    name: "Dra. Melissa Vigo",
    email: "melissa@clinica.pe",
    active: true,
    roles: ["ADMINISTRADOR", "MEDICO"] as const,
  },
  {
    id: "2",
    name: "Dr. Carlos Ejemplo",
    email: "carlos@clinica.pe",
    active: true,
    roles: ["MEDICO"] as const,
  },
  {
    id: "3",
    name: "Lucía Ejemplo",
    email: "lucia@clinica.pe",
    active: false,
    roles: ["MEDICO"] as const,
  },
];

describe("búsqueda y conteos", () => {
  it("busca por nombre o correo y filtra por rol y estado", () => {
    expect(filterUsers(users, { query: "MELISSA" }).map((user) => user.id)).toEqual(["1"]);
    expect(filterUsers(users, { query: "carlos@clinica" }).map((user) => user.id)).toEqual(["2"]);
    expect(filterUsers(users, { role: "ADMINISTRADOR" }).map((user) => user.id)).toEqual(["1"]);
    expect(filterUsers(users, { status: "inactive" }).map((user) => user.id)).toEqual(["3"]);
  });

  it("cuenta administradores y médicos activos sin perder a quien tiene ambos roles", () => {
    expect(userStats(users)).toEqual({
      total: 3,
      activeAdmins: 1,
      activeMedicos: 2,
      inactive: 1,
    });
  });

  it("filtra tratamientos por nombre, categoría y estado, sin mirar precios", () => {
    const treatments = [
      { name: "Toxina botulínica", category: "Medicina estética facial", active: true },
      { name: "Limpieza facial", category: "Cuidado de la piel", active: true },
      { name: "Tratamiento retirado", category: "Cuidado de la piel", active: false },
    ];
    expect(filterTreatments(treatments, { category: "Cuidado de la piel", status: "active" })).toEqual([
      treatments[1],
    ]);
    expect(treatmentStats(treatments)).toEqual({ total: 3, active: 2, inactive: 1 });
  });
});
