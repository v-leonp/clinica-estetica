import { homeSeo } from "~/data/seo-copy";

export default function HomeLocation() {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <h2 className="heading font-serif text-2xl text-ink-900">{homeSeo.h2Location}</h2>
        <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">{homeSeo.body}</p>
      </div>
    </section>
  );
}
