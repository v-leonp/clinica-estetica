import Link from "next/link";

import { cta, successCases } from "~/data/content";

export default function SuccessCases() {
  return (
    <section id="resultados" className="section bg-ink-900 text-cream-50">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-blush">
            Resultados
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            {successCases.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-100/85">
            {successCases.intro}
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {successCases.items.map((item) => (
            <li key={item.title}>
              <article className="rounded-2xl border border-cream-100/10 bg-cream-50/5 p-6">
                <p className="text-xs uppercase tracking-wider text-rose-blush">
                  {item.tag}
                </p>
                <h3 className="mt-3 font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/80">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-cream-100/60">{successCases.disclaimer}</p>
        <p className="mt-8">
          <Link href={cta.primary.href} className="btn-rose">
            {cta.primary.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
