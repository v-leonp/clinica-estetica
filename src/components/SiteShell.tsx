import Header from "~/components/Header";
import Footer from "~/components/Footer";
import WhatsAppButton from "~/components/WhatsAppButton";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-cream-50"
      >
        Saltar al contenido
      </a>

      <Header />
      {/* Bottom padding leaves room for the fixed WhatsApp button on mobile
          so it never covers content. On >=sm the button sits in the margin. */}
      <main id="contenido" className="pb-24 sm:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
