import Link from "next/link";

import { featured, getTreatment } from "~/data/content";

export default function Featured() {
  const items = featured
    .map((f) => {
      const match = getTreatment(f.categorySlug, f.treatmentSlug);
      if (!match) return null;
      return {
        href: `/tratamientos/${f.categorySlug}/${f.treatmentSlug}`,
        bookHref: `/contacto?tratamiento=${f.treatmentSlug}`,
        title: match.treatment.name,
        description: match.treatment.short,
        price: match.treatment.priceFrom,
        duration: match.treatment.duration,
      };
    })
    .filter(Boolean) as Array<{
    href: string;
    bookHref: string;
    title: string;
    description: string;
    price: string;
    duration: string;
  }>;

  return (
    <section id="destacados" className="section bg-cream-100/60">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Más solicitados</p>
            <h2 className="section-title">Nuestros tratamientos destacados</h2>
            <p className="section-sub">
              Una selección de los procedimientos preferidos por nuestras
              pacientes, con resultados visibles y naturales.
            </p>
          </div>
          <Link href="/tratamientos" className="btn-outline">
            Ver todos
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <article className="card flex h-full flex-col">
                <Link href={item.href} className="group block">
                  <div
                    aria-hidden="true"
                    className="h-32 w-full rounded-xl bg-gradient-rose opacity-80 transition group-hover:opacity-100"
                  />
                  <h3 className="mt-5 font-serif text-xl text-ink-900 group-hover:text-rose-gold">
                    {item.title}
                  </h3>
                </Link>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-900">{item.price}</span>
                  <span className="text-ink-500">{item.duration}</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link href={item.href} className="btn-outline">
                    Ver más
                  </Link>
                  <Link href={item.bookHref} className="btn-rose">
                    Agendar
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
