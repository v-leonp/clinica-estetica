"use server";

import { redirect } from "next/navigation";

import { requireActor } from "~/server/auth/session";
import { isAppError } from "../domain/errors";
import { treatmentService } from "../services";
import { isNextRedirect, type ActionState } from "./state";

function readTreatment(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? ""),
    estimatedMinutes: String(formData.get("estimatedMinutes") ?? ""),
    internalDescription: String(formData.get("internalDescription") ?? ""),
  };
}

function failure(error: unknown): ActionState {
  if (isAppError(error)) return { error: error.message };
  console.error("[acceso-interno] tratamientos", error);
  return { error: "No se pudo guardar. Inténtalo de nuevo." };
}

export async function createTreatment(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  try {
    await treatmentService.create(actor, readTreatment(formData));
    redirect("/app/admin/tratamientos?aviso=creado");
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    return failure(error);
  }
}

export async function updateTreatment(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  try {
    await treatmentService.update(actor, id, readTreatment(formData));
    redirect(`/app/admin/tratamientos/${id}?aviso=guardado`);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    return failure(error);
  }
}

export async function deactivateTreatment(formData: FormData) {
  const actor = await requireActor();
  const id = String(formData.get("id") ?? "");
  const confirm = formData.get("confirm") === "true";
  try {
    await treatmentService.deactivate(actor, id, confirm);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const message = isAppError(error) ? error.message : "No se pudo desactivar.";
    redirect(`/app/admin/tratamientos/${id}?error=${encodeURIComponent(message)}`);
  }
  redirect("/app/admin/tratamientos?aviso=desactivado");
}

export async function reactivateTreatment(formData: FormData) {
  const actor = await requireActor();
  const id = String(formData.get("id") ?? "");
  try {
    await treatmentService.reactivate(actor, id);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const message = isAppError(error) ? error.message : "No se pudo activar.";
    redirect(`/app/admin/tratamientos/${id}?error=${encodeURIComponent(message)}`);
  }
  redirect(`/app/admin/tratamientos/${id}?aviso=activado`);
}
