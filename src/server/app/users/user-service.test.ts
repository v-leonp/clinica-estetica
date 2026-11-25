import { describe, expect, it } from "vitest";

import type { AuditDraft } from "../domain/audit";
import { AppError } from "../domain/errors";
import type { Actor } from "../domain/roles";
import type { AuditRepository, StoredAudit } from "../audit/repository";
import type { AccessLinkSender, StoredUser, UserRepository } from "./repository";
import { createUserService } from "./user-service";

const admin: Actor = {
  id: "admin-1",
  name: "Dra. Melissa Vigo",
  email: "melissa@clinica.pe",
  roles: ["ADMINISTRADOR", "MEDICO"],
};

const medico: Actor = {
  id: "med-1",
  name: "Dr. Carlos Ejemplo",
  email: "carlos@clinica.pe",
  roles: ["MEDICO"],
};

function user(partial: Partial<StoredUser> & Pick<StoredUser, "id" | "name" | "email" | "roles">): StoredUser {
  return {
    cmp: partial.roles.includes("MEDICO") ? "101245" : null,
    active: true,
    deactivatedAt: null,
    lastAccessAt: null,
    passwordSetAt: null,
    createdAt: new Date("2026-11-01T00:00:00.000Z"),
    updatedAt: new Date("2026-11-01T00:00:00.000Z"),
    ...partial,
  };
}

function harness(seed: StoredUser[] = []) {
  const rows = [...seed];
  const entries: AuditDraft[] = [];
  const sent: Array<{ email: string; purpose: string }> = [];
  const users: UserRepository = {
    async listAll() {
      return rows.map((row) => ({ ...row, roles: [...row.roles] }));
    },
    async findById(id) {
      const found = rows.find((row) => row.id === id);
      return found ? { ...found, roles: [...found.roles] } : null;
    },
    async findByEmail(email) {
      const found = rows.find((row) => row.email === email);
      return found ? { ...found, roles: [...found.roles] } : null;
    },
    async create(data) {
      const created = user({ id: `user-${rows.length + 1}`, ...data });
      rows.push(created);
      return { ...created, roles: [...created.roles] };
    },
    async update(id, data) {
      const index = rows.findIndex((row) => row.id === id);
      const current = rows[index];
      if (!current) throw new Error("missing");
      const next = { ...current, ...data, updatedAt: new Date("2026-11-25T12:00:00.000Z") };
      rows[index] = next;
      return { ...next, roles: [...next.roles] };
    },
  };
  const audit: AuditRepository = {
    async append(entry) {
      entries.push(entry);
    },
    async listRecent() {
      return entries as StoredAudit[];
    },
  };
  const accessLinks: AccessLinkSender = {
    async send(person, purpose) {
      sent.push({ email: person.email, purpose });
      return "log";
    },
  };
  return { service: createUserService({ users, audit, accessLinks }), rows, entries, sent };
}

describe("servicio de usuarios", () => {
  it("un médico no puede invitar ni ver el listado", async () => {
    const { service, rows } = harness();
    await expect(service.list(medico)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(
      service.invite(medico, {
        name: "Ana",
        email: "ana@clinica.pe",
        roles: ["MEDICO"],
        cmp: "222222",
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(rows).toHaveLength(0);
  });

  it("invita sin contraseña, deja constancia y no borra", async () => {
    const { service, rows, entries, sent } = harness();
    const result = await service.invite(admin, {
      name: "Ana Ejemplo",
      email: "Ana@Clinica.pe",
      roles: ["MEDICO"],
      cmp: "222222",
    });
    expect(result.user.email).toBe("ana@clinica.pe");
    expect(result.user.active).toBe(true);
    expect(result.delivery).toBe("log");
    expect(sent).toEqual([{ email: "ana@clinica.pe", purpose: "invite" }]);
    expect(rows).toHaveLength(1);
    expect(entries[0]?.action).toBe("user.invited");
    expect(JSON.stringify(entries[0])).not.toContain("password");
    expect("delete" in service).toBe(false);
  });

  it("rechaza invitar a un médico sin CMP", async () => {
    const { service, rows } = harness();
    await expect(
      service.invite(admin, {
        name: "Ana",
        email: "ana@clinica.pe",
        roles: ["MEDICO"],
        cmp: "",
      }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    expect(rows).toHaveLength(0);
  });

  it("desactiva en lugar de borrar y exige confirmación", async () => {
    const { service, rows, entries } = harness([
      user({ id: "admin-1", name: "Dra. Melissa Vigo", email: "melissa@clinica.pe", roles: ["ADMINISTRADOR"] }),
      user({ id: "med-2", name: "Ana", email: "ana@clinica.pe", roles: ["MEDICO"], cmp: "222222" }),
    ]);
    await expect(service.deactivate(admin, "med-2", false)).rejects.toMatchObject({
      code: "CONFIRMATION_REQUIRED",
    });
    const updated = await service.deactivate(admin, "med-2", true);
    expect(updated.active).toBe(false);
    expect(rows.find((row) => row.id === "med-2")?.active).toBe(false);
    expect(rows).toHaveLength(2);
    expect(entries.at(-1)?.action).toBe("user.deactivated");
    expect(entries.at(-1)?.before).toMatchObject({ active: true });
    expect(entries.at(-1)?.after).toMatchObject({ active: false });
  });

  it("no desactiva ni le quita el rol al último administrador activo", async () => {
    const { service, rows } = harness([
      user({ id: "admin-1", name: "Dra. Melissa Vigo", email: "melissa@clinica.pe", roles: ["ADMINISTRADOR", "MEDICO"], cmp: "101245" }),
    ]);
    await expect(service.deactivate(admin, "admin-1", true)).rejects.toMatchObject({ code: "LAST_ADMIN" });
    await expect(
      service.update(admin, "admin-1", {
        name: "Dra. Melissa Vigo",
        email: "melissa@clinica.pe",
        roles: ["MEDICO"],
        cmp: "101245",
      }),
    ).rejects.toMatchObject({ code: "LAST_ADMIN" });
    expect(rows[0]?.active).toBe(true);
    expect(rows[0]?.roles).toContain("ADMINISTRADOR");
  });

  it("sí desactiva a un administrador cuando queda otro activo", async () => {
    const { service } = harness([
      user({ id: "admin-1", name: "Dra. Melissa Vigo", email: "melissa@clinica.pe", roles: ["ADMINISTRADOR"] }),
      user({ id: "admin-2", name: "Admin Dos", email: "dos@clinica.pe", roles: ["ADMINISTRADOR"] }),
    ]);
    const updated = await service.deactivate(admin, "admin-2", true);
    expect(updated.active).toBe(false);
  });

  it("el restablecimiento no escribe ni devuelve la contraseña", async () => {
    const { service, entries } = harness([
      user({ id: "med-2", name: "Ana", email: "ana@clinica.pe", roles: ["MEDICO"], cmp: "222222" }),
    ]);
    const delivery = await service.sendAccessLink(admin, "med-2", "reset");
    expect(delivery).toBe("log");
    expect(entries.at(-1)?.after).toEqual({ email: "ana@clinica.pe", delivery: "log" });
    expect(entries.at(-1)?.action).toBe("user.password_reset_requested");
  });
});
