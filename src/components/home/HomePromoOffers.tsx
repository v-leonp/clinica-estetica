import Link from "next/link";

import { promos, promosDisclaimer } from "~/data/content";

export default function HomePromoOffers() {
  if (promos.length === 0) return null;

  return (
    <section id="ofertas" className="section bg-cream-100/80">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Promoción</p>
          <h2 className="section-title">Promoción publicada</h2>
          <p className="section-sub">
            Solo se muestra lo que está en el catálogo. {promosDisclaimer}
          </p>
        </div>
        <ul className="mt-10 grid gap-5">
          {promos.map((p) => (
            <li key={p.title}>
              <article className="flex h-full flex-col gap-6 rounded-2xl border border-cream-200 bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between md:p-8">
                <div className="max-w-2xl">
                  {p.sessionInfo && (
                    <p className="text-[11px] uppercase tracking-wider text-ink-700">
                      {p.sessionInfo}
                    </p>
                  )}
                  <span className="mt-2 inline-flex w-fit rounded-full bg-rose-blush px-2.5 py-0.5 font-serif text-[10px] uppercase tracking-wider text-gold-ink">
                    {p.tag}
                  </span>
                  <h3 className="heading mt-3 font-serif text-2xl leading-snug text-ink-900">
                    {p.title}
                  </h3>
                  {p.priceNow && (
                    <p className="price mt-3 text-3xl text-gold-ink">{p.priceNow}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{p.description}</p>
                </div>
                <Link href={p.href} className="btn-primary shrink-0 text-center uppercase tracking-[0.12em]">
                  {p.cta}
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link
            href="/promociones"
            className="font-serif text-xs uppercase tracking-[0.14em] text-gold-ink hover:text-ink-900"
          >
            Ver promociones
          </Link>
        </p>
      </div>
    </section>
  );
}
