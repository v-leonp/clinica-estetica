import Link from "next/link";

import SiteShell from "~/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container-x flex min-h-[55vh] flex-col items-center justify-center text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-3 font-serif text-5xl text-ink-900 md:text-6xl">
            Página no encontrada
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-700">
            La página que buscas no existe o fue movida. Puedes volver al inicio
            o explorar nuestros tratamientos.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-primary">
              Volver al inicio
            </Link>
            <Link href="/tratamientos" className="btn-outline">
              Ver tratamientos
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
