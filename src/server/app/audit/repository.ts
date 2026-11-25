import type { AuditDraft } from "../domain/audit";

export type StoredAudit = AuditDraft & { id: string };

export interface AuditRepository {
  append(entry: AuditDraft): Promise<void>;
  listRecent(limit: number): Promise<StoredAudit[]>;
}
