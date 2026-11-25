import type { Metadata } from "next";
import Link from "next/link";

import AuthCard from "~/components/app/AuthCard";
import LoginForm from "~/components/app/LoginForm";
import { homeFor, safeNextPath } from "~/server/app/domain/guard";
import { getAppSession } from "~/server/auth/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Acceso interno" },
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; aviso?: string }>;
}) {
  const query = await searchParams;
  const actor = await getAppSession();
  const nextPath = safeNextPath(query.next) ?? "/app";
  if (actor) redirect(safeNextPath(query.next) ?? homeFor(actor.roles));

  return (
    <AuthCard
      title="Acceso interno"
      lede="Solo para el equipo de la clínica. No hay registro público: el administrador invita a cada persona."
    >
      {query.aviso === "clave" ? (
        <p role="status" className="mt-6 rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-sm">
          Contraseña guardada. Ya puedes entrar.
        </p>
      ) : null}
      <LoginForm nextPath={nextPath} />
      <p className="mt-4 text-sm">
        <Link href="/app/recuperar" className="text-gold-ink underline-offset-4 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
    </AuthCard>
  );
}
