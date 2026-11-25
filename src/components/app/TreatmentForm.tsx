"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";

import type { ActionState } from "~/server/app/actions/state";
import { emptyActionState } from "~/server/app/actions/state";
import { TREATMENT_CATEGORIES } from "~/server/app/domain/treatment-rules";

export default function TreatmentForm({
  action,
  submitLabel,
  defaults,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  defaults?: {
    name: string;
    category: string;
    estimatedMinutes: number;
    internalDescription: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState(action, emptyActionState);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(data);
    });
  }
  const [name, setName] = useState(defaults?.name ?? "");
  const [category, setCategory] = useState(defaults?.category ?? "");
  const [minutes, setMinutes] = useState(String(defaults?.estimatedMinutes ?? 30));
  const [description, setDescription] = useState(defaults?.internalDescription ?? "");

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {state.error ? (
        <p role="alert" className="rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm">
          {state.error}
        </p>
      ) : null}
      <label className="block">
        <span className="eyebrow">Nombre</span>
        <input
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Categoría</span>
          <select
            name="category"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
          >
            <option value="" disabled>
              Elige una categoría
            </option>
            {TREATMENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow">Duración estimada (minutos)</span>
          <input
            name="estimatedMinutes"
            type="number"
            min={5}
            max={480}
            required
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
            className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
          />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow">Descripción interna</span>
        <textarea
          name="internalDescription"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
        />
        <span className="mt-2 block text-sm text-ink-700">
          Texto para el equipo. No es una indicación clínica ni se publica en la web. Aquí no hay precio.
        </span>
      </label>
      <button className="btn-primary" type="submit" disabled={pending}>
        {pending ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
