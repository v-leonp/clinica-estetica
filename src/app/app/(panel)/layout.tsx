import { headers } from "next/headers";

import AppShell from "~/components/app/AppShell";
import { requireArea } from "~/server/auth/session";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "/app";
  const actor = await requireArea(pathname);
  return <AppShell actor={actor}>{children}</AppShell>;
}
