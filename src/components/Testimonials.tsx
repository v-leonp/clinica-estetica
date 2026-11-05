import { testimonials } from "~/data/content";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonios" className="section bg-cream-100/60">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Testimonios</p>
          <h2 className="section-title">Lo que dicen las pacientes</h2>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="card h-full">
                <blockquote className="text-sm leading-relaxed text-ink-700">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-serif text-base text-ink-900">{t.name}</p>
                  <p className="text-xs uppercase tracking-wider text-ink-500">
                    {t.treatment}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
