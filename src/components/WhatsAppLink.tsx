"use client";

import type { ReactNode } from "react";

import {
  trackWhatsAppClick,
  type WhatsAppLinkLocation,
} from "~/lib/analytics";
import { applyDesktopWhatsAppHref } from "~/lib/whatsapp-href";

/**
 * Client anchor for Server Components. The HTML href stays wa.me so
 * el servidor y la hidratación coinciden. En escritorio el clic lo
 * reescribe a WhatsApp Web antes de abrir la pestaña.
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
      onClick={(event) => {
        trackWhatsAppClick(linkLocation);
        applyDesktopWhatsAppHref(event.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
