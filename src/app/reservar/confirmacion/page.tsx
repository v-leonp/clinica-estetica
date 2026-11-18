"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SiteShell from "~/components/SiteShell";
import Breadcrumbs from "~/components/Breadcrumbs";
import { BOOKING_STORAGE_KEY, bookingWhatsAppHref, cta } from "~/data/content";
import { trackWhatsAppClick } from "~/lib/analytics";
import {
  buildReservaWhatsAppHref,
  buildReservaWhatsAppMessage,
} from "~/lib/whatsapp-reserva";

type Stored = {
  nombre?: string;
  tratamiento?: string;
  telefono?: string;
  diaHoraPreferida?: string;
  modos?: string[];
  sede?: string;
  fecha?: string;
  hora?: string;
};

function preferenciaDe(data: Stored): string {
  if (data.diaHoraPreferida?.trim()) return data.diaHoraPreferida.trim();
  return [data.fecha, data.hora].filter(Boolean).join(" ").trim();
}

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

  const mensajeWhatsApp = data?.nombre
    ? buildReservaWhatsAppMessage({
        nombre: data.nombre,
        tratamiento: data.tratamiento,
        diaHoraPreferida: preferenciaDe(data),
      })
    : null;
  const whatsappHref = mensajeWhatsApp
    ? buildReservaWhatsAppHref({
        nombre: data?.nombre ?? "",
        tratamiento: data?.tratamiento,
        diaHoraPreferida: data ? preferenciaDe(data) : "",
      })
    : bookingWhatsAppHref();

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
            Hemos registrado tu solicitud. La cita se confirma cuando te escribamos.
          </p>
          {data?.nombre && (
            <p className="mt-6 rounded-2xl border border-cream-200 bg-white p-4 text-sm text-ink-700">
              <strong>{data.nombre}</strong>
              {data.telefono ? ` · ${data.telefono}` : ""}
              {data.tratamiento ? ` · ${data.tratamiento}` : ""}
              {data.modos?.length ? ` · contacto: ${data.modos.join(", ")}` : ""}
              {data.sede ? ` · ${data.sede}` : ""}
              {data.diaHoraPreferida
                ? ` · ${data.diaHoraPreferida}`
                : data.fecha
                  ? ` · preferencia ${data.fecha} ${data.hora ?? ""}`
                  : ""}
            </p>
          )}
          {mensajeWhatsApp && (
            <div className="mt-6 rounded-2xl border border-cream-200 bg-white p-4 text-left">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-ink">
                Mensaje que se abrirá en WhatsApp
              </p>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink-900">
                {mensajeWhatsApp}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-500">
                El mensaje lo envías tú desde tu WhatsApp.
              </p>
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Volver al inicio
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              onClick={() => {
                trackWhatsAppClick("booking");
              }}
            >
              {mensajeWhatsApp ? "Abrir WhatsApp" : "WhatsApp"}
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
