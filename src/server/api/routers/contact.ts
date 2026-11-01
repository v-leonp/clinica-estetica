import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  allowedSedes,
  allowedTratamientos,
} from "~/data/content";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

/**
 * Minimum time (ms) between the form mounting and the first submission. A
 * real human cannot read + fill + submit the form in less than this, so a
 * faster submission is almost certainly a bot.
 */
const MIN_FILL_MS = 2_000;

// Build zod enums from the content catalog so the schema stays in sync with
// what the UI advertises.
const tratamientoEnum = z.enum(
  allowedTratamientos as unknown as [string, ...string[]],
);
const sedeEnum = z.enum(allowedSedes as unknown as [string, ...string[]]);

export const contactInputSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo")
    .max(120, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo electrónico válido")
    .max(200),
  telefono: z
    .string()
    .trim()
    .min(6, "Ingresa un número de teléfono válido")
    .max(40),
  tratamiento: tratamientoEnum,
  mensaje: z
    .string()
    .trim()
    .min(5, "Cuéntanos un poco más")
    .max(2000, "El mensaje es demasiado largo"),
  sede: sedeEnum.optional(),
  acepto: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar la política de privacidad para continuar.",
    }),
  }),
  // Honeypot — any non-empty value here means a bot. We accept the string
  // through zod and short-circuit silently in the mutation so bots can't
  // detect that they were caught.
  website: z.string().max(500).optional().default(""),
  // Timestamp from the client when the form mounted. Used to detect
  // instant submissions (bots).
  startedAt: z.number().int().positive().optional(),
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export const contactRouter = createTRPCRouter({
  createLead: publicProcedure
    .input(contactInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Honeypot tripped → silently accept (don't give bots any signal).
      if (input.website && input.website.length > 0) {
        return { ok: true as const, id: "noop", createdAt: new Date() };
      }

      // Minimum fill time (clock-skew safe: only penalise obviously-too-fast).
      if (input.startedAt !== undefined) {
        const elapsed = Date.now() - input.startedAt;
        if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "La solicitud se envió demasiado rápido. Vuelve a intentar.",
          });
        }
      }

      const ua = ctx.headers.get("user-agent") ?? null;

      const lead = await ctx.db.lead.create({
        data: {
          nombre: input.nombre,
          email: input.email,
          telefono: input.telefono,
          tratamiento: input.tratamiento,
          mensaje: input.mensaje,
          sede: input.sede,
          ip: ctx.ip ?? null,
          userAgent: ua,
          consentAt: new Date(),
        },
        select: { id: true, createdAt: true },
      });

      return { ok: true as const, id: lead.id, createdAt: lead.createdAt };
    }),
});
