import { buildAuditEntry } from "../domain/audit";
import { AppError } from "../domain/errors";
import {
  filterTreatments,
  treatmentStats,
  type TreatmentListFilter,
} from "../domain/filters";
import { assertCan } from "../domain/permissions";
import type { Actor } from "../domain/roles";
import { assertDeactivateConfirmed } from "../domain/user-rules";
import {
  descriptionToStore,
  parseTreatmentWrite,
  treatmentSnapshot,
} from "../domain/treatment-rules";
import type { AuditRepository } from "../audit/repository";
import type { StoredTreatment, TreatmentRepository } from "./repository";

type Dependencies = {
  treatments: TreatmentRepository;
  audit: AuditRepository;
};

function actorFields(actor: Actor) {
  return { actorId: actor.id, actorName: actor.name, actorEmail: actor.email };
}

async function requireTreatment(treatments: TreatmentRepository, id: string) {
  const treatment = await treatments.findById(id);
  if (!treatment) throw new AppError("NOT_FOUND", "No encontramos ese tratamiento.");
  return treatment;
}

export function createTreatmentService(deps: Dependencies) {
  const { treatments, audit } = deps;

  return {
    async list(actor: Actor, filter: TreatmentListFilter = {}) {
      assertCan(actor.roles, "treatments.manage");
      const all = await treatments.listAll();
      return { treatments: filterTreatments(all, filter), stats: treatmentStats(all) };
    },

    async create(actor: Actor, input: unknown) {
      assertCan(actor.roles, "treatments.manage");
      const data = parseTreatmentWrite(input);
      const created = await treatments.create({
        name: data.name,
        category: data.category,
        estimatedMinutes: data.estimatedMinutes,
        internalDescription: descriptionToStore(data),
        createdById: actor.id,
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "treatment.created",
          entityType: "treatment",
          entityId: created.id,
          summary: `Añadió el tratamiento «${created.name}».`,
          after: treatmentSnapshot(created),
        }),
      );
      return created;
    },

    async update(actor: Actor, id: string, input: unknown) {
      assertCan(actor.roles, "treatments.manage");
      const current = await requireTreatment(treatments, id);
      const data = parseTreatmentWrite(input);
      const updated = await treatments.update(id, {
        name: data.name,
        category: data.category,
        estimatedMinutes: data.estimatedMinutes,
        internalDescription: descriptionToStore(data),
        active: current.active,
        updatedById: actor.id,
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "treatment.updated",
          entityType: "treatment",
          entityId: id,
          summary: `Editó el tratamiento «${updated.name}».`,
          before: treatmentSnapshot(current),
          after: treatmentSnapshot(updated),
        }),
      );
      return updated;
    },

    async deactivate(actor: Actor, id: string, confirm: boolean) {
      assertCan(actor.roles, "treatments.manage");
      const current = await requireTreatment(treatments, id);
      if (!current.active) return current;
      assertDeactivateConfirmed(confirm);
      const updated = await treatments.update(id, {
        name: current.name,
        category: current.category,
        estimatedMinutes: current.estimatedMinutes,
        internalDescription: current.internalDescription,
        active: false,
        updatedById: actor.id,
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "treatment.deactivated",
          entityType: "treatment",
          entityId: id,
          summary: `Desactivó «${updated.name}». Sigue en el registro y se puede volver a activar.`,
          before: treatmentSnapshot(current),
          after: treatmentSnapshot(updated),
        }),
      );
      return updated;
    },

    async reactivate(actor: Actor, id: string) {
      assertCan(actor.roles, "treatments.manage");
      const current = await requireTreatment(treatments, id);
      if (current.active) return current;
      const updated = await treatments.update(id, {
        name: current.name,
        category: current.category,
        estimatedMinutes: current.estimatedMinutes,
        internalDescription: current.internalDescription,
        active: true,
        updatedById: actor.id,
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "treatment.reactivated",
          entityType: "treatment",
          entityId: id,
          summary: `Volvió a activar «${updated.name}».`,
          before: treatmentSnapshot(current),
          after: treatmentSnapshot(updated),
        }),
      );
      return updated;
    },
  };
}

export type TreatmentService = ReturnType<typeof createTreatmentService>;
