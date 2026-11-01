/**
 * Normalizes Postgres connection strings for Prisma on Vercel.
 *
 * Vercel Postgres / Neon integrations inject POSTGRES_* vars, not always
 * DATABASE_URL. This helper maps them before env validation and builds.
 */

/**
 * @param {...(string | undefined)} values
 * @returns {string | undefined}
 */
function firstNonEmpty(...values) {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

/**
 * @param {{ forMigration?: boolean }} [options]
 * @returns {string | undefined}
 */
export function applyDatabaseUrlEnv(options = {}) {
  const { forMigration = false } = options;

  const url = forMigration
    ? firstNonEmpty(
        process.env.DATABASE_URL,
        process.env.POSTGRES_URL_NON_POOLING,
        process.env.DIRECT_URL,
        process.env.POSTGRES_URL,
        process.env.POSTGRES_PRISMA_URL,
      )
    : firstNonEmpty(
        process.env.DATABASE_URL,
        process.env.POSTGRES_URL,
        process.env.POSTGRES_PRISMA_URL,
        process.env.POSTGRES_URL_NON_POOLING,
      );

  if (url) {
    process.env.DATABASE_URL = url;
  }

  return url;
}
