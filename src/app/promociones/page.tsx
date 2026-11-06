import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import { catalogDisclaimer, promos, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Promociones",
  description: `Promoción publicada por ${site.brand}: toxina botulínica facial 2x1 para los primeros 50 clientes, a S/ 1,300.`,
  alternates: { canonical: `${getSiteUrl()}/promociones` },
  openGraph: {
    title: `Promociones | ${site.brand}`,
    description: "Toxina botulínica facial 2x1 para los primeros 50 clientes.",
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
        eyebrow="Promociones"
        title="Lo que está publicado"
        subtitle="No hay paquetes ni descuentos de ejemplo. La única promoción del listado es la toxina botulínica facial."
      />

      <section className="section pt-4">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-2">
            {promos.map((p) => (
              <li key={p.title}>
                <article className="relative h-full overflow-hidden rounded-2xl bg-ink-900 p-6 text-cream-50 shadow-soft">
                  <span className="relative inline-flex rounded-full bg-gold px-3 py-1 text-xs uppercase tracking-wider text-ink-900">
                    {p.tag}
                  </span>
                  <h2 className="heading relative mt-4 font-serif text-2xl leading-snug">{p.title}</h2>
                  {p.priceNow && (
                    <p className="price relative mt-3 text-3xl text-gold">{p.priceNow}</p>
                  )}
                  {p.sessionInfo && (
                    <p className="relative mt-2 text-xs uppercase tracking-wider text-cream-100/70">
                      {p.sessionInfo}
                    </p>
                  )}
                  <p className="relative mt-3 text-sm leading-relaxed text-cream-100/85">
                    {p.description}
                  </p>
                  <div className="relative mt-6">
                    <Link href={p.href} className="btn-rose">
                      {p.cta}
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-sm text-ink-700">{catalogDisclaimer}</p>
          <p className="mt-3 max-w-2xl text-sm text-ink-700">
            La política de reembolso del 10% con el que se separan algunas citas
            aún no está publicada.
          </p>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
