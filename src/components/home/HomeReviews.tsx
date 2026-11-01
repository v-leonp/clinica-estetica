import { testimonials } from "~/data/content";

function Stars() {
  return (
    <span className="text-rose-gold" aria-hidden="true">
      ★★★★★
    </span>
  );
}

export default function HomeReviews() {
  return (
    <section id="opiniones" className="section bg-cream-100/60">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Opiniones</p>
            <h2 className="section-title">Lo que dicen nuestras pacientes</h2>
            <p className="section-sub">
              Testimonios ficticios de demo. En producción, usa reseñas verificables y autorizadas.
            </p>
          </div>
          <p className="text-sm text-ink-600">
            <Stars /> <span className="sr-only">5 de 5</span> Valoración media ilustrativa
          </p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <article className="card h-full">
                <Stars />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink-700">
                  “{t.quote}”
                </blockquote>
                <footer className="mt-5 border-t border-cream-200 pt-4">
                  <p className="font-medium text-ink-900">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.treatment}</p>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
