import { technology } from '~/data/content';

export default function Technology() {
  return (
    <section id="tecnologia" className="section">
      <div className="container-x grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="eyebrow">Tecnología</p>
          <h2 className="section-title">
            Equipos de alta gama para resultados eficaces y seguros
          </h2>
          <p className="section-sub">
            Invertimos continuamente en tecnología aprobada por autoridades
            internacionales para ofrecerte protocolos de vanguardia.
          </p>

          <div
            aria-hidden="true"
            className="mt-10 aspect-square overflow-hidden rounded-3xl bg-gradient-cream md:aspect-[4/5]"
          >
            <div className="flex h-full items-center justify-center">
              <div className="h-40 w-40 rounded-full bg-gradient-rose opacity-80 blur-xl" />
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <ul className="space-y-5">
            {technology.map((t, i) => (
              <li
                key={t.name}
                className="flex items-start gap-5 rounded-2xl border border-cream-200 bg-white p-5 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-gold font-serif text-cream-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-ink-900">{t.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-700">
                    {t.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
