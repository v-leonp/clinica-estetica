import Link from "next/link";

import { cta, teamMembers } from "~/data/content";
import PortraitPlaceholder from "~/components/PortraitPlaceholder";

export default function Doctors() {
  return (
    <section id="equipo" className="section bg-cream-100/60">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">La profesional</p>
          <h2 className="section-title">Dra. Melissa Vigo</h2>
          <p className="section-sub">
            Es la única profesional publicada. No hay biografía extendida ni
            fotografía confirmadas.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((d) => (
            <li key={d.slug}>
              <article className="card h-full text-center">
                <PortraitPlaceholder name={d.name} />
                <h3 className="mt-5 font-serif text-xl text-ink-900">{d.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-gold-ink">
                  {d.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{d.bio}</p>
                <Link
                  href={`/equipo/${d.slug}`}
                  className="mt-4 inline-block text-sm text-gold-ink hover:underline"
                >
                  Ver perfil
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link href="/equipo" className="btn-outline">
            Ver perfil
          </Link>
          <Link href={cta.primary.href} className="btn-primary ml-3">
            {cta.primary.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
