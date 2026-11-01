import Link from "next/link";

import { site, nav, footer } from "~/data/content";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="font-serif text-2xl text-cream-50"
            aria-label={`${site.brand} — inicio`}
          >
            {site.brand}
            <span className="ml-1 text-rose-gold">·</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-cream-100/80">
            {site.description}
          </p>
          <p className="mt-6 text-xs uppercase tracking-wider text-cream-100/60">
            Horario de atención
          </p>
          <p className="mt-1 text-sm">{footer.hours}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">
            Navegación
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-rose-blush">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacidad" className="hover:text-rose-blush">
                Privacidad
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">
            Contacto
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-rose-blush">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-blush"
              >
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-rose-blush">
                {site.email}
              </a>
            </li>
            <li className="text-cream-100/80">{site.address}</li>
          </ul>

          <p className="mt-6 text-xs uppercase tracking-wider text-cream-100/60">
            Síguenos
          </p>
          <ul className="mt-3 flex gap-4 text-sm">
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-blush"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-blush"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-blush"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <p className="container-x py-6 text-xs text-cream-100/60">
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
