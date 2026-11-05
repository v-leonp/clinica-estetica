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
        title="Condiciones de reserva"
        subtitle="Cancelación, reembolso del 10% y medios de pago todavía no están publicados."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>{bookingCopy.valuationCost}</p>
          <p>{bookingCopy.cancellation}</p>
          <p>
            Los medios de pago aún no están publicados. Enviar el formulario no
            reserva un horario: la solicitud queda pendiente hasta que te
            contactemos por WhatsApp.
          </p>
          <p>
            Si no podemos atender la fecha que prefieres, te propondremos otra.
            No hay una penalidad publicada por inasistencia.
          </p>
        </LegalProse>
      </section>
    </SiteShell>
  );
}
