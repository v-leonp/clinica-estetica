import Link from "next/link";

import ClinicPhoto from "~/components/ClinicPhoto";
import WhatsAppLink from "~/components/WhatsAppLink";
import { photoForTreatment } from "~/data/clinic-photos";
import {
  allTreatments,
  catalogCardWhatsAppHref,
  cta,
  homeEditorialIntro,
  treatmentPromoBadge,
} from "~/data/content";

export default function HomeTreatmentsCatalog() {
  return (
    <section id="tratamientos" className="section bg-cream-50">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">{homeEditorialIntro.eyebrow}</p>
          <h2 className="section-title">{homeEditorialIntro.title}</h2>
          <p className="section-sub">{homeEditorialIntro.description}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTreatments.map(({ category, treatment }) => {
            const href = `/tratamientos/${category.slug}/${treatment.slug}`;
            const promo = treatmentPromoBadge(treatment.slug);
            const photo = photoForTreatment(treatment.slug, category.slug);

            return (
              <li key={href}>
                <article className="card flex h-full flex-col">
                  {photo ? (
                    <ClinicPhoto
                      photo={photo}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="mb-4 rounded-xl"
                    />
                  ) : null}
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold-ink">
                    {category.title}
                  </p>
                  <h3 className="heading mt-2 font-serif text-lg text-ink-900">
                    <Link href={href} className="hover:text-gold-ink">
                      {treatment.name}
                    </Link>
                  </h3>
                  <p className="body-copy mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                    {treatment.cardText}
                  </p>
                  {promo ? (
                    <p className="mt-3 rounded-lg border border-gold/40 bg-cream-100/80 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gold-ink">
                      {promo}
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs text-ink-500">Duración: {treatment.duration}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link href={href} className="btn-outline">
                      Ver detalle
                    </Link>
                    <WhatsAppLink
                      href={catalogCardWhatsAppHref(treatment.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-rose"
                      linkLocation="catalog_card"
                    >
                      {cta.book.label}
                    </WhatsAppLink>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
