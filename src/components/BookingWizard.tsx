"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import {
  BOOKING_STORAGE_KEY,
  allTreatments,
  bookingCopy,
  bookingWhatsAppHref,
  site,
} from "~/data/content";
import { trackWhatsAppClick } from "~/lib/analytics";
import { api } from "~/trpc/react";

export default function BookingWizard() {
  const router = useRouter();
  const startedAt = useRef(Date.now());

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createLead = api.contact.createLead.useMutation({
    onSuccess: () => {
      sessionStorage.setItem(
        BOOKING_STORAGE_KEY,
        JSON.stringify({
          nombre,
          telefono,
          tratamiento: tratamiento || undefined,
        }),
      );
      router.push("/reservar/confirmacion");
    },
  });

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (nombre.trim().length < 2) next.nombre = "Escribe tu nombre.";
    if (!telefono.trim() || telefono.trim().length < 6) {
      next.telefono = "Introduce un celular válido.";
    }
    if (!acepto) {
      next.acepto = "Debes aceptar la política de privacidad para continuar.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit() {
    if (!validate()) return;

    createLead.mutate({
      nombre: nombre.trim(),
      email: "",
      telefono: telefono.trim(),
      tratamiento,
      mensaje: "",
      acepto: true,
      website: "",
      startedAt: startedAt.current,
      origen: "reserva",
    });
  }

  return (
    <section className="section pt-4">
      <div className="container-x flex justify-center">
        <div className="w-full max-w-md rounded-3xl border border-cream-200 bg-white p-8 shadow-soft">
          <h2 className="heading text-center font-serif text-3xl text-ink-900">
            {bookingCopy.callFormTitle}
          </h2>
          <p className="body-copy mt-3 text-center text-sm text-ink-700">
            {bookingCopy.callFormLead}
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label htmlFor="bk-nombre" className="sr-only">
                Nombre
              </label>
              <input
                id="bk-nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="name"
                className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-700">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label htmlFor="bk-telefono" className="sr-only">
                Celular
              </label>
              <input
                id="bk-telefono"
                type="tel"
                placeholder="Celular"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                autoComplete="tel"
                className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
              />
              {errors.telefono && (
                <p className="mt-1 text-xs text-red-700">{errors.telefono}</p>
              )}
            </div>
            <div>
              <label htmlFor="bk-tratamiento" className="sr-only">
                Tratamiento de interés
              </label>
              <select
                id="bk-tratamiento"
                value={tratamiento}
                onChange={(e) => setTratamiento(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-900"
              >
                <option value="">Tratamiento de interés (opcional)</option>
                {allTreatments.map(({ treatment }) => (
                  <option key={treatment.slug} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="mt-6 flex items-start gap-3 text-xs text-ink-700">
            <input
              type="checkbox"
              checked={acepto}
              onChange={(e) => setAcepto(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-cream-200 text-gold-ink"
            />
            <span>
              Acepto el tratamiento de mis datos según la{" "}
              <Link href="/privacidad" className="underline hover:text-gold-ink">
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {errors.acepto && (
            <p className="mt-1 text-xs text-red-700">{errors.acepto}</p>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={createLead.isPending}
            className="btn-primary mt-6 w-full uppercase tracking-[0.12em]"
          >
            {createLead.isPending ? "Enviando…" : "Enviar solicitud"}
          </button>

          {createLead.isError && (
            <p className="mt-4 text-sm text-red-700" role="alert">
              No pudimos registrar la solicitud. {bookingCopy.fallback}{" "}
              <a
                href={bookingWhatsAppHref()}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick("booking");
                }}
              >
                WhatsApp
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
