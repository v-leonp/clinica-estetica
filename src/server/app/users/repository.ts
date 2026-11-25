import type { RoleCode } from "../domain/roles";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  cmp: string | null;
  active: boolean;
  deactivatedAt: Date | null;
  roles: RoleCode[];
  lastAccessAt: Date | null;
  passwordSetAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreateData = {
  name: string;
  email: string;
  cmp: string | null;
  roles: RoleCode[];
};

export type UserUpdateData = {
  name: string;
  email: string;
  cmp: string | null;
  roles: RoleCode[];
  active: boolean;
  deactivatedAt: Date | null;
};

/**
 * Persistencia de usuarios. No expone borrar: la baja es `active: false`.
 */
export interface UserRepository {
  listAll(): Promise<StoredUser[]>;
  findById(id: string): Promise<StoredUser | null>;
  findByEmail(email: string): Promise<StoredUser | null>;
  create(data: UserCreateData): Promise<StoredUser>;
  update(id: string, data: UserUpdateData): Promise<StoredUser>;
}

export type AccessPurpose = "invite" | "reset";

export interface AccessLinkSender {
  send(
    user: { id: string; email: string; name: string },
    purpose: AccessPurpose,
  ): Promise<"email" | "log">;
}
