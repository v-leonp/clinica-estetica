"use server";

import { buildAuditEntry } from "../domain/audit";
import { auditLog } from "../services";
import { BetterAuthAccessLink } from "~/server/auth/access-link";
import { db } from "~/server/db";
import type { ActionState } from "./state";

const SAME_MESSAGE =
  "Si la cuenta existe y está activa, preparamos un enlace. Si el correo está configurado, llega a la bandeja. Si no, queda en los logs del servidor. Quien administra no ve la contraseña.";

export async function requestOwnReset(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email.includes("@")) {
    return { error: "Escribe el correo de la cuenta." };
  }

  try {
    const user = await db.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });
    if (user?.active) {
      const delivery = await new BetterAuthAccessLink().send(
        { id: user.id, email: user.email, name: user.name },
        "reset",
      );
      await auditLog.append(
        buildAuditEntry({
          actorId: user.id,
          actorName: user.name,
          actorEmail: user.email,
          action: "user.password_reset_requested",
          entityType: "user",
          entityId: user.id,
          summary: "Pidió un enlace para elegir una contraseña nueva.",
          after: { delivery },
        }),
      );
    }
  } catch (error) {
    console.error("[acceso-interno] No se pudo preparar la recuperación.", error);
  }

  return { error: "", ok: SAME_MESSAGE };
}
