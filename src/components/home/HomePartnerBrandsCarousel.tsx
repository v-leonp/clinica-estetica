"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";

const IMAGE_W = 400;
const IMAGE_H = 282;

/** Recorte del dibujo dentro del archivo 400×282, sin el margen transparente. */
const brands = [
  { name: "IBSA", src: "/images/marcas/ibsa.webp", crop: { x: 32, y: 53, w: 337, h: 170 } },
  { name: "Sculptra", src: "/images/marcas/sculptra.webp", crop: { x: 20, y: 58, w: 361, h: 144 } },
  { name: "Radiesse", src: "/images/marcas/radiesse.webp", crop: { x: 12, y: 102, w: 377, h: 96 } },
  { name: "Karisma", src: "/images/marcas/karisma.webp", crop: { x: 35, y: 24, w: 331, h: 217 } },
  { name: "Juvéderm", src: "/images/marcas/juvederm.webp", crop: { x: 43, y: 96, w: 328, h: 81 } },
  { name: "Jalupro", src: "/images/marcas/jalupro.webp", crop: { x: 17, y: 102, w: 367, h: 79 } },
  { name: "Restylane", src: "/images/marcas/restylane.webp", crop: { x: 19, y: 63, w: 362, h: 147 } },
  { name: "Genefill", src: "/images/marcas/genefill.webp", crop: { x: 4, y: 121, w: 390, h: 66 } },
  { name: "Profhilo", src: "/images/marcas/profhilo.webp", crop: { x: 12, y: 101, w: 378, h: 81 } },
  { name: "Evolutha", src: "/images/marcas/evolutha.webp", crop: { x: 12, y: 97, w: 375, h: 77 } },
] as const;

const INTERVAL_MS = 3000;
const TRANSITION_MS = 400;

function Logo({
  name,
  src,
  crop,
}: {
  name: string;
  src: string;
  crop: { x: number; y: number; w: number; h: number };
}) {
  const focusX = (crop.x + crop.w / 2) / IMAGE_W;
  const focusY = (crop.y + crop.h / 2) / IMAGE_H;
  const fit = `min(calc(100cqw / ${crop.w}), calc(100cqh / ${crop.h}))`;

  return (
    <span className="relative block h-full w-full overflow-hidden [container-type:size]">
      <Image
        src={src}
        alt={name}
        width={IMAGE_W}
        height={IMAGE_H}
        className="absolute max-w-none [filter:brightness(0)_invert(1)]"
        style={{
          width: `calc(${IMAGE_W} * ${fit})`,
          height: `calc(${IMAGE_H} * ${fit})`,
          left: "50%",
          top: "50%",
          transform: `translate(${-focusX * 100}%, ${-focusY * 100}%)`,
        }}
      />
    </span>
  );
}

/**
 * Carrusel de marcas sobre el video del hero. Sin fondo propio: el overlay
 * del hero da el contraste. Cuatro logos en tablet/desktop y tres en móvil.
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
      aria-label="Marcas con las que trabajamos"
      className="mt-12 w-full max-w-xl sm:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="text-left font-serif text-[11px] uppercase leading-relaxed tracking-[0.22em] text-white sm:tracking-[0.28em]">
        Trabajamos con las más reconocidas
      </p>

      {reduced ? (
        <ul className="mt-4 flex flex-wrap items-center justify-start gap-4 sm:gap-7">
          {brands.map((brand) => (
            <li key={brand.name} className="flex h-7 w-[30%] items-center justify-center sm:h-9 sm:w-36">
              <Logo name={brand.name} src={brand.src} crop={brand.crop} />
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
                key={`${brand.src}-${itemIndex}`}
                aria-hidden={itemIndex >= brands.length ? true : undefined}
                className="flex h-7 shrink-0 items-center justify-center sm:h-9"
                style={{ width: slide > 0 ? slide : undefined }}
              >
                <Logo name={brand.name} src={brand.src} crop={brand.crop} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
