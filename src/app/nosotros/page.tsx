import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import ClinicPhoto from "~/components/ClinicPhoto";
import { clinicPhotos } from "~/data/clinic-photos";
import { doctorProfile, site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Dra. Melissa Vigo",
  description: `${doctorProfile.paragraphs[0]} CMP 101245. Medicina estética en San Miguel, Lima.`,
  alternates: { canonical: `${getSiteUrl()}/nosotros` },
  openGraph: {
    title: `Dra. Melissa Vigo | ${site.brand}`,
    description: doctorProfile.paragraphs[0],
    url: `${getSiteUrl()}/nosotros`,
  },
};

export default function NosotrosPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Dra. Melissa Vigo" },
        ]}
      />
      <PageHero
        title="Dra. Melissa Vigo"
        subtitle={`${doctorProfile.role} · CMP 101245 · San Miguel, Lima`}
      />

      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Perfil</p>
            <h2 className="heading font-serif text-2xl text-ink-900">{doctorProfile.name}</h2>
            <div className="mt-6 space-y-4">
              {doctorProfile.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="body-copy text-base leading-relaxed text-ink-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <ClinicPhoto
              photo={clinicPhotos.doctoraRetrato}
              sizes="(max-width: 768px) 100vw, 360px"
              className="mx-auto max-w-sm rounded-2xl shadow-soft"
            />
          </div>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
