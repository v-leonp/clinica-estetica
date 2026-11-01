import Link from "next/link";

import { site } from "~/data/content";

export default function TopContactBar() {
  return (
    <div className="border-b border-cream-200 bg-white text-xs text-ink-700">
      <div className="container-x flex flex-wrap items-center justify-between gap-2 py-2">
        <p className="hidden sm:block">
          {site.tagline} · {site.address}
        </p>
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
          <a
            href={`tel:${site.phoneHref}`}
            className="font-medium hover:text-rose-gold"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-gold"
          >
            WhatsApp
          </a>
          <Link href="/contacto" className="hidden hover:text-rose-gold md:inline">
            {site.email}
          </Link>
        </div>
      </div>
    </div>
  );
}
