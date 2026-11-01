import { site } from '~/data/content';

export default function WhatsAppButton() {
  const text = encodeURIComponent(
    `Hola ${site.brand}, me gustaría agendar una consulta.`
  );
  return (
    <a
      href={`https://wa.me/${site.whatsappNumber}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribirnos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-cream-50 sm:bottom-7 sm:right-7"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M19.1 17.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.1-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.4 1.7 6.3L3 29l6.9-1.8c1.8 1 3.9 1.5 6.1 1.5 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4C5.6 19.9 5 18 5 16 5 9.9 9.9 5 16 5s11 4.9 11 11-4.9 10.6-11 10.6z" />
      </svg>
    </a>
  );
}
