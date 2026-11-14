import Link from "next/link";

import ClinicPhoto from "~/components/ClinicPhoto";
import { clinicPhotos } from "~/data/clinic-photos";
import { doctorIntro } from "~/data/content";

export default function HomeDoctorIntro() {
  return (
    <section className="section bg-cream-50">
      <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7">
          <h2 className="section-title">{doctorIntro.title}</h2>
          {doctorIntro.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="body-copy mt-4 max-w-xl text-base leading-relaxed text-ink-700"
            >
              {paragraph}
            </p>
          ))}
          <blockquote className="credential normal-case mt-6 max-w-xl text-xl text-ink-900 sm:text-2xl">
            “{doctorIntro.quote}”
          </blockquote>
          <Link
            href={doctorIntro.cta.href}
            className="mt-8 inline-flex items-center gap-2 font-serif text-sm uppercase tracking-[0.14em] text-gold-ink underline decoration-gold/70 underline-offset-4 hover:text-ink-900"
          >
            {doctorIntro.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="md:col-span-5">
          <ClinicPhoto
            photo={clinicPhotos.doctoraRetrato}
            sizes="(max-width: 768px) 100vw, 420px"
            className="mx-auto max-w-md rounded-t-[12rem] rounded-b-[2rem] shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
