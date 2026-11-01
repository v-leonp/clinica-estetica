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
  description: `Encuentra la sede de ${site.brand} más cercana en Lima: Miraflores, San Isidro y Surco. Teléfono, WhatsApp y horarios.`,
  alternates: { canonical: `${getSiteUrl()}/sedes` },
  openGraph: {
    title: `Sedes | ${site.brand}`,
    description: "Nuestras sedes en Miraflores, San Isidro y Surco.",
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
        eyebrow="Nuestras sedes"
        title="Encuéntranos en Lima"
        subtitle="Tres sedes en los distritos más convenientes de Lima. Agenda tu cita o escríbenos por WhatsApp."
      />

      <section className="section pt-4">
        <div className="container-x">
          <ul className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <article className="card flex h-full flex-col">
                  <div
                    aria-hidden="true"
                    className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-cream"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-32 w-32 rounded-full bg-gradient-rose opacity-70 blur-md" />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(31,26,23,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(31,26,23,0.08) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs text-ink-700">
                      Mapa referencial
                    </div>
                  </div>

                  <h2 className="mt-5 font-serif text-xl text-ink-900">
                    {l.name}
                  </h2>
                  <p className="mt-2 text-sm text-ink-700">{l.address}</p>

                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <dt className="w-20 shrink-0 text-ink-500">Teléfono</dt>
                      <dd>
                        <a
                          href={`tel:${l.phoneHref}`}
                          className="text-ink-900 hover:text-rose-gold"
                        >
                          {l.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <dt className="w-20 shrink-0 text-ink-500">WhatsApp</dt>
                      <dd>
                        <a
                          href={`https://wa.me/${l.whatsappHref}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-900 hover:text-rose-gold"
                        >
                          {l.whatsapp}
                        </a>
                      </dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <dt className="w-20 shrink-0 text-ink-500">Horario</dt>
                      <dd className="text-ink-900">{l.hours}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex-1" />
                  <a
                    href={l.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Ver en el mapa
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
