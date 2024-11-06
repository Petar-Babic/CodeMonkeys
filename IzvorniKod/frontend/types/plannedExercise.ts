export type PlannedExerciseBase = {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  rpe?: number;
  order: number;
};

export type CreatePlannedExerciseInput = Omit<PlannedExerciseBase, "id">;

export type UpdatePlannedExerciseInput = Partial<PlannedExerciseBase> & {
  id: string;
};

export type CreatePlannedExerciseInputForUserWorkout = Omit<
  PlannedExerciseBase,
  "id" | "workoutId"
>;
