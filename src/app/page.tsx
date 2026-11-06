import type { Metadata } from "next";

import Featured from "~/components/Featured";
import Doctors from "~/components/Doctors";
import Technology from "~/components/Technology";
import Locations from "~/components/Locations";
import SiteShell from "~/components/SiteShell";
import HomeVideoHero from "~/components/home/HomeVideoHero";
import HomeCategories from "~/components/home/HomeCategories";
import HomePromoOffers from "~/components/home/HomePromoOffers";
import HomeValuePillars from "~/components/home/HomeValuePillars";
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

export default function HomePage() {
  const jsonLd = medicalClinicJsonLd();

  return (
    <SiteShell>
      <HomeVideoHero />
      <HomeCategories />
      <Featured />
      <HomePromoOffers />
      <Doctors />
      <HomeValuePillars />
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
