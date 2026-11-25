import { describe, expect, it } from "vitest";

import { AppError } from "./errors";
import { assertCan, can, permissionsFor } from "./permissions";
import { roleLabel } from "./roles";

describe("permisos por rol", () => {
  it("el administrador gestiona usuarios, roles, tratamientos y el registro", () => {
    expect(can(["ADMINISTRADOR"], "users.manage")).toBe(true);
    expect(can(["ADMINISTRADOR"], "treatments.manage")).toBe(true);
    expect(can(["ADMINISTRADOR"], "audit.read")).toBe(true);
    expect(can(["ADMINISTRADOR"], "clinical.placeholder")).toBe(false);
  });

  it("el médico no administra usuarios ni tratamientos", () => {
    expect(can(["MEDICO"], "users.manage")).toBe(false);
    expect(can(["MEDICO"], "treatments.manage")).toBe(false);
    expect(can(["MEDICO"], "audit.read")).toBe(false);
    expect(can(["MEDICO"], "clinical.placeholder")).toBe(true);
  });

  it("una persona con ambos roles suma permisos", () => {
    const granted = permissionsFor(["MEDICO", "ADMINISTRADOR"]);
    expect(granted.has("users.manage")).toBe(true);
    expect(granted.has("treatments.manage")).toBe(true);
    expect(granted.has("clinical.placeholder")).toBe(true);
  });

  it("un médico que intenta administrar recibe un rechazo en el servidor", () => {
    expect(() => assertCan(["MEDICO"], "users.manage")).toThrow(AppError);
    try {
      assertCan(["MEDICO"], "treatments.manage");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).code).toBe("FORBIDDEN");
    }
  });

  it("describe los dos roles en español", () => {
    expect(roleLabel(["ADMINISTRADOR", "MEDICO"])).toBe("Administrador y médico");
    expect(roleLabel(["MEDICO"])).toBe("Médico");
    expect(roleLabel(["ADMINISTRADOR"])).toBe("Administrador");
  });
});
