import Link from "next/link";

import { hero, trustBadges } from "~/data/content";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-cream"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gradient-rose opacity-40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-rose-blush/60 blur-3xl"
      />

      <div className="container-x relative pt-14 pb-16 sm:pt-20 md:grid md:grid-cols-12 md:gap-10 md:pt-24 md:pb-24">
        <div className="md:col-span-7">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-ink-900 sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={hero.ctaPrimary.href} className="btn-primary">
              {hero.ctaPrimary.label}
            </Link>
            <Link href={hero.ctaSecondary.href} className="btn-outline">
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>

        <div className="relative mt-12 md:col-span-5 md:mt-0">
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-3xl shadow-soft">
            <div className="absolute inset-0 bg-gradient-rose" aria-hidden="true" />
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="140" fill="url(#glow)" />
              <circle
                cx="200"
                cy="200"
                r="90"
                fill="none"
                stroke="#fff"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="130"
                fill="none"
                stroke="#fff"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
            </svg>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/85 p-5 backdrop-blur">
              <p className="eyebrow">Consulta gratuita</p>
              <p className="mt-1 font-serif text-lg text-ink-900">
                Evaluación personalizada con nuestras especialistas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x relative pb-16">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {trustBadges.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-cream-200 bg-white/80 p-4 text-center backdrop-blur"
            >
              <p className="font-serif text-base text-ink-900">{b.title}</p>
              <p className="mt-1 text-xs text-ink-500">{b.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
