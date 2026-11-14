"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import {
  CONSENT_EVENT,
  readConsent,
  updateAnalyticsConsent,
  writeConsent,
  type ConsentChoice,
} from "~/lib/analytics";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID || "G-M8QMNVJ4GC";

type BannerState = ConsentChoice | null | "pending";

export default function CookieConsent() {
  const [choice, setChoice] = useState<BannerState>("pending");

  useEffect(() => {
    const apply = () => {
      const stored = readConsent();
      setChoice(stored);
      if (stored === "accepted") updateAnalyticsConsent(true);
      if (stored === "rejected") updateAnalyticsConsent(false);
    };
    apply();
    window.addEventListener(CONSENT_EVENT, apply);
    return () => window.removeEventListener(CONSENT_EVENT, apply);
  }, []);

  function choose(next: ConsentChoice) {
    writeConsent(next);
    updateAnalyticsConsent(next === "accepted");
    setChoice(next);
  }

  return (
    <>
      {choice === "accepted" ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
      {choice === null ? (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          className="fixed inset-x-3 bottom-[5.25rem] z-50 rounded-2xl border border-gold/40 bg-cream-50 p-4 text-ink-900 shadow-soft md:bottom-4 md:left-auto md:right-4 md:max-w-md"
        >
          <p
            id="cookie-banner-title"
            className="font-serif text-sm uppercase tracking-[0.14em]"
          >
            Cookies
          </p>
          <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-ink-700">
            Usamos una cookie analítica de Google solo si la aceptas. Las cookies
            técnicas del sitio siguen activas. Puedes leer la{" "}
            <Link
              href="/cookies"
              className="underline decoration-gold underline-offset-2 hover:text-gold-ink"
            >
              política de cookies
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-outline px-4 py-2"
              onClick={() => choose("rejected")}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="btn-primary px-4 py-2"
              onClick={() => choose("accepted")}
            >
              Aceptar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookieChoiceReset() {
  return (
    <button type="button" className="btn-outline mt-6" onClick={() => writeConsent(null)}>
      Cambiar mi elección
    </button>
  );
}
