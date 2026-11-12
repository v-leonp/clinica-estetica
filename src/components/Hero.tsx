import Link from "next/link";

import { hero, trustBadges } from "~/data/content";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[88vh] overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-cream"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(243,220,212,0.55),_transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-rose-blush/50 blur-3xl"
      />

      <div className="container-x relative flex min-h-[88vh] flex-col justify-center py-16 md:grid md:min-h-[88vh] md:grid-cols-12 md:items-center md:gap-12 md:py-24">
        <div className="md:col-span-7">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="heading mt-4 max-w-3xl font-serif text-4xl leading-[1.12] text-ink-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl body-copy text-base leading-relaxed text-ink-700 sm:text-lg md:text-xl">
            {hero.support}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={hero.ctaPrimary.href} className="btn-primary">
              {hero.ctaPrimary.label}
            </Link>
          </div>
        </div>

        <div className="relative mt-14 md:col-span-5 md:mt-0">
          <div
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-soft md:ml-auto"
            role="img"
            aria-label="Espacio ilustrativo de clínica estética premium — sustituir por fotografía o vídeo propio"
          >
            <div className="absolute inset-0 bg-gradient-rose" aria-hidden="true" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,26,23,0.45),transparent_50%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50">
              <p className="text-xs uppercase tracking-[0.2em] text-rose-blush">
                Lima · Medicina estética
              </p>
              <p className="mt-2 font-serif text-2xl leading-snug">
                Espacios diseñados para tu comodidad y privacidad
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x relative border-t border-cream-200/80 pb-16 pt-10">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {trustBadges.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-cream-200 bg-white/90 p-4 text-center backdrop-blur"
            >
              <p className="heading font-serif text-sm text-ink-900 sm:text-base">{b.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-ink-500 sm:text-xs">{b.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
