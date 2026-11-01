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
        subtitle="Implementación granular de consentimiento pendiente en esta demo."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>
            Las cookies técnicas necesarias para el funcionamiento del sitio pueden
            utilizarse sin consentimiento. Las cookies analíticas o de marketing solo se
            activarán tras tu elección expresa cuando el banner esté implementado.
          </p>
          <p>
            Puedes retirar tu consentimiento en cualquier momento desde las preferencias
            de cookies [PENDIENTE DE VALIDACIÓN — integrar CMP].
          </p>
        </LegalProse>
      </section>
    </SiteShell>
  );
}
