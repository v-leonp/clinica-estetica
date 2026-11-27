const SECRET_KEYS = new Set([
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "idToken",
  "hash",
  "secret",
]);

/** Quita claves, tokens y hashes antes de guardar el antes/después. */
export function sanitizeAuditSnapshot(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => sanitizeAuditSnapshot(item));
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === "object") {
    const clean: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (SECRET_KEYS.has(key)) continue;
      clean[key] = sanitizeAuditSnapshot(nested);
    }
    return clean;
  }
  return value ?? null;
}

export type AuditDraft = {
  actorId: string | null;
  actorName: string | null;
  actorEmail: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  summary: string;
  before: unknown;
  after: unknown;
  createdAt: Date;
};

export function buildAuditEntry(
  input: Omit<AuditDraft, "before" | "after" | "createdAt"> & {
    before?: unknown;
    after?: unknown;
    createdAt?: Date;
  },
): AuditDraft {
  return {
    actorId: input.actorId,
    actorName: input.actorName,
    actorEmail: input.actorEmail,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    summary: input.summary,
    before: input.before === undefined ? null : sanitizeAuditSnapshot(input.before),
    after: input.after === undefined ? null : sanitizeAuditSnapshot(input.after),
    createdAt: input.createdAt ?? new Date(),
  };
}
