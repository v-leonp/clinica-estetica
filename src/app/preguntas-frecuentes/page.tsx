import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FAQSection from "~/components/FAQSection";
import { globalFAQ } from "~/data/content";
import { supportSeo } from "~/data/seo-copy";
import { getSiteUrl } from "~/lib/site-url";
import { faqPageJsonLd } from "~/lib/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: supportSeo.preguntas.title },
  description: supportSeo.preguntas.description,
  alternates: { canonical: `${getSiteUrl()}/preguntas-frecuentes` },
  openGraph: {
    title: supportSeo.preguntas.title,
    description: supportSeo.preguntas.description,
    url: `${getSiteUrl()}/preguntas-frecuentes`,
  },
};

export default function FAQPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Preguntas frecuentes" },
        ]}
      />
      <PageHero
        eyebrow="Información"
        title="Preguntas frecuentes"
        subtitle="Información general. No sustituye una valoración médica presencial."
      />
      <FAQSection
        items={globalFAQ}
        showAllLink={false}
        title="Dudas sobre valoración, tratamientos y cómo llegar"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(globalFAQ)),
        }}
      />
    </SiteShell>
  );
}
