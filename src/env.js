import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { applyDatabaseUrlEnv } from "./lib/resolve-database-url.js";

applyDatabaseUrlEnv();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Optional Upstash Redis for distributed per-IP rate limiting.
    // When both are set we use @upstash/ratelimit; otherwise we fall back
    // to a safe in-memory limiter (per-pod).
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

    // Área privada. Opcionales aquí para no tumbar el sitio público si faltan.
    // La validación de formato vive en el seed y en Better Auth.
    BETTER_AUTH_SECRET: z.string().min(1).optional(),
    BETTER_AUTH_URL: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    EMAIL_FROM: z.string().min(1).optional(),
    INITIAL_ADMIN_EMAIL: z.string().min(1).optional(),
    INITIAL_ADMIN_NAME: z.string().min(1).optional(),
    INITIAL_ADMIN_CMP: z.string().min(1).optional(),
    INITIAL_ADMIN_PASSWORD: z.string().min(1).optional(),
  },

  client: {
    // Public canonical origin. Falls back to Vercel's project production URL
    // at runtime (see src/lib/site-url.ts) when this is not set.
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    INITIAL_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL,
    INITIAL_ADMIN_NAME: process.env.INITIAL_ADMIN_NAME,
    INITIAL_ADMIN_CMP: process.env.INITIAL_ADMIN_CMP,
    INITIAL_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
  onValidationError: (error) => {
    console.error(error);
    if (process.env.VERCEL) {
      console.error(
        "\nVercel: conecta Postgres en Storage → Create Database, o define DATABASE_URL " +
          "en Settings → Environment Variables (Production + Preview). Luego redeploy.\n",
      );
    }
    throw new Error("Invalid environment variables");
  },
});
