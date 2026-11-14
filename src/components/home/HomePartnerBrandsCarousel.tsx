"use client";

import {
  Archivo_Black,
  Bodoni_Moda,
  Cinzel,
  Josefin_Sans,
  Nunito,
  Oswald,
  Outfit,
  Syne,
} from "next/font/google";
import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";

import { partnerBrands } from "~/data/content";

const neauvia = Josefin_Sans({ subsets: ["latin"], weight: "400" });
const reage = Outfit({ subsets: ["latin"], weight: "600" });
const exel = Archivo_Black({ subsets: ["latin"], weight: "400" });
const radiesse = Cinzel({ subsets: ["latin"], weight: "600" });
const avalon = Bodoni_Moda({ subsets: ["latin"], weight: "600", style: "italic" });
const sciela = Syne({ subsets: ["latin"], weight: "700" });
const qf = Oswald({ subsets: ["latin"], weight: "600" });
const lolasting = Nunito({ subsets: ["latin"], weight: "800" });

/**
 * Wordmarks propios, en blanco. Cada uno imita el carácter del logotipo
 * real (caja, peso, serif o palo, tracking) sin reutilizar el archivo
 * de la marca. `cap` es la altura común; `fit` evita que un nombre largo
 * se salga del mismo hueco que ocupaban los logos anteriores.
 */
const brands = [
  {
    id: "neauvia",
    label: "NEAUVIA",
    font: neauvia.className,
    cap: 66,
    fit: 16,
    tracking: "0.14em",
  },
  {
    id: "reage",
    label: "Reage",
    font: reage.className,
    cap: 66,
    fit: 20,
    tracking: "-0.03em",
  },
  {
    id: "exel",
    label: "EXEL",
    font: exel.className,
    cap: 62,
    fit: 22,
    tracking: "-0.04em",
  },
  {
    id: "radiesse",
    label: "RADIESSE",
    font: radiesse.className,
    cap: 64,
    fit: 15.5,
    tracking: "0.06em",
  },
  {
    id: "avalon",
    label: "Avalon",
    font: avalon.className,
    cap: 72,
    fit: 18,
    tracking: "0.02em",
  },
  {
    id: "sciela",
    label: "Sciela",
    font: sciela.className,
    cap: 62,
    fit: 16.5,
    tracking: "-0.04em",
  },
  {
    id: "qf",
    label: "QF",
    font: qf.className,
    cap: 74,
    fit: 30,
    tracking: "0.04em",
  },
  {
    id: "lolasting",
    label: "Lolasting",
    font: lolasting.className,
    cap: 60,
    fit: 14.5,
    tracking: "-0.035em",
  },
] as const;

const INTERVAL_MS = 3000;
const TRANSITION_MS = 400;

function Wordmark({
  label,
  font,
  cap,
  fit,
  tracking,
}: (typeof brands)[number]) {
  return (
    <span className="relative block h-full w-full overflow-hidden [container-type:size]">
      <span
        className={`${font} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white`}
        style={{
          fontSize: `min(${cap}cqh, ${fit}cqw)`,
          letterSpacing: tracking,
          lineHeight: 1,
          fontSynthesis: "none",
        }}
      >
        {label}
      </span>
    </span>
  );
}

/**
 * Carrusel de marcas sobre el video del hero. Sin fondo propio: el overlay
 * del hero da el contraste. Cuatro wordmarks en tablet/desktop y tres en móvil.
 * Misma altura, mismo hueco y la misma animación que los logos anteriores.
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
        <ul className="mt-4 flex flex-wrap items-center justify-start gap-4 sm:gap-7">
          {brands.map((brand) => (
            <li
              key={brand.id}
              className="flex h-7 w-[30%] items-center justify-center sm:h-9 sm:w-36"
            >
              <Wordmark {...brand} />
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
                key={`${brand.id}-${itemIndex}`}
                aria-hidden={itemIndex >= brands.length ? true : undefined}
                className="flex h-7 shrink-0 items-center justify-center sm:h-9"
                style={{ width: slide > 0 ? slide : undefined }}
              >
                <Wordmark {...brand} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
