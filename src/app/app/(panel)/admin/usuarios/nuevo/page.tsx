import type { Metadata } from "next";
import Link from "next/link";

import UserForm from "~/components/app/UserForm";
import { inviteUser } from "~/server/app/actions/users";

export const metadata: Metadata = {
  title: { absolute: "Invitar usuario · Área interna" },
  robots: { index: false, follow: false },
};

export default function NewUserPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl uppercase">Invitar usuario</h1>
        <Link href="/app/admin/usuarios" className="btn-outline">
          Volver al listado
        </Link>
      </div>
      <p className="mt-3 max-w-2xl text-ink-700">
        Indica el nombre, el correo y el rol. El sistema envía un enlace para que la persona cree su
        contraseña. Tú no la ves ni la escribes.
      </p>
      <div className="mt-6 rounded-3xl border border-cream-200 bg-white p-6">
        <UserForm action={inviteUser} submitLabel="Enviar invitación" />
      </div>
    </section>
  );
}
