import { z } from "zod";

import { AppError } from "./errors";
import { ROLE_CODES, sortRoles, type RoleCode } from "./roles";

const roleSchema = z.enum(ROLE_CODES, {
  errorMap: () => ({ message: "El rol no es válido. Solo existen Administrador y Médico." }),
});

const cmpPattern = /^\d{4,8}$/;

export const userWriteSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio.")
      .max(120, "El nombre es demasiado largo."),
    email: z
      .string()
      .trim()
      .min(1, "El correo es obligatorio.")
      .email("El correo no es válido.")
      .max(254)
      .transform((value) => value.toLowerCase()),
    roles: z
      .array(roleSchema)
      .min(1, "Elige al menos un rol.")
      .transform((roles) => sortRoles(roles)),
    cmp: z
      .string()
      .trim()
      .max(8)
      .optional()
      .transform((value) => value ?? ""),
  })
  .strict()
  .superRefine((value, ctx) => {
    const needsCmp = value.roles.includes("MEDICO");
    if (!needsCmp) {
      if (value.cmp !== "" && !cmpPattern.test(value.cmp)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cmp"],
          message: "El CMP debe tener entre 4 y 8 dígitos.",
        });
      }
      return;
    }
    if (value.cmp === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cmp"],
        message: "El CMP es obligatorio si la persona tiene el rol Médico.",
      });
      return;
    }
    if (!cmpPattern.test(value.cmp)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cmp"],
        message: "El CMP debe tener entre 4 y 8 dígitos.",
      });
    }
  });

export type UserWriteInput = z.infer<typeof userWriteSchema>;

export function parseUserWrite(input: unknown): UserWriteInput {
  const parsed = userWriteSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError("VALIDATION", parsed.error.issues.map((issue) => issue.message).join(" "));
  }
  return parsed.data;
}

export function cmpToStore(input: UserWriteInput): string | null {
  if (!input.roles.includes("MEDICO") && input.cmp === "") return null;
  return input.cmp === "" ? null : input.cmp;
}

export function assertDeactivateConfirmed(confirm: boolean): void {
  if (confirm !== true) {
    throw new AppError(
      "CONFIRMATION_REQUIRED",
      "Confirma la desactivación antes de continuar. No se borra el registro.",
    );
  }
}

export function userSnapshot(user: {
  name: string;
  email: string;
  cmp: string | null;
  active: boolean;
  roles: readonly RoleCode[];
}) {
  return {
    name: user.name,
    email: user.email,
    cmp: user.cmp,
    active: user.active,
    roles: sortRoles(user.roles),
  };
}
