import Link from "next/link";

import { homeGiftBanner } from "~/data/content";

export default function HomeGiftBanner() {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-3xl border border-cream-200 bg-gradient-rose md:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="eyebrow">Tarjeta regalo</p>
            <h2 className="mt-2 font-serif text-3xl text-ink-900">{homeGiftBanner.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-800/90">
              {homeGiftBanner.description}
            </p>
            <Link href={homeGiftBanner.href} className="btn-primary mt-6">
              {homeGiftBanner.cta}
            </Link>
          </div>
          <div
            className="min-h-[220px] bg-ink-900/10 md:min-h-full"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
