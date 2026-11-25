import type { Metadata } from "next";
import Link from "next/link";

import ConfirmDeactivate from "~/components/app/ConfirmDeactivate";
import Notice from "~/components/app/Notice";
import { withQuery } from "~/components/app/format";
import { deactivateTreatment, reactivateTreatment } from "~/server/app/actions/treatments";
import { TREATMENT_CATEGORIES } from "~/server/app/domain/treatment-rules";
import { treatmentService } from "~/server/app/services";
import { requireActor } from "~/server/auth/session";

export const metadata: Metadata = {
  title: { absolute: "Tratamientos · Área interna" },
  robots: { index: false, follow: false },
};

export default async function TreatmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string; estado?: string; aviso?: string; error?: string }>;
}) {
  const query = await searchParams;
  const actor = await requireActor();
  const result = await treatmentService.list(actor, {
    query: query.q,
    category: query.categoria,
    status: query.estado === "activos" ? "active" : query.estado === "inactivos" ? "inactive" : "all",
  });

  const chips = [
    { id: "todos", label: "Todos", patch: { categoria: undefined, estado: undefined } },
    ...TREATMENT_CATEGORIES.map((category) => ({
      id: category,
      label: category,
      patch: { categoria: category, estado: undefined },
    })),
    { id: "activos", label: "Activos", patch: { categoria: undefined, estado: "activos" } },
    { id: "inactivos", label: "Inactivos", patch: { categoria: undefined, estado: "inactivos" } },
  ];
  const current = query.estado || query.categoria || "todos";

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl uppercase">Tratamientos</h1>
          <p className="mt-2 max-w-2xl text-ink-700">
            El listado que la clínica puede ofrecer. Añadir uno nuevo o retirar uno que ya no se use.
            Retirar es desactivarlo, no borrar.
          </p>
        </div>
        <Link href="/app/admin/tratamientos/nuevo" className="btn-primary">
          Añadir tratamiento
        </Link>
      </div>
      <div className="mt-6">
        <Notice aviso={query.aviso} error={query.error} />
      </div>
      <div className="mt-2 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="En el catálogo" value={String(result.stats.total)} hint="Datos internos" />
        <Stat label="Activos" value={String(result.stats.active)} hint="Disponibles para usar" />
        <Stat label="Inactivos" value={String(result.stats.inactive)} hint="Ya no se ofrece; el registro queda" />
        <Stat label="Precios" value="No" hint="No se cargan ni se muestran aquí" />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Link
              key={chip.id}
              href={withQuery("/app/admin/tratamientos", { q: query.q }, chip.patch)}
              className={
                current === chip.id
                  ? "rounded-full bg-ink-900 px-4 py-2 text-sm text-cream-50"
                  : "rounded-full border border-cream-200 bg-white px-4 py-2 text-sm text-ink-700"
              }
            >
              {chip.label}
            </Link>
          ))}
        </div>
        <form action="/app/admin/tratamientos" className="w-full sm:w-72">
          {query.categoria ? <input type="hidden" name="categoria" value={query.categoria} /> : null}
          {query.estado ? <input type="hidden" name="estado" value={query.estado} /> : null}
          <label className="sr-only" htmlFor="buscar-tratamiento">
            Buscar tratamiento
          </label>
          <input
            id="buscar-tratamiento"
            name="q"
            defaultValue={query.q ?? ""}
            placeholder="Buscar tratamiento…"
            className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-ink"
          />
        </form>
      </div>
      <div className="mt-4 overflow-x-auto rounded-3xl border border-cream-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-gold-ink">
            <tr>
              <th className="px-4 py-3 font-normal">Nombre</th>
              <th className="px-4 py-3 font-normal">Categoría</th>
              <th className="px-4 py-3 font-normal">Duración estimada</th>
              <th className="px-4 py-3 font-normal">Estado</th>
              <th className="px-4 py-3 font-normal"> </th>
            </tr>
          </thead>
          <tbody>
            {result.treatments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-ink-700">
                  El catálogo interno está vacío. Añade un tratamiento. Aquí no se cargan precios.
                </td>
              </tr>
            ) : (
              result.treatments.map((treatment) => (
                <tr key={treatment.id} className="border-t border-cream-100">
                  <td className="px-4 py-3">{treatment.name}</td>
                  <td className="px-4 py-3">{treatment.category}</td>
                  <td className="px-4 py-3">{treatment.estimatedMinutes} min</td>
                  <td className="px-4 py-3">{treatment.active ? "Activo" : "Inactivo"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/app/admin/tratamientos/${treatment.id}`} className="btn-outline px-4 py-2">
                        Editar
                      </Link>
                      {treatment.active ? (
                        <ConfirmDeactivate
                          action={deactivateTreatment}
                          id={treatment.id}
                          trigger="Desactivar"
                          title={`¿Desactivar «${treatment.name}»?`}
                          description="Dejará de aparecer para usos nuevos. El registro de lo ya usado se conserva. Esta acción se puede revertir más adelante."
                        />
                      ) : (
                        <form action={reactivateTreatment}>
                          <input type="hidden" name="id" value={treatment.id} />
                          <button className="btn-outline px-4 py-2" type="submit">
                            Activar
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-700">
        No hay columna de precio: la clínica no publica tarifas y este listado tampoco las guarda.
      </p>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-2xl border border-cream-200 bg-white p-4">
      <p className="text-sm text-ink-700">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
      <p className="mt-1 text-sm text-ink-500">{hint}</p>
    </article>
  );
}
