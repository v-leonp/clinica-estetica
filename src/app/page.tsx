import type { Metadata } from "next";

import FreeConsult from "~/components/FreeConsult";
import PromoPopup from "~/components/PromoPopup";
import SiteShell from "~/components/SiteShell";
import HomeDoctorIntro from "~/components/home/HomeDoctorIntro";
import HomeLocation from "~/components/home/HomeLocation";
import HomeTreatmentsCatalog from "~/components/home/HomeTreatmentsCatalog";
import HomeVideoHero from "~/components/home/HomeVideoHero";
import HomeWhyUs from "~/components/home/HomeWhyUs";
import { homeSeo } from "~/data/seo-copy";
import { medicalClinicJsonLd } from "~/lib/json-ld";

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
      <PromoPopup />
      <HomeVideoHero />
      <HomeDoctorIntro />
      <HomeTreatmentsCatalog />
      <HomeWhyUs />
      <HomeLocation />
      <FreeConsult />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}
