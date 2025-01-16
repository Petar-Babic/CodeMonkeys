export type ExerciseBase = {
  id: string;
  name: string;
  description?: string;
  gif?: string;
  createdById: string;
  isApproved: boolean;
  primaryMuscleGroupsIds: string[];
  secondaryMuscleGroupsIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateExerciseInput = Omit<
  ExerciseBase,
  "id" | "createdAt" | "updatedAt" | "isApproved"
>;

export type UpdateExerciseInput = Partial<
  Omit<ExerciseBase, "createdAt" | "updatedAt">
> & { id: string };
