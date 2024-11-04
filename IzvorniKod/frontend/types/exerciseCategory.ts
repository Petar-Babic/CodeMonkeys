import { ExerciseBase } from "./exercise";

// ExerciseCategory Types
export type ExerciseCategoryBase = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ExerciseCategoryWithRelations = ExerciseCategoryBase & {
  exercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
};

export type CreateExerciseCategoryInput = Omit<
  ExerciseCategoryBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateExerciseCategoryInput = Partial<
  Omit<ExerciseCategoryBase, "id" | "createdAt" | "updatedAt">
>;
