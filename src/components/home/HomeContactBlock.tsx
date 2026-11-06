import Link from "next/link";

import { cta, site } from "~/data/content";

export default function HomeContactBlock() {
  return (
    <section className="section bg-ink-900 text-cream-50">
      <div className="container-x grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Contacto</p>
          <h2 className="heading mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            ¿Quieres una valoración?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream-100/90 sm:text-base">
            Escribe por WhatsApp o completa el formulario. Teléfono, correo y sede
            todavía no están publicados.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Escríbenos por WhatsApp · {site.whatsappDisplay}
            </a>
            <p className="mt-1 text-xs text-gold">{site.whatsappNote}</p>
          </li>
          <li className="text-cream-100/75">Teléfono y correo: próximamente.</li>
          <li className="flex flex-wrap gap-3 pt-4">
            <Link href={cta.primary.href} className="btn-rose">
              {cta.primary.label}
            </Link>
            <Link
              href="/contacto"
              className="btn-outline border-cream-100/30 text-cream-50 hover:border-gold hover:text-gold"
            >
              Formulario
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
