import { passwordIsAcceptable } from "../src/server/app/domain/password-policy.mjs";

const ROLES = ["ADMINISTRADOR", "MEDICO"];

/**
 * @param {unknown} value
 * @returns {string}
 */
function clean(value) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed.length > 0 ? trimmed : "";
}

/**
 * Decide el primer administrador a partir de variables de entorno.
 * No incluye la contraseña en el resumen público.
 *
 * @param {Record<string, string | undefined>} env
 */
export function planInitialAdmin(env) {
  const email = clean(env.INITIAL_ADMIN_EMAIL).toLowerCase();
  const name = clean(env.INITIAL_ADMIN_NAME);
  const cmp = clean(env.INITIAL_ADMIN_CMP);
  const password = typeof env.INITIAL_ADMIN_PASSWORD === "string" ? env.INITIAL_ADMIN_PASSWORD : "";

  if (!email && !name && !cmp && !password.trim()) {
    return {
      action: "skip",
      reason:
        "Sin INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_NAME ni INITIAL_ADMIN_CMP. No se crea el primer administrador.",
    };
  }

  const missing = [];
  if (!email) missing.push("INITIAL_ADMIN_EMAIL");
  if (!name) missing.push("INITIAL_ADMIN_NAME");
  if (!cmp) missing.push("INITIAL_ADMIN_CMP");
  if (missing.length > 0) {
    return {
      action: "skip",
      reason: `Faltan ${missing.join(", ")}. El primer administrador no se creó y el sitio público sigue en línea.`,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { action: "skip", reason: "INITIAL_ADMIN_EMAIL no es un correo válido." };
  }
  if (!/^\d{4,8}$/.test(cmp)) {
    return {
      action: "skip",
      reason: "INITIAL_ADMIN_CMP debe tener entre 4 y 8 dígitos, porque el primer administrador también es Médico.",
    };
  }
  if (password.trim() && !passwordIsAcceptable(password)) {
    return {
      action: "skip",
      reason:
        "INITIAL_ADMIN_PASSWORD debe tener al menos 10 caracteres, con una letra y un número. No se cambió ninguna clave.",
    };
  }

  return {
    action: "upsert",
    email,
    name,
    cmp,
    roles: ROLES,
    password: password.trim() ? password : null,
  };
}

/**
 * Resumen seguro para logs: nunca incluye la contraseña.
 * @param {{ action: string, reason?: string, email?: string, name?: string, cmp?: string, roles?: string[], password?: string | null }} plan
 */
export function publicSeedSummary(plan) {
  if (plan.action !== "upsert") return { action: plan.action, reason: plan.reason };
  return {
    action: "upsert",
    email: plan.email,
    name: plan.name,
    cmp: plan.cmp,
    roles: plan.roles,
    hasPassword: Boolean(plan.password),
  };
}
