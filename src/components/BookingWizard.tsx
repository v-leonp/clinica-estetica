"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  allTreatments,
  allowedSedes,
  allowedTratamientos,
  bookingCopy,
  categoriesFull,
  site,
} from "~/data/content";
import { api } from "~/trpc/react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

function resolvePrefill(slug: string): string {
  if (!slug) return "";
  const cat = categoriesFull.find((c) => c.slug === slug);
  if (cat) return cat.title;
  const match = allTreatments.find(({ treatment }) => treatment.slug === slug);
  if (match) return match.treatment.name;
  return "";
}

export default function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startedAt = useRef(Date.now());

  const [step, setStep] = useState<Step>(1);
  const [tratamiento, setTratamiento] = useState("Consulta general");
  const [sede, setSede] = useState("Sin preferencia");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const slug = searchParams.get("tratamiento") ?? "";
    const pre = resolvePrefill(slug);
    if (pre) setTratamiento(pre);
  }, [searchParams]);

  const createLead = api.contact.createLead.useMutation({
    onSuccess: () => {
      sessionStorage.setItem(
        "lumina-booking-confirmed",
        JSON.stringify({ nombre, tratamiento, sede, fecha, hora }),
      );
      router.push("/reservar/confirmacion");
    },
  });

  const tratamientoOptions = useMemo(
    () => [...allowedTratamientos],
    [],
  );

  function validate(current: Step): boolean {
    const next: Record<string, string> = {};
    if (current === 1 && !tratamiento) next.tratamiento = "Elige un motivo de consulta.";
    if (current === 3) {
      if (!fecha) next.fecha = "Indica una fecha preferida.";
      if (!hora) next.hora = "Indica un horario preferido.";
    }
    if (current === 4) {
      if (!nombre.trim()) next.nombre = "Escribe tu nombre.";
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        next.email = "Introduce un correo válido.";
      }
      if (!telefono.trim()) next.telefono = "Introduce un teléfono de contacto.";
    }
    if (current === 5 && !acepto) {
      next.acepto = "Debes aceptar la política de privacidad para continuar.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validate(step)) return;
    setStep((s) => (s < 6 ? ((s + 1) as Step) : s));
  }

  function goBack() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  function submit() {
    if (!validate(5)) {
      setStep(5);
      return;
    }
    const mensaje = [
      "Solicitud de valoración (flujo /reservar)",
      `Motivo: ${tratamiento}`,
      `Sede preferida: ${sede}`,
      `Fecha preferida: ${fecha}`,
      `Horario preferido: ${hora}`,
      bookingCopy.valuationCost,
    ].join("\n");

    createLead.mutate({
      nombre,
      email,
      telefono,
      tratamiento,
      sede: sede === "Sin preferencia" ? undefined : sede,
      mensaje,
      acepto: true,
      website: "",
      startedAt: startedAt.current,
    });
  }

  return (
    <section className="section">
      <div className="container-x max-w-2xl">
        <p className="text-sm text-ink-500">
          Paso {step} de 6 · {bookingCopy.intro}
        </p>

        <ol
          aria-label="Progreso de reserva"
          className="mt-4 flex gap-1"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <li
              key={n}
              className={`h-1 flex-1 rounded-full ${
                n <= step ? "bg-rose-gold" : "bg-cream-200"
              }`}
              aria-current={n === step ? "step" : undefined}
            />
          ))}
        </ol>

        <div className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft md:p-8">
          {step === 1 && (
            <fieldset>
              <legend className="font-serif text-2xl text-ink-900">
                ¿Qué te gustaría consultar?
              </legend>
              <p className="mt-2 text-sm text-ink-600">
                Cuéntanos el motivo general. La indicación médica se define en valoración.
              </p>
              <label htmlFor="bk-tratamiento" className="sr-only">
                Tratamiento o motivo
              </label>
              <select
                id="bk-tratamiento"
                value={tratamiento}
                onChange={(e) => setTratamiento(e.target.value)}
                className="mt-5 w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
              >
                {tratamientoOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.tratamiento && (
                <p className="mt-2 text-xs text-red-700">{errors.tratamiento}</p>
              )}
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="font-serif text-2xl text-ink-900">Sede preferida</legend>
              <select
                value={sede}
                onChange={(e) => setSede(e.target.value)}
                className="mt-5 w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
              >
                {allowedSedes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="font-serif text-2xl text-ink-900">
                Fecha y horario preferidos
              </legend>
              <p className="mt-2 text-sm text-ink-600">
                Te confirmaremos disponibilidad real por teléfono, email o WhatsApp.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-fecha" className="mb-1 block text-sm font-medium">
                    Fecha
                  </label>
                  <input
                    id="bk-fecha"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
                  />
                  {errors.fecha && (
                    <p className="mt-1 text-xs text-red-700">{errors.fecha}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="bk-hora" className="mb-1 block text-sm font-medium">
                    Horario
                  </label>
                  <select
                    id="bk-hora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
                  >
                    <option value="">Selecciona</option>
                    {["09:00", "11:00", "13:00", "16:00", "18:00"].map((h) => (
                      <option key={h} value={h}>
                        {h} h
                      </option>
                    ))}
                  </select>
                  {errors.hora && (
                    <p className="mt-1 text-xs text-red-700">{errors.hora}</p>
                  )}
                </div>
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="font-serif text-2xl text-ink-900">Tus datos de contacto</legend>
              <div className="mt-5 grid gap-4">
                <input
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
                  autoComplete="name"
                />
                {errors.nombre && (
                  <p className="text-xs text-red-700">{errors.nombre}</p>
                )}
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-red-700">{errors.email}</p>
                )}
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-xl border border-cream-200 px-4 py-3 text-sm"
                  autoComplete="tel"
                />
                {errors.telefono && (
                  <p className="text-xs text-red-700">{errors.telefono}</p>
                )}
              </div>
            </fieldset>
          )}

          {step === 5 && (
            <fieldset>
              <legend className="font-serif text-2xl text-ink-900">Privacidad</legend>
              <label className="mt-5 flex items-start gap-3 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={acepto}
                  onChange={(e) => setAcepto(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-cream-200 text-rose-gold"
                />
                <span>
                  Acepto el tratamiento de mis datos para coordinar la valoración según la{" "}
                  <Link href="/privacidad" className="underline hover:text-rose-gold">
                    política de privacidad
                  </Link>{" "}
                  y las{" "}
                  <Link href="/condiciones-reserva" className="underline hover:text-rose-gold">
                    condiciones de reserva
                  </Link>
                  .
                </span>
              </label>
              {errors.acepto && (
                <p className="mt-2 text-xs text-red-700">{errors.acepto}</p>
              )}
              <p className="mt-4 text-xs text-ink-500">{bookingCopy.cancellation}</p>
            </fieldset>
          )}

          {step === 6 && (
            <div>
              <h2 className="font-serif text-2xl text-ink-900">Revisa tu solicitud</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Motivo" value={tratamiento} />
                <Row label="Sede" value={sede} />
                <Row label="Fecha preferida" value={fecha} />
                <Row label="Horario" value={hora} />
                <Row label="Nombre" value={nombre} />
                <Row label="Email" value={email} />
                <Row label="Teléfono" value={telefono} />
              </dl>
              <p className="mt-4 text-xs text-ink-500">{bookingCopy.valuationCost}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {step > 1 && step < 6 && (
              <button type="button" onClick={goBack} className="btn-outline">
                Atrás
              </button>
            )}
            {step < 6 && (
              <button type="button" onClick={goNext} className="btn-primary">
                Continuar
              </button>
            )}
            {step === 6 && (
              <button
                type="button"
                onClick={submit}
                className="btn-primary"
                disabled={createLead.isPending}
              >
                {createLead.isPending ? "Enviando…" : "Confirmar solicitud"}
              </button>
            )}
          </div>

          {createLead.isError && (
            <p className="mt-4 text-sm text-red-700" role="alert">
              No pudimos registrar la solicitud. {bookingCopy.fallback}{" "}
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                className="underline"
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-cream-100 pb-2">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-right font-medium text-ink-900">{value || "—"}</dd>
    </div>
  );
}
