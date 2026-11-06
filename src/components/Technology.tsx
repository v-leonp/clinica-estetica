import { technology } from "~/data/content";

export default function Technology() {
  return (
    <section id="tecnologia" className="section bg-cream-50">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Técnicas</p>
          <h2 className="section-title">Cuando el procedimiento lo pide</h2>
          <p className="section-sub">
            Aparecen en tratamientos del catálogo. Si no consta la marca del
            equipo, no la publicamos.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {technology.map((item) => (
            <li key={item.name} className="min-w-0">
              <article className="h-full rounded-2xl border border-cream-200 bg-cream-50 p-6">
                <h3 className="heading font-serif text-lg leading-snug text-ink-900">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
