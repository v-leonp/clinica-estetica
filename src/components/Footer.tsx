import Link from "next/link";

import { site, nav, footer, legalLinks } from "~/data/content";
import { attendNeighbors } from "~/data/seo-copy";
import BrandLogo from "~/components/BrandLogo";
import WhatsAppLink from "~/components/WhatsAppLink";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link href="/" aria-label={`${site.brandFull} — inicio`}>
            <BrandLogo variant="footer" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/80">
            {site.description}
          </p>
          <p className="mt-6 text-xs uppercase tracking-wider text-cream-100/60">
            Horario de atención
          </p>
          <p className="mt-1 text-sm">{footer.hoursNote}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream-100/60">
            Navegación
          </p>
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
          <p className="text-xs uppercase tracking-wider text-cream-100/60">
            Legal
          </p>
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
          <p className="text-xs uppercase tracking-wider text-cream-100/60">
            Contacto
          </p>
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
            {site.address ? (
              <li className="text-cream-100/80">
                <span className="block">{site.address}</span>
                {site.addressReference ? (
                  <span className="mt-1 block text-xs text-cream-100/70">
                    {site.addressReference}
                  </span>
                ) : null}
                <span className="mt-1 block text-xs text-cream-100/70">
                  {attendNeighbors}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <p className="container-x py-6 text-xs text-cream-100/60">{footer.legal}</p>
      </div>
    </footer>
  );
}
