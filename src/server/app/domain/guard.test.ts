import { describe, expect, it } from "vitest";

import { guardPrivatePath, homeFor, safeNextPath } from "./guard";

describe("rutas del área privada", () => {
  it("sin sesión manda al login", () => {
    expect(guardPrivatePath(null, "/app/admin/usuarios")).toEqual({
      type: "redirect",
      to: "/app/login",
    });
  });

  it("el médico no entra al modo administrador", () => {
    expect(guardPrivatePath(["MEDICO"], "/app/admin/tratamientos")).toEqual({
      type: "redirect",
      to: "/app/medico",
    });
    expect(guardPrivatePath(["MEDICO"], "/app/medico")).toEqual({ type: "allow" });
    expect(homeFor(["MEDICO"])).toBe("/app/medico");
  });

  it("el administrador entra a su modo y no al módulo médico si no tiene ese rol", () => {
    expect(guardPrivatePath(["ADMINISTRADOR"], "/app/admin/usuarios")).toEqual({
      type: "allow",
    });
    expect(guardPrivatePath(["ADMINISTRADOR"], "/app/medico")).toEqual({
      type: "redirect",
      to: "/app/admin/usuarios",
    });
    expect(homeFor(["ADMINISTRADOR"])).toBe("/app/admin/usuarios");
  });

  it("quien tiene los dos roles entra a ambos", () => {
    const roles = ["ADMINISTRADOR", "MEDICO"] as const;
    expect(guardPrivatePath(roles, "/app/admin/registro")).toEqual({ type: "allow" });
    expect(guardPrivatePath(roles, "/app/medico")).toEqual({ type: "allow" });
    expect(homeFor(roles)).toBe("/app/admin/usuarios");
  });

  it("el retorno después del login solo puede ser una ruta interna", () => {
    expect(safeNextPath("/app/admin/usuarios")).toBe("/app/admin/usuarios");
    expect(safeNextPath("https://evil.example/app")).toBeNull();
    expect(safeNextPath("//evil.example")).toBeNull();
    expect(safeNextPath("/contacto")).toBeNull();
  });
});
