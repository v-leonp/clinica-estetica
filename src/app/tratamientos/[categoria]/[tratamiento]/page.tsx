import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import TreatmentLeadCta from "~/components/TreatmentLeadCta";
import WhatsAppLink from "~/components/WhatsAppLink";
import { RelatedLinks, VisibleFaq } from "~/components/VisibleFaq";
import {
  allTreatments,
  careProcess,
  catalogDisclaimer,
  catalogShowsPrices,
  getTreatment,
  site,
  treatmentPromoBadge,
  type Treatment,
} from "~/data/content";
import { treatmentSeo } from "~/data/seo-copy";
import { getSiteUrl } from "~/lib/site-url";
import { faqPageJsonLd, medicalProcedureJsonLd } from "~/lib/json-ld";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { categoria: string; tratamiento: string };

export function generateStaticParams(): Params[] {
  return allTreatments.map(({ category, treatment }) => ({
    categoria: category.slug,
    tratamiento: treatment.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { categoria, tratamiento } = await params;
  const match = getTreatment(categoria, tratamiento);
  if (!match) return { title: "Tratamiento no encontrado" };

  const { category, treatment } = match;
  const url = `${getSiteUrl()}/tratamientos/${category.slug}/${treatment.slug}`;
  const title = treatmentPageTitle(treatment);
  const description = treatmentPageDescription(treatment);
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

function treatmentPageTitle(treatment: Treatment): string {
  return (
    treatmentSeo[treatment.slug]?.title ??
    `${treatment.name} en Lima | ${site.brand}`
  );
}

function treatmentPageDescription(treatment: Treatment): string {
  return treatmentSeo[treatment.slug]?.description ?? treatment.short;
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { categoria, tratamiento } = await params;
  const match = getTreatment(categoria, tratamiento);
  if (!match) notFound();

  const { category, treatment } = match;
  const seo = treatmentSeo[treatment.slug];
  const faqs = [...(seo?.faqs ?? []), ...treatment.faq];
  const whatsappLabel = seo?.whatsappCta ?? "Consultar por WhatsApp";
  const bookHref = `/reservar?tratamiento=${treatment.slug}`;
  const waText = encodeURIComponent(
    `Hola ${site.brand}, me interesa el tratamiento "${treatment.name}". ¿Me podrían dar más información?`,
  );
  const waHref = `https://wa.me/${site.whatsappNumber}?text=${waText}`;

  const jsonLd = medicalProcedureJsonLd({
    name: treatment.name,
    description: treatment.short,
    url: `${getSiteUrl()}/tratamientos/${category.slug}/${treatment.slug}`,
    bodyLocation: category.title,
  });
  const faqLd = faqPageJsonLd(faqs);

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Tratamientos", href: "/tratamientos" },
          { label: category.title, href: `/tratamientos/${category.slug}` },
          { label: treatment.name },
        ]}
      />

      <PageHero
        eyebrow={category.title}
        title={seo?.h1 ?? treatment.name}
        subtitle={seo?.heroSubtitle ?? treatment.short}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href={bookHref} className="btn-primary">
            Reservar cita
          </Link>
          <WhatsAppLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            linkLocation="treatment_page"
          >
            {whatsappLabel}
          </WhatsAppLink>
          {treatmentPromoBadge(treatment.slug) ? (
            <span className="rounded-full border border-gold/50 bg-cream-100 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gold-ink">
              {treatmentPromoBadge(treatment.slug)}
            </span>
          ) : catalogShowsPrices ? (
            <span className="price rounded-full bg-cream-100 px-4 py-2 text-sm text-ink-900">
              {treatment.priceFrom}
            </span>
          ) : null}
        </div>
      </PageHero>

      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="heading font-serif text-2xl text-ink-900">
              Sobre el tratamiento
            </h2>
            {seo?.lead?.map((paragraph) => (
              <p
                key={paragraph}
                className="body-copy mt-3 text-base leading-relaxed text-ink-700"
              >
                {paragraph}
              </p>
            ))}
            {seo?.locationLine ? (
              <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">
                {seo.locationLine}
              </p>
            ) : null}
            <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">
              {treatment.long}
            </p>
            {seo?.notes?.map((note) => (
              <div key={note.heading}>
                <h3 className="heading mt-10 font-serif text-xl text-ink-900">
                  {note.heading}
                </h3>
                <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">
                  {note.text}
                </p>
              </div>
            ))}

            <h3 className="heading mt-10 font-serif text-xl text-ink-900">
              Beneficios
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {treatment.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-cream-200 bg-white p-4 text-sm text-ink-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-blush text-rose-gold"
                  >
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h3 className="heading mt-10 font-serif text-xl text-ink-900">Proceso de atención</h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {careProcess.map((step) => (
                <li
                  key={step.step}
                  className="rounded-xl border border-cream-200 bg-cream-50/80 p-4 text-sm text-ink-700"
                >
                  <span className="font-serif text-rose-gold">{step.step}</span>
                  <p className="heading mt-1 font-serif text-sm text-ink-900">{step.title}</p>
                  <p className="body-copy mt-1 leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>

            <h3 className="heading mt-10 font-serif text-xl text-ink-900">
              Antes de decidir
            </h3>
            <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">
              {catalogDisclaimer} La respuesta de cada persona es individual.
            </p>
            {treatment.offer && (
              <p className="body-copy mt-3 rounded-xl border border-gold/40 bg-cream-50 p-4 text-sm leading-relaxed text-ink-700">
                {treatment.offer}
              </p>
            )}

            <h3 className="heading mt-10 font-serif text-xl text-ink-900">
              ¿Para quién puede ser adecuado?
            </h3>
            <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">
              {treatment.whoFor}
            </p>

            <h3 className="heading mt-10 font-serif text-xl text-ink-900">
              Preguntas frecuentes
            </h3>
            <VisibleFaq items={faqs} />
            {seo?.links ? <RelatedLinks links={seo.links} /> : null}
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
              <p className="eyebrow">Información del tratamiento</p>
              <dl className="mt-5 space-y-5">
                <InfoRow label="Duración" value={treatment.duration} />
                {treatment.sessions ? (
                  <InfoRow label="Sesiones" value={treatment.sessions} />
                ) : null}
                {treatment.recovery ? (
                  <InfoRow label="Recuperación" value={treatment.recovery} />
                ) : null}
                {catalogShowsPrices ? (
                  <InfoRow label="Precio" value={treatment.priceFrom} price />
                ) : null}
                {treatment.brands ? (
                  <InfoRow label="Producto" value={treatment.brands} />
                ) : null}
                <InfoRow label="Categoría" value={category.title} />
              </dl>

              <Link href={bookHref} className="btn-primary mt-7 w-full">
                Reservar cita
              </Link>
              <WhatsAppLink
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-3 w-full"
                linkLocation="treatment_page"
              >
                {seo?.whatsappCta ?? "WhatsApp"}
              </WhatsAppLink>

              <p className="mt-5 text-xs text-ink-500">{catalogDisclaimer}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <h2 className="heading font-serif text-2xl leading-tight text-ink-900">
            Otros tratamientos en {category.title.toLowerCase()}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.treatments
              .filter((t) => t.slug !== treatment.slug)
              .slice(0, 3)
              .map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tratamientos/${category.slug}/${t.slug}`}
                    className="card block h-full"
                  >
                    <h3 className="heading font-serif text-lg leading-snug text-ink-900">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-700">{t.short}</p>
                    <p className="mt-3 text-sm font-medium text-rose-gold">
                      Ver más →
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <TreatmentLeadCta
        treatmentName={treatment.name}
        treatmentSlug={treatment.slug}
        whatsappLabel={seo?.whatsappCta ?? "WhatsApp"}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </SiteShell>
  );
}

function InfoRow({
  label,
  value,
  price = false,
}: {
  label: string;
  value: string;
  price?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cream-200 pb-4 last:border-b-0 last:pb-0">
      <dt className="text-xs uppercase tracking-wider text-ink-500">{label}</dt>
      <dd
        className={`min-w-0 text-right text-sm text-ink-900 ${price ? "price" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
