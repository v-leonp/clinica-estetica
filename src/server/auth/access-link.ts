import "server-only";

import type { AccessLinkSender } from "~/server/app/users/repository";
import { getAuth } from "./auth";
import { runWithEmailPurpose } from "./email-purpose";

export class BetterAuthAccessLink implements AccessLinkSender {
  async send(user: { id: string; email: string; name: string }, purpose: "invite" | "reset") {
    const { delivered } = await runWithEmailPurpose(purpose, async () => {
      await getAuth().api.requestPasswordReset({
        body: {
          email: user.email,
          redirectTo: "/app/restablecer",
        },
      });
    });
    return delivered;
  }
}
