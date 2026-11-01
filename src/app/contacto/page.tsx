import type { Metadata } from "next";
import { Suspense } from "react";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import ContactForm from "~/components/ContactForm";
import { site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Agenda tu consulta gratuita en ${site.brand}. Déjanos tus datos o escríbenos por WhatsApp — Lima, Perú.`,
  alternates: { canonical: `${getSiteUrl()}/contacto` },
  openGraph: {
    title: `Contacto | ${site.brand}`,
    description: "Agenda tu consulta gratuita en Lima.",
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
        title="Agenda tu consulta"
        subtitle="Una de nuestras asesoras se pondrá en contacto para coordinar tu evaluación personalizada. Todos los datos de contacto que ves son de ejemplo."
      />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </SiteShell>
  );
}
