"use client";

import type { ReactNode } from "react";

import {
  trackWhatsAppClick,
  type WhatsAppLinkLocation,
} from "~/lib/analytics";

/**
 * Client anchor for Server Components. Markup stays a plain `<a>`:
 * same href, target, rel, and className. The click handler does not
 * call preventDefault.
 */
export default function WhatsAppLink({
  linkLocation,
  href,
  className,
  target,
  rel,
  children,
}: {
  linkLocation: WhatsAppLinkLocation;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => {
        trackWhatsAppClick(linkLocation);
      }}
    >
      {children}
    </a>
  );
}
