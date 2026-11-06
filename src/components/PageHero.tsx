export default function PageHero({
  eyebrow,
  title,
  subtitle,
  credential,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Línea profesional. Cormorant Italic: Gabriola no tiene licencia web. */
  credential?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-cream"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-gradient-rose opacity-40 blur-3xl"
      />
      <div className="container-x relative pt-10 pb-14 sm:pt-14 md:pt-16 md:pb-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="heading mt-3 font-serif text-4xl leading-[1.12] text-ink-900 sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {credential && (
          <p className="credential mt-3 text-[1.05rem] text-gold-ink sm:text-lg">
            {credential}
          </p>
        )}
        {subtitle && (
          <p className="section-sub sm:text-xl">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
