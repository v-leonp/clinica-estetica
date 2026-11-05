import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "~/components/SiteShell";
import PageHero from "~/components/PageHero";
import Breadcrumbs from "~/components/Breadcrumbs";
import { site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: "Política de privacidad",
    description: `Política de tratamiento de datos personales de ${site.brand}, al amparo de la Ley 29733 — Ley de Protección de Datos Personales del Perú.`,
    alternates: { canonical: `${base}/privacidad` },
    openGraph: {
      title: `Política de privacidad | ${site.brand}`,
      description:
        "Cómo tratamos y protegemos tus datos conforme a la Ley 29733.",
      url: `${base}/privacidad`,
    },
  };
}

export default function PrivacidadPage() {
  return (
    <SiteShell>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Privacidad" },
        ]}
      />
      <PageHero
        eyebrow="Protección de datos"
        title="Política de privacidad"
        subtitle={`En ${site.brand} tratamos tus datos personales con las garantías exigidas por la Ley N° 29733 — Ley de Protección de Datos Personales — y su reglamento aprobado por D.S. 003-2013-JUS.`}
      />

      <section className="section pt-4">
        <article className="container-x prose-style max-w-3xl space-y-8 text-base leading-relaxed text-ink-700">
          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              1. Titular del tratamiento
            </h2>
            <p className="mt-3">
              El sitio corresponde a la práctica de la Dra. Melissa Vigo, médico
              cirujano (CMP 101245), en {site.legal.jurisdiction}. La razón
              social, el RUC y el domicilio del responsable todavía no están
              publicados. Para asuntos de privacidad usa el formulario de contacto
              o WhatsApp ({site.whatsappDisplay}). {site.whatsappNote} El correo
              de privacidad se publicará cuando exista.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              2. Datos que recopilamos
            </h2>
            <p className="mt-3">
              A través del formulario de contacto recopilamos: nombre, correo
              electrónico, teléfono, tratamiento de interés, sede preferida,
              mensaje libre, dirección IP y agente de usuario del navegador.
              Solo registramos los campos que tú completas voluntariamente.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              3. Finalidad y base legal
            </h2>
            <p className="mt-3">
              Utilizamos tus datos para responder tu solicitud, coordinar una
              evaluación, recordarte tu cita y mejorar nuestros servicios. La
              base legal es tu consentimiento expreso otorgado al marcar la
              casilla correspondiente en el formulario, conforme al artículo 5
              de la Ley 29733.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              4. Conservación
            </h2>
            <p className="mt-3">
              El plazo de conservación aún no está publicado. Mientras tanto, los
              datos del formulario se usan para responder tu solicitud.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              5. Destinatarios
            </h2>
            <p className="mt-3">
              Tus datos no se ceden a terceros con fines comerciales. Pueden
              verlos la Dra. Melissa Vigo y los proveedores de infraestructura
              (hosting y base de datos) necesarios para operar el sitio.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              6. Tus derechos (ARCO)
            </h2>
            <p className="mt-3">
              Puedes ejercer tus derechos de acceso, rectificación, cancelación y
              oposición, y revocar tu consentimiento, desde el formulario de
              contacto o por WhatsApp. El correo específico para estos trámites
              aún no está publicado. También puedes presentar un reclamo ante la
              Autoridad Nacional de Protección de Datos Personales — Ministerio
              de Justicia y Derechos Humanos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              7. Medidas de seguridad
            </h2>
            <p className="mt-3">
              Implementamos controles técnicos y organizativos razonables para
              proteger tus datos frente a accesos no autorizados, pérdida o
              divulgación: conexiones cifradas (HTTPS), rate limiting en los
              formularios públicos, segregación de ambientes y revisión
              periódica de accesos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              8. Cambios en esta política
            </h2>
            <p className="mt-3">
              Podemos actualizar esta política para reflejar cambios normativos
              u operativos. Publicaremos cualquier cambio en esta misma página
              con la fecha de la última actualización.
            </p>
          </div>

          <p className="text-xs text-ink-500">
            Última actualización: {new Date().toLocaleDateString("es-PE")}.
          </p>

          <p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-1 text-sm font-medium text-rose-gold hover:text-ink-900"
            >
              Volver al formulario de contacto →
            </Link>
          </p>
        </article>
      </section>
    </SiteShell>
  );
}
