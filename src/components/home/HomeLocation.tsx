import Link from "next/link";

import { RelatedLinks, VisibleFaq, WhatsAppCta } from "~/components/VisibleFaq";
import { bookingWhatsAppHref, cta } from "~/data/content";
import { homeSeo } from "~/data/seo-copy";

export default function HomeLocation() {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <h2 className="heading font-serif text-2xl text-ink-900">
          {homeSeo.h2Location}
        </h2>
        <p className="body-copy mt-3 text-base leading-relaxed text-ink-700">
          {homeSeo.body}
        </p>
        <h3 className="heading mt-10 font-serif text-xl text-ink-900">
          Preguntas frecuentes
        </h3>
        <VisibleFaq items={homeSeo.faqs} />
        <RelatedLinks links={homeSeo.links} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={cta.book.href} className="btn-primary">
            {cta.book.label}
          </Link>
          <WhatsAppCta
            href={bookingWhatsAppHref()}
            label={homeSeo.whatsappCta}
            linkLocation="contact"
            className="btn-outline"
          />
        </div>
      </div>
    </section>
  );
}
