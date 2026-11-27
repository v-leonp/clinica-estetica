import type { Metadata } from "next";
import Link from "next/link";

import AuthCard from "~/components/app/AuthCard";
import ResetPasswordForm from "~/components/app/ResetPasswordForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Elegir contraseña" },
  robots: { index: false, follow: false },
};

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const query = await searchParams;
  const token = query.token?.trim() ?? "";
  const invalid = !token || query.error === "INVALID_TOKEN";

  return (
    <AuthCard
      title="Elegir contraseña"
      lede="Este enlace es de un solo uso. La contraseña la eliges tú; no la conoce el administrador."
    >
      {invalid ? (
        <p role="alert" className="mt-6 rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm">
          El enlace no es válido o ya caducó. Pide otro desde el acceso o a la administración.
        </p>
      ) : (
        <ResetPasswordForm token={token} />
      )}
      <p className="mt-4 text-sm">
        <Link href="/app/login" className="text-gold-ink underline-offset-4 hover:underline">
          Volver a entrar
        </Link>
      </p>
    </AuthCard>
  );
}
