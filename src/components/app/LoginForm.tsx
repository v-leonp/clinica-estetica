"use client";

import { useState, type FormEvent } from "react";

import { authClient } from "~/lib/auth-client";

export default function LoginForm({ nextPath }: { nextPath: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    });
    if (result.error) {
      setPending(false);
      const message = result.error.message ?? "";
      if (message.toLowerCase().includes("desactivada")) {
        setError(message);
      } else if (result.error.status === 429) {
        setError("Demasiados intentos. Espera un minuto e inténtalo de nuevo.");
      } else {
        setError("Correo o contraseña incorrectos.");
      }
      return;
    }
    window.location.assign(nextPath);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {error ? (
        <p role="alert" className="rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm">
          {error}
        </p>
      ) : null}
      <label className="block">
        <span className="eyebrow">Correo</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-ink-900 outline-none focus:ring-2 focus:ring-gold-ink"
        />
      </label>
      <label className="block">
        <span className="eyebrow">Contraseña</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-ink-900 outline-none focus:ring-2 focus:ring-gold-ink"
        />
      </label>
      <button className="btn-primary w-full" type="submit" disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
