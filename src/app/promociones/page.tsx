import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import { promos, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Promociones del mes",
  description: `Promociones vigentes en ${site.brand}: descuentos y paquetes en tratamientos faciales, corporales y depilación láser.`,
  alternates: { canonical: `${getSiteUrl()}/promociones` },
  openGraph: {
    title: `Promociones del mes | ${site.brand}`,
    description: "Descuentos y paquetes exclusivos vigentes este mes.",
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
        eyebrow="Promociones del mes"
        title="Beneficios exclusivos vigentes"
        subtitle="Promociones limitadas en nuestros tratamientos más solicitados. Consulta con nuestras asesoras para reservar tu cupo."
      />

      <section className="section pt-4">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-3">
            {promos.map((p) => (
              <li key={p.title}>
                <article className="relative h-full overflow-hidden rounded-2xl bg-ink-900 p-6 text-cream-50 shadow-soft">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-rose opacity-40 blur-2xl"
                  />
                  <span className="relative inline-flex rounded-full bg-rose-gold/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                    {p.tag}
                  </span>
                  <h2 className="relative mt-4 font-serif text-2xl">
                    {p.title}
                  </h2>
                  <p className="relative mt-3 text-sm leading-relaxed text-cream-100/85">
                    {p.description}
                  </p>
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    <Link
                      href={p.href}
                      className="btn-outline border-cream-100/40 text-cream-50 hover:border-rose-blush hover:text-rose-blush"
                    >
                      {p.cta}
                    </Link>
                    <Link
                      href="/contacto"
                      className="btn-rose"
                    >
                      Agendar
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-sm text-ink-500">
            * Promociones ilustrativas. Las condiciones específicas, fechas de
            vigencia y stock se confirman con nuestras asesoras al momento de
            agendar.
          </p>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
