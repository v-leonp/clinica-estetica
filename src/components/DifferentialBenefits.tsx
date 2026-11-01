import { differentialBenefits } from "~/data/content";

export default function DifferentialBenefits() {
  return (
    <section id="beneficios" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Por qué elegirnos</p>
          <h2 className="section-title">Beneficios diferenciales</h2>
          <p className="section-sub">
            Experiencia premium sin perder claridad clínica: menos ruido comercial,
            más acompañamiento responsable.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {differentialBenefits.map((b) => (
            <li key={b.title}>
              <article className="card h-full border-cream-200/80 bg-cream-50/50">
                <h3 className="font-serif text-xl text-ink-900">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{b.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
