import Link from "next/link";

import { cta, site } from "~/data/content";

export default function HomeContactBlock() {
  return (
    <section className="section bg-ink-900 text-cream-50">
      <div className="container-x grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-rose-blush">Contacto</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            ¿Lista para dar el primer paso?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream-100/85">
            Llama, escribe por WhatsApp o completa el formulario. Te ayudamos a coordinar una
            valoración sin compromiso de tratamiento el mismo día.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li>
            <a href={`tel:${site.phoneHref}`} className="hover:text-rose-blush">
              Tel: {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              className="hover:text-rose-blush"
            >
              WhatsApp: {site.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-rose-blush">
              {site.email}
            </a>
          </li>
          <li className="flex flex-wrap gap-3 pt-4">
            <Link href={cta.primary.href} className="btn-rose">
              {cta.primary.label}
            </Link>
            <Link href="/contacto" className="btn-outline border-cream-100/30 text-cream-50">
              Formulario
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
