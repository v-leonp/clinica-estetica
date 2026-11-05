import Image from "next/image";
import Link from "next/link";

import { hero, site } from "~/data/content";

export default function HomeReferenceHero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-cream-50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(24,53,83,0.96) 0%, rgba(24,53,83,0.82) 55%, rgba(180,154,105,0.35) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative grid min-h-[78vh] items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-6 flex items-center gap-4 md:hidden">
            <Image
              src="/brand/isotipo-vr-loto.png"
              alt=""
              width={120}
              height={98}
              className="h-16 w-auto"
            />
            <p className="font-script text-3xl italic text-cream-50">Médico Estético</p>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/95 sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={hero.ctaPrimary.href} className="btn-rose">
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="btn-outline border-cream-100/40 text-cream-50 hover:border-gold hover:text-gold"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
          <p className="mt-6 text-sm text-cream-100/80">
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold/70 underline-offset-4 hover:text-gold"
            >
              Escríbenos por WhatsApp
            </a>
            . {site.whatsappNote}
          </p>
        </div>
        <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] border border-gold/30 bg-cream-50 shadow-soft md:flex">
          <div className="px-8 text-center">
            <Image
              src="/brand/isotipo-vr-loto.png"
              alt=""
              width={662}
              height={537}
              className="mx-auto h-40 w-auto sm:h-52"
            />
            <p className="mt-6 font-script text-3xl italic text-ink-900">Médico Estético</p>
            <p className="mt-2 text-sm text-ink-700">CMP 101245</p>
          </div>
        </div>
      </div>
    </section>
  );
}
