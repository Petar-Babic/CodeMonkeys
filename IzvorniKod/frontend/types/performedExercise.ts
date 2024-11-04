import { ExerciseBase } from "./exercise";
import { PerformedSetBase } from "./performedSet";
import { WorkoutSessionBase } from "./workoutSession";

// PerformedExercise Types
export type PerformedExerciseBase = {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
};

export type PerformedExerciseWithRelations = PerformedExerciseBase & {
  workoutSession: WorkoutSessionBase; // Replace 'any' with actual WorkoutSession type
  exercise: ExerciseBase; // Replace 'any' with actual Exercise type
  sets: PerformedSetBase[]; // Replace 'any' with actual PerformedSet type
};

export type CreatePerformedExerciseInput = Omit<PerformedExerciseBase, "id">;

export type UpdatePerformedExerciseInput = Partial<
  Omit<PerformedExerciseBase, "id">
>;
