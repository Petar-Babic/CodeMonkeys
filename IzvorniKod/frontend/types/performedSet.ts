<<<<<<< HEAD
import { PerformedExerciseBase } from "./performedExercise";

// PerformedSet Types
=======
>>>>>>> dev
export type PerformedSetBase = {
  id: string;
  performedExerciseId: string;
  reps: number;
  weight: number;
<<<<<<< HEAD
  rpe: number | null;
};

export type PerformedSetWithRelations = PerformedSetBase & {
  performedExercise: PerformedExerciseBase; // Replace 'any' with actual PerformedExercise type
=======
  rpe?: number;
>>>>>>> dev
};

export type CreatePerformedSetInput = Omit<PerformedSetBase, "id">;

<<<<<<< HEAD
export type UpdatePerformedSetInput = Partial<Omit<PerformedSetBase, "id">>;
=======
export type UpdatePerformedSetInput = Partial<PerformedSetBase> & {
  id: string;
};
>>>>>>> dev
