import Image from "next/image";
import Link from "next/link";

import { hero, site } from "~/data/content";

/**
 * 1086 px nativos. 540 px de ancho CSS ×2 = 1080, un ancho que next/image
 * ya genera, por debajo de la resolución original.
 */
const HERO_PHOTO_MAX = 540;

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
      <div className="container-x relative grid items-center gap-10 py-12 md:min-h-[78vh] md:grid-cols-2 md:py-20">
        <div>
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
        <div
          className="mx-auto w-full md:justify-self-end"
          style={{ maxWidth: HERO_PHOTO_MAX }}
        >
          <Image
            src="/fotos/doctora-brazos-cruzados.jpg"
            alt="Dra. Melissa Vigo, médico estético, con los brazos cruzados frente al letrero de su consultorio."
            width={1086}
            height={1448}
            priority
            quality={90}
            sizes={`(max-width: 767px) calc(100vw - 2.5rem), ${HERO_PHOTO_MAX}px`}
            className="h-auto w-full rounded-[1.75rem] border border-gold/40 object-cover object-top shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
