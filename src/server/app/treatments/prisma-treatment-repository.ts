import "server-only";

import { db } from "~/server/db";
import type {
  StoredTreatment,
  TreatmentCreateData,
  TreatmentRepository,
  TreatmentUpdateData,
} from "./repository";

function toStored(row: {
  id: string;
  name: string;
  category: string;
  estimatedMinutes: number;
  internalDescription: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}): StoredTreatment {
  return row;
}

export class PrismaTreatmentRepository implements TreatmentRepository {
  async listAll(): Promise<StoredTreatment[]> {
    const rows = await db.treatment.findMany({ orderBy: { name: "asc" } });
    return rows.map(toStored);
  }

  async findById(id: string): Promise<StoredTreatment | null> {
    const row = await db.treatment.findUnique({ where: { id } });
    return row ? toStored(row) : null;
  }

  async create(data: TreatmentCreateData): Promise<StoredTreatment> {
    const row = await db.treatment.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        category: data.category,
        estimatedMinutes: data.estimatedMinutes,
        internalDescription: data.internalDescription,
        active: true,
        createdById: data.createdById,
        updatedById: data.createdById,
      },
    });
    return toStored(row);
  }

  async update(id: string, data: TreatmentUpdateData): Promise<StoredTreatment> {
    const row = await db.treatment.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        estimatedMinutes: data.estimatedMinutes,
        internalDescription: data.internalDescription,
        active: data.active,
        updatedById: data.updatedById,
      },
    });
    return toStored(row);
  }
}
