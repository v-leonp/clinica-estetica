import "server-only";

import { PrismaAuditRepository } from "./audit/prisma-audit-repository";
import { PrismaTreatmentRepository } from "./treatments/prisma-treatment-repository";
import { createTreatmentService } from "./treatments/treatment-service";
import { PrismaUserRepository } from "./users/prisma-user-repository";
import { createUserService } from "./users/user-service";
import { BetterAuthAccessLink } from "~/server/auth/access-link";

const auditRepository = new PrismaAuditRepository();

export const userService = createUserService({
  users: new PrismaUserRepository(),
  audit: auditRepository,
  accessLinks: new BetterAuthAccessLink(),
});

export const treatmentService = createTreatmentService({
  treatments: new PrismaTreatmentRepository(),
  audit: auditRepository,
});

export const auditLog = auditRepository;
