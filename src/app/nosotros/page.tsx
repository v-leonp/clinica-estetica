import type { Metadata } from "next";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import FreeConsult from "~/components/FreeConsult";
import Testimonials from "~/components/Testimonials";
import { doctors, site, trustBadges } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce a ${site.brand}: clínica supervisada en Lima con médicos certificados en medicina estética y cirugía plástica. Más de 12 años de experiencia.`,
  alternates: { canonical: `${getSiteUrl()}/nosotros` },
  openGraph: {
    title: `Nosotros | ${site.brand}`,
    description:
      "Clínica supervisada en Lima con médicos certificados en medicina estética y cirugía plástica.",
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
        eyebrow="Sobre la clínica"
        title="Una clínica cálida, segura y con enfoque natural"
        subtitle={`En ${site.brand} acompañamos a cada paciente con un enfoque integral: evaluación médica, protocolos personalizados y seguimiento cercano. Más de 12 años cuidando la piel y la salud estética de nuestras pacientes.`}
      />

      <section className="section pt-4">
        <div className="container-x grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="font-serif text-2xl text-ink-900">
              Nuestra filosofía
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              Creemos en resultados naturales. Nuestro equipo diseña planes que
              realzan la belleza de cada paciente respetando sus rasgos y
              buscando siempre el equilibrio. Trabajamos con insumos de primera
              línea y protocolos avalados por la evidencia.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              Cada paciente es acompañada por una especialista durante toda la
              experiencia: desde la consulta inicial sin costo, pasando por la
              evaluación médica, hasta el seguimiento después del tratamiento.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 md:col-span-5 sm:grid-cols-2">
            {trustBadges.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-cream-200 bg-white p-4 text-center"
              >
                <p className="font-serif text-base text-ink-900">{b.title}</p>
                <p className="mt-1 text-xs text-ink-500">{b.subtitle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream-100/60">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Nuestro equipo</p>
            <h2 className="section-title">
              Médicos certificados y especialistas
            </h2>
            <p className="section-sub">
              Un equipo multidisciplinario con experiencia en medicina estética,
              cirugía plástica y dermatología clínica.
            </p>
          </div>

          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <li key={d.name}>
                <article className="card h-full text-center">
                  <div
                    aria-hidden="true"
                    className="mx-auto h-28 w-28 rounded-full bg-gradient-rose"
                  />
                  <h3 className="mt-5 font-serif text-xl text-ink-900">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-rose-gold">
                    {d.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {d.bio}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <FreeConsult />
    </SiteShell>
  );
}
