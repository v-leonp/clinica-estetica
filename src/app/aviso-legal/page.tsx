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
        subtitle="La razón social y el RUC aún no están publicados."
      />
      <section className="section pt-4">
        <LegalProse>
          <p>
            Este sitio corresponde a la práctica de la Dra. Melissa Vigo, médico
            cirujano (CMP 101245), medicina estética, en {site.legal.jurisdiction}.
            La razón social, el RUC y el domicilio fiscal se publicarán cuando la
            consultorio los confirme.
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
