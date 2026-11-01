import { locations } from "~/data/content";

export default function Locations() {
  return (
    <section id="sedes" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Sedes</p>
          <h2 className="section-title">Encuéntranos en Lima</h2>
          <p className="section-sub">
            Visítanos en cualquiera de nuestras sedes. Todos los datos de
            contacto son de ejemplo.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {locations.map((l) => (
            <li key={l.slug}>
              <article className="card h-full">
                <div
                  aria-hidden="true"
                  className="h-28 w-full rounded-xl bg-gradient-cream"
                />
                <h3 className="mt-5 font-serif text-xl text-ink-900">
                  {l.name}
                </h3>
                <p className="mt-2 text-sm text-ink-700">{l.address}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-ink-500">Teléfono</dt>
                    <dd>
                      <a
                        href={`tel:${l.phoneHref}`}
                        className="text-ink-900 hover:text-rose-gold"
                      >
                        {l.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-ink-500">WhatsApp</dt>
                    <dd>
                      <a
                        href={`https://wa.me/${l.whatsappHref}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-900 hover:text-rose-gold"
                      >
                        {l.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="w-20 shrink-0 text-ink-500">Horario</dt>
                    <dd className="text-ink-900">{l.hours}</dd>
                  </div>
                </dl>
                <a
                  href={l.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-rose-gold hover:text-ink-900"
                >
                  Ver en el mapa <span aria-hidden="true">→</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
