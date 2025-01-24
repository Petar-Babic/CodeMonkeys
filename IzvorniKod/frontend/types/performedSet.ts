export type PerformedSetBase = {
  id: number;
  performedExerciseId: number;
  reps: number;
  weight: number;
  rpe: number;
};

export type CreatePerformedSetInput = Omit<PerformedSetBase, "id">;

export type UpdatePerformedSetInput = Partial<PerformedSetBase> & {
  id: number;
};
