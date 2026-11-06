import { careProcess } from "~/data/content";

export default function ProcessSteps() {
  return (
    <section id="proceso" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Cómo te acompañamos</p>
          <h2 className="section-title">Un proceso claro, de la valoración al seguimiento</h2>
          <p className="section-sub">
            Transparencia en cada etapa. La indicación final siempre la define el equipo
            médico en consulta presencial o virtual autorizada.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careProcess.map((item) => (
            <li key={item.step}>
              <article className="card h-full">
                <p className="font-serif text-3xl text-rose-gold/80">{item.step}</p>
                <h3 className="heading mt-3 font-serif text-xl text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
