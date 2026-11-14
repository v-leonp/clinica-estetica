import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import FreeConsult from "~/components/FreeConsult";
import HomeVideoHero from "~/components/home/HomeVideoHero";
import HomeDoctorIntro from "~/components/home/HomeDoctorIntro";
import HomeTreatmentsCatalog from "~/components/home/HomeTreatmentsCatalog";
import HomeWhyUs from "~/components/home/HomeWhyUs";
import HomeLocation from "~/components/home/HomeLocation";
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
