import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import CategoryIcon from "~/components/CategoryIcon";
import { categoriesFull, getCategory, site } from "~/data/content";
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
  return {
    title: cat.title,
    description: cat.short,
    alternates: { canonical: url },
    openGraph: {
      title: `${cat.title} | ${site.brand}`,
      description: cat.short,
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
          <h2 className="font-serif text-2xl text-ink-900">
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
                    <div
                      aria-hidden="true"
                      className="h-28 w-full rounded-xl bg-gradient-rose opacity-80 transition group-hover:opacity-100"
                    />
                    <h3 className="mt-5 font-serif text-xl text-ink-900 group-hover:text-rose-gold">
                      {t.name}
                    </h3>
                  </Link>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                    {t.short}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-ink-500">
                    <div>
                      <dt className="uppercase tracking-wider">Duración</dt>
                      <dd className="text-ink-900">{t.duration}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-wider">Sesiones</dt>
                      <dd className="text-ink-900">{t.sessions}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-900">
                      {t.priceFrom}
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link
                      href={`/tratamientos/${cat.slug}/${t.slug}`}
                      className="btn-outline"
                    >
                      Ver detalle
                    </Link>
                    <Link
                      href={`/contacto?tratamiento=${t.slug}`}
                      className="btn-rose"
                    >
                      Agendar
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
