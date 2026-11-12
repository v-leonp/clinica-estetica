"use client";

import { sendGAEvent } from "@next/third-parties/google";

/** Where the visitor clicked. Never a name, phone, message, or treatment. */
export type WhatsAppLinkLocation =
  | "floating"
  | "mobile_bar"
  | "footer"
  | "header"
  | "treatment_page"
  | "booking"
  | "contact"
  | "free_consult"
  | "locations"
  | "sedes";

type GtagFn = (...args: unknown[]) => void;

function readGtag(): GtagFn | undefined {
  const candidate = (window as Window & { gtag?: unknown }).gtag;
  return typeof candidate === "function" ? (candidate as GtagFn) : undefined;
}

/**
 * GA4 `whatsapp_click`. Sends only `link_location` and `page_path`
 * (pathname, no query string). Never throws if gtag is missing.
 */
export function trackWhatsAppClick(linkLocation: WhatsAppLinkLocation): void {
  if (typeof window === "undefined") return;

  const payload = {
    link_location: linkLocation,
    page_path: window.location.pathname,
  };

  try {
    sendGAEvent("event", "whatsapp_click", payload);
  } catch {
    readGtag()?.("event", "whatsapp_click", payload);
  }
}
