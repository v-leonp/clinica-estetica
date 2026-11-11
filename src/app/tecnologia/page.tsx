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
  description: `Técnicas y equipos que el catálogo de ${site.brand} nombra: láser ND:YAG, IPL o diodo, Dermapen y Fibroblast.`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${getSiteUrl()}/tecnologia` },
  openGraph: {
    title: `Tecnología | ${site.brand}`,
    description: "Solo lo que figura en el listado de tratamientos.",
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
        title="Lo que nombra el catálogo"
        subtitle="No publicamos equipos que no estén en el listado. Donde el documento no especifica marca, lo decimos."
      />

      <section className="section pt-4">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2">
            {technology.map((t, i) => (
              <li
                key={t.name}
                className="flex items-start gap-5 rounded-2xl border border-cream-200 bg-white p-5 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-900 font-serif text-cream-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="heading font-serif text-lg text-ink-900">{t.name}</h2>
                  <p className="mt-1 body-copy text-sm leading-relaxed text-ink-700">
                    {t.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
