import { site, locations, type FAQ } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export function medicalClinicJsonLd() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.brand,
    description: site.description,
    url: base,
    telephone: site.phoneHref,
    email: site.email,
    priceRange: "$$",
    areaServed: { "@type": "City", name: "Lima", containedInPlace: "PE" },
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
}

export function medicalProcedureJsonLd(input: {
  name: string;
  description: string;
  url: string;
  bodyLocation: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: input.name,
    description: input.description,
    url: input.url,
    procedureType: "https://schema.org/NonInvasiveProcedure",
    bodyLocation: input.bodyLocation,
  };
}

export function faqPageJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
