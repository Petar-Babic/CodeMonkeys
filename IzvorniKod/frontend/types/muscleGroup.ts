export type MuscleGroupBase = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateMuscleGroupInput = Omit<
  MuscleGroupBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateMuscleGroupInput = Partial<
  Omit<MuscleGroupBase, "createdAt" | "updatedAt">
> & { id: number };
