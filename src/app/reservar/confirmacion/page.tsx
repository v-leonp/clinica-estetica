"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import { BOOKING_STORAGE_KEY, cta, site } from "~/data/content";
import { trackWhatsAppClick } from "~/lib/analytics";

type Stored = {
  nombre?: string;
  tratamiento?: string;
  telefono?: string;
  modos?: string[];
  sede?: string;
  fecha?: string;
  hora?: string;
};

export default function ReservaConfirmacionPage() {
  const [data, setData] = useState<Stored | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as Stored);
    } catch {
      setData(null);
    }
  }, []);

  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Reservar", href: "/reservar" },
          { label: "Confirmación" },
        ]}
      />
      <section className="section">
        <div className="container-x max-w-xl text-center">
          <p className="eyebrow">Solicitud recibida</p>
          <h1 className="mt-3 font-serif text-4xl text-ink-900">
            Revisaremos tu solicitud
          </h1>
          <p className="mt-4 text-base text-ink-700">
            Hemos registrado tu solicitud. Te contactaremos para confirmar fecha y hora
            definitivas. Los resultados y tiempos de cualquier tratamiento pueden variar
            según cada persona.
          </p>
          {data?.nombre && (
            <p className="mt-6 rounded-2xl border border-cream-200 bg-white p-4 text-sm text-ink-700">
              <strong>{data.nombre}</strong>
              {data.telefono ? ` · ${data.telefono}` : ""}
              {data.tratamiento ? ` · ${data.tratamiento}` : ""}
              {data.modos?.length ? ` · contacto: ${data.modos.join(", ")}` : ""}
              {data.sede ? ` · ${data.sede}` : ""}
              {data.fecha ? ` · preferencia ${data.fecha} ${data.hora ?? ""}` : ""}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Volver al inicio
            </Link>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              onClick={() => {
                trackWhatsAppClick("booking");
              }}
            >
              WhatsApp
            </a>
            <Link href={cta.secondary.href} className="btn-outline">
              Ver tratamientos
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
