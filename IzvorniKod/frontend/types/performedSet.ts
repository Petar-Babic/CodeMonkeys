export type PerformedSetBase = {
  id: string;
  performedExerciseId: string;
  reps: number;
  weight: number;
  rpe: number;
};

export type CreatePerformedSetInput = Omit<PerformedSetBase, "id">;

export type UpdatePerformedSetInput = Partial<PerformedSetBase> & {
  id: string;
};
