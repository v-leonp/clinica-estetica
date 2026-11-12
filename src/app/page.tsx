import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import HomeVideoHero from "~/components/home/HomeVideoHero";
import HomeTreatmentsCatalog from "~/components/home/HomeTreatmentsCatalog";
import HomePromoOffers from "~/components/home/HomePromoOffers";
import { medicalClinicJsonLd } from "~/lib/json-ld";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { getSiteUrl } = await import("~/lib/site-url");
  const base = getSiteUrl();
  return {
    alternates: { canonical: base },
    openGraph: { url: base },
  };
}

export default function HomePage() {
  const jsonLd = medicalClinicJsonLd();

  return (
    <SiteShell>
      <HomeVideoHero />
      <HomeTreatmentsCatalog />
      <HomePromoOffers />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}
