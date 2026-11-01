import Link from "next/link";

import { categories } from "~/data/content";
import CategoryIcon from "~/components/CategoryIcon";

export default function Categories() {
  return (
    <section id="tratamientos" className="section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Nuestras especialidades</p>
          <h2 className="section-title">
            Tratamientos pensados para cada etapa de tu piel y tu cuerpo
          </h2>
          <p className="section-sub">
            Protocolos personalizados, insumos de primera línea y acompañamiento
            médico integral en cada visita.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <article className="card h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-blush text-rose-gold">
                  <CategoryIcon name={cat.icon} />
                </div>
                <h3 className="mt-5 font-serif text-xl text-ink-900">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {cat.description}
                </p>
                <Link
                  href={`/tratamientos/${cat.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-rose-gold transition hover:text-ink-900"
                  aria-label={`Ver más sobre ${cat.title}`}
                >
                  Ver más
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
