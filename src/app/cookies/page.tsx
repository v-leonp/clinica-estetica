import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHero from "~/components/PageHero";
import LegalProse from "~/components/LegalProse";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de cookies",
  alternates: { canonical: `${getSiteUrl()}/cookies` },
};

export default function CookiesPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Cookies" },
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Política de cookies"
        subtitle="El banner para elegir cookies todavía no está publicado."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>
            Las cookies técnicas necesarias para el funcionamiento del sitio pueden
            utilizarse sin consentimiento. Las cookies analíticas o de marketing solo se
            activarán tras tu elección expresa cuando el banner esté implementado.
          </p>
          <p>
            El panel para retirar el consentimiento de cookies todavía no está
            publicado. Cuando exista, lo enlazaremos desde esta página.
          </p>
        </LegalProse>
      </section>
    </SiteShell>
  );
}
