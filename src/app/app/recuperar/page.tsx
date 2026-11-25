import type { Metadata } from "next";
import Link from "next/link";

import AuthCard from "~/components/app/AuthCard";
import RecoverForm from "~/components/app/RecoverForm";

export const metadata: Metadata = {
  title: { absolute: "Recuperar acceso" },
  robots: { index: false, follow: false },
};

export default function RecoverPage() {
  return (
    <AuthCard
      title="Recuperar acceso"
      lede="Te enviamos un enlace para elegir una contraseña nueva. El administrador no la ve ni la escribe."
    >
      <RecoverForm />
      <p className="mt-4 text-sm">
        <Link href="/app/login" className="text-gold-ink underline-offset-4 hover:underline">
          Volver a entrar
        </Link>
      </p>
    </AuthCard>
  );
}
