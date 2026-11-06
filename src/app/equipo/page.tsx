import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import DoctorPortrait from "~/components/DoctorPortrait";
import { cta, site, teamMembers } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Equipo médico",
  description: `${site.brand}, médico cirujano (CMP 101245), es la única profesional publicada.`,
  alternates: { canonical: `${getSiteUrl()}/equipo` },
};

export default function EquipoPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Equipo" },
        ]}
      />
      <PageHero
        eyebrow="Profesional"
        title="Dra. Melissa Vigo"
        subtitle="Médico cirujano, CMP 101245. Medicina estética. No hay otras profesionales en este sitio."
      />
      <section className="section pt-4">
        <ul className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m) => (
            <li key={m.slug}>
              <article className="card flex h-full flex-col text-center">
                <DoctorPortrait className="h-32 w-32" />
                <h2 className="heading mt-5 font-serif text-xl text-ink-900">{m.name}</h2>
                <p className="credential mt-2 text-[1.05rem] text-gold-ink">{m.role}</p>
                <p className="body-copy mt-3 flex-1 text-sm leading-relaxed text-ink-700">{m.bio}</p>
                <Link
                  href={`/equipo/${m.slug}`}
                  className="mt-5 text-sm text-gold-ink hover:underline"
                >
                  Ver perfil →
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="container-x mt-12 text-center">
          <Link href={cta.primary.href} className="btn-primary">
            {cta.primary.label}
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}
