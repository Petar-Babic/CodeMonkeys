import { PerformedExerciseBase } from "./performedExercise";

// PerformedSet Types
export type PerformedSetBase = {
  id: string;
  performedExerciseId: string;
  reps: number;
  weight: number;
  rpe: number | null;
};

export type PerformedSetWithRelations = PerformedSetBase & {
  performedExercise: PerformedExerciseBase; // Replace 'any' with actual PerformedExercise type
};

export type CreatePerformedSetInput = Omit<PerformedSetBase, "id">;

export type UpdatePerformedSetInput = Partial<Omit<PerformedSetBase, "id">>;
