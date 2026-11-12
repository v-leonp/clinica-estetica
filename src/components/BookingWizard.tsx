"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";

import {
  BOOKING_STORAGE_KEY,
  bookingCallMotives,
  bookingContactModes,
  bookingCopy,
  site,
} from "~/data/content";
import { trackWhatsAppClick } from "~/lib/analytics";
import { api } from "~/trpc/react";

type ContactMode = (typeof bookingContactModes)[number];

export default function BookingWizard() {
  const router = useRouter();
  const startedAt = useRef(Date.now());

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [motivo, setMotivo] = useState<(typeof bookingCallMotives)[number]>(
    "Consulta médica",
  );
  const [modos, setModos] = useState<ContactMode[]>(["WhatsApp"]);
  const [acepto, setAcepto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createLead = api.contact.createLead.useMutation({
    onSuccess: () => {
      sessionStorage.setItem(
        BOOKING_STORAGE_KEY,
        JSON.stringify({ nombre, tratamiento: motivo, telefono, modos }),
      );
      router.push("/reservar/confirmacion");
    },
  });

  function toggleModo(mode: ContactMode) {
    setModos((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode],
    );
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!nombre.trim()) next.nombre = "Escribe tu nombre.";
    if (!telefono.trim() || telefono.trim().length < 6) {
      next.telefono = "Introduce un teléfono válido.";
    }
    if (modos.length === 0) {
      next.modos = "Elige al menos un modo de contacto.";
    }
    if (!acepto) {
      next.acepto = "Debes aceptar la política de privacidad para continuar.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit() {
    if (!validate()) return;

    const mensaje = [
      "Solicitud de cita (formulario ¡Te llamamos!)",
      `Motivo: ${motivo}`,
      `Modo de contacto: ${modos.join(", ")}`,
    ].join("\n");

    createLead.mutate({
      nombre: nombre.trim(),
      email: "",
      telefono: telefono.trim(),
      tratamiento: motivo,
      mensaje,
      acepto: true,
      website: "",
      startedAt: startedAt.current,
    });
  }

  return (
    <section className="section pt-4">
      <div className="container-x flex justify-center">
        <div className="w-full max-w-md rounded-3xl border border-cream-200 bg-white p-8 shadow-soft">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-cream-50">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <p className="body-copy mt-6 text-center text-sm text-ink-700">
            {bookingCopy.callFormLead}
          </p>
          <h2 className="heading mt-2 text-center font-serif text-3xl text-ink-900">
            {bookingCopy.callFormTitle}
          </h2>

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
                Teléfono
              </label>
              <input
                id="bk-telefono"
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                autoComplete="tel"
                className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
              />
              {errors.telefono && (
                <p className="mt-1 text-xs text-red-700">{errors.telefono}</p>
              )}
            </div>
          </div>

          <OverviewGrid
            label="Selecciona una opción:"
            error={errors.motivo}
          >
            <fieldset className="space-y-2">
              <legend className="sr-only">Motivo de contacto</legend>
              {bookingCallMotives.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-sm text-ink-800"
                >
                  <input
                    type="radio"
                    name="motivo"
                    value={option}
                    checked={motivo === option}
                    onChange={() => setMotivo(option)}
                    className="h-4 w-4 border-cream-200 text-gold-ink"
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          </OverviewGrid>

          <OverviewGrid label="Modo *" error={errors.modos}>
            <fieldset className="space-y-2">
              <legend className="sr-only">Modo de contacto</legend>
              {bookingContactModes.map((mode) => (
                <label
                  key={mode}
                  className="flex cursor-pointer items-center gap-2 text-sm text-ink-800"
                >
                  <input
                    type="checkbox"
                    checked={modos.includes(mode)}
                    onChange={() => toggleModo(mode)}
                    className="h-4 w-4 rounded border-cream-200 text-gold-ink"
                  />
                  {mode}
                </label>
              ))}
            </fieldset>
          </OverviewGrid>

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
                href={`https://wa.me/${site.whatsappNumber}`}
                className="underline"
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

function OverviewGrid({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-ink-900">{label}</p>
      <div className="mt-3 rounded-xl border border-cream-200 bg-cream-50/50 p-4">
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
