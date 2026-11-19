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

const cardImageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export default function HomeTreatmentsCatalog() {
  return (
    <section id="tratamientos" className="section bg-cream-50">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">{homeEditorialIntro.eyebrow}</p>
          <h2 className="section-title">{homeEditorialIntro.title}</h2>
          <p className="section-sub">{homeEditorialIntro.description}</p>
        </div>

        <ul className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTreatments.map(({ category, treatment }) => {
            const href = `/tratamientos/${category.slug}/${treatment.slug}`;
            const photo = photoForTreatment(treatment.slug);
            const promo = treatmentPromoBadge(treatment.slug);

            return (
              <li key={href} className="h-full">
                <article className="card flex h-full flex-col overflow-hidden !p-0">
                  {photo ? (
                    <Link href={href} className="block">
                      <ClinicPhoto
                        photo={photo}
                        sizes={cardImageSizes}
                        className="rounded-none"
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold-ink">
                      {category.title}
                    </p>
                    <h3 className="heading mt-2 font-serif text-lg leading-snug text-ink-900">
                      <Link href={href} className="hover:text-gold-ink">
                        {treatment.name}
                      </Link>
                    </h3>
                    {promo ? (
                      <p className="mt-3 rounded-lg border border-gold/40 bg-cream-100/80 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gold-ink">
                        {promo}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-4">
                      <p className="text-xs text-ink-500">
                        Duración: {treatment.duration}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link href={href} className="btn-outline w-full px-3 text-center">
                          Ver detalle
                        </Link>
                        <WhatsAppLink
                          href={catalogCardWhatsAppHref(treatment.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-rose w-full px-3 text-center"
                          linkLocation="catalog_card"
                        >
                          {cta.book.label}
                        </WhatsAppLink>
                      </div>
                    </div>
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
