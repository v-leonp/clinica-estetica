import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { guardPrivatePath } from "~/server/app/domain/guard";
import type { Actor, RoleCode } from "~/server/app/domain/roles";
import { isRoleCode } from "~/server/app/domain/roles";
import { db } from "~/server/db";
import { getAuth } from "./auth";

export async function getAppSession(): Promise<Actor | null> {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { roles: { include: { role: true } } },
  });
  if (!user?.active) return null;

  const roles = user.roles.map((link) => link.role.code).filter(isRoleCode);
  if (roles.length === 0) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles,
  };
}

export async function requireActor(): Promise<Actor> {
  const actor = await getAppSession();
  if (!actor) redirect("/app/login");
  return actor;
}

export async function requireArea(pathname: string): Promise<Actor> {
  const actor = await requireActor();
  const decision = guardPrivatePath(actor.roles, pathname);
  if (decision.type === "redirect") redirect(decision.to);
  return actor;
}

export function hasRole(actor: Actor, role: RoleCode): boolean {
  return actor.roles.includes(role);
}
