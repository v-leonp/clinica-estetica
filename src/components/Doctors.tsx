import Image from "next/image";
import Link from "next/link";

import { cta, teamMembers } from "~/data/content";

const portraits = [
  {
    src: "/fotos/doctora-sonriente.jpg",
    alt: "Retrato de la Dra. Melissa Vigo, médico estético, sonriendo en su consultorio.",
  },
  {
    src: "/fotos/doctora-brazos-cruzados.jpg",
    alt: "Dra. Melissa Vigo, médico estético, con los brazos cruzados frente al letrero de su consultorio.",
  },
] as const;

export default function Doctors() {
  const doctor = teamMembers[0];
  if (!doctor) return null;

  return (
    <section id="equipo" className="section bg-white">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow">Consulta</p>
          <h2 className="section-title">{doctor.name}</h2>
          <p className="credential mt-4 text-xl text-gold-ink sm:text-2xl">{doctor.role}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700">{doctor.bio}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-700">
            La atención del catálogo es suya. No hay otro profesional publicado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/equipo/${doctor.slug}`} className="btn-outline uppercase tracking-[0.12em]">
              Ver perfil
            </Link>
            <Link href={cta.book.href} className="btn-primary uppercase tracking-[0.12em]">
              {cta.book.label}
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {portraits.map((photo) => (
            <li key={photo.src} className="min-w-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-100 shadow-soft">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 280px"
                  quality={85}
                  className="object-cover object-top"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
