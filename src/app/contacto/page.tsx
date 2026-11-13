import type { Metadata } from "next";
import { Suspense } from "react";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import ContactForm from "~/components/ContactForm";
import { site } from "~/data/content";
import { neighborPhrase } from "~/data/seo-copy";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

const hiddenFromIndex = { index: false, follow: true } as const;

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacto del consultorio en San Miguel, ${neighborPhrase}.`,
  robots: hiddenFromIndex,
  alternates: { canonical: `${getSiteUrl()}/contacto` },
  openGraph: {
    title: `Contacto | ${site.brand}`,
    description: `Contacto del consultorio en San Miguel, ${neighborPhrase}.`,
    url: `${getSiteUrl()}/contacto`,
  },
};

export default function ContactoPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Contacto" },
        ]}
      />
      <PageHero
        eyebrow="Contacto"
        title="Contacto"
        subtitle={`Teléfono y correo aún no están publicados. El consultorio está en ${site.address}, ${neighborPhrase}. Puedes usar el formulario o escribir por WhatsApp.`}
      />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </SiteShell>
  );
}
