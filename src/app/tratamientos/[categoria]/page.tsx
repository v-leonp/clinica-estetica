import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import CategoryIcon from "~/components/CategoryIcon";
import ClinicPhoto from "~/components/ClinicPhoto";
import { photoForCategory } from "~/data/clinic-photos";
import {
  catalogShowsPrices,
  categoriesFull,
  cta,
  getCategory,
  site,
  treatmentPromoBadge,
} from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { categoria: string };

export function generateStaticParams(): Params[] {
  return categoriesFull.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return { title: "Tratamiento no encontrado" };
  const url = `${getSiteUrl()}/tratamientos/${cat.slug}`;
  const seoDescription = `${cat.short} Clínica en Lima, Perú. ${site.brand}.`;
  return {
    title: `${cat.title} en Lima | ${site.brand}`,
    description: seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${cat.title} en Lima | ${site.brand}`,
      description: seoDescription,
      url,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tratamientos", href: "/tratamientos" },
          { label: cat.title },
        ]}
      />
      <PageHero eyebrow="Categoría" title={cat.title} subtitle={cat.long}>
        <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-blush text-rose-gold">
          <CategoryIcon name={cat.icon} className="h-7 w-7" />
        </div>
      </PageHero>

      <section className="section pt-4">
        <div className="container-x">
          <h2 className="heading font-serif text-2xl text-ink-900">
            Tratamientos disponibles
          </h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {cat.treatments.map((t) => (
              <li key={t.slug}>
                <article className="card flex h-full flex-col">
                  <Link
                    href={`/tratamientos/${cat.slug}/${t.slug}`}
                    className="group block"
                  >
                    {photoForCategory(cat.slug) && (
                      <ClinicPhoto
                        photo={photoForCategory(cat.slug)!}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="mb-5 rounded-xl"
                      />
                    )}
                    <h3 className="heading mt-5 font-serif text-xl leading-snug text-ink-900 group-hover:text-rose-gold">
                      {t.name}
                    </h3>
                  </Link>
                  <p className="body-copy mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                    {t.short}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-ink-500">
                    <div>
                      <dt className="uppercase tracking-wider">Duración</dt>
                      <dd className="text-ink-900">{t.duration}</dd>
                    </div>
                    {t.sessions ? (
                      <div>
                        <dt className="uppercase tracking-wider">Sesiones</dt>
                        <dd className="text-ink-900">{t.sessions}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {treatmentPromoBadge(t.slug) ? (
                    <p className="mt-4 rounded-lg border border-gold/40 bg-cream-100/80 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gold-ink">
                      {treatmentPromoBadge(t.slug)}
                    </p>
                  ) : catalogShowsPrices ? (
                    <div className="mt-5 text-sm">
                      <span className="price text-ink-900">{t.priceFrom}</span>
                    </div>
                  ) : null}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link
                      href={`/tratamientos/${cat.slug}/${t.slug}`}
                      className="btn-outline"
                    >
                      Ver detalle
                    </Link>
                    <Link
                      href={`/reservar?tratamiento=${t.slug}`}
                      className="btn-rose"
                    >
                      {cta.book.label}
                    </Link>
                  </div>
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
