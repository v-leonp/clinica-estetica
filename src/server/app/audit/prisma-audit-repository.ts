import "server-only";

import { Prisma } from "../../../../generated/prisma";
import { db } from "~/server/db";
import type { AuditDraft } from "../domain/audit";
import type { AuditRepository, StoredAudit } from "./repository";

function jsonValue(value: unknown): Prisma.InputJsonValue | typeof Prisma.DbNull {
  if (value === null || value === undefined) return Prisma.DbNull;
  return value as Prisma.InputJsonValue;
}

export class PrismaAuditRepository implements AuditRepository {
  async append(entry: AuditDraft): Promise<void> {
    await db.auditLog.create({
      data: {
        id: crypto.randomUUID(),
        actorId: entry.actorId,
        actorName: entry.actorName,
        actorEmail: entry.actorEmail,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        summary: entry.summary,
        before: jsonValue(entry.before),
        after: jsonValue(entry.after),
        createdAt: entry.createdAt,
      },
    });
  }

  async listRecent(limit: number): Promise<StoredAudit[]> {
    const rows = await db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return rows.map((row) => ({
      id: row.id,
      actorId: row.actorId,
      actorName: row.actorName,
      actorEmail: row.actorEmail,
      action: row.action,
      entityType: row.entityType,
      entityId: row.entityId,
      summary: row.summary,
      before: row.before,
      after: row.after,
      createdAt: row.createdAt,
    }));
  }
}
