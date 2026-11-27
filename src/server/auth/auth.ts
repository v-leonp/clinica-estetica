import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";

import { buildAuditEntry } from "~/server/app/domain/audit";
import { passwordIsAcceptable, PASSWORD_HINT } from "~/server/app/domain/password-policy.mjs";
import { PrismaAuditRepository } from "~/server/app/audit/prisma-audit-repository";
import { db } from "~/server/db";
import { deliverAccessLink } from "./email";
import { currentEmailPurpose, noteDelivery } from "./email-purpose";
import { resolveAppOrigin } from "./origin.mjs";

const DAY_IN_SECONDS = 60 * 60 * 24;
const audit = new PrismaAuditRepository();

function resolveSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET?.trim() ?? "";
  if (secret.length >= 32) return secret;
  const building =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.npm_lifecycle_event === "build";
  if (building) return "build-placeholder-secret-not-for-runtime-use-00";
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Falta BETTER_AUTH_SECRET (mínimo 32 caracteres) en las variables de entorno del servidor.",
    );
  }
  return "development-only-secret-not-for-production-00";
}

function buildAuth() {
  const origin = resolveAppOrigin();
  return betterAuth({
    appName: "Vigo Medical Estetic",
    secret: resolveSecret(),
    baseURL: origin,
    trustedOrigins: [
      origin,
      "http://localhost:3000",
      "https://www.vigomedicalestetic.com",
      "https://vigomedicalestetic.com",
      "https://*.vercel.app",
    ],
    database: prismaAdapter(db, {
      provider: "postgresql",
      transaction: true,
    }),
    rateLimit: {
      window: 60,
      max: 30,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/request-password-reset": { window: 600, max: 3 },
        "/reset-password": { window: 60, max: 5 },
      },
    },
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 10,
      maxPasswordLength: 128,
      resetPasswordTokenExpiresIn: DAY_IN_SECONDS,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        const mode = await deliverAccessLink({
          to: user.email,
          name: user.name,
          url,
          purpose: currentEmailPurpose(),
        });
        noteDelivery(mode);
      },
      onPasswordReset: async ({ user }) => {
        await db.user.update({
          where: { id: user.id },
          data: { passwordSetAt: new Date(), emailVerified: true },
        });
        await audit.append(
          buildAuditEntry({
            actorId: user.id,
            actorName: user.name,
            actorEmail: user.email,
            action: "user.password_set",
            entityType: "user",
            entityId: user.id,
            summary: "Definió una contraseña nueva con el enlace de un solo uso.",
            after: { passwordSet: true },
          }),
        );
      },
    },
    user: {
      additionalFields: {
        cmp: { type: "string", required: false, input: false },
        active: { type: "boolean", required: false, defaultValue: true, input: false },
        deactivatedAt: { type: "date", required: false, input: false },
        passwordSetAt: { type: "date", required: false, input: false },
        lastAccessAt: { type: "date", required: false, input: false },
      },
    },
    session: {
      expiresIn: DAY_IN_SECONDS * 7,
    },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path === "/sign-up/email") {
          throw new APIError("FORBIDDEN", {
            message: "No hay registro público. El administrador envía la invitación.",
          });
        }
        if (ctx.path === "/reset-password") {
          const password = ctx.body?.newPassword;
          if (typeof password === "string" && !passwordIsAcceptable(password)) {
            throw new APIError("BAD_REQUEST", { message: PASSWORD_HINT });
          }
        }
        if (ctx.path !== "/sign-in/email") return;
        const email = typeof ctx.body?.email === "string" ? ctx.body.email.trim().toLowerCase() : "";
        if (!email) return;
        const user = await db.user.findFirst({
          where: { email: { equals: email, mode: "insensitive" } },
          select: { id: true, name: true, email: true, active: true },
        });
        if (!user || user.active) return;
        await audit.append(
          buildAuditEntry({
            actorId: user.id,
            actorName: user.name,
            actorEmail: user.email,
            action: "session.login_denied",
            entityType: "user",
            entityId: user.id,
            summary: "Intento de acceso con una cuenta desactivada.",
          }),
        );
        throw new APIError("FORBIDDEN", {
          message: "Esta cuenta está desactivada. Pide a la administración que la active.",
        });
      }),
      after: createAuthMiddleware(async (ctx) => {
        if (ctx.path !== "/sign-in/email") return;
        const created = ctx.context.newSession;
        const userId = created?.user.id;
        if (!userId) return;
        await db.user.update({
          where: { id: userId },
          data: { lastAccessAt: new Date() },
        });
        await audit.append(
          buildAuditEntry({
            actorId: userId,
            actorName: created.user.name,
            actorEmail: created.user.email,
            action: "session.login",
            entityType: "user",
            entityId: userId,
            summary: "Entró al sistema interno.",
          }),
        );
      }),
    },
    plugins: [nextCookies()],
  });
}

type Auth = ReturnType<typeof buildAuth>;

let cached: Auth | undefined;

export function getAuth(): Auth {
  cached ??= buildAuth();
  return cached;
}
