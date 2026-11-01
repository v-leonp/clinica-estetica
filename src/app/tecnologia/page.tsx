import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import { site, technology } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tecnología",
  description: `Equipos de alta gama en ${site.brand}: láser diodo, radiofrecuencia fraccionada, criolipólisis, HIFU y más. Marcas aprobadas por FDA.`,
  alternates: { canonical: `${getSiteUrl()}/tecnologia` },
  openGraph: {
    title: `Tecnología | ${site.brand}`,
    description:
      "Equipos de última generación aprobados por autoridades internacionales.",
    url: `${getSiteUrl()}/tecnologia`,
  },
};

export default function TecnologiaPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tecnología" },
        ]}
      />
      <PageHero
        eyebrow="Tecnología"
        title="Equipos de alta gama para resultados eficaces y seguros"
        subtitle="Invertimos continuamente en tecnología aprobada por autoridades internacionales para ofrecerte protocolos de vanguardia y una experiencia confortable."
      />

      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div
              aria-hidden="true"
              className="aspect-square overflow-hidden rounded-3xl bg-gradient-cream md:aspect-[4/5]"
            >
              <div className="flex h-full items-center justify-center">
                <div className="h-40 w-40 rounded-full bg-gradient-rose opacity-80 blur-xl" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cream-200 bg-white p-6">
              <h2 className="font-serif text-lg text-ink-900">
                Protocolos combinados
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                Nuestras especialistas combinan varias tecnologías para potenciar
                resultados y adaptarlos a cada paciente, siempre bajo supervisión
                médica.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <ul className="space-y-5">
              {technology.map((t, i) => (
                <li
                  key={t.name}
                  className="flex items-start gap-5 rounded-2xl border border-cream-200 bg-white p-5 shadow-soft"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-gold font-serif text-cream-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-ink-900">{t.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">
                      {t.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
