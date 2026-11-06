import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import DoctorPortrait from "~/components/DoctorPortrait";
import { doctors, site, trustBadges } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `${site.brand}, médico cirujano (CMP 101245). Medicina estética en Lima. La clínica aún no abre.`,
  alternates: { canonical: `${getSiteUrl()}/nosotros` },
  openGraph: {
    title: `Nosotros | ${site.brand}`,
    description: "Dra. Melissa Vigo, médico cirujano. Medicina estética en Lima.",
    url: `${getSiteUrl()}/nosotros`,
  },
};

export default function NosotrosPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Nosotros" },
        ]}
      />
      <PageHero
        title="Melissa Vigo"
        subtitle="Médico cirujano, CMP 101245. Medicina estética. La clínica aún no abre en Lima: la sede, el horario y la biografía extendida se publicarán cuando estén confirmados."
      />

      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="heading font-serif text-2xl text-ink-900">Qué está publicado</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              En la consulta, la doctora revisa tus necesidades, explica el
              procedimiento recomendado y confirma si es adecuado para ti. El
              catálogo reúne los 17 tratamientos del listado, con sus tiempos y
              precios.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              No hay otras profesionales en este sitio. Tampoco hay razón social,
              RUC, teléfono, correo ni redes confirmados.
            </p>
            <p className="mt-6">
              <Link href="/equipo/melissa-vigo" className="text-sm text-gold-ink hover:underline">
                Ver el perfil →
              </Link>
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-5">
            {trustBadges.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-cream-200 bg-white p-4 text-center"
              >
                <p className="heading font-serif text-base text-ink-900">{b.title}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-500">{b.subtitle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream-100/60">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Profesional</p>
            <h2 className="section-title">Una sola doctora</h2>
            <p className="section-sub">
              La biografía extendida se publicará cuando la doctora la confirme.
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <li key={d.name}>
                <article className="card h-full text-center">
                  <DoctorPortrait />
                  <h3 className="heading mt-5 font-serif text-xl text-ink-900">{d.name}</h3>
                  <p className="credential mt-2 text-[1.05rem] text-gold-ink">{d.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{d.bio}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FreeConsult />
    </SiteShell>
  );
}
