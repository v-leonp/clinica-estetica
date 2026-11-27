import type { Metadata } from "next";
import Link from "next/link";

import { can } from "~/server/app/domain/permissions";
import { requireActor } from "~/server/auth/session";

export const metadata: Metadata = {
  title: { absolute: "Área médica · en construcción" },
  robots: { index: false, follow: false },
};

export default async function MedicoPage() {
  const actor = await requireActor();

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-cream-200 bg-white p-8 shadow-soft">
      <p className="eyebrow">Rol Médico</p>
      <h1 className="mt-3 font-serif text-3xl normal-case">Módulo en construcción (Sprint 2)</h1>
      <p className="mt-4 leading-relaxed text-ink-700">
        {actor.name}, el espacio de historias clínicas, citas y pacientes todavía no está disponible.
        En este sprint el médico solo confirma que su acceso funciona.
      </p>
      {can(actor.roles, "users.manage") ? (
        <p className="mt-6">
          <Link href="/app/admin/usuarios" className="btn-primary">
            Ir al modo administrador
          </Link>
        </p>
      ) : null}
    </section>
  );
}
