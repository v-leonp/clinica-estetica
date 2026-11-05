import { site } from "~/data/content";

export default function TopContactBar() {
  return (
    <div className="border-b border-cream-200 bg-white text-xs text-ink-700">
      <div className="container-x flex flex-wrap items-center justify-between gap-2 py-2">
        <p>{site.tagline} · Lima · sede y horario por confirmar</p>
        <a
          href={`https://wa.me/${site.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold-ink"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  );
}
