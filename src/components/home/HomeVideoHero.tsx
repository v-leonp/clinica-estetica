"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { hero, partnerBrands, site } from "~/data/content";

const POSTER = "/media/portada-poster.jpg";
const VIDEO = "/media/portada.mp4";

type Playback = "static" | "playing" | "paused";

type NetworkInfo = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * El plano es un recurso de ambiente autorizado. No representa la clínica,
 * sus instalaciones ni a pacientes.
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
    if (!el || playback === "static") return;
    el.muted = true;
    if (playback === "playing") {
      void el.play().catch(() => setPlayback("paused"));
    } else {
      el.pause();
    }
  }, [playback]);

  const playing = playback === "playing";

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
          onError={() => setPlayback("static")}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0 bg-ink-900/60 md:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/10 md:from-ink-900/90 md:via-ink-900/45 md:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900/75 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[calc(100svh-4.75rem)] flex-col xl:min-h-[calc(100svh-5.5rem)]">
        <div className="container-x flex flex-1 flex-col justify-center py-8 sm:py-16">
          <p className="sr-only">
            Video ambiental de fondo: primer plano de un rostro, toallas sobre
            mármol y un pasillo iluminado. No muestra la clínica ni a
            pacientes.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {hero.eyebrow}
          </p>
          <h1 className="heading mt-4 max-w-xl font-serif text-4xl leading-[1.08] text-cream-50 sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="credential mt-5 max-w-xl text-xl text-cream-100 sm:text-2xl">
            {hero.subtitle}
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
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-full border border-cream-50/70 bg-ink-900/25 px-6 py-3 font-serif text-sm uppercase tracking-[0.12em] text-cream-50 transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream-50/90">
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold/80 underline-offset-4 hover:text-gold"
            >
              Escríbenos por WhatsApp
            </a>
            {" · "}
            {site.whatsappDisplay}. {site.whatsappNote}
          </p>
          <button
            type="button"
            className="mt-4 inline-flex w-fit items-center rounded-full border border-cream-50/45 bg-ink-900/45 px-4 py-2 font-serif text-[11px] uppercase tracking-[0.16em] text-cream-50 backdrop-blur-sm transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:mt-6"
            aria-pressed={playing}
            onClick={() =>
              setPlayback((current) => (current === "playing" ? "paused" : "playing"))
            }
          >
            {playing ? "Pausar video" : "Reproducir video"}
          </button>
        </div>

        <div className="container-x pb-24 md:pb-12 md:pr-24">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cream-50/80">
            Productos del catálogo
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-5 sm:gap-y-2">
            {partnerBrands.map((name) => (
              <li
                key={name}
                className="font-serif text-[10px] uppercase tracking-[0.12em] text-cream-50 sm:text-[11px] sm:tracking-[0.14em]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
