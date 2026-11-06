import { homePillars } from "~/data/content";

export default function HomeValuePillars() {
  return (
    <section className="section bg-cream-50">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">La visita</p>
          <h2 className="section-title">Antes de cualquier procedimiento</h2>
          <p className="section-sub">
            Tres cosas que ya puedes saber, aunque la clínica todavía no abra.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {homePillars.map((p) => (
            <li key={p.title} className="min-w-0">
              <article className="h-full rounded-2xl border border-cream-200 bg-white p-8 shadow-soft">
                <h3 className="heading font-serif text-xl leading-snug text-ink-900">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-700">{p.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
