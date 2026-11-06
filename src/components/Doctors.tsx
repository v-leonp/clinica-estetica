import Link from "next/link";

import ClinicPhoto from "~/components/ClinicPhoto";
import { clinicPhotos } from "~/data/clinic-photos";
import { cta, teamMembers } from "~/data/content";

const portraits = [clinicPhotos.doctoraTratando, clinicPhotos.doctoraRetrato];

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
          <p className="body-copy mt-5 max-w-xl text-base leading-relaxed text-ink-700">{doctor.bio}</p>
          <p className="body-copy mt-4 max-w-xl text-sm leading-relaxed text-ink-700">
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
              <ClinicPhoto
                photo={photo}
                sizes="(max-width: 1024px) 45vw, 280px"
                className="rounded-2xl shadow-soft"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
