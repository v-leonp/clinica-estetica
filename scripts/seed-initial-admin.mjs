import { createRequire } from "node:module";
import { hashPassword } from "better-auth/crypto";

import { planInitialAdmin, publicSeedSummary } from "./initial-admin-plan.mjs";
import { resolveAppOrigin } from "../src/server/auth/origin.mjs";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated/prisma/index.js");

const ROLE_IDS = {
  ADMINISTRADOR: "role_administrador",
  MEDICO: "role_medico",
};

const prisma = new PrismaClient();

function token(size = 32) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

async function ensureRoles() {
  await prisma.role.upsert({
    where: { code: "ADMINISTRADOR" },
    update: { name: "Administrador" },
    create: { id: ROLE_IDS.ADMINISTRADOR, code: "ADMINISTRADOR", name: "Administrador" },
  });
  await prisma.role.upsert({
    where: { code: "MEDICO" },
    update: { name: "Médico" },
    create: { id: ROLE_IDS.MEDICO, code: "MEDICO", name: "Médico" },
  });
}

async function ensureRolesFor(userId) {
  for (const roleId of Object.values(ROLE_IDS)) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId } },
      update: {},
      create: { userId, roleId },
    });
  }
}

async function setPassword(userId, password) {
  const hash = await hashPassword(password);
  const account = await prisma.account.findFirst({
    where: { userId, providerId: "credential" },
  });
  if (!account) {
    await prisma.account.create({
      data: {
        id: crypto.randomUUID(),
        accountId: userId,
        providerId: "credential",
        userId,
        password: hash,
      },
    });
  } else {
    await prisma.account.update({
      where: { id: account.id },
      data: { password: hash },
    });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { passwordSetAt: new Date(), emailVerified: true },
  });
}

async function logSetPasswordLink(userId, email) {
  const value = token();
  await prisma.verification.create({
    data: {
      id: crypto.randomUUID(),
      identifier: `reset-password:${value}`,
      value: userId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  const url = `${resolveAppOrigin()}/api/auth/reset-password/${value}?callbackURL=${encodeURIComponent("/app/restablecer")}`;
  console.info(
    `[acceso-interno] Primer administrador sin contraseña en el entorno. Enlace de un solo uso (24 h) para ${email}: ${url}`,
  );
}

async function main() {
  await ensureRoles();
  const plan = planInitialAdmin(process.env);
  console.info(`[seed] ${JSON.stringify(publicSeedSummary(plan))}`);
  if (plan.action !== "upsert") return;

  const existing = await prisma.user.findFirst({
    where: { email: { equals: plan.email, mode: "insensitive" } },
  });

  if (!existing) {
    const id = crypto.randomUUID();
    await prisma.user.create({
      data: {
        id,
        name: plan.name,
        email: plan.email,
        cmp: plan.cmp,
        active: true,
        emailVerified: Boolean(plan.password),
        roles: {
          create: [{ roleId: ROLE_IDS.ADMINISTRADOR }, { roleId: ROLE_IDS.MEDICO }],
        },
      },
    });
    if (plan.password) await setPassword(id, plan.password);
    else await logSetPasswordLink(id, plan.email);
    await prisma.auditLog.create({
      data: {
        id: crypto.randomUUID(),
        action: "user.seeded",
        entityType: "user",
        entityId: id,
        summary: "Se creó el primer administrador desde las variables de entorno.",
        after: { email: plan.email, name: plan.name, cmp: plan.cmp, roles: plan.roles },
      },
    });
    console.info("[seed] Primer administrador creado. La contraseña no se imprime.");
    return;
  }

  await ensureRolesFor(existing.id);
  if (!existing.cmp) {
    await prisma.user.update({ where: { id: existing.id }, data: { cmp: plan.cmp, name: plan.name } });
  }
  if (!existing.passwordSetAt && plan.password) {
    await setPassword(existing.id, plan.password);
    console.info("[seed] Se guardó la contraseña inicial porque la cuenta aún no tenía una. No se imprime.");
    return;
  }
  console.info("[seed] El administrador ya existía. No se cambió la contraseña.");
}

try {
  await main();
} catch (error) {
  console.error("[seed] No se pudo preparar el primer administrador.", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
