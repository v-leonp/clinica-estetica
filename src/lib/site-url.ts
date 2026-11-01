import { env } from "~/env";

/**
 * Public canonical origin for the site, resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL (explicit override; required for custom domains)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (set automatically on Vercel)
 *   3. http://localhost:3000 (local dev)
 *
 * Always returns an origin without a trailing slash. Safe to call from
 * both server and client code.
 */
export function getSiteUrl(): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}
