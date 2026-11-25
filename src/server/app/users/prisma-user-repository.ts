import "server-only";

import { db } from "~/server/db";
import type { RoleCode } from "../domain/roles";
import type { StoredUser, UserCreateData, UserRepository, UserUpdateData } from "./repository";

const includeRoles = {
  roles: { include: { role: true } },
} as const;

type UserWithRoles = {
  id: string;
  name: string;
  email: string;
  cmp: string | null;
  active: boolean;
  deactivatedAt: Date | null;
  lastAccessAt: Date | null;
  passwordSetAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  roles: Array<{ role: { code: RoleCode } }>;
};

function toStored(user: UserWithRoles): StoredUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    cmp: user.cmp,
    active: user.active,
    deactivatedAt: user.deactivatedAt,
    roles: user.roles.map((link) => link.role.code),
    lastAccessAt: user.lastAccessAt,
    passwordSetAt: user.passwordSetAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function roleCreates(roles: readonly RoleCode[]) {
  return roles.map((code) => ({ role: { connect: { code } } }));
}

export class PrismaUserRepository implements UserRepository {
  async listAll(): Promise<StoredUser[]> {
    const rows = await db.user.findMany({
      include: includeRoles,
      orderBy: { name: "asc" },
    });
    return rows.map((row) => toStored(row));
  }

  async findById(id: string): Promise<StoredUser | null> {
    const row = await db.user.findUnique({ where: { id }, include: includeRoles });
    return row ? toStored(row) : null;
  }

  async findByEmail(email: string): Promise<StoredUser | null> {
    const row = await db.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      include: includeRoles,
    });
    return row ? toStored(row) : null;
  }

  async create(data: UserCreateData): Promise<StoredUser> {
    const row = await db.user.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        cmp: data.cmp,
        active: true,
        roles: { create: roleCreates(data.roles) },
      },
      include: includeRoles,
    });
    return toStored(row);
  }

  async update(id: string, data: UserUpdateData): Promise<StoredUser> {
    const row = await db.$transaction(async (tx) => {
      await tx.userRole.deleteMany({ where: { userId: id } });
      if (!data.active) {
        await tx.session.deleteMany({ where: { userId: id } });
      }
      return tx.user.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          cmp: data.cmp,
          active: data.active,
          deactivatedAt: data.deactivatedAt,
          roles: { create: roleCreates(data.roles) },
        },
        include: includeRoles,
      });
    });
    return toStored(row);
  }
}
