import Link from "next/link";
import { headers } from "next/headers";

import BrandLogo from "~/components/BrandLogo";
import { can } from "~/server/app/domain/permissions";
import { roleLabel, type Actor } from "~/server/app/domain/roles";
import SignOutButton from "./SignOutButton";

const links = [
  { href: "/app/admin/usuarios", label: "Usuarios" },
  { href: "/app/admin/tratamientos", label: "Tratamientos" },
  { href: "/app/admin/registro", label: "Registro" },
];

export default async function AppShell({
  actor,
  children,
}: {
  actor: Actor;
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const admin = can(actor.roles, "users.manage");
  const medico = can(actor.roles, "clinical.placeholder");

  return (
    <div className="min-h-screen bg-cream-50 text-ink-900">
      <div className="bg-ink-900 text-cream-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 text-[11px] uppercase tracking-[0.18em] sm:px-8">
          <span>Área interna</span>
          <span className="text-cream-100/80">Equipo de la clínica</span>
        </div>
      </div>

      <header className="border-b border-cream-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <div>
              <p className="font-serif text-lg uppercase tracking-wide">Vigo Medical Estetic</p>
              <p className="text-xs uppercase tracking-[0.16em] text-gold-ink">
                {admin ? "Modo administrador" : "Modo médico"}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-serif text-lg">{actor.name}</p>
            <p className="text-sm text-ink-700">{roleLabel(actor.roles)}</p>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-cream-200 bg-white px-4 py-6 lg:min-h-[calc(100vh-9rem)] lg:border-b-0 lg:border-r">
          <p className="eyebrow">{admin ? "Modo administrador" : "Tu módulo"}</p>
          <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col" aria-label="Secciones internas">
            {admin
              ? links.map((link) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={
                        active
                          ? "rounded-xl bg-cream-100 px-3 py-2 text-sm text-ink-900"
                          : "rounded-xl px-3 py-2 text-sm text-ink-700 hover:bg-cream-50"
                      }
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })
              : null}
            {medico ? (
              <Link
                href="/app/medico"
                className={
                  pathname.startsWith("/app/medico")
                    ? "rounded-xl bg-cream-100 px-3 py-2 text-sm text-ink-900"
                    : "rounded-xl px-3 py-2 text-sm text-ink-700 hover:bg-cream-50"
                }
                aria-current={pathname.startsWith("/app/medico") ? "page" : undefined}
              >
                Área médica
              </Link>
            ) : null}
          </nav>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-700">
            Solo hay dos roles: Administrador y Médico. Una persona puede tener los dos. El trabajo
            clínico del médico llega en el Sprint 2.
          </p>
        </aside>
        <main className="px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
