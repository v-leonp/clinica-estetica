import Link from "next/link";

import { promos } from "~/data/content";

export default function Promos() {
  return (
    <section id="promos" className="section">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Promociones del mes</p>
            <h2 className="section-title">Beneficios exclusivos este mes</h2>
            <p className="section-sub">
              Promociones limitadas en nuestros tratamientos más solicitados.
              Consulta con nuestras asesoras para reservar tu cupo.
            </p>
          </div>
          <Link href="/promociones" className="btn-outline">
            Ver todas
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {promos.map((p) => (
            <li key={p.title}>
              <article className="relative h-full overflow-hidden rounded-2xl bg-ink-900 p-6 text-cream-50 shadow-soft">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-rose opacity-40 blur-2xl"
                />
                <span className="relative inline-flex rounded-full bg-rose-gold/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                  {p.tag}
                </span>
                <h3 className="relative mt-4 font-serif text-2xl">{p.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-cream-100/85">
                  {p.description}
                </p>
                <Link
                  href={p.href}
                  className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-rose-blush transition hover:text-white"
                >
                  {p.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
