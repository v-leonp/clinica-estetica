import type { Metadata } from "next";

import Hero from "~/components/Hero";
import Categories from "~/components/Categories";
import Featured from "~/components/Featured";
import Promos from "~/components/Promos";
import FreeConsult from "~/components/FreeConsult";
import Doctors from "~/components/Doctors";
import Technology from "~/components/Technology";
import Testimonials from "~/components/Testimonials";
import Locations from "~/components/Locations";
import SiteShell from "~/components/SiteShell";
import { site, locations } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    alternates: { canonical: base },
    openGraph: {
      url: base,
    },
  };
}

export default function HomePage() {
  const base = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.brand,
    description: site.description,
    url: base,
    telephone: site.phoneHref,
    email: site.email,
    priceRange: "$$",
    areaServed: "Lima, Perú",
    address: locations.map((l) => ({
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: "Lima",
      addressCountry: "PE",
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <SiteShell>
      <Hero />
      <Categories />
      <Featured />
      <Promos />
      <Doctors />
      <Technology />
      <Testimonials />
      <FreeConsult />
      <Locations />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteShell>
  );
}
