export type ActionState = {
  error: string;
  ok?: string;
};

export const emptyActionState: ActionState = { error: "" };

export function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
  );
}
