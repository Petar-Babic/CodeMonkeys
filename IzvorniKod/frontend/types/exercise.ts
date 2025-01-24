export type ExerciseBase = {
  id: number;
  name: string;
  description?: string;
  gif?: string;
  createdById: number;
  isApproved: boolean;
  primaryMuscleGroupsIds: number[];
  secondaryMuscleGroupsIds: number[];
};

export type CreateExerciseInput = Omit<ExerciseBase, "id" | "createdById">;

export type UpdateExerciseInput = Partial<Omit<ExerciseBase, "createdById">> & {
  id: number;
};
