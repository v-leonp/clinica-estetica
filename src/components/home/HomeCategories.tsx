import Link from "next/link";

import { categoriesFull, homeEditorialIntro } from "~/data/content";

export default function HomeCategories() {
  const total = categoriesFull.reduce(
    (count, category) => count + category.treatments.length,
    0,
  );

  return (
    <section id="tratamientos" className="section bg-cream-50">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">{homeEditorialIntro.eyebrow}</p>
          <h2 className="section-title">{homeEditorialIntro.title}</h2>
          <p className="section-sub">
            {homeEditorialIntro.description} {total} tratamientos publicados.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categoriesFull.map((category) => (
            <li key={category.slug} className="min-w-0">
              <article className="flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold-ink">
                  {category.treatments.length}{" "}
                  {category.treatments.length === 1 ? "tratamiento" : "tratamientos"}
                </p>
                <h3 className="heading mt-3 font-serif text-xl leading-snug text-ink-900">
                  {category.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
                  {category.short}
                </p>
                <Link
                  href={`/tratamientos/${category.slug}`}
                  className="mt-6 inline-flex font-serif text-xs uppercase tracking-[0.14em] text-gold-ink hover:text-ink-900"
                >
                  Ver tratamientos
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
