import { doctors } from '~/data/content';

export default function Doctors() {
  return (
    <section id="equipo" className="section bg-cream-100/60">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Nuestro equipo</p>
          <h2 className="section-title">
            Médicos certificados que acompañan cada paso de tu tratamiento
          </h2>
          <p className="section-sub">
            Un equipo multidisciplinario con años de experiencia y una filosofía
            de resultados naturales y seguros.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <li key={d.name}>
              <article className="card h-full text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto h-28 w-28 rounded-full bg-gradient-rose"
                />
                <h3 className="mt-5 font-serif text-xl text-ink-900">{d.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-rose-gold">
                  {d.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {d.bio}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
