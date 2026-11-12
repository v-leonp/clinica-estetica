"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";

const brands = [
  { name: "IBSA", src: "/images/marcas/ibsa.webp" },
  { name: "Sculptra", src: "/images/marcas/sculptra.webp" },
  { name: "Radiesse", src: "/images/marcas/radiesse.webp" },
  { name: "Karisma", src: "/images/marcas/karisma.webp" },
  { name: "Juvéderm", src: "/images/marcas/juvederm.webp" },
  { name: "Jalupro", src: "/images/marcas/jalupro.webp" },
  { name: "Restylane", src: "/images/marcas/restylane.webp" },
  { name: "Genefill", src: "/images/marcas/genefill.webp" },
  { name: "Profhilo", src: "/images/marcas/profhilo.webp" },
  { name: "Evolutha", src: "/images/marcas/evolutha.webp" },
] as const;

const INTERVAL_MS = 3000;
const TRANSITION_MS = 400;

function Logo({ name, src }: { name: string; src: string }) {
  return (
    <Image
      src={src}
      alt={name}
      width={400}
      height={282}
      className="h-12 w-auto max-w-full object-contain opacity-90 [filter:brightness(0)_invert(1)] sm:h-16"
    />
  );
}

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

  const gap = visible === 3 ? 17 : 67;
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
    <section
      aria-label="Marcas con las que trabajamos"
      className="border-y border-cream-200/80 bg-ink-900 py-6 text-cream-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x mb-4">
        <p className="text-center font-serif text-[11px] uppercase tracking-[0.28em] text-cream-50/85">
          Trabajamos con las más reconocidas
        </p>
      </div>

      {reduced ? (
        <ul className="container-x flex flex-wrap items-center justify-center gap-[17px] md:gap-[67px]">
          {brands.map((brand) => (
            <li key={brand.name} className="flex items-center justify-center">
              <Logo name={brand.name} src={brand.src} />
            </li>
          ))}
        </ul>
      ) : (
        <div ref={frameRef} className="container-x overflow-hidden">
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
                key={`${brand.src}-${itemIndex}`}
                aria-hidden={itemIndex >= brands.length ? true : undefined}
                className="flex shrink-0 items-center justify-center"
                style={{ width: slide > 0 ? slide : undefined }}
              >
                <Logo name={brand.name} src={brand.src} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
