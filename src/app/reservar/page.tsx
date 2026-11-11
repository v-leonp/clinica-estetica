import type { Metadata } from "next";
import { Suspense } from "react";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import BookingWizard from "~/components/BookingWizard";
import { bookingCopy, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Reservar cita",
  description: `Reserva una cita con ${site.brand}. No es un diagnóstico en línea ni una cita confirmada.`,
  alternates: { canonical: `${getSiteUrl()}/reservar` },
};

export default function ReservarPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Reservar cita" },
        ]}
      />
      <PageHero
        eyebrow="Reserva"
        title={bookingCopy.title}
        subtitle={bookingCopy.callFormLead}
      />
      <Suspense fallback={<p className="container-x pb-16 text-sm">Cargando formulario…</p>}>
        <BookingWizard />
      </Suspense>
    </SiteShell>
  );
}
