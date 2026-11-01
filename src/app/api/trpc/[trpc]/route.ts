import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { TRPCError } from "@trpc/server";
import { type NextRequest, NextResponse } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { checkRateLimit } from "~/server/rate-limit";

/** Hard cap on request body size for the public API. */
const MAX_BODY_BYTES = 16 * 1024;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "0.0.0.0"
  );
}

async function handler(req: NextRequest) {
  // 1. Reject batched requests outright. Batching lets a single POST insert
  //    N rows for one rate-limit check, so we disable it in two layers:
  //    this URL check and `allowBatching: false` on the fetchRequestHandler.
  const batchParam = req.nextUrl.searchParams.get("batch");
  if (batchParam) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Batching is disabled" } },
      { status: 400 },
    );
  }

  // 2. Hard body-size limit before any parsing.
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      {
        error: {
          code: "PAYLOAD_TOO_LARGE",
          message: `Request body exceeds ${MAX_BODY_BYTES} bytes`,
        },
      },
      { status: 413 },
    );
  }

  // 3. Per-IP rate limit for mutating endpoints.
  if (req.method === "POST") {
    const ip = clientIp(req);
    const rl = await checkRateLimit(ip);
    if (!rl.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rl.reset - Date.now()) / 1000),
      );
      return NextResponse.json(
        {
          error: {
            code: "TOO_MANY_REQUESTS",
            message: "Demasiadas solicitudes. Intenta nuevamente en un momento.",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(rl.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rl.reset),
            "X-RateLimit-Backend": rl.backend,
          },
        },
      );
    }
  }

  const createContext = async () =>
    createTRPCContext({
      headers: req.headers,
      ip: clientIp(req),
    });

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
    allowBatching: false,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            if (error instanceof TRPCError && error.code === "BAD_REQUEST") {
              return;
            }
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
}

export { handler as GET, handler as POST };
