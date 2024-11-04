import { ExerciseBase } from "./exercise";

// MuscleGroup Types
export type MuscleGroupBase = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type MuscleGroupWithRelations = MuscleGroupBase & {
  primaryExercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
  secondaryExercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
};

export type CreateMuscleGroupInput = Omit<
  MuscleGroupBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateMuscleGroupInput = Partial<
  Omit<MuscleGroupBase, "id" | "createdAt" | "updatedAt">
>;
