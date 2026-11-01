import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FAQSection from "~/components/FAQSection";
import { globalFAQ, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";
import { faqPageJsonLd } from "~/lib/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: `Dudas sobre valoración, tratamientos y logística en ${site.brand}, Lima.`,
  alternates: { canonical: `${getSiteUrl()}/preguntas-frecuentes` },
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
      <FAQSection items={globalFAQ} showAllLink={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(globalFAQ)),
        }}
      />
    </SiteShell>
  );
}
