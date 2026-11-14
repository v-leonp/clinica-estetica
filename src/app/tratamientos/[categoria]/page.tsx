import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import CategoryIcon from "~/components/CategoryIcon";
import ClinicPhoto from "~/components/ClinicPhoto";
import WhatsAppLink from "~/components/WhatsAppLink";
import { RelatedLinks, VisibleFaq, WhatsAppCta } from "~/components/VisibleFaq";
import { photoForTreatment } from "~/data/clinic-photos";
import {
  bookingWhatsAppHref,
  catalogCardWhatsAppHref,
  catalogShowsPrices,
  categoriesFull,
  cta,
  getCategory,
  site,
  treatmentPromoBadge,
  type Treatment,
} from "~/data/content";
import { categorySeo } from "~/data/seo-copy";
import { getSiteUrl } from "~/lib/site-url";
import { faqPageJsonLd } from "~/lib/json-ld";

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
  const seo = categorySeo[cat.slug];
  const url = `${getSiteUrl()}/tratamientos/${cat.slug}`;
  const title = seo?.title ?? `${cat.title} en San Miguel | ${site.brand}`;
  const description = seo?.description ?? cat.short;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
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
  const seo = categorySeo[cat.slug];
  const groups = seo?.groups?.map((group) => ({
    heading: group.heading,
    treatments: group.slugs.map((slug) => {
      const treatment = cat.treatments.find((item) => item.slug === slug);
      if (!treatment) {
        throw new Error(`Tratamiento no publicado en ${cat.slug}: ${slug}`);
      }
      return treatment;
    }),
  }));

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tratamientos", href: "/tratamientos" },
          { label: cat.title },
        ]}
      />
      <PageHero
        eyebrow="Categoría"
        title={seo?.h1 ?? cat.title}
        subtitle={seo?.lead ?? cat.long}
      >
        <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-blush text-rose-gold">
          <CategoryIcon name={cat.icon} className="h-7 w-7" />
        </div>
      </PageHero>

      <section className="section pt-4">
        <div className="container-x">
          {groups ? (
            groups.map((group) => (
              <div key={group.heading} className="mt-12 first:mt-0">
                <h2 className="heading font-serif text-2xl text-ink-900">
                  {group.heading}
                </h2>
                <TreatmentGrid categorySlug={cat.slug} treatments={group.treatments} />
              </div>
            ))
          ) : (
            <>
              <h2 className="heading font-serif text-2xl text-ink-900">
                Tratamientos disponibles
              </h2>
              <TreatmentGrid categorySlug={cat.slug} treatments={cat.treatments} />
            </>
          )}
          {seo?.links ? <RelatedLinks links={seo.links} /> : null}
          {seo?.faqs ? (
            <>
              <h2 className="heading mt-10 font-serif text-2xl text-ink-900">
                Preguntas frecuentes
              </h2>
              <VisibleFaq items={seo.faqs} />
            </>
          ) : null}
          {seo?.whatsappCta ? (
            <WhatsAppCta
              href={bookingWhatsAppHref()}
              label={seo.whatsappCta}
              linkLocation="booking_cta"
            />
          ) : null}
        </div>
      </section>

      <FreeConsult />
      {seo?.faqs ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(seo.faqs)),
          }}
        />
      ) : null}
    </SiteShell>
  );
}

function TreatmentGrid({
  categorySlug,
  treatments,
}: {
  categorySlug: string;
  treatments: Treatment[];
}) {
  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2">
      {treatments.map((t) => (
        <li key={t.slug}>
          <article className="card flex h-full flex-col">
            <Link
              href={`/tratamientos/${categorySlug}/${t.slug}`}
              className="group block"
            >
              {photoForTreatment(t.slug, categorySlug) && (
                <ClinicPhoto
                  photo={photoForTreatment(t.slug, categorySlug)!}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="mb-5 rounded-xl"
                />
              )}
              <h3 className="heading mt-5 font-serif text-xl leading-snug text-ink-900 group-hover:text-rose-gold">
                {t.name}
              </h3>
            </Link>
            <p className="body-copy mt-2 flex-1 text-sm leading-relaxed text-ink-700">
              {t.cardText}
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
                href={`/tratamientos/${categorySlug}/${t.slug}`}
                className="btn-outline"
              >
                Ver detalle
              </Link>
              <WhatsAppLink
                href={catalogCardWhatsAppHref(t.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rose"
                linkLocation="catalog_card"
              >
                {cta.book.label}
              </WhatsAppLink>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
