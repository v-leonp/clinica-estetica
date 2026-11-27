import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ConfirmDeactivate from "~/components/app/ConfirmDeactivate";
import Notice from "~/components/app/Notice";
import TreatmentForm from "~/components/app/TreatmentForm";
import {
  deactivateTreatment,
  reactivateTreatment,
  updateTreatment,
} from "~/server/app/actions/treatments";
import { treatmentService } from "~/server/app/services";
import { requireActor } from "~/server/auth/session";

export const metadata: Metadata = {
  title: { absolute: "Editar tratamiento · Área interna" },
  robots: { index: false, follow: false },
};

export default async function EditTreatmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aviso?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const actor = await requireActor();
  const all = await treatmentService.list(actor);
  const treatment = all.treatments.find((item) => item.id === id);
  if (!treatment) notFound();
  const save = updateTreatment.bind(null, treatment.id);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-4xl uppercase">Crear o editar un tratamiento</h1>
            <p className="mt-2 text-ink-700">
              Quitar un tratamiento es desactivarlo, para mantener el registro de lo ya usado.
            </p>
          </div>
          <Link href="/app/admin/tratamientos" className="btn-outline">
            Volver al listado
          </Link>
        </div>
        <div className="mt-6">
          <Notice aviso={query.aviso} error={query.error} />
        </div>
        <div className="rounded-3xl border border-cream-200 bg-white p-6">
          <p className="text-sm text-gold-ink">Ya está en el catálogo</p>
          <div className="mt-4">
            <TreatmentForm
              action={save}
              submitLabel="Guardar cambios"
              defaults={{
                name: treatment.name,
                category: treatment.category,
                estimatedMinutes: treatment.estimatedMinutes,
                internalDescription: treatment.internalDescription,
              }}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-cream-200 pt-6">
            {treatment.active ? (
              <ConfirmDeactivate
                action={deactivateTreatment}
                id={treatment.id}
                trigger="Desactivar"
                title={`¿Desactivar «${treatment.name}»?`}
                description="Dejará de aparecer para usos nuevos. El registro se conserva y se puede volver a activar."
              />
            ) : (
              <form action={reactivateTreatment}>
                <input type="hidden" name="id" value={treatment.id} />
                <button className="btn-outline" type="submit">
                  Activar
                </button>
              </form>
            )}
            <button type="button" disabled className="btn-outline cursor-not-allowed opacity-50">
              Eliminar tratamiento
            </button>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            «Eliminar» queda apagado a propósito. Un tratamiento que ya se usó no se borra del sistema.
          </p>
        </div>
      </div>
      <aside className="rounded-3xl border border-dashed border-gold/50 bg-rose-blush p-5 text-sm leading-relaxed">
        Sin precios. Este formulario no incluye tarifa, ni la publica ni la interna. Las tarifas no
        se publican y no forman parte de este modo.
      </aside>
    </section>
  );
}
