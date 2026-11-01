import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import CategoryIcon from "~/components/CategoryIcon";
import { categoriesFull, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tratamientos",
  description: `Catálogo de tratamientos faciales, corporales, depilación láser y cirugía estética de ${site.brand}. Protocolos personalizados con médicos certificados en Lima.`,
  alternates: { canonical: `${getSiteUrl()}/tratamientos` },
  openGraph: {
    title: `Tratamientos | ${site.brand}`,
    description:
      "Catálogo completo: limpiezas, tratamientos faciales y corporales, depilación láser y cirugía estética.",
    url: `${getSiteUrl()}/tratamientos`,
  },
};

export default function TratamientosIndexPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tratamientos" },
        ]}
      />
      <PageHero
        eyebrow="Catálogo"
        title="Todos nuestros tratamientos"
        subtitle="Explora nuestras especialidades. Cada categoría agrupa los protocolos que trabajamos con tecnología de alta gama y acompañamiento médico."
      />

      <section className="section pt-4">
        <div className="container-x">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesFull.map((cat) => (
              <li key={cat.slug}>
                <article className="card flex h-full flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-blush text-rose-gold">
                    <CategoryIcon name={cat.icon} />
                  </div>
                  <h2 className="mt-5 font-serif text-xl text-ink-900">
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {cat.short}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-ink-500">
                    {cat.treatments.length} tratamientos
                  </p>
                  <ul className="mt-3 flex flex-1 flex-wrap gap-1.5 text-xs text-ink-700">
                    {cat.treatments.slice(0, 4).map((t) => (
                      <li
                        key={t.slug}
                        className="rounded-full bg-cream-100 px-2.5 py-1"
                      >
                        {t.name}
                      </li>
                    ))}
                    {cat.treatments.length > 4 && (
                      <li className="rounded-full bg-cream-100 px-2.5 py-1">
                        +{cat.treatments.length - 4} más
                      </li>
                    )}
                  </ul>
                  <Link
                    href={`/tratamientos/${cat.slug}`}
                    className="btn-outline mt-6 w-full"
                  >
                    Ver {cat.title.toLowerCase()}
                  </Link>
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
