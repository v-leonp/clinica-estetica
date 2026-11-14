import { whyUs } from "~/data/content";

const icons = {
  stethoscope: (
    <>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </>
  ),
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  shield: (
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  ),
  spark: (
    <path d="M9.9 15.5A2 2 0 0 0 8.5 14.1L2.4 12.5a.5.5 0 0 1 0-.96L8.5 9.9A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 .96 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-.96 0z" />
  ),
} as const;

export default function HomeWhyUs() {
  return (
    <section className="section bg-cream-100/70">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">{whyUs.eyebrow}</p>
          <h2 className="section-title">{whyUs.title}</h2>
          <p className="section-sub">{whyUs.subtitle}</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {whyUs.items.map((item) => (
            <li key={item.title}>
              <article className="h-full rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-blush text-gold-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {icons[item.icon]}
                  </svg>
                </span>
                <h3 className="heading mt-4 font-serif text-lg text-ink-900">{item.title}</h3>
                <p className="body-copy mt-2 text-sm leading-relaxed text-ink-700">
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
