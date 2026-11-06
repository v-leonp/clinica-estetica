import Link from "next/link";

import {
  getTreatment,
  homeEditorialIntro,
  homeEditorialSlugs,
} from "~/data/content";

export default function HomeTreatmentStories() {
  const items = homeEditorialSlugs
    .map(({ categorySlug, treatmentSlug }) => {
      const match = getTreatment(categorySlug, treatmentSlug);
      if (!match) return null;
      return { ...match, categorySlug, treatmentSlug };
    })
    .filter(Boolean) as Array<{
    category: { title: string; slug: string };
    treatment: { name: string; short: string; long: string; slug: string };
    categorySlug: string;
    treatmentSlug: string;
  }>;

  return (
    <section id="tratamientos-destacados" className="section bg-white">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">{homeEditorialIntro.eyebrow}</p>
          <h2 className="section-title">{homeEditorialIntro.title}</h2>
          <p className="section-sub">{homeEditorialIntro.description}</p>
        </div>
        <ul className="mt-12 space-y-16">
          {items.map(({ category, treatment, categorySlug, treatmentSlug }, i) => (
            <li
              key={treatmentSlug}
              className={`grid items-center gap-8 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="md:[direction:ltr]">
                <div
                  className="aspect-[16/11] w-full rounded-3xl bg-gradient-rose shadow-soft"
                  role="img"
                  aria-label={`Ilustración ${treatment.name}`}
                />
              </div>
              <div className="md:[direction:ltr]">
                <p className="text-xs uppercase tracking-wider text-rose-gold">
                  {category.title}
                </p>
                <h3 className="heading mt-2 font-serif text-[1.65rem] leading-tight text-ink-900 sm:text-3xl">
                  {treatment.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-700">{treatment.long}</p>
                <Link
                  href={`/tratamientos/${categorySlug}/${treatmentSlug}`}
                  className="mt-6 inline-flex text-sm font-medium text-rose-gold hover:underline"
                >
                  Conocer tratamiento →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
