"use client";

import { useState, type FormEvent } from "react";

import { PASSWORD_HINT, passwordIsAcceptable } from "~/server/app/domain/password-policy.mjs";
import { authClient } from "~/lib/auth-client";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const repeat = String(form.get("repeat") ?? "");
    if (!passwordIsAcceptable(password)) {
      setError(PASSWORD_HINT);
      return;
    }
    if (password !== repeat) {
      setError("Las dos contraseñas no coinciden.");
      return;
    }
    setPending(true);
    setError("");
    const result = await authClient.resetPassword({ newPassword: password, token });
    if (result.error) {
      setPending(false);
      setError(result.error.message || "El enlace no es válido o ya caducó. Pide uno nuevo.");
      return;
    }
    window.location.assign("/app/login?aviso=clave");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {error ? (
        <p role="alert" className="rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}
      <label className="block">
        <span className="eyebrow">Nueva contraseña</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
        />
      </label>
      <label className="block">
        <span className="eyebrow">Repite la contraseña</span>
        <input
          name="repeat"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
        />
      </label>
      <p className="text-sm text-ink-700">{PASSWORD_HINT} Nadie del equipo la ve.</p>
      <button className="btn-primary w-full" type="submit" disabled={pending}>
        {pending ? "Guardando…" : "Guardar contraseña"}
      </button>
    </form>
  );
}
