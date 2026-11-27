export type StoredTreatment = {
  id: string;
  name: string;
  category: string;
  estimatedMinutes: number;
  internalDescription: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TreatmentCreateData = {
  name: string;
  category: string;
  estimatedMinutes: number;
  internalDescription: string | null;
  createdById: string;
};

export type TreatmentUpdateData = {
  name: string;
  category: string;
  estimatedMinutes: number;
  internalDescription: string | null;
  active: boolean;
  updatedById: string;
};

/** No hay método de borrado: retirar un tratamiento es desactivarlo. */
export interface TreatmentRepository {
  listAll(): Promise<StoredTreatment[]>;
  findById(id: string): Promise<StoredTreatment | null>;
  create(data: TreatmentCreateData): Promise<StoredTreatment>;
  update(id: string, data: TreatmentUpdateData): Promise<StoredTreatment>;
}
