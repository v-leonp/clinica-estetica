import type { Metadata } from "next";

import Doctors from "~/components/Doctors";
import SiteShell from "~/components/SiteShell";
import HomeVideoHero from "~/components/home/HomeVideoHero";
import HomePartnerBrandsCarousel from "~/components/home/HomePartnerBrandsCarousel";
import HomeTreatmentsCatalog from "~/components/home/HomeTreatmentsCatalog";
import HomePromoOffers from "~/components/home/HomePromoOffers";
import HomeValuePillars from "~/components/home/HomeValuePillars";
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
      <HomePartnerBrandsCarousel />
      <HomeTreatmentsCatalog />
      <HomePromoOffers />
      <Doctors />
      <HomeValuePillars />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}
