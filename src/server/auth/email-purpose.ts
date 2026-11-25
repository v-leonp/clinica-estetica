import { AsyncLocalStorage } from "node:async_hooks";

export type EmailPurpose = "invite" | "reset";

type Scope = {
  purpose: EmailPurpose;
  delivered: "email" | "log" | null;
};

const storage = new AsyncLocalStorage<Scope>();

export function currentEmailPurpose(): EmailPurpose {
  return storage.getStore()?.purpose ?? "reset";
}

export function noteDelivery(mode: "email" | "log"): void {
  const scope = storage.getStore();
  if (scope) scope.delivered = mode;
}

export async function runWithEmailPurpose<T>(
  purpose: EmailPurpose,
  fn: () => Promise<T>,
): Promise<{ result: T; delivered: "email" | "log" }> {
  const scope: Scope = { purpose, delivered: null };
  const result = await storage.run(scope, fn);
  return { result, delivered: scope.delivered ?? "log" };
}
