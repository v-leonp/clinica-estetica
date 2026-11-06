import Link from "next/link";

import type { FAQ } from "~/data/content";

type Props = {
  title?: string;
  subtitle?: string;
  items: FAQ[];
  showAllLink?: boolean;
};

export default function FAQSection({
  title = "Preguntas frecuentes",
  subtitle = "Respuestas claras sobre valoración, expectativas y logística.",
  items,
  showAllLink = true,
}: Props) {
  return (
    <section id="faq" className="section bg-cream-100/60">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Resolvemos dudas</p>
        <h2 className="section-title">{title}</h2>
        <p className="section-sub">{subtitle}</p>
        <div className="mt-8 divide-y divide-cream-200 overflow-hidden rounded-2xl border border-cream-200 bg-white">
          {items.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-ink-900 marker:content-none">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-rose-gold transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 body-copy text-sm leading-relaxed text-ink-700">{f.a}</p>
            </details>
          ))}
        </div>
        {showAllLink && (
          <p className="mt-6 text-center text-sm">
            <Link href="/preguntas-frecuentes" className="font-medium text-rose-gold hover:underline">
              Ver todas las preguntas frecuentes
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
