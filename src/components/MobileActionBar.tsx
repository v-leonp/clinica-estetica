import Link from "next/link";

import { cta, site } from "~/data/content";

const waText = encodeURIComponent(
  `Hola ${site.brand}, me gustaría solicitar una valoración.`,
);

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-cream-200 bg-cream-50/95 backdrop-blur md:hidden"
    >
      <ul className="container-x grid grid-cols-5 gap-1 py-2 text-[10px] font-medium text-ink-700">
        <li>
          <Link
            href={cta.primary.href}
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-rose-gold"
          >
            <span aria-hidden="true">📅</span>
            Valoración
          </Link>
        </li>
        <li>
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-rose-gold"
          >
            <span aria-hidden="true">💬</span>
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href={`tel:${site.phoneHref}`}
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-rose-gold"
          >
            <span aria-hidden="true">📞</span>
            Llamar
          </a>
        </li>
        <li>
          <Link
            href="/tratamientos"
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-rose-gold"
          >
            <span aria-hidden="true">✨</span>
            Tratamientos
          </Link>
        </li>
        <li>
          <Link
            href="/sedes"
            className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 hover:text-rose-gold"
          >
            <span aria-hidden="true">📍</span>
            Sedes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
