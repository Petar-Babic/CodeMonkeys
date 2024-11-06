<<<<<<< HEAD
import { ExerciseBase } from "./exercise";

// ExerciseCategory Types
export type ExerciseCategoryBase = {
  id: string;
  name: string;
  description: string | null;
=======
export type ExerciseCategoryBase = {
  id: string;
  name: string;
  description?: string;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type ExerciseCategoryWithRelations = ExerciseCategoryBase & {
  exercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
};

=======
>>>>>>> dev
export type CreateExerciseCategoryInput = Omit<
  ExerciseCategoryBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateExerciseCategoryInput = Partial<
<<<<<<< HEAD
  Omit<ExerciseCategoryBase, "id" | "createdAt" | "updatedAt">
>;
=======
  Omit<ExerciseCategoryBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
