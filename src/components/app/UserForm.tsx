"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";

import type { ActionState } from "~/server/app/actions/state";
import { emptyActionState } from "~/server/app/actions/state";
import type { RoleCode } from "~/server/app/domain/roles";

const roles: Array<{ value: RoleCode; title: string; text: string }> = [
  {
    value: "ADMINISTRADOR",
    title: "Administrador",
    text: "Gestiona usuarios y tratamientos",
  },
  {
    value: "MEDICO",
    title: "Médico",
    text: "Entra a su módulo de trabajo",
  },
];

export default function UserForm({
  action,
  submitLabel,
  defaults,
  lockAdminRole = false,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  defaults?: {
    name: string;
    email: string;
    roles: RoleCode[];
    cmp: string | null;
  };
  lockAdminRole?: boolean;
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
  const [email, setEmail] = useState(defaults?.email ?? "");
  const [cmp, setCmp] = useState(defaults?.cmp ?? "");
  const [selected, setSelected] = useState<RoleCode[]>(defaults?.roles ?? []);

  function toggle(role: RoleCode) {
    setSelected((current) => {
      if (lockAdminRole && role === "ADMINISTRADOR" && current.includes("ADMINISTRADOR")) {
        return current;
      }
      return current.includes(role)
        ? current.filter((item) => item !== role)
        : [...current, role];
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {state.error ? (
        <p role="alert" className="rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm">
          {state.error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
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
        <label className="block">
          <span className="eyebrow">Correo de trabajo</span>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
          />
        </label>
      </div>
      <fieldset>
        <legend className="eyebrow">Rol</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {roles.map((role) => {
            const checked = selected.includes(role.value);
            const locked = lockAdminRole && role.value === "ADMINISTRADOR" && checked;
            return (
              <label
                key={role.value}
                className="flex cursor-pointer gap-3 rounded-2xl border border-cream-200 bg-white px-4 py-3 has-[:checked]:border-gold has-[:checked]:bg-rose-blush"
              >
                <input
                  type="checkbox"
                  name="roles"
                  value={role.value}
                  checked={checked}
                  disabled={locked}
                  onChange={() => toggle(role.value)}
                  className="mt-1"
                />
                {locked ? <input type="hidden" name="roles" value="ADMINISTRADOR" /> : null}
                <span>
                  <span className="block font-serif">{role.title}</span>
                  <span className="text-sm text-ink-700">{role.text}</span>
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-ink-700">
          Se puede marcar uno o los dos. Al menos un rol es obligatorio.
          {lockAdminRole
            ? " El rol Administrador está fijo porque es la última persona con ese acceso."
            : ""}
        </p>
      </fieldset>
      <label className="block">
        <span className="eyebrow">CMP (solo si tiene el rol Médico)</span>
          <input
            name="cmp"
            inputMode="numeric"
            value={cmp}
            onChange={(event) => setCmp(event.target.value)}
            placeholder="Número de colegiatura"
            className="mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-gold-ink"
          />
      </label>
      <button className="btn-primary" type="submit" disabled={pending}>
        {pending ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
