import { ExerciseBase } from "./exercise";

export type PlannedExerciseBase = {
  id: number;
  workoutId: number;
  exerciseId: number;
  sets: number;
  reps: number;
  rpe: number;
  order: number;
};

export type CreatePlannedExerciseInput = Omit<PlannedExerciseBase, "id">;

export type UpdatePlannedExerciseInput = Partial<PlannedExerciseBase> & {
  id: number;
};

export type CreatePlannedExerciseInputForUserWorkout = Omit<
  PlannedExerciseBase,
  "id" | "workoutId"
>;

export type PlannedExerciseWithExercise = PlannedExerciseBase & {
  exercise: ExerciseBase;
};
