"use client";

import { sendGAEvent } from "@next/third-parties/google";

/** Where the visitor clicked. Never a name, phone, message, or treatment. */
export type WhatsAppLinkLocation =
  | "floating"
  | "mobile_bar"
  | "footer"
  | "treatment_page"
  | "catalog_card"
  | "booking"
  | "booking_cta"
  | "contact"
  | "locations"
  | "sedes"
  | "promociones";

export const CONSENT_STORAGE_KEY = "dmv-cookie-consent";
export const CONSENT_EVENT = "dmv-cookie-consent-change";

export type ConsentChoice = "accepted" | "rejected";

type GtagFn = (...args: unknown[]) => void;

type ConsentWindow = Window & {
  gtag?: GtagFn;
  dataLayer?: unknown[];
};

function readGtag(): GtagFn | undefined {
  const candidate = (window as ConsentWindow).gtag;
  return typeof candidate === "function" ? candidate : undefined;
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice | null): void {
  if (choice === null) {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } else {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Consent Mode v2. Analytics only; ads stay denied because the site has no ads tag. */
export function updateAnalyticsConsent(granted: boolean): void {
  const gtag = readGtag();
  const payload = {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  if (gtag) {
    gtag("consent", "update", payload);
    return;
  }
  const dataLayer = ((window as ConsentWindow).dataLayer ??= []);
  dataLayer.push(["consent", "update", payload]);
}

/**
 * GA4 `whatsapp_click`. Sends only `link_location` and `page_path`
 * (pathname, no query string). Does nothing until cookies are accepted.
 * Never throws if gtag is missing.
 */
export function trackWhatsAppClick(linkLocation: WhatsAppLinkLocation): void {
  if (typeof window === "undefined") return;
  if (readConsent() !== "accepted") return;

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
