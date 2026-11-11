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
    areaServed: { "@type": "City", name: "Lima", containedInPlace: "PE" },
    medicalSpecialty: "Medicina estética",
    employee: {
      "@type": "Physician",
      name: "Dra. Melissa Vigo",
      medicalSpecialty: "Medicina estética",
      identifier: "CMP 101245",
    },
    ...(site.phoneHref ? { telephone: site.phoneHref } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(locations[0]
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: locations[0].address,
            addressLocality: "San Miguel",
            addressRegion: "Lima",
            addressCountry: "PE",
          },
        }
      : site.address
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address,
              addressLocality: "San Miguel",
              addressRegion: "Lima",
              addressCountry: "PE",
            },
          }
        : {}),
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
