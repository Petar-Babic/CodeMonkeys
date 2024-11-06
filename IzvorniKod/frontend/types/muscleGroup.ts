<<<<<<< HEAD
import { ExerciseBase } from "./exercise";

// MuscleGroup Types
export type MuscleGroupBase = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
=======
export type MuscleGroupBase = {
  id: string;
  name: string;
  description?: string;
  image?: string;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type MuscleGroupWithRelations = MuscleGroupBase & {
  primaryExercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
  secondaryExercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
};

=======
>>>>>>> dev
export type CreateMuscleGroupInput = Omit<
  MuscleGroupBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateMuscleGroupInput = Partial<
<<<<<<< HEAD
  Omit<MuscleGroupBase, "id" | "createdAt" | "updatedAt">
>;
=======
  Omit<MuscleGroupBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
