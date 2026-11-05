import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import PageHero from "~/components/PageHero";
import { cta, getTeamMember, site, teamMembers } from "~/data/content";
import PortraitPlaceholder from "~/components/PortraitPlaceholder";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return { title: "Profesional no encontrado" };
  return {
    title: member.name,
    description: `${member.role} en ${site.brand}. ${member.bio.slice(0, 140)}…`,
    alternates: { canonical: `${getSiteUrl()}/equipo/${slug}` },
  };
}

export default async function EquipoMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Equipo", href: "/equipo" },
          { label: member.name },
        ]}
      />
      <PageHero eyebrow={member.role} title={member.name} subtitle={member.bio} />
      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <PortraitPlaceholder name={member.name} className="mb-6 h-36 w-36 text-4xl md:mx-0" />
            <h2 className="font-serif text-2xl text-ink-900">Datos confirmados</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-700">
              {member.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink-900">Catálogo publicado</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {member.focus.map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-cream-100 px-4 py-2 text-sm text-ink-800"
                >
                  {f}
                </li>
              ))}
            </ul>
            <Link href={cta.primary.href} className="btn-primary mt-8 inline-flex">
              Solicitar valoración
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
