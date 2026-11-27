import { describe, expect, it } from "vitest";

import { buildAuditEntry, sanitizeAuditSnapshot } from "./audit";

describe("registro de cambios", () => {
  it("guarda quién, qué, cuándo y el antes/después", () => {
    const when = new Date("2026-11-25T14:10:00.000Z");
    const entry = buildAuditEntry({
      actorId: "admin-1",
      actorName: "Dra. Melissa Vigo",
      actorEmail: "melissa@clinica.pe",
      action: "user.updated",
      entityType: "user",
      entityId: "user-2",
      summary: "Cambió el rol de Carlos.",
      before: { roles: ["MEDICO"], active: true },
      after: { roles: ["ADMINISTRADOR", "MEDICO"], active: true },
      createdAt: when,
    });

    expect(entry.actorId).toBe("admin-1");
    expect(entry.action).toBe("user.updated");
    expect(entry.createdAt).toBe(when);
    expect(entry.before).toEqual({ roles: ["MEDICO"], active: true });
    expect(entry.after).toEqual({ roles: ["ADMINISTRADOR", "MEDICO"], active: true });
  });

  it("no conserva contraseñas ni tokens dentro del antes/después", () => {
    expect(
      sanitizeAuditSnapshot({
        email: "ana@clinica.pe",
        password: "no-debe-quedar",
        token: "abc",
        nested: { refreshToken: "xyz", cmp: "123456" },
      }),
    ).toEqual({
      email: "ana@clinica.pe",
      nested: { cmp: "123456" },
    });
  });
});
