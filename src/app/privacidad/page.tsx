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
              <strong>{site.legal.companyName}</strong> (en adelante,
              &ldquo;{site.brand}&rdquo;), con RUC {site.legal.ruc} y domicilio
              en {site.address}. Datos de contacto para asuntos de privacidad:
              {" "}
              <a
                href={`mailto:${site.email}`}
                className="underline hover:text-rose-gold"
              >
                {site.email}
              </a>
              . Esta es una página demostrativa; los datos corporativos son de
              ejemplo.
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
              Conservaremos tus datos mientras exista una relación comercial o
              hasta por un máximo de 24 meses desde la última interacción,
              salvo que una obligación legal exija un plazo mayor.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              5. Destinatarios
            </h2>
            <p className="mt-3">
              Tus datos no se ceden a terceros con fines comerciales. Pueden
              ser accedidos por nuestro equipo médico y administrativo, y por
              proveedores de infraestructura (hosting y base de datos) bajo
              acuerdos de confidencialidad y encargo de tratamiento.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-900">
              6. Tus derechos (ARCO)
            </h2>
            <p className="mt-3">
              Puedes ejercer en todo momento tus derechos de acceso,
              rectificación, cancelación y oposición, así como revocar tu
              consentimiento, escribiendo a{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline hover:text-rose-gold"
              >
                {site.email}
              </a>
              . También puedes presentar reclamo ante la Autoridad Nacional de
              Protección de Datos Personales — Ministerio de Justicia y
              Derechos Humanos.
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
