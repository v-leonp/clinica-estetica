import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ConfirmDeactivate from "~/components/app/ConfirmDeactivate";
import Notice from "~/components/app/Notice";
import UserForm from "~/components/app/UserForm";
import { countOtherActiveAdmins } from "~/server/app/domain/filters";
import { deactivateUser, reactivateUser, sendUserLink, updateUser } from "~/server/app/actions/users";
import { userService } from "~/server/app/services";
import { requireActor } from "~/server/auth/session";

export const metadata: Metadata = {
  title: { absolute: "Editar usuario · Área interna" },
  robots: { index: false, follow: false },
};

export default async function EditUserPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aviso?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const actor = await requireActor();
  const all = await userService.list(actor);
  const user = all.users.find((item) => item.id === id);
  if (!user) notFound();

  const lastAdmin =
    user.active &&
    user.roles.includes("ADMINISTRADOR") &&
    countOtherActiveAdmins(all.users, user.id) === 0;
  const save = updateUser.bind(null, user.id);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl uppercase">Crear o editar un usuario</h1>
          <p className="mt-2 max-w-2xl text-ink-700">
            Se elige el rol, se pide el CMP si atiende, y se activa o desactiva el acceso. No se
            borra a nadie.
          </p>
        </div>
        <Link href="/app/admin/usuarios" className="btn-outline">
          Volver al listado
        </Link>
      </div>
      <div className="mt-6">
        <Notice aviso={query.aviso} error={query.error} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl border border-cream-200 bg-white p-6">
          <p className="text-sm text-gold-ink">Ya existe en el sistema</p>
          <div className="mt-4">
            <UserForm
              action={save}
              submitLabel="Guardar cambios"
              lockAdminRole={lastAdmin}
              defaults={{
                name: user.name,
                email: user.email,
                roles: user.roles,
                cmp: user.cmp,
              }}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-cream-200 pt-6">
            <p className="mr-auto text-sm text-ink-700">
              {user.active ? "Acceso activo." : "Acceso desactivado. El registro sigue aquí."}
            </p>
            {user.active ? (
              <ConfirmDeactivate
                action={deactivateUser}
                id={user.id}
                trigger="Desactivar"
                disabled={lastAdmin}
                disabledReason="Es el último administrador activo."
                title={`¿Desactivar a ${user.name}?`}
                description="Perderá el acceso. El registro se conserva y se puede volver a activar. No hay opción de borrar."
              />
            ) : (
              <form action={reactivateUser}>
                <input type="hidden" name="id" value={user.id} />
                <button className="btn-outline" type="submit">
                  Activar
                </button>
              </form>
            )}
            <button type="button" disabled className="btn-outline cursor-not-allowed opacity-50">
              Eliminar usuario
            </button>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            «Eliminar» aparece apagado a propósito: no se usa. Desactivar quita la entrada y conserva
            el registro.
          </p>
        </div>
        <aside className="space-y-4">
          <article className="rounded-3xl border border-cream-200 bg-white p-5">
            <h2 className="font-serif text-xl">Invitación</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {user.passwordSetAt
                ? "Esta persona ya eligió una contraseña."
                : "Todavía no ha creado su contraseña. Puedes reenviar el enlace."}
            </p>
            {!user.passwordSetAt ? (
              <form action={sendUserLink} className="mt-4">
                <input type="hidden" name="id" value={user.id} />
                <input type="hidden" name="purpose" value="invite" />
                <button className="btn-outline" type="submit" disabled={!user.active}>
                  Reenviar invitación
                </button>
              </form>
            ) : null}
          </article>
          <article className="rounded-3xl border border-cream-200 bg-white p-5">
            <h2 className="font-serif text-xl">Restablecer contraseña</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Envía un enlace de un solo uso al correo de trabajo. El administrador no ve ni escribe
              la clave de otra persona.
            </p>
            <form action={sendUserLink} className="mt-4">
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="purpose" value="reset" />
              <button className="btn-outline" type="submit" disabled={!user.active}>
                Restablecer contraseña
              </button>
            </form>
          </article>
          {lastAdmin ? (
            <article className="rounded-3xl border border-dashed border-gold/50 bg-rose-blush p-5 text-sm leading-relaxed text-ink-900">
              Último administrador. Si esta persona fuera la única con el rol Administrador, el
              interruptor de desactivar y el cambio de rol quedan bloqueados.
            </article>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
