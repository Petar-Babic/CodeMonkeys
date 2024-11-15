export type PerformedExerciseBase = {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
};

export type CreatePerformedExerciseInput = Omit<PerformedExerciseBase, "id">;

export type UpdatePerformedExerciseInput = Partial<PerformedExerciseBase> & {
  id: string;
};
