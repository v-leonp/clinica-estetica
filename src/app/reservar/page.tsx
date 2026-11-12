import type { Metadata } from "next";
import { Suspense } from "react";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import BookingWizard from "~/components/BookingWizard";
import WhatsAppLink from "~/components/WhatsAppLink";
import { bookingCopy, bookingWhatsAppHref, site } from "~/data/content";
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
        title={bookingCopy.title}
        subtitle={bookingCopy.callFormLead}
      />
      <section className="container-x">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-gold/40 bg-white px-6 py-8 text-center shadow-soft">
          <p className="font-serif text-xl text-ink-900">
            Reserva más rápido por WhatsApp
          </p>
          <WhatsAppLink
            href={bookingWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5"
            linkLocation="booking"
          >
            Reservar por WhatsApp
          </WhatsAppLink>
        </div>
      </section>
      <Suspense fallback={<p className="container-x pb-16 text-sm">Cargando formulario…</p>}>
        <BookingWizard />
      </Suspense>
    </SiteShell>
  );
}
