"use client";

import { useActionState } from "react";

import { requestOwnReset } from "~/server/app/actions/recover";
import { emptyActionState } from "~/server/app/actions/state";

export default function RecoverForm() {
  const [state, action, pending] = useActionState(requestOwnReset, emptyActionState);

  return (
    <form action={action} className="mt-8 space-y-4">
      {state.error ? (
        <p role="alert" className="rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="rounded-2xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-700">
          {state.ok}
        </p>
      ) : null}
      <label className="block">
        <span className="eyebrow">Correo de la cuenta</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
        />
      </label>
      <button className="btn-primary w-full" type="submit" disabled={pending}>
        {pending ? "Preparando…" : "Enviar enlace"}
      </button>
    </form>
  );
}
