import Link from "next/link";

import { hero, site } from "~/data/content";

export default function HomeReferenceHero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-cream-50">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(31,26,23,0.92) 0%, rgba(154,79,91,0.35) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative grid min-h-[78vh] items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-blush">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90 sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={hero.ctaPrimary.href} className="btn-rose">
              {hero.ctaPrimary.label}
            </Link>
            <Link href={hero.ctaSecondary.href} className="btn-outline border-cream-100/40 text-cream-50">
              {hero.ctaSecondary.label}
            </Link>
          </div>
          <p className="mt-6 text-sm text-cream-100/70">
            Llámanos al{" "}
            <a href={`tel:${site.phoneHref}`} className="underline hover:text-rose-blush">
              {site.phoneDisplay}
            </a>{" "}
            o escríbenos por WhatsApp.
          </p>
        </div>
        <div
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-cream-100/10 shadow-soft"
          role="img"
          aria-label="Vista ilustrativa de clínica — reemplazar por fotografía propia"
        >
          <div className="absolute inset-0 bg-gradient-rose opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs uppercase tracking-wider text-rose-blush">Lumina Estética</p>
            <p className="mt-2 font-serif text-2xl leading-snug">
              Experiencia clínica premium en Lima
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
