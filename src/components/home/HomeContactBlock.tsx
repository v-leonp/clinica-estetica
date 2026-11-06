import Link from "next/link";

import { cta, site } from "~/data/content";

export default function HomeContactBlock() {
  return (
    <section className="section bg-cream-100">
      <div className="container-x mx-auto max-w-3xl text-center">
        <p className="eyebrow">Reservar cita</p>
        <h2 className="section-title">¿Quieres solicitar una cita?</h2>
        <p className="section-sub mx-auto">
          El formulario es una solicitud, no una agenda. La revisamos y te
          escribimos por WhatsApp.
        </p>
        <p className="mx-auto mt-4 max-w-xl body-copy text-sm leading-relaxed text-ink-700">
          Teléfono, correo y dirección siguen sin publicarse. WhatsApp{" "}
          {site.whatsappDisplay}. {site.whatsappNote}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={cta.book.href} className="btn-primary uppercase tracking-[0.12em]">
            {cta.book.label}
          </Link>
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline uppercase tracking-[0.12em]"
          >
            WhatsApp
          </a>
          <Link href="/contacto" className="btn-outline uppercase tracking-[0.12em]">
            Formulario
          </Link>
        </div>
      </div>
    </section>
  );
}
