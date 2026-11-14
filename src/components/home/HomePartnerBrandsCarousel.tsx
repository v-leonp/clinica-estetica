"use client";

import { Bodoni_Moda, Nunito, Oswald, Outfit, Syne } from "next/font/google";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";

import { partnerBrands } from "~/data/content";

const reage = Outfit({ subsets: ["latin"], weight: "600" });
const avalon = Bodoni_Moda({ subsets: ["latin"], weight: "600", style: "italic" });
const sciela = Syne({ subsets: ["latin"], weight: "700" });
const qf = Oswald({ subsets: ["latin"], weight: "600" });
const lolasting = Nunito({ subsets: ["latin"], weight: "800" });

/**
 * Logotipos oficiales, pasados a blanco sobre transparente.
 * Neauvia: wordmark del encabezado de https://www.neauvia.com/
 * EXEL: https://www.bioexel.com/img/logo.png
 * Radiesse: https://radiesse.com/wp-content/uploads/2025/12/logo-Radiesse-navy.webp
 * Reage, Avalon, Sciela, QF y Lolasting no tienen un archivo oficial
 * fiable publicado; siguen como wordmark.
 */
type Logo = {
  id: string;
  alt: string;
  kind: "logo";
  src: string;
  width: number;
  height: number;
  /** Altura óptica para que el trazo pese parecido al resto. */
  box: string;
};

type Word = {
  id: string;
  alt: string;
  kind: "word";
  label: string;
  font: string;
  tracking: string;
  box: string;
};

const brands: Array<Logo | Word> = [
  {
    id: "neauvia",
    alt: "Logotipo de Neauvia",
    kind: "logo",
    src: "/images/marcas/neauvia.webp",
    width: 2800,
    height: 440,
    box: "h-8 sm:h-12",
  },
  {
    id: "reage",
    alt: "Reage",
    kind: "word",
    label: "Reage",
    font: reage.className,
    tracking: "-0.03em",
    box: "text-[1.7rem] sm:text-[2.35rem]",
  },
  {
    id: "exel",
    alt: "Logotipo de EXEL Professional Line",
    kind: "logo",
    src: "/images/marcas/exel.webp",
    width: 800,
    height: 244,
    box: "h-10 sm:h-14",
  },
  {
    id: "radiesse",
    alt: "Logotipo de Radiesse",
    kind: "logo",
    src: "/images/marcas/radiesse.webp",
    width: 1318,
    height: 198,
    box: "h-8 sm:h-11",
  },
  {
    id: "avalon",
    alt: "Avalon",
    kind: "word",
    label: "Avalon",
    font: avalon.className,
    tracking: "0.02em",
    box: "text-[1.85rem] sm:text-[2.6rem]",
  },
  {
    id: "sciela",
    alt: "Sciela",
    kind: "word",
    label: "Sciela",
    font: sciela.className,
    tracking: "-0.04em",
    box: "text-[1.7rem] sm:text-[2.3rem]",
  },
  {
    id: "qf",
    alt: "QF",
    kind: "word",
    label: "QF",
    font: qf.className,
    tracking: "0.04em",
    box: "text-[1.9rem] sm:text-[2.5rem]",
  },
  {
    id: "lolasting",
    alt: "Lolasting",
    kind: "word",
    label: "Lolasting",
    font: lolasting.className,
    tracking: "-0.03em",
    box: "text-[1.55rem] sm:text-[2.15rem]",
  },
];

const INTERVAL_MS = 2800;
const TRANSITION_MS = 500;

function Mark({ brand }: { brand: Logo | Word }) {
  const motion =
    "origin-bottom transition duration-300 ease-out will-change-transform hover:scale-105";
  if (brand.kind === "logo") {
    return (
      <Image
        src={brand.src}
        alt={brand.alt}
        width={brand.width}
        height={brand.height}
        className={`${brand.box} w-auto max-w-none ${motion}`}
      />
    );
  }
  return (
    <span
      className={`${brand.font} ${brand.box} ${motion} inline-block whitespace-nowrap text-white leading-none`}
      style={{ letterSpacing: brand.tracking, fontSynthesis: "none" }}
    >
      {brand.label}
    </span>
  );
}

/**
 * Carrusel infinito de marcas sobre el video. Logos a opacidad plena,
 * más altos que en la versión anterior, con el mismo ritmo de desplazamiento.
 */
export default function HomePartnerBrandsCarousel() {
  const frameRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [gap, setGap] = useState(48);
  const [widths, setWidths] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      setReduced(motion.matches);
      setGap(mobile.matches ? 32 : 48);
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
    if (reduced) return;
    const measure = () => {
      setWidths(
        itemsRef.current.slice(0, brands.length).map((el) => el?.offsetWidth ?? 0),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    itemsRef.current.forEach((el) => el && observer.observe(el));
    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [reduced, gap]);

  useEffect(() => {
    setIndex(0);
  }, [gap, reduced]);

  useEffect(() => {
    if (reduced || paused || widths.length < brands.length) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, widths.length]);

  const loop = [...brands, ...brands];
  const shift = widths.length
    ? Array.from({ length: index }, (_, i) => (widths[i % brands.length] ?? 0) + gap).reduce(
        (sum, n) => sum + n,
        0,
      )
    : 0;

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
      className="mt-12 w-full max-w-5xl sm:mt-16"
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
        <ul className="mt-5 flex flex-wrap items-end gap-8 sm:gap-12">
          {brands.map((brand) => (
            <li key={brand.id} className="flex items-end">
              <Mark brand={brand} />
            </li>
          ))}
        </ul>
      ) : (
        <div ref={frameRef} className="mt-5 overflow-hidden pb-1">
          <ul
            className="flex items-end"
            style={{
              gap,
              transform: widths.length ? `translateX(-${shift}px)` : undefined,
              transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {loop.map((brand, itemIndex) => (
              <li
                key={`${brand.id}-${itemIndex}`}
                ref={(el) => {
                  itemsRef.current[itemIndex] = el;
                }}
                aria-hidden={itemIndex >= brands.length ? true : undefined}
                className="flex shrink-0 items-end"
              >
                <Mark brand={brand} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
