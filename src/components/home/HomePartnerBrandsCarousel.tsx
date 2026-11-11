"use client";

import { partnerBrands } from "~/data/content";

const brands = [...partnerBrands, ...partnerBrands];

export default function HomePartnerBrandsCarousel() {
  return (
    <section
      aria-label="Marcas con las que trabajamos"
      className="border-y border-cream-200/80 bg-ink-900 py-6 text-cream-50"
    >
      <div className="container-x mb-4">
        <p className="text-center font-serif text-[11px] uppercase tracking-[0.28em] text-cream-50/85">
          Trabajamos con las más reconocidas
        </p>
      </div>
      <div className="relative overflow-hidden mask-fade-x">
        <ul
          className="flex w-max animate-marquee gap-10 px-6 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-3"
          aria-label="Marcas del catálogo"
        >
          {brands.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="shrink-0 font-serif text-sm uppercase tracking-[0.14em] text-cream-50/95 sm:text-base"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
