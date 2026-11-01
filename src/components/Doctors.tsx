import Link from "next/link";

import { cta, teamMembers } from "~/data/content";

export default function Doctors() {
  return (
    <section id="equipo" className="section bg-cream-100/60">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Nuestro equipo</p>
          <h2 className="section-title">
            Profesionales que priorizan indicación, seguridad y expectativas realistas
          </h2>
          <p className="section-sub">
            Conoce perfiles orientativos. Las acreditaciones definitivas deben validarse antes
            de publicar.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((d) => (
            <li key={d.slug}>
              <article className="card h-full text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto h-28 w-28 rounded-full bg-gradient-rose"
                />
                <h3 className="mt-5 font-serif text-xl text-ink-900">{d.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-rose-gold">
                  {d.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{d.bio}</p>
                <Link
                  href={`/equipo/${d.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-rose-gold hover:underline"
                >
                  Ver perfil
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link href="/equipo" className="btn-outline">
            Ver todo el equipo
          </Link>
        </p>
      </div>
    </section>
  );
}
