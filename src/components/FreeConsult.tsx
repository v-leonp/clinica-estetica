import Link from "next/link";

import { freeConsult, site } from "~/data/content";

export default function FreeConsult() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-rose px-6 py-14 shadow-soft sm:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/20 blur-2xl"
          />

          <div className="relative mx-auto max-w-3xl text-center text-ink-900">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-900/80">
              {freeConsult.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              {freeConsult.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-900/85">
              {freeConsult.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contacto" className="btn-primary">
                Agenda tu consulta
              </Link>
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-ink-900/40"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
