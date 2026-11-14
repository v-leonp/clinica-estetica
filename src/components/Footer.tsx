import Link from "next/link";

import { site, nav, footer, legalLinks } from "~/data/content";
import { attendNeighbors } from "~/data/seo-copy";
import WhatsAppLink from "~/components/WhatsAppLink";

function SocialIcon({ name }: { name: "Facebook" | "Instagram" | "TikTok" }) {
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.1C12.4 3 11 4.4 11 6.6v1.9H9v2.7h2V21h2.8v-9.8h2.3l.4-2.7h-2.7z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M14.2 3.2c.4 2.4 1.8 4 4.3 4.3v2.6c-1.5 0-2.9-.5-4.1-1.3v6.5a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.8a2.9 2.9 0 1 0 2 2.8V3.2h2.6z" />
    </svg>
  );
}

const socials = [
  { name: "Facebook", href: site.socials.facebook },
  { name: "Instagram", href: site.socials.instagram },
  { name: "TikTok", href: site.socials.tiktok },
] as const;

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">Redes</p>
          <ul className="mt-4 flex gap-3">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} de ${site.brand}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-50 transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <SocialIcon name={social.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">Navegación</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            {legalLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <WhatsAppLink
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
                linkLocation="footer"
              >
                Escríbenos por WhatsApp
              </WhatsAppLink>
              <p className="mt-1 text-cream-100/80">{site.whatsappDisplay}</p>
            </li>
            <li className="text-cream-100/80">
              <span className="block">{site.address}</span>
              <span className="mt-1 block text-xs text-cream-100/70">{site.addressReference}</span>
              <span className="mt-1 block text-xs text-cream-100/70">{attendNeighbors}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <p className="container-x py-6 text-xs text-cream-100/60">{footer.legal}</p>
      </div>
    </footer>
  );
}
