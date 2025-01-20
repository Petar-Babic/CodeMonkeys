export type PersonalRecordBase = {
  id: number;
  userId: number;
  exerciseId: number;
  weight: number;
  reps: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePersonalRecordInput = Omit<
  PersonalRecordBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdatePersonalRecordInput = Partial<
  Omit<PersonalRecordBase, "createdAt" | "updatedAt">
> & { id: number };
