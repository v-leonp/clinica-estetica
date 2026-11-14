import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHero from "~/components/PageHero";
import LegalProse from "~/components/LegalProse";
import { CookieChoiceReset } from "~/components/CookieConsent";
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
        subtitle="Las cookies analíticas solo se activan si las aceptas."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>
            Las cookies técnicas necesarias para el funcionamiento del sitio pueden
            utilizarse sin consentimiento. La medición con Google Analytics 4 solo se
            carga después de pulsar Aceptar en el aviso de cookies. Si pulsas Rechazar,
            esa medición no se activa.
          </p>
          <p>
            La elección se guarda en este navegador. No enviamos nombre, teléfono,
            mensaje ni tratamiento en los eventos de medición. Puedes cambiarla cuando
            quieras.
          </p>
          <CookieChoiceReset />
        </LegalProse>
      </section>
    </SiteShell>
  );
}
