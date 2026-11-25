"use server";

import { redirect } from "next/navigation";

import { requireActor } from "~/server/auth/session";
import { isAppError } from "../domain/errors";
import { userService } from "../services";
import { emptyActionState, isNextRedirect, type ActionState } from "./state";

function readUser(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    roles: formData.getAll("roles").map(String),
    cmp: String(formData.get("cmp") ?? ""),
  };
}

function failure(error: unknown): ActionState {
  if (isAppError(error)) return { error: error.message };
  console.error("[acceso-interno] usuarios", error);
  return { error: "No se pudo guardar. Inténtalo de nuevo." };
}

export async function inviteUser(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await requireActor();
  try {
    const result = await userService.invite(actor, readUser(formData));
    const aviso = result.delivery === "email" ? "invitado" : "invitado-log";
    redirect(`/app/admin/usuarios?aviso=${aviso}`);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    return failure(error);
  }
}

export async function updateUser(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  try {
    await userService.update(actor, id, readUser(formData));
    redirect(`/app/admin/usuarios/${id}?aviso=guardado`);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    return failure(error);
  }
}

export async function deactivateUser(formData: FormData) {
  const actor = await requireActor();
  const id = String(formData.get("id") ?? "");
  const confirm = formData.get("confirm") === "true";
  try {
    await userService.deactivate(actor, id, confirm);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const message = isAppError(error) ? error.message : "No se pudo desactivar.";
    redirect(`/app/admin/usuarios/${id}?error=${encodeURIComponent(message)}`);
  }
  redirect("/app/admin/usuarios?aviso=desactivado");
}

export async function reactivateUser(formData: FormData) {
  const actor = await requireActor();
  const id = String(formData.get("id") ?? "");
  try {
    await userService.reactivate(actor, id);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const message = isAppError(error) ? error.message : "No se pudo activar.";
    redirect(`/app/admin/usuarios/${id}?error=${encodeURIComponent(message)}`);
  }
  redirect(`/app/admin/usuarios/${id}?aviso=activado`);
}

export async function sendUserLink(formData: FormData) {
  const actor = await requireActor();
  const id = String(formData.get("id") ?? "");
  const purpose = formData.get("purpose") === "invite" ? "invite" : "reset";
  try {
    const delivery = await userService.sendAccessLink(actor, id, purpose);
    const aviso = delivery === "email" ? "enlace" : "enlace-log";
    redirect(`/app/admin/usuarios/${id}?aviso=${aviso}`);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const message = isAppError(error) ? error.message : "No se pudo enviar el enlace.";
    redirect(`/app/admin/usuarios/${id}?error=${encodeURIComponent(message)}`);
  }
}
