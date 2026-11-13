import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import HomeVideoHero from "~/components/home/HomeVideoHero";
import HomeTreatmentsCatalog from "~/components/home/HomeTreatmentsCatalog";
import HomePromoOffers from "~/components/home/HomePromoOffers";
import HomeLocation from "~/components/home/HomeLocation";
import { homeSeo } from "~/data/seo-copy";
import { faqPageJsonLd, medicalClinicJsonLd } from "~/lib/json-ld";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { getSiteUrl } = await import("~/lib/site-url");
  const base = getSiteUrl();
  return {
    title: { absolute: homeSeo.title },
    description: homeSeo.description,
    alternates: { canonical: base },
    openGraph: {
      title: homeSeo.title,
      description: homeSeo.description,
      url: base,
    },
  };
}

export default function HomePage() {
  const jsonLd = medicalClinicJsonLd();

  return (
    <SiteShell>
      <HomeVideoHero />
      <HomeTreatmentsCatalog />
      <HomePromoOffers />
      <HomeLocation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(homeSeo.faqs)),
        }}
      />
    </SiteShell>
  );
}
