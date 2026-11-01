"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  site,
  categories,
  locations,
  allTreatments,
  categoriesFull,
} from "~/data/content";
import { api } from "~/trpc/react";

type FieldName =
  | "nombre"
  | "email"
  | "telefono"
  | "tratamiento"
  | "mensaje"
  | "acepto";

type FieldErrors = Partial<Record<FieldName, string>>;

function resolvePrefill(slug: string): string {
  if (!slug) return "";
  // Check categories FIRST so category slugs don't accidentally match the
  // first treatment inside a category.
  const cat = categoriesFull.find((c) => c.slug === slug);
  if (cat) return cat.title;
  const match = allTreatments.find(
    ({ treatment }) => treatment.slug === slug,
  );
  if (match) return match.treatment.name;
  return "";
}

export default function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [prefill, setPrefill] = useState<string>("");

  // Read ?tratamiento=<slug> client-side so the prefill works even when the
  // page is statically rendered. `useSearchParams()` was unreliable on a
  // force-static page in production — it returns an empty object during
  // the prerender and the component instance keeps that stale value.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("tratamiento") ?? "";
    setPrefill(resolvePrefill(slug));
  }, []);

  // Timestamp of when the form mounted — used server-side to detect bots
  // that submit instantly.
  const startedAt = useRef<number>(Date.now());

  const formRef = useRef<HTMLFormElement>(null);
  const refs: Record<FieldName, React.RefObject<HTMLElement | null>> = {
    nombre: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    telefono: useRef<HTMLInputElement>(null),
    tratamiento: useRef<HTMLSelectElement>(null),
    mensaje: useRef<HTMLTextAreaElement>(null),
    acepto: useRef<HTMLInputElement>(null),
  };

  const focusFirstInvalid = (errs: FieldErrors) => {
    const order: FieldName[] = [
      "nombre",
      "email",
      "telefono",
      "tratamiento",
      "mensaje",
      "acepto",
    ];
    for (const name of order) {
      if (errs[name]) {
        const node = refs[name].current;
        if (node && "focus" in node) node.focus();
        return;
      }
    }
  };

  const createLead = api.contact.createLead.useMutation({
    onSuccess: () => {
      setErrors({});
      setSubmitted(true);
      formRef.current?.reset();
      startedAt.current = Date.now();
    },
    onError: (err) => {
      const fieldErrors = err.data?.zodError?.fieldErrors as
        | Record<string, string[] | undefined>
        | undefined;
      if (fieldErrors) {
        const mapped: FieldErrors = {};
        const keys: FieldName[] = [
          "nombre",
          "email",
          "telefono",
          "tratamiento",
          "mensaje",
          "acepto",
        ];
        for (const key of keys) {
          const msg = fieldErrors[key]?.[0];
          if (msg) mapped[key] = msg;
        }
        setErrors(mapped);
        focusFirstInvalid(mapped);
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(false);
    const form = e.currentTarget;
    const data = new FormData(form);

    createLead.mutate({
      nombre: (data.get("nombre") ?? "").toString(),
      email: (data.get("email") ?? "").toString(),
      telefono: (data.get("telefono") ?? "").toString(),
      tratamiento: (data.get("tratamiento") ?? "").toString(),
      mensaje: (data.get("mensaje") ?? "").toString(),
      sede: (data.get("sede") ?? "").toString() || undefined,
      acepto: data.get("acepto") === "on" ? true : (false as unknown as true),
      website: (data.get("website") ?? "").toString(),
      startedAt: startedAt.current,
    });
  }

  const serverError =
    createLead.isError && !createLead.error.data?.zodError
      ? createLead.error.message
      : null;

  return (
    <section id="contacto" className="section bg-cream-100/60">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Contacto</p>
          <h2 className="section-title">Agenda tu consulta</h2>
          <p className="section-sub">
            Déjanos tus datos y una asesora se pondrá en contacto para coordinar
            una evaluación personalizada. Todos los datos de contacto son de
            ejemplo.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-ink-700">
            <li>
              <span className="text-ink-500">Email: </span>
              <a href={`mailto:${site.email}`} className="hover:text-rose-gold">
                {site.email}
              </a>
            </li>
            <li>
              <span className="text-ink-500">Teléfono: </span>
              <a
                href={`tel:${site.phoneHref}`}
                className="hover:text-rose-gold"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="text-ink-500">WhatsApp: </span>
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-gold"
              >
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <span className="text-ink-500">Dirección: </span>
              <span className="text-ink-900">{site.address}</span>
            </li>
          </ul>
        </div>

        <form
          ref={formRef}
          method="post"
          action="/api/trpc/contact.createLead"
          onSubmit={handleSubmit}
          noValidate
          aria-describedby="form-status"
          className="rounded-3xl border border-cream-200 bg-white p-6 shadow-soft md:col-span-7 md:p-8"
        >
          {/* Honeypot — hidden from users with CSS + aria-hidden + tabindex=-1. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="website">
              No completes este campo
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <p className="mb-5 text-xs text-ink-500">
            Los campos marcados con{" "}
            <span className="text-rose-gold">*</span> son obligatorios.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Nombre completo"
              name="nombre"
              autoComplete="name"
              required
              inputRef={refs.nombre as React.RefObject<HTMLInputElement | null>}
              error={errors.nombre}
            />
            <Field
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              required
              inputRef={refs.email as React.RefObject<HTMLInputElement | null>}
              error={errors.email}
            />
            <Field
              label="Teléfono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              required
              inputRef={
                refs.telefono as React.RefObject<HTMLInputElement | null>
              }
              error={errors.telefono}
            />
            <div>
              <label
                htmlFor="tratamiento"
                className="mb-1 block text-sm font-medium text-ink-900"
              >
                Tratamiento de interés{" "}
                <span className="text-rose-gold" aria-hidden="true">
                  *
                </span>
              </label>
              <select
                id="tratamiento"
                name="tratamiento"
                ref={
                  refs.tratamiento as React.RefObject<HTMLSelectElement | null>
                }
                required
                aria-required="true"
                aria-invalid={errors.tratamiento ? true : undefined}
                aria-describedby={
                  errors.tratamiento ? "tratamiento-error" : undefined
                }
                key={prefill}
                defaultValue={prefill}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <optgroup label="Categorías">
                  {categories.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Tratamientos">
                  {allTreatments.map(({ treatment }) => (
                    <option key={treatment.slug} value={treatment.name}>
                      {treatment.name}
                    </option>
                  ))}
                </optgroup>
                <option value="Consulta general">Consulta general</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.tratamiento && (
                <p
                  id="tratamiento-error"
                  className="mt-1 text-xs text-red-700"
                >
                  {errors.tratamiento}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="sede"
                className="mb-1 block text-sm font-medium text-ink-900"
              >
                Sede preferida (opcional)
              </label>
              <select
                id="sede"
                name="sede"
                defaultValue="Sin preferencia"
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
              >
                <option value="Sin preferencia">Sin preferencia</option>
                {locations.map((l) => (
                  <option key={l.slug} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="mensaje"
              className="mb-1 block text-sm font-medium text-ink-900"
            >
              Cuéntanos qué buscas{" "}
              <span className="text-rose-gold" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              required
              aria-required="true"
              ref={refs.mensaje as React.RefObject<HTMLTextAreaElement | null>}
              aria-invalid={errors.mensaje ? true : undefined}
              aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
              className="w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
            />
            {errors.mensaje && (
              <p id="mensaje-error" className="mt-1 text-xs text-red-700">
                {errors.mensaje}
              </p>
            )}
          </div>

          <label className="mt-5 flex items-start gap-3 text-xs text-ink-700">
            <input
              id="acepto"
              type="checkbox"
              name="acepto"
              ref={refs.acepto as React.RefObject<HTMLInputElement | null>}
              required
              aria-required="true"
              aria-invalid={errors.acepto ? true : undefined}
              aria-describedby={errors.acepto ? "acepto-error" : undefined}
              className="mt-1 h-4 w-4 rounded border-cream-200 text-rose-gold focus:ring-rose-gold"
            />
            <span>
              Acepto que {site.brand} procese mis datos para contactarme según
              su{" "}
              <Link href="/privacidad" className="underline hover:text-rose-gold">
                política de privacidad
              </Link>
              . Esta demo almacena los datos de forma local.
              <span className="ml-1 text-rose-gold" aria-hidden="true">
                *
              </span>
            </span>
          </label>
          {errors.acepto && (
            <p id="acepto-error" className="mt-1 text-xs text-red-700">
              {errors.acepto}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary mt-6 w-full sm:w-auto"
            disabled={createLead.isPending}
          >
            {createLead.isPending ? "Enviando..." : "Enviar solicitud"}
          </button>

          <p
            id="form-status"
            role="status"
            aria-live="polite"
            className="mt-4 min-h-[1.25rem] text-sm"
          >
            {submitted && !createLead.isPending && (
              <span className="text-rose-gold">
                ¡Gracias! Recibimos tu solicitud. Una asesora te contactará
                pronto.
              </span>
            )}
            {serverError && (
              <span className="text-red-700">
                {serverError.includes("Demasiadas") ||
                serverError.includes("TOO_MANY")
                  ? "Demasiadas solicitudes seguidas. Vuelve a intentar en unos minutos."
                  : "No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos por WhatsApp."}
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  inputRef,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-ink-900"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-rose-gold" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        ref={inputRef}
        className="w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
