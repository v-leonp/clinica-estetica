import Link from "next/link";

import { locations, site } from "~/data/content";

export default function Locations() {
  return (
    <section id="sedes" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Sedes</p>
          <h2 className="section-title">Dónde atenderemos</h2>
          <p className="section-sub">
            {locations.length === 0
              ? "Próximamente. La dirección y el horario aún no están confirmados."
              : "Sedes publicadas por la clínica."}
          </p>
        </div>

        {locations.length === 0 ? (
          <div className="mt-10 max-w-xl rounded-2xl border border-cream-200 bg-white p-6">
            <p className="text-sm leading-relaxed text-ink-700">
              La clínica aún no abre en Lima. Cuando haya sede, la publicaremos
              aquí. Mientras tanto, escríbenos por WhatsApp.
            </p>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Escríbenos por WhatsApp
            </a>
            <p className="mt-3 text-xs text-gold-ink">{site.whatsappNote}</p>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <article className="card h-full">
                  <h3 className="font-serif text-xl text-ink-900">{l.name}</h3>
                  <p className="mt-2 text-sm text-ink-700">{l.address}</p>
                  <p className="mt-2 text-sm text-ink-700">{l.hours}</p>
                  <Link
                    href="/sedes"
                    className="mt-5 inline-flex text-sm text-gold-ink hover:underline"
                  >
                    Ver sedes
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
