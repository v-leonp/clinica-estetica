import { describe, expect, it } from "vitest";

import type { AuditDraft } from "../domain/audit";
import type { Actor } from "../domain/roles";
import type { AuditRepository } from "../audit/repository";
import type { StoredTreatment, TreatmentRepository } from "./repository";
import { createTreatmentService } from "./treatment-service";

const admin: Actor = {
  id: "admin-1",
  name: "Dra. Melissa Vigo",
  email: "melissa@clinica.pe",
  roles: ["ADMINISTRADOR"],
};

const medico: Actor = {
  id: "med-1",
  name: "Dr. Carlos",
  email: "carlos@clinica.pe",
  roles: ["MEDICO"],
};

function treatment(partial: Partial<StoredTreatment> & Pick<StoredTreatment, "id" | "name">): StoredTreatment {
  return {
    category: "Medicina estética facial",
    estimatedMinutes: 30,
    internalDescription: null,
    active: true,
    createdAt: new Date("2026-11-01T00:00:00.000Z"),
    updatedAt: new Date("2026-11-01T00:00:00.000Z"),
    ...partial,
  };
}

function harness(seed: StoredTreatment[] = []) {
  const rows = [...seed];
  const entries: AuditDraft[] = [];
  const treatments: TreatmentRepository = {
    async listAll() {
      return rows.map((row) => ({ ...row }));
    },
    async findById(id) {
      const found = rows.find((row) => row.id === id);
      return found ? { ...found } : null;
    },
    async create(data) {
      const created = treatment({ id: `t-${rows.length + 1}`, ...data });
      rows.push(created);
      return { ...created };
    },
    async update(id, data) {
      const index = rows.findIndex((row) => row.id === id);
      const current = rows[index];
      if (!current) throw new Error("missing");
      const next = { ...current, ...data, updatedAt: new Date("2026-11-25T12:00:00.000Z") };
      rows[index] = next;
      return { ...next };
    },
  };
  const audit: AuditRepository = {
    async append(entry) {
      entries.push(entry);
    },
    async listRecent() {
      return [];
    },
  };
  return { service: createTreatmentService({ treatments, audit }), rows, entries };
}

describe("servicio de tratamientos", () => {
  it("un médico no puede añadir tratamientos", async () => {
    const { service, rows } = harness();
    await expect(
      service.create(medico, {
        name: "Limpieza",
        category: "Cuidado de la piel",
        estimatedMinutes: 60,
        internalDescription: "",
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(rows).toHaveLength(0);
  });

  it("añade sin precio y deja auditoría", async () => {
    const { service, entries } = harness();
    const created = await service.create(admin, {
      name: "Valoración",
      category: "Valoración",
      estimatedMinutes: 40,
      internalDescription: "Uso interno.",
    });
    expect(created.active).toBe(true);
    expect(created).not.toHaveProperty("price");
    expect(entries[0]?.action).toBe("treatment.created");
    expect(JSON.stringify(entries[0]?.after)).not.toMatch(/price|precio|S\//i);
  });

  it("desactiva en lugar de borrar y pide confirmación", async () => {
    const { service, rows, entries } = harness([
      treatment({ id: "t-1", name: "Limpieza facial" }),
    ]);
    await expect(service.deactivate(admin, "t-1", false)).rejects.toMatchObject({
      code: "CONFIRMATION_REQUIRED",
    });
    const updated = await service.deactivate(admin, "t-1", true);
    expect(updated.active).toBe(false);
    expect(rows).toHaveLength(1);
    expect("delete" in service).toBe(false);
    expect(entries.at(-1)?.before).toMatchObject({ active: true });
    expect(entries.at(-1)?.after).toMatchObject({ active: false, name: "Limpieza facial" });
  });

  it("rechaza un campo de precio", async () => {
    const { service } = harness();
    await expect(
      service.create(admin, {
        name: "Toxina",
        category: "Medicina estética facial",
        estimatedMinutes: 25,
        internalDescription: "",
        price: "1300",
      }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
