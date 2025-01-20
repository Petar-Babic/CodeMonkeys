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

export type CreateExerciseInput = Omit<
  ExerciseBase,
  "id" | "createdAt" | "updatedAt" | "isApproved"
>;

export type UpdateExerciseInput = Partial<
  Omit<ExerciseBase, "createdAt" | "updatedAt">
> & { id: number };
