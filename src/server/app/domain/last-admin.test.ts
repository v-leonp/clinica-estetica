import { describe, expect, it } from "vitest";

import { blocksLastAdminRemoval, LAST_ADMIN_MESSAGE } from "./last-admin";

describe("último administrador activo", () => {
  const base = {
    targetIsActiveAdmin: true,
    otherActiveAdmins: 0,
    nextRoles: ["ADMINISTRADOR"] as const,
    nextActive: true,
  };

  it("bloquea desactivar al único administrador activo", () => {
    expect(
      blocksLastAdminRemoval({ ...base, nextActive: false }),
    ).toBe(LAST_ADMIN_MESSAGE);
  });

  it("bloquea quitarle el rol de administrador al único activo", () => {
    expect(
      blocksLastAdminRemoval({ ...base, nextRoles: ["MEDICO"] }),
    ).toBe(LAST_ADMIN_MESSAGE);
  });

  it("bloquea quitarle el rol y desactivarlo a la vez", () => {
    expect(
      blocksLastAdminRemoval({ ...base, nextRoles: [], nextActive: false }),
    ).toBe(LAST_ADMIN_MESSAGE);
  });

  it("deja desactivar si queda otro administrador activo", () => {
    expect(
      blocksLastAdminRemoval({ ...base, otherActiveAdmins: 1, nextActive: false }),
    ).toBeNull();
  });

  it("deja editar nombre o CMP si sigue siendo administrador activo", () => {
    expect(blocksLastAdminRemoval(base)).toBeNull();
  });

  it("deja desactivar a un administrador que ya estaba inactivo", () => {
    expect(
      blocksLastAdminRemoval({
        ...base,
        targetIsActiveAdmin: false,
        nextActive: false,
        nextRoles: ["MEDICO"],
      }),
    ).toBeNull();
  });

  it("no trata como administrador a quien solo es médico", () => {
    expect(
      blocksLastAdminRemoval({
        targetIsActiveAdmin: false,
        otherActiveAdmins: 0,
        nextRoles: ["MEDICO"],
        nextActive: false,
      }),
    ).toBeNull();
  });
});
