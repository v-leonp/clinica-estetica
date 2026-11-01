import { homePillars } from "~/data/content";

export default function HomeValuePillars() {
  return (
    <section className="section">
      <div className="container-x">
        <ul className="grid gap-6 md:grid-cols-3">
          {homePillars.map((p) => (
            <li key={p.title}>
              <article className="h-full rounded-2xl border border-cream-200 bg-white p-8 text-center shadow-soft">
                <h3 className="font-serif text-2xl text-ink-900">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-700">{p.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
