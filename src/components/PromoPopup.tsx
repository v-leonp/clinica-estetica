"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  isPromoPopupActive,
  promoPopup,
  promoPopupWhatsAppHref,
  PROMO_POPUP_STORAGE_KEY,
} from "~/data/promo-popup";
import { trackPromoPopup, trackWhatsAppClick } from "~/lib/analytics";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wasSeenThisSession(): boolean {
  try {
    return sessionStorage.getItem(PROMO_POPUP_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeenThisSession(): void {
  try {
    sessionStorage.setItem(PROMO_POPUP_STORAGE_KEY, "1");
  } catch {
    // Navegación privada u almacenamiento bloqueado: no impedimos mostrarlo.
  }
}

export default function PromoPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const href = promoPopupWhatsAppHref();

  const close = useCallback((reason: "esc" | "backdrop" | "button" | "click") => {
    setOpen(false);
    if (reason === "click") {
      trackPromoPopup("popup_click", promoPopup.id);
      trackWhatsAppClick("promo_popup");
    } else {
      trackPromoPopup("popup_close", promoPopup.id);
    }
    const previous = previousFocusRef.current;
    if (previous && typeof previous.focus === "function") {
      previous.focus();
    }
  }, []);

  useEffect(() => {
    if (!isPromoPopupActive() || wasSeenThisSession()) return;

    const delay = prefersReducedMotion() ? 0 : promoPopup.delayMs;
    const timer = window.setTimeout(() => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      markSeenThisSession();
      setOpen(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    trackPromoPopup("popup_view", promoPopup.id);
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close("esc");
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink-900/70 motion-safe:transition-opacity motion-safe:duration-300"
        aria-label="Cerrar promoción"
        onClick={() => close("backdrop")}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-[min(90vw,calc(85vh*4/3))] max-h-[85vh] motion-safe:animate-[promo-popup-in_300ms_ease-out] motion-reduce:animate-none"
      >
        <h2 id={titleId} className="sr-only">
          Promoción Black Friday
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={() => close("button")}
          aria-label="Cerrar promoción"
          className="absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 bg-cream-50 text-2xl leading-none text-ink-900 shadow-soft hover:bg-white focus:outline-none focus:ring-2 focus:ring-gold-ink focus:ring-offset-2 focus:ring-offset-ink-900"
        >
          <span aria-hidden="true">×</span>
        </button>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => close("click")}
          className="block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ink-900"
        >
          <Image
            src={promoPopup.image}
            alt={promoPopup.alt}
            width={promoPopup.imageWidth}
            height={promoPopup.imageHeight}
            priority
            quality={80}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 720px"
            className="h-auto w-full max-h-[85vh] object-contain"
          />
        </a>
      </div>
    </div>
  );
}
