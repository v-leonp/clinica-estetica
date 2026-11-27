export function decideDelivery(env: { apiKey?: string; from?: string }): "email" | "log" {
  if (!env.apiKey?.trim() || !env.from?.trim()) return "log";
  return "email";
}
