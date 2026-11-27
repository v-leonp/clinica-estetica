import { buildAuditEntry } from "../domain/audit";
import { AppError } from "../domain/errors";
import {
  countOtherActiveAdmins,
  filterUsers,
  userStats,
  type UserListFilter,
} from "../domain/filters";
import { blocksLastAdminRemoval } from "../domain/last-admin";
import { assertCan } from "../domain/permissions";
import type { Actor } from "../domain/roles";
import {
  assertDeactivateConfirmed,
  cmpToStore,
  parseUserWrite,
  userSnapshot,
} from "../domain/user-rules";
import type { AuditRepository } from "../audit/repository";
import type { AccessLinkSender, AccessPurpose, StoredUser, UserRepository } from "./repository";

type Dependencies = {
  users: UserRepository;
  audit: AuditRepository;
  accessLinks: AccessLinkSender;
};

function actorFields(actor: Actor) {
  return { actorId: actor.id, actorName: actor.name, actorEmail: actor.email };
}

async function requireUser(users: UserRepository, id: string): Promise<StoredUser> {
  const user = await users.findById(id);
  if (!user) throw new AppError("NOT_FOUND", "No encontramos a esa persona.");
  return user;
}

function ensureNotLastAdmin(all: readonly StoredUser[], target: StoredUser, next: {
  roles: StoredUser["roles"];
  active: boolean;
}) {
  const blocked = blocksLastAdminRemoval({
    targetIsActiveAdmin: target.active && target.roles.includes("ADMINISTRADOR"),
    otherActiveAdmins: countOtherActiveAdmins(all, target.id),
    nextRoles: next.roles,
    nextActive: next.active,
  });
  if (blocked) throw new AppError("LAST_ADMIN", blocked);
}

export function createUserService(deps: Dependencies) {
  const { users, audit, accessLinks } = deps;

  return {
    async list(actor: Actor, filter: UserListFilter = {}) {
      assertCan(actor.roles, "users.manage");
      const all = await users.listAll();
      return { users: filterUsers(all, filter), stats: userStats(all) };
    },

    async invite(actor: Actor, input: unknown) {
      assertCan(actor.roles, "users.manage");
      const data = parseUserWrite(input);
      const existing = await users.findByEmail(data.email);
      if (existing) {
        throw new AppError("EMAIL_TAKEN", "Ese correo ya tiene una cuenta. Edítala en lugar de invitar de nuevo.");
      }
      const created = await users.create({
        name: data.name,
        email: data.email,
        cmp: cmpToStore(data),
        roles: data.roles,
      });
      let delivery: "email" | "log" = "log";
      try {
        delivery = await accessLinks.send(created, "invite");
      } catch (error) {
        console.error("[acceso-interno] No se pudo preparar la invitación.", error);
      }
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "user.invited",
          entityType: "user",
          entityId: created.id,
          summary:
            delivery === "email"
              ? `Invitó a ${created.name}. El enlace para crear la contraseña se envió por correo.`
              : `Invitó a ${created.name}. El correo no está configurado: el enlace quedó en los logs del servidor.`,
          after: userSnapshot(created),
        }),
      );
      return { user: created, delivery };
    },

    async update(actor: Actor, id: string, input: unknown) {
      assertCan(actor.roles, "users.manage");
      const current = await requireUser(users, id);
      const data = parseUserWrite(input);
      const duplicate = await users.findByEmail(data.email);
      if (duplicate && duplicate.id !== id) {
        throw new AppError("EMAIL_TAKEN", "Ese correo ya pertenece a otra persona.");
      }
      const all = await users.listAll();
      ensureNotLastAdmin(all, current, { roles: data.roles, active: current.active });
      const updated = await users.update(id, {
        name: data.name,
        email: data.email,
        cmp: cmpToStore(data),
        roles: data.roles,
        active: current.active,
        deactivatedAt: current.deactivatedAt,
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "user.updated",
          entityType: "user",
          entityId: id,
          summary: `Editó a ${updated.name}.`,
          before: userSnapshot(current),
          after: userSnapshot(updated),
        }),
      );
      return updated;
    },

    async deactivate(actor: Actor, id: string, confirm: boolean) {
      assertCan(actor.roles, "users.manage");
      const current = await requireUser(users, id);
      if (!current.active) return current;
      assertDeactivateConfirmed(confirm);
      const all = await users.listAll();
      ensureNotLastAdmin(all, current, { roles: current.roles, active: false });
      const updated = await users.update(id, {
        name: current.name,
        email: current.email,
        cmp: current.cmp,
        roles: current.roles,
        active: false,
        deactivatedAt: new Date(),
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "user.deactivated",
          entityType: "user",
          entityId: id,
          summary: `Desactivó a ${updated.name}. El registro se conserva.`,
          before: userSnapshot(current),
          after: userSnapshot(updated),
        }),
      );
      return updated;
    },

    async reactivate(actor: Actor, id: string) {
      assertCan(actor.roles, "users.manage");
      const current = await requireUser(users, id);
      if (current.active) return current;
      const updated = await users.update(id, {
        name: current.name,
        email: current.email,
        cmp: current.cmp,
        roles: current.roles,
        active: true,
        deactivatedAt: null,
      });
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: "user.reactivated",
          entityType: "user",
          entityId: id,
          summary: `Volvió a activar a ${updated.name}.`,
          before: userSnapshot(current),
          after: userSnapshot(updated),
        }),
      );
      return updated;
    },

    async sendAccessLink(actor: Actor, id: string, purpose: AccessPurpose) {
      assertCan(actor.roles, "users.manage");
      const current = await requireUser(users, id);
      if (!current.active) {
        throw new AppError(
          "VALIDATION",
          "La cuenta está desactivada. Actívala antes de enviar un enlace.",
        );
      }
      let delivery: "email" | "log" = "log";
      try {
        delivery = await accessLinks.send(current, purpose);
      } catch (error) {
        console.error("[acceso-interno] No se pudo preparar el enlace de acceso.", error);
      }
      await audit.append(
        buildAuditEntry({
          ...actorFields(actor),
          action: purpose === "invite" ? "user.invitation_resent" : "user.password_reset_requested",
          entityType: "user",
          entityId: id,
          summary:
            purpose === "invite"
              ? `Reenvió la invitación a ${current.name}.`
              : `Envió un enlace para restablecer la contraseña de ${current.name}. El administrador no ve la clave.`,
          after: { email: current.email, delivery },
        }),
      );
      return delivery;
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;
