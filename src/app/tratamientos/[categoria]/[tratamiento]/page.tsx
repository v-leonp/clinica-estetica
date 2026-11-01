import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import {
  allTreatments,
  getTreatment,
  site,
} from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

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
  return {
    title: treatment.name,
    description: treatment.short,
    alternates: { canonical: url },
    openGraph: {
      title: `${treatment.name} | ${site.brand}`,
      description: treatment.short,
      url,
    },
  };
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
  const bookHref = `/contacto?tratamiento=${treatment.slug}`;
  const waText = encodeURIComponent(
    `Hola ${site.brand}, me interesa el tratamiento "${treatment.name}". ¿Me podrían dar más información?`,
  );
  const waHref = `https://wa.me/${site.whatsappNumber}?text=${waText}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.short,
    url: `${getSiteUrl()}/tratamientos/${category.slug}/${treatment.slug}`,
    procedureType: "https://schema.org/NonInvasiveProcedure",
    bodyLocation: category.title,
  };

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
        title={treatment.name}
        subtitle={treatment.short}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href={bookHref} className="btn-primary">
            Agenda tu consulta
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Consultar por WhatsApp
          </a>
          <span className="rounded-full bg-cream-100 px-4 py-2 text-sm text-ink-900">
            {treatment.priceFrom}
          </span>
        </div>
      </PageHero>

      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="font-serif text-2xl text-ink-900">
              Sobre el tratamiento
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {treatment.long}
            </p>

            <h3 className="mt-10 font-serif text-xl text-ink-900">
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

            <h3 className="mt-10 font-serif text-xl text-ink-900">
              ¿Para quién es?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {treatment.whoFor}
            </p>

            <h3 className="mt-10 font-serif text-xl text-ink-900">
              Preguntas frecuentes
            </h3>
            <div className="mt-4 divide-y divide-cream-200 overflow-hidden rounded-2xl border border-cream-200 bg-white">
              {treatment.faq.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-ink-900">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 text-rose-gold transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
              <p className="eyebrow">Información del tratamiento</p>
              <dl className="mt-5 space-y-5">
                <InfoRow label="Duración" value={treatment.duration} />
                <InfoRow label="Sesiones" value={treatment.sessions} />
                <InfoRow label="Recuperación" value={treatment.recovery} />
                <InfoRow label="Precio" value={treatment.priceFrom} />
                <InfoRow label="Categoría" value={category.title} />
              </dl>

              <Link href={bookHref} className="btn-primary mt-7 w-full">
                Agenda tu consulta
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-3 w-full"
              >
                WhatsApp
              </a>

              <p className="mt-5 text-xs text-ink-500">
                Los precios son referenciales y pueden variar según evaluación
                médica.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <h2 className="font-serif text-2xl text-ink-900">
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
                    <h3 className="font-serif text-lg text-ink-900">
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

      <FreeConsult />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cream-200 pb-4 last:border-b-0 last:pb-0">
      <dt className="text-xs uppercase tracking-wider text-ink-500">{label}</dt>
      <dd className="text-right text-sm text-ink-900">{value}</dd>
    </div>
  );
}
