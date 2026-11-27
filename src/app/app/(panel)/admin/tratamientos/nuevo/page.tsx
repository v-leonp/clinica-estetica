import type { Metadata } from "next";
import Link from "next/link";

import TreatmentForm from "~/components/app/TreatmentForm";
import { createTreatment } from "~/server/app/actions/treatments";

export const metadata: Metadata = {
  title: { absolute: "Añadir tratamiento · Área interna" },
  robots: { index: false, follow: false },
};

export default function NewTreatmentPage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-4xl uppercase">Añadir un tratamiento</h1>
          <Link href="/app/admin/tratamientos" className="btn-outline">
            Volver al listado
          </Link>
        </div>
        <p className="mt-3 text-ink-700">
          Nombre, categoría, duración estimada y una descripción interna. Al guardar queda activo.
        </p>
        <div className="mt-6 rounded-3xl border border-cream-200 bg-white p-6">
          <TreatmentForm action={createTreatment} submitLabel="Añadir al catálogo" />
        </div>
      </div>
      <aside className="space-y-4">
        <article className="rounded-3xl border border-cream-200 bg-white p-5 text-sm leading-relaxed text-ink-700">
          <h2 className="font-serif text-xl text-ink-900">Por qué no se borra</h2>
          <p className="mt-2">
            Desactivar lo saca de lo que se puede elegir a partir de ahora, pero conserva el nombre y
            la duración de lo que ya se usó.
          </p>
        </article>
        <article className="rounded-3xl border border-dashed border-gold/50 bg-rose-blush p-5 text-sm leading-relaxed">
          Sin precios. Este formulario no incluye tarifa ni la publica. Las tarifas no se publican y
          no forman parte de este modo.
        </article>
      </aside>
    </section>
  );
}
