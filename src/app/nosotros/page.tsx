import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import ClinicPhoto from "~/components/ClinicPhoto";
import { clinicPhotos } from "~/data/clinic-photos";
import { doctorProfile, site } from "~/data/content";
import { attendNeighbors, supportSeo } from "~/data/seo-copy";
import { getSiteUrl } from "~/lib/site-url";

function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-serif italic">
      <em>{children}</em>
    </strong>
  );
}

export const dynamic = "force-static";

const pageTitle = supportSeo.nosotros.title;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: supportSeo.nosotros.description,
  alternates: { canonical: `${getSiteUrl()}/nosotros` },
  openGraph: {
    title: pageTitle,
    description: supportSeo.nosotros.description,
    url: `${getSiteUrl()}/nosotros`,
  },
  twitter: {
    title: pageTitle,
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
            <h2 className="heading font-serif text-2xl text-ink-900">{doctorProfile.name}</h2>
            <blockquote className="credential normal-case mt-4 text-xl text-ink-900 sm:text-2xl">
              “{doctorProfile.quote}”
            </blockquote>
            <div className="mt-6 space-y-4">
              <p className="text-base leading-relaxed text-ink-700">
                <Emphasis>{doctorProfile.lead}</Emphasis>
              </p>
              <p className="body-copy text-base leading-relaxed text-ink-700">
                {doctorProfile.commitment.before}
                <Emphasis>{doctorProfile.commitment.emphasis}</Emphasis>
                {doctorProfile.commitment.after}
              </p>
              <h3 className="section-sub text-ink-900">{doctorProfile.approachTitle}</h3>
              <ul className="list-disc space-y-3 pl-5">
                {doctorProfile.approach.map((item) => (
                  <li key={item.emphasis} className="body-copy text-base leading-relaxed text-ink-700">
                    <Emphasis>{item.emphasis}</Emphasis>
                    {item.text}
                  </li>
                ))}
              </ul>
              <p className="body-copy text-base leading-relaxed text-ink-700">
                Es un consultorio en {site.address}. {attendNeighbors}
              </p>
              <p className="body-copy text-base leading-relaxed text-ink-700">
                {doctorProfile.closing.before}
                <Emphasis>{doctorProfile.closing.emphasis}</Emphasis>
                {doctorProfile.closing.after}
              </p>
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
