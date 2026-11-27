import { describe, expect, it } from "vitest";

import { planInitialAdmin, publicSeedSummary } from "../../../scripts/initial-admin-plan.mjs";

describe("primer administrador", () => {
  it("no crea nada si no hay variables, para no frenar el sitio público", () => {
    expect(planInitialAdmin({}).action).toBe("skip");
  });

  it("exige correo, nombre y CMP, y le asigna los dos roles", () => {
    const plan = planInitialAdmin({
      INITIAL_ADMIN_EMAIL: "Melissa@Clinica.pe",
      INITIAL_ADMIN_NAME: "Dra. Melissa Vigo",
      INITIAL_ADMIN_CMP: "101245",
    });
    expect(plan).toMatchObject({
      action: "upsert",
      email: "melissa@clinica.pe",
      name: "Dra. Melissa Vigo",
      cmp: "101245",
      roles: ["ADMINISTRADOR", "MEDICO"],
      password: null,
    });
  });

  it("no arranca con rol Médico si el CMP no es válido", () => {
    const plan = planInitialAdmin({
      INITIAL_ADMIN_EMAIL: "melissa@clinica.pe",
      INITIAL_ADMIN_NAME: "Dra. Melissa Vigo",
      INITIAL_ADMIN_CMP: "abc",
    });
    expect(plan.action).toBe("skip");
  });

  it("el resumen de logs no contiene la contraseña", () => {
    const secret = "clinica2026";
    const plan = planInitialAdmin({
      INITIAL_ADMIN_EMAIL: "melissa@clinica.pe",
      INITIAL_ADMIN_NAME: "Dra. Melissa Vigo",
      INITIAL_ADMIN_CMP: "101245",
      INITIAL_ADMIN_PASSWORD: secret,
    });
    const summary = JSON.stringify(publicSeedSummary(plan));
    expect(summary).not.toContain(secret);
    expect(summary).toContain("hasPassword");
  });
});
