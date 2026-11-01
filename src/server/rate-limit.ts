import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { env } from "~/env";

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  backend: "upstash" | "memory";
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5; // Per IP, per minute, for contact-form endpoints.

// --- Upstash (preferred for production, shared across Vercel invocations) ---

let upstash: Ratelimit | null = null;

if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
  upstash = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(MAX_REQUESTS, "60 s"),
    prefix: "lumina:contact",
    analytics: false,
  });
}

// --- In-memory fallback (per-pod; fine for local dev / single server) -------

type Bucket = { count: number; windowStart: number };
const memBuckets = new Map<string, Bucket>();

function memoryLimit(key: string): RateLimitResult {
  const now = Date.now();
  const existing = memBuckets.get(key);
  if (!existing || now - existing.windowStart >= WINDOW_MS) {
    memBuckets.set(key, { count: 1, windowStart: now });
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      reset: now + WINDOW_MS,
      backend: "memory",
    };
  }
  existing.count += 1;
  const remaining = Math.max(MAX_REQUESTS - existing.count, 0);
  return {
    success: existing.count <= MAX_REQUESTS,
    limit: MAX_REQUESTS,
    remaining,
    reset: existing.windowStart + WINDOW_MS,
    backend: "memory",
  };
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const key = ip || "anonymous";
  if (upstash) {
    const r = await upstash.limit(key);
    return {
      success: r.success,
      limit: r.limit,
      remaining: r.remaining,
      reset: r.reset,
      backend: "upstash",
    };
  }
  return memoryLimit(key);
}
