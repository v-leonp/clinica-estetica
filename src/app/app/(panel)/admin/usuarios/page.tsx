import type { Metadata } from "next";
import Link from "next/link";

import Notice from "~/components/app/Notice";
import { formatLima, withQuery } from "~/components/app/format";
import { countOtherActiveAdmins, type UserListFilter } from "~/server/app/domain/filters";
import { roleLabel } from "~/server/app/domain/roles";
import { userService } from "~/server/app/services";
import { deactivateUser, reactivateUser } from "~/server/app/actions/users";
import { requireActor } from "~/server/auth/session";
import ConfirmDeactivate from "~/components/app/ConfirmDeactivate";

export const metadata: Metadata = {
  title: { absolute: "Usuarios · Área interna" },
  robots: { index: false, follow: false },
};

const vistas = [
  { id: "todos", label: "Todos" },
  { id: "administradores", label: "Administradores" },
  { id: "medicos", label: "Médicos" },
  { id: "activos", label: "Activos" },
  { id: "inactivos", label: "Inactivos" },
] as const;

function filterFromVista(vista: string | undefined): UserListFilter {
  if (vista === "administradores") return { role: "ADMINISTRADOR" };
  if (vista === "medicos") return { role: "MEDICO" };
  if (vista === "activos") return { status: "active" };
  if (vista === "inactivos") return { status: "inactive" };
  return {};
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; vista?: string; aviso?: string; error?: string }>;
}) {
  const query = await searchParams;
  const actor = await requireActor();
  const vista = query.vista ?? "todos";
  const result = await userService.list(actor, {
    ...filterFromVista(vista),
    query: query.q,
  });
  const everyone = (await userService.list(actor)).users;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl uppercase">Usuarios</h1>
          <p className="mt-2 max-w-2xl text-ink-700">
            Quién entra al sistema y con qué rol. Solo hay dos roles: Administrador y Médico.
          </p>
        </div>
        <Link href="/app/admin/usuarios/nuevo" className="btn-primary">
          Invitar usuario
        </Link>
      </div>

      <div className="mt-6">
        <Notice aviso={query.aviso} error={query.error} />
      </div>

      <div className="mt-2 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Usuarios" value={String(result.stats.total)} hint="Cuentas del equipo" />
        <Stat
          label="Administradores activos"
          value={String(result.stats.activeAdmins)}
          hint="Siempre debe quedar al menos uno"
        />
        <Stat
          label="Médicos activos"
          value={String(result.stats.activeMedicos)}
          hint="Incluye a quien también administra"
        />
        <Stat label="Inactivos" value={String(result.stats.inactive)} hint="Sin acceso; el registro se conserva" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {vistas.map((item) => (
            <Link
              key={item.id}
              href={withQuery("/app/admin/usuarios", { q: query.q }, { vista: item.id === "todos" ? undefined : item.id })}
              className={
                vista === item.id
                  ? "rounded-full bg-ink-900 px-4 py-2 text-sm text-cream-50"
                  : "rounded-full border border-cream-200 bg-white px-4 py-2 text-sm text-ink-700"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <form action="/app/admin/usuarios" className="w-full sm:w-72">
          {vista !== "todos" ? <input type="hidden" name="vista" value={vista} /> : null}
          <label className="sr-only" htmlFor="q">
            Buscar por nombre o correo
          </label>
          <input
            id="q"
            name="q"
            defaultValue={query.q ?? ""}
            placeholder="Buscar por nombre o correo…"
            className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-ink"
          />
        </form>
      </div>

      <div className="mt-4 overflow-x-auto rounded-3xl border border-cream-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-gold-ink">
            <tr>
              <th className="px-4 py-3 font-normal">Nombre</th>
              <th className="px-4 py-3 font-normal">Correo</th>
              <th className="px-4 py-3 font-normal">Rol</th>
              <th className="px-4 py-3 font-normal">Estado</th>
              <th className="px-4 py-3 font-normal">Último acceso</th>
              <th className="px-4 py-3 font-normal"> </th>
            </tr>
          </thead>
          <tbody>
            {result.users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-ink-700">
                  No hay personas con ese filtro. Invita a alguien del equipo para empezar.
                </td>
              </tr>
            ) : (
              result.users.map((user) => {
                const lastAdmin =
                  user.active &&
                  user.roles.includes("ADMINISTRADOR") &&
                  countOtherActiveAdmins(everyone, user.id) === 0;
                return (
                  <tr key={user.id} className="border-t border-cream-100">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{roleLabel(user.roles)}</td>
                    <td className="px-4 py-3">{user.active ? "Activo" : "Inactivo"}</td>
                    <td className="px-4 py-3">{formatLima(user.lastAccessAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/app/admin/usuarios/${user.id}`} className="btn-outline px-4 py-2">
                          Editar
                        </Link>
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
                            <button className="btn-outline px-4 py-2" type="submit">
                              Activar
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-700">
        No hay botón de borrar: a quien ya no deba entrar se le desactiva.
      </p>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-2xl border border-cream-200 bg-white p-4">
      <p className="text-sm text-ink-700">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
      <p className="mt-1 text-sm text-ink-500">{hint}</p>
    </article>
  );
}
