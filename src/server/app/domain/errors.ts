export type AppErrorCode =
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "LAST_ADMIN"
  | "CONFIRMATION_REQUIRED"
  | "EMAIL_TAKEN";

/** Error de regla de negocio. El mensaje ya está en español para mostrarlo. */
export class AppError extends Error {
  readonly code: AppErrorCode;

  constructor(code: AppErrorCode, message: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
