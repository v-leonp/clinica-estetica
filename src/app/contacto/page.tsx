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
  description: `Escribe a ${site.brand} o deja tus datos. Teléfono, correo y sede aún no están publicados.`,
  alternates: { canonical: `${getSiteUrl()}/contacto` },
  openGraph: {
    title: `Contacto | ${site.brand}`,
    description: "Formulario de contacto. La sede aún no está publicada.",
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
        subtitle="Teléfono, correo y dirección aún no están publicados. Puedes usar el formulario o escribir por WhatsApp."
      />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </SiteShell>
  );
}
