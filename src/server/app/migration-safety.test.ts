import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../../..");

describe("la migración del área privada es aditiva", () => {
  it("no borra ni renombra columnas y no toca la tabla Lead", () => {
    const migrationDir = path.join(root, "prisma/migrations/20261125170000_area_privada_sprint1");
    const sql = readFileSync(path.join(migrationDir, "migration.sql"), "utf8");
    expect(sql).not.toMatch(/DROP\s+(TABLE|COLUMN|INDEX|TYPE)/i);
    expect(sql).not.toMatch(/ALTER\s+TABLE\s+"Lead"/i);
    expect(sql).not.toMatch(/RENAME\s+(TO|COLUMN)/i);
    expect(sql).toMatch(/CREATE TABLE "user"/);
    expect(sql).toMatch(/CREATE TABLE "AuditLog"/);
    expect(sql).toMatch(/CREATE TABLE "Treatment"/);
  });

  it("el catálogo interno no tiene columna de precio y Lead sigue en el schema", () => {
    const schema = readFileSync(path.join(root, "prisma/schema.prisma"), "utf8");
    expect(schema).toContain("model Lead");
    const treatment = schema.split("model Treatment")[1]?.split("model ")[0] ?? "";
    expect(treatment.toLowerCase()).not.toContain("price");
    expect(treatment.toLowerCase()).not.toContain("precio");
    const migrations = readdirSync(path.join(root, "prisma/migrations"));
    expect(migrations).toContain("20261125170000_area_privada_sprint1");
  });
});
