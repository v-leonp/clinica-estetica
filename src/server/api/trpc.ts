/**
 * tRPC server initialization — no auth session; marketing site only.
 * When a login UI is added later, re-introduce the session via a thin
 * procedure.use() middleware rather than reviving NextAuth here.
 */

import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";

export const createTRPCContext = async (opts: {
  headers: Headers;
  ip: string;
}) => {
  return {
    db,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  const result = await next();
  const end = Date.now();
  if (t._config.isDev) {
    console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  }
  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);
