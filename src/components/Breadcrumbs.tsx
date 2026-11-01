import Link from "next/link";

import { getSiteUrl } from "~/lib/site-url";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      // schema.org BreadcrumbList expects absolute URLs for `item`.
      item: c.href ? `${base}${c.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Migas de pan" className="container-x pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link
                  href={c.href}
                  className="transition hover:text-rose-gold"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-ink-900" : undefined}
                >
                  {c.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-ink-500/60">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
