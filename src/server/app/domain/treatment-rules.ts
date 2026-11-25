import { z } from "zod";

import { AppError } from "./errors";

/** Categorías internas. Alineadas al catálogo público, más la valoración. Sin precios. */
export const TREATMENT_CATEGORIES = [
  "Valoración",
  "Medicina estética facial",
  "Cuidado de la piel",
  "Tratamientos corporales",
  "Láser y depilación",
] as const;

export type TreatmentCategory = (typeof TREATMENT_CATEGORIES)[number];

export const treatmentWriteSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio.")
      .max(160, "El nombre es demasiado largo."),
    category: z.enum(TREATMENT_CATEGORIES, {
      errorMap: () => ({ message: "Elige una categoría del listado." }),
    }),
    estimatedMinutes: z.coerce
      .number({ invalid_type_error: "La duración estimada debe ser un número de minutos." })
      .int("La duración estimada se anota en minutos enteros.")
      .min(5, "La duración mínima es 5 minutos.")
      .max(480, "La duración máxima es 480 minutos."),
    internalDescription: z
      .string()
      .trim()
      .max(2000, "La descripción interna es demasiado larga.")
      .optional()
      .transform((value) => value ?? ""),
  })
  .strict();

export type TreatmentWriteInput = z.infer<typeof treatmentWriteSchema>;

export function parseTreatmentWrite(input: unknown): TreatmentWriteInput {
  const parsed = treatmentWriteSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION",
      parsed.error.issues.map((issue) => issue.message).join(" "),
    );
  }
  return parsed.data;
}

export function descriptionToStore(input: TreatmentWriteInput): string | null {
  return input.internalDescription === "" ? null : input.internalDescription;
}

export function treatmentSnapshot(treatment: {
  name: string;
  category: string;
  estimatedMinutes: number;
  internalDescription: string | null;
  active: boolean;
}) {
  return {
    name: treatment.name,
    category: treatment.category,
    estimatedMinutes: treatment.estimatedMinutes,
    internalDescription: treatment.internalDescription,
    active: treatment.active,
  };
}
