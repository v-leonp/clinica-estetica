import Header from "~/components/Header";
import Footer from "~/components/Footer";
import WhatsAppButton from "~/components/WhatsAppButton";
import MobileActionBar from "~/components/MobileActionBar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido" className="pb-28 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
    </>
  );
}
