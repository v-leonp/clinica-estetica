import Link from "next/link";

import WhatsAppLink from "~/components/WhatsAppLink";
import { cta, site } from "~/data/content";

export default function TreatmentLeadCta({
  treatmentName,
  treatmentSlug,
  whatsappLabel = "WhatsApp",
}: {
  treatmentName: string;
  treatmentSlug: string;
  whatsappLabel?: string;
}) {
  const reservar = `/reservar?tratamiento=${treatmentSlug}`;
  const wa = encodeURIComponent(
    `Hola ${site.brand}, me interesa reservar cita para ${treatmentName}.`,
  );

  return (
    <section className="section bg-cream-100/60 pt-8">
      <div className="container-x rounded-3xl border border-cream-200 bg-white p-8 shadow-soft md:p-10">
        <h2 className="heading font-serif text-2xl leading-tight text-ink-900 md:text-3xl">
          ¿Te interesa este tratamiento?
        </h2>
        <p className="mt-3 max-w-2xl body-copy text-sm leading-relaxed text-ink-700">
          Reserva una cita. Revisaremos tu caso y te indicaremos si este protocolo
          es adecuado. Los resultados pueden variar según cada persona.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={reservar} className="btn-primary">
            {cta.book.label}
          </Link>
          <WhatsAppLink
            href={`https://wa.me/${site.whatsappNumber}?text=${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            linkLocation="treatment_page"
          >
            {whatsappLabel}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
