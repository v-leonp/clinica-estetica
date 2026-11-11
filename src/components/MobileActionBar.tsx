import Link from "next/link";

import { cta, site } from "~/data/content";

const waText = encodeURIComponent(
  `Hola ${site.brand}, me gustaría reservar una cita.`,
);

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-cream-200 bg-cream-50/95 backdrop-blur md:hidden"
    >
      <ul className="container-x grid grid-cols-4 gap-1 py-2 text-[10px] text-ink-700">
        <li>
          <Link
            href={cta.primary.href}
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-gold-ink"
          >
            <span aria-hidden="true">📅</span>
            Reservar
          </Link>
        </li>
        <li>
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-gold-ink"
          >
            <span aria-hidden="true">💬</span>
            WhatsApp
          </a>
        </li>
        <li>
          <Link
            href="/tratamientos"
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-gold-ink"
          >
            <span aria-hidden="true">✨</span>
            Tratamientos
          </Link>
        </li>
        <li>
          <Link
            href="/contacto"
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-gold-ink"
          >
            <span aria-hidden="true">✉️</span>
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}
