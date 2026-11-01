import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHero from "~/components/PageHero";
import LegalProse from "~/components/LegalProse";
import { site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: `${getSiteUrl()}/aviso-legal` },
};

export default function AvisoLegalPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Aviso legal" },
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Aviso legal"
        subtitle="Texto orientativo para demo. Requiere revisión jurídica antes de producción."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>
            Titular del sitio: {site.legal.companyName} — RUC {site.legal.ruc} [PENDIENTE DE
            VALIDACIÓN]. Domicilio: {site.legal.jurisdiction}.
          </p>
          <p>
            El contenido de este sitio tiene fines informativos y comerciales legítimos. No
            constituye consejo médico ni relación médico-paciente hasta completar una
            valoración presencial.
          </p>
          <p>
            Queda prohibida la reproducción total o parcial de textos e imágenes sin
            autorización, salvo uso privado no comercial.
          </p>
        </LegalProse>
      </section>
    </SiteShell>
  );
}
