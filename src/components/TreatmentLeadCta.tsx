import Link from "next/link";

import { cta, site } from "~/data/content";

export default function TreatmentLeadCta({
  treatmentName,
  treatmentSlug,
}: {
  treatmentName: string;
  treatmentSlug: string;
}) {
  const reservar = `/reservar?tratamiento=${treatmentSlug}`;
  const contacto = `/contacto?tratamiento=${treatmentSlug}`;
  const wa = encodeURIComponent(
    `Hola ${site.brand}, solicito valoración para ${treatmentName}.`,
  );

  return (
    <section className="section bg-cream-100/60 pt-8">
      <div className="container-x rounded-3xl border border-cream-200 bg-white p-8 shadow-soft md:p-10">
        <h2 className="font-serif text-2xl text-ink-900 md:text-3xl">
          ¿Te interesa este tratamiento?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700">
          Solicita una valoración. Revisaremos tu caso y te indicaremos si este
          protocolo es adecuado. Los resultados pueden variar según cada persona.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={reservar} className="btn-primary">
            {cta.primary.label}
          </Link>
          <Link href={reservar} className="btn-outline">
            {cta.book.label}
          </Link>
          <Link href={contacto} className="btn-outline">
            Formulario de contacto
          </Link>
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
