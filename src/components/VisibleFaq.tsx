import Link from "next/link";

import WhatsAppLink from "~/components/WhatsAppLink";
import type { FAQ } from "~/data/content";
import type { InternalLink } from "~/data/seo-copy";
import type { WhatsAppLinkLocation } from "~/lib/analytics";

export function VisibleFaq({ items }: { items: FAQ[] }) {
  return (
    <div className="mt-4 divide-y divide-cream-200 overflow-hidden rounded-2xl border border-cream-200 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-ink-900">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 text-rose-gold transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="body-copy mt-3 text-sm leading-relaxed text-ink-700">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function RelatedLinks({ links }: { links: InternalLink[] }) {
  if (links.length === 0) return null;
  return (
    <nav aria-label="Enlaces relacionados" className="mt-8">
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="font-medium text-rose-gold hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function WhatsAppCta({
  href,
  label,
  linkLocation,
  className = "btn-outline mt-6",
}: {
  href: string;
  label: string;
  linkLocation: WhatsAppLinkLocation;
  className?: string;
}) {
  return (
    <WhatsAppLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      linkLocation={linkLocation}
    >
      {label}
    </WhatsAppLink>
  );
}
