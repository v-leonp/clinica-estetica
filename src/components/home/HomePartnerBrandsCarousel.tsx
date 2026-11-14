"use client";

import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";

import { partnerBrands } from "~/data/content";

const brands = partnerBrands.names;

const INTERVAL_MS = 3000;
const TRANSITION_MS = 400;

/**
 * Carrusel de marcas sobre el video del hero. Los nombres van en blanco,
 * con la misma tipografía de títulos y el mismo desplazamiento que los
 * logotipos anteriores. Cuatro nombres en tablet/desktop y tres en móvil.
 */
export default function HomePartnerBrandsCarousel() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      setReduced(motion.matches);
      setVisible(mobile.matches ? 3 : 4);
    };
    apply();
    motion.addEventListener("change", apply);
    mobile.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      mobile.removeEventListener("change", apply);
    };
  }, []);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    setIndex(0);
  }, [visible]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  const gap = visible === 3 ? 16 : 28;
  const slide = width > 0 ? (width - gap * (visible - 1)) / visible : 0;
  const loop = [...brands, ...brands.slice(0, visible)];

  function onTransitionEnd(event: TransitionEvent<HTMLUListElement>) {
    if (event.propertyName !== "transform") return;
    if (index >= brands.length) {
      setAnimate(false);
      setIndex(0);
    }
  }

  return (
    <div
      role="group"
      aria-label="Marcas de los productos que utilizamos"
      className="mt-12 w-full max-w-xl sm:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="text-left font-serif text-sm leading-relaxed tracking-[0.08em] text-white sm:text-base">
        {partnerBrands.heading}
      </p>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream-50/90">
        {partnerBrands.text}
      </p>

      {reduced ? (
        <ul className="mt-4 flex flex-wrap items-center justify-start gap-x-6 gap-y-3">
          {brands.map((brand) => (
            <li key={brand}>
              <BrandName name={brand} />
            </li>
          ))}
        </ul>
      ) : (
        <div ref={frameRef} className="mt-4 overflow-hidden">
          <ul
            className="flex items-center"
            style={{
              gap,
              transform:
                slide > 0 ? `translateX(-${index * (slide + gap)}px)` : undefined,
              transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {loop.map((brand, itemIndex) => (
              <li
                key={`${brand}-${itemIndex}`}
                aria-hidden={itemIndex >= brands.length ? true : undefined}
                className="flex h-7 shrink-0 items-center justify-center sm:h-9"
                style={{ width: slide > 0 ? slide : undefined }}
              >
                <BrandName name={brand} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BrandName({ name }: { name: string }) {
  return (
    <span className="block max-w-full truncate text-center font-serif text-sm tracking-[0.12em] text-white sm:text-base">
      {name}
    </span>
  );
}
