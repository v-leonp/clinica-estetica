import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import WhatsAppLink from "~/components/WhatsAppLink";
import { bookingWhatsAppHref, catalogDisclaimer, promoPage, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Promociones",
  description: `Promociones de ${site.brand}: 2x1 en toxina botulínica facial para los primeros 50 pacientes, previa evaluación médica.`,
  alternates: { canonical: `${getSiteUrl()}/promociones` },
  openGraph: {
    title: `Promociones | ${site.brand}`,
    description:
      "2x1 en toxina botulínica facial para los primeros 50 pacientes, previa evaluación médica.",
    url: `${getSiteUrl()}/promociones`,
  },
};

export default function PromocionesPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Promociones" },
        ]}
      />
      <PageHero
        eyebrow={promoPage.eyebrow}
        title={promoPage.title}
        subtitle={promoPage.intro}
      />

      <section className="section pt-4">
        <div className="container-x">
          <article className="max-w-xl rounded-2xl bg-ink-900 p-6 text-cream-50 shadow-soft sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-gold">{promoPage.badge}</p>
            <h2 className="heading mt-4 font-serif text-2xl leading-snug sm:text-3xl">
              {promoPage.offerTitle}
            </h2>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-cream-100/90">
              {promoPage.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <WhatsAppLink
              href={bookingWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rose mt-6 uppercase tracking-[0.12em]"
              linkLocation="promociones"
            >
              {promoPage.cta}
            </WhatsAppLink>
          </article>

          <p className="mt-10 max-w-2xl text-sm text-ink-700">{catalogDisclaimer}</p>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
