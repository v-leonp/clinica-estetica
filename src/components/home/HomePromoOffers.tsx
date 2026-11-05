import Link from "next/link";

import { promos, promosDisclaimer } from "~/data/content";

export default function HomePromoOffers() {
  return (
    <section id="ofertas" className="section bg-cream-100/70">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Oportunidades del mes</p>
          <h2 className="section-title">Tratamientos con condiciones preferenciales</h2>
          <p className="section-sub">
            Solo se muestra la promoción que figura en el listado. {promosDisclaimer}
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {promos.map((p) => (
            <li key={p.title}>
              <article className="flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
                {p.sessionInfo && (
                  <p className="text-[11px] uppercase tracking-wider text-ink-500">
                    {p.sessionInfo}
                  </p>
                )}
                <span className="mt-2 inline-flex w-fit rounded-full bg-rose-blush px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-gold">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-serif text-xl leading-snug text-ink-900">{p.title}</h3>
                {(p.priceBefore || p.priceNow) && (
                  <p className="mt-3 flex items-baseline gap-2">
                    {p.priceBefore && (
                      <span className="text-sm text-ink-500 line-through">{p.priceBefore}</span>
                    )}
                    {p.priceNow && (
                      <span className="font-serif text-2xl text-rose-gold">{p.priceNow}</span>
                    )}
                  </p>
                )}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">{p.description}</p>
                <Link href={p.href} className="btn-primary mt-5 w-full text-center">
                  {p.cta}
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/promociones" className="text-sm font-medium text-rose-gold hover:underline">
            Ver todas las promociones →
          </Link>
        </p>
      </div>
    </section>
  );
}
