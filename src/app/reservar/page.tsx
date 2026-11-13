import type { Metadata } from "next";
import { Suspense } from "react";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import BookingWizard from "~/components/BookingWizard";
import WhatsAppLink from "~/components/WhatsAppLink";
import { bookingCopy, bookingWhatsAppHref } from "~/data/content";
import { attendNeighbors, supportSeo } from "~/data/seo-copy";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: supportSeo.reservar.title },
  description: supportSeo.reservar.description,
  alternates: { canonical: `${getSiteUrl()}/reservar` },
  openGraph: {
    title: supportSeo.reservar.title,
    description: supportSeo.reservar.description,
    url: `${getSiteUrl()}/reservar`,
  },
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
      >
        <p className="body-copy mt-4 max-w-2xl text-base leading-relaxed text-ink-700">
          {attendNeighbors}
        </p>
      </PageHero>
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
