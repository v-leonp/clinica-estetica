import { redirect } from "next/navigation";

import { homeFor } from "~/server/app/domain/guard";
import { requireActor } from "~/server/auth/session";

export default async function PrivateHome() {
  const actor = await requireActor();
  redirect(homeFor(actor.roles));
}
