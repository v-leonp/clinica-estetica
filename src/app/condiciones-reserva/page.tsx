import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHero from "~/components/PageHero";
import LegalProse from "~/components/LegalProse";
import { bookingCopy } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Condiciones de reserva",
  alternates: { canonical: `${getSiteUrl()}/condiciones-reserva` },
};

export default function CondicionesReservaPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Condiciones de reserva" },
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Condiciones de reserva, cancelación y reprogramación"
        subtitle="Resumen orientativo. Debe adaptarse a la operación real de la clínica."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>{bookingCopy.valuationCost}</p>
          <p>{bookingCopy.cancellation}</p>
          <p>
            La solicitud en línea no garantiza un horario hasta recibir confirmación por
            parte del equipo. Si no podemos atender tu preferencia, te propondremos
            alternativas.
          </p>
          <p>
            Llega con 10 minutos de anticipación. Si no te presentas sin aviso, podríamos
            aplicar políticas de reprogramación [PENDIENTE DE VALIDACIÓN].
          </p>
        </LegalProse>
      </section>
    </SiteShell>
  );
}
