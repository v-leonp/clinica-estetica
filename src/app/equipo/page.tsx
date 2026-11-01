import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import { cta, site, teamMembers } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Equipo médico",
  description: `Conoce al equipo de ${site.brand}: medicina estética, dermatología y cirugía plástica en Lima.`,
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
        eyebrow="Profesionales"
        title="Personas que te acompañan con criterio clínico"
        subtitle="Perfiles orientativos en esta demo. Acreditaciones y registros deben validarse antes de publicar en producción."
      />
      <section className="section pt-4">
        <ul className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m) => (
            <li key={m.slug}>
              <article className="card flex h-full flex-col text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto h-32 w-32 rounded-full bg-gradient-rose"
                />
                <h2 className="mt-5 font-serif text-xl text-ink-900">{m.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-rose-gold">
                  {m.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">{m.bio}</p>
                <Link
                  href={`/equipo/${m.slug}`}
                  className="mt-5 text-sm font-medium text-rose-gold hover:underline"
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
