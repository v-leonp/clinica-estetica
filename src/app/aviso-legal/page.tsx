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
        subtitle={`Consultorio en ${site.address}.`}
      />
      <section className="section pt-4">
        <LegalProse>
          <p>
            Este sitio corresponde a la práctica de la Dra. Melissa Vigo, médico
            cirujano (CMP 101245), medicina estética, en {site.legal.jurisdiction}.
            El consultorio está en {site.address}.
          </p>
          <p>
            El contenido tiene fines informativos. No constituye consejo médico ni
            una relación médico-paciente hasta completar una valoración presencial.
          </p>
          <p>
            Queda prohibida la reproducción total o parcial de textos e imágenes
            sin autorización, salvo uso privado no comercial.
          </p>
        </LegalProse>
      </section>
    </SiteShell>
  );
}
