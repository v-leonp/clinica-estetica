import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "~/server/auth/auth";

export const dynamic = "force-dynamic";

function handlers() {
  return toNextJsHandler(getAuth().handler);
}

export function GET(request: Request) {
  return handlers().GET(request);
}

export function POST(request: Request) {
  return handlers().POST(request);
}
