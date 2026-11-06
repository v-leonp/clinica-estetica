import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import { locations, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sedes",
  description: `La sede de ${site.brand} en Lima aún no está publicada.`,
  alternates: { canonical: `${getSiteUrl()}/sedes` },
  openGraph: {
    title: `Sedes | ${site.brand}`,
    description: "Dirección y horario por confirmar.",
    url: `${getSiteUrl()}/sedes`,
  },
};

export default function SedesPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Sedes" },
        ]}
      />
      <PageHero
        eyebrow="Sedes"
        title="Próximamente en Lima"
        subtitle="La dirección, el mapa y el horario todavía no están confirmados. La clínica aún no abre."
      />

      <section className="section pt-4">
        <div className="container-x">
          {locations.length === 0 ? (
            <article className="max-w-2xl rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
              <h2 className="heading font-serif text-2xl text-ink-900">Sin sede publicada</h2>
              <p className="mt-3 body-copy text-sm leading-relaxed text-ink-700">
                Cuando exista una dirección, aparecerá en esta página. Mientras
                tanto puedes escribir por WhatsApp.
              </p>
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                Escríbenos por WhatsApp
              </a>
              <p className="mt-3 text-xs text-gold-ink">{site.whatsappNote}</p>
            </article>
          ) : (
            <ul className="grid gap-8 lg:grid-cols-3">
              {locations.map((l) => (
                <li key={l.slug}>
                  <article className="card">
                    <h2 className="heading font-serif text-xl text-ink-900">{l.name}</h2>
                    <p className="mt-2 text-sm text-ink-700">{l.address}</p>
                    <p className="mt-2 text-sm text-ink-700">{l.hours}</p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
