import { describe, expect, it } from "vitest";

import { AppError } from "./errors";
import { passwordIsAcceptable } from "./password-policy.mjs";
import {
  assertDeactivateConfirmed,
  parseUserWrite,
  userWriteSchema,
} from "./user-rules";

describe("datos de un usuario", () => {
  const valid = {
    name: "Dra. Melissa Vigo",
    email: "Melissa@Clinica.pe",
    roles: ["MEDICO"],
    cmp: "101245",
  };

  it("exige CMP numérico cuando el rol es Médico", () => {
    expect(parseUserWrite(valid).cmp).toBe("101245");
    expect(parseUserWrite(valid).email).toBe("melissa@clinica.pe");

    expect(() => parseUserWrite({ ...valid, cmp: "" })).toThrow(/CMP es obligatorio/);
    expect(() => parseUserWrite({ ...valid, cmp: "CMP-12" })).toThrow(/4 y 8 dígitos/);
    expect(() => parseUserWrite({ ...valid, roles: ["ADMINISTRADOR"], cmp: "" })).not.toThrow();
  });

  it("exige al menos un rol y solo acepta los dos roles definidos", () => {
    expect(() => parseUserWrite({ ...valid, roles: [] })).toThrow(/al menos un rol/);
    expect(() => parseUserWrite({ ...valid, roles: ["RECEPCION"] })).toThrow(/no es válido/);
    const both = parseUserWrite({
      ...valid,
      roles: ["MEDICO", "ADMINISTRADOR", "MEDICO"],
    });
    expect(both.roles).toEqual(["ADMINISTRADOR", "MEDICO"]);
  });

  it("no acepta una contraseña escrita por el administrador", () => {
    const parsed = userWriteSchema.safeParse({ ...valid, password: "secreta123" });
    expect(parsed.success).toBe(false);
  });

  it("pide confirmación explícita antes de desactivar", () => {
    expect(() => assertDeactivateConfirmed(false)).toThrow(AppError);
    try {
      assertDeactivateConfirmed(false);
    } catch (error) {
      expect((error as AppError).code).toBe("CONFIRMATION_REQUIRED");
    }
    expect(() => assertDeactivateConfirmed(true)).not.toThrow();
  });

  it("la contraseña propia lleva letra y número, y no se guarda en claro en la regla", () => {
    expect(passwordIsAcceptable("corta1")).toBe(false);
    expect(passwordIsAcceptable("sololetras")).toBe(false);
    expect(passwordIsAcceptable("1234567890")).toBe(false);
    expect(passwordIsAcceptable("clinica2026")).toBe(true);
  });
});
