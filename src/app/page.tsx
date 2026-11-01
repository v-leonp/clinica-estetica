import type { Metadata } from "next";

import Featured from "~/components/Featured";
import Doctors from "~/components/Doctors";
import Technology from "~/components/Technology";
import Locations from "~/components/Locations";
import SiteShell from "~/components/SiteShell";
import HomeReferenceHero from "~/components/home/HomeReferenceHero";
import PartnerBrandsBar from "~/components/home/PartnerBrandsBar";
import HomePromoOffers from "~/components/home/HomePromoOffers";
import HomeGiftBanner from "~/components/home/HomeGiftBanner";
import HomeValuePillars from "~/components/home/HomeValuePillars";
import HomeTreatmentStories from "~/components/home/HomeTreatmentStories";
import HomeReviews from "~/components/home/HomeReviews";
import HomeContactBlock from "~/components/home/HomeContactBlock";
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

/** Home inspirada en arquitectura clínica premium (layout referencia), contenido Lumina. */
export default function HomePage() {
  const jsonLd = medicalClinicJsonLd();

  return (
    <SiteShell>
      <HomeReferenceHero />
      <PartnerBrandsBar />
      <HomePromoOffers />
      <HomeGiftBanner />
      <HomeValuePillars />
      <HomeTreatmentStories />
      <Featured />
      <HomeReviews />
      <Doctors />
      <Technology />
      <Locations />
      <HomeContactBlock />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}
