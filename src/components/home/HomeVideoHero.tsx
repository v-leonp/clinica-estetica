"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { hero } from "~/data/content";
import HomePartnerBrandsCarousel from "~/components/home/HomePartnerBrandsCarousel";

const POSTER = "/media/portada-poster.jpg";
const VIDEO = "/media/portada.mp4";
/** Ritmo suave: el archivo dura 6.5 s y aquí corre un poco más lento. */
const PLAYBACK_RATE = 0.88;

type Playback = "static" | "playing";

type NetworkInfo = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * Video de la práctica, silenciado. Se reproduce más lento que el archivo
 * para que se lean los planos. Sin control de pausa. Las personas del plano
 * no se nombran.
 */
function prefersStillImage(): boolean {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInfo })
    .connection;
  const saveData =
    connection?.saveData === true ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "slow-2g";
  return reduce || saveData;
}

export default function HomeVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playback, setPlayback] = useState<Playback>("static");

  useEffect(() => {
    if (!prefersStillImage()) setPlayback("playing");
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || playback !== "playing") return;
    el.muted = true;
    el.defaultPlaybackRate = PLAYBACK_RATE;
    el.playbackRate = PLAYBACK_RATE;
    void el.play().catch(() => setPlayback("static"));
  }, [playback]);

  return (
    <section className="relative isolate min-h-[calc(100svh-4.75rem)] overflow-hidden bg-ink-900 text-cream-50 xl:min-h-[calc(100svh-5.5rem)]">
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-center"
      />
      {playback !== "static" && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={POSTER}
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            event.currentTarget.playbackRate = PLAYBACK_RATE;
          }}
          onError={() => setPlayback("static")}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-ink-900/45 md:bg-transparent" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/45 to-transparent md:from-ink-900/75 md:via-ink-900/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink-900/70 to-transparent md:h-40"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[calc(100svh-4.75rem)] flex-col xl:min-h-[calc(100svh-5.5rem)]">
        <div className="container-x flex flex-1 flex-col justify-start py-8 sm:py-14">
          <p className="sr-only">
            Video de consultas y primeros planos de la práctica. Las personas
            que aparecen no se identifican por su nombre.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {hero.eyebrow}
          </p>
          <h1 className="heading mt-4 max-w-xl font-serif text-4xl leading-[1.08] text-cream-50 sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="credential mt-5 max-w-xl text-xl text-cream-100 sm:text-2xl">
            {hero.name}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-50/90">
            {hero.credential}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-50/95">
            {hero.support}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-full bg-cream-50 px-6 py-3 font-serif text-sm uppercase tracking-[0.12em] text-ink-900 transition hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              {hero.ctaPrimary.label}
            </Link>
          </div>
          <HomePartnerBrandsCarousel />
        </div>
      </div>
    </section>
  );
}
