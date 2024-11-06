export type ExerciseBase = {
  id: string;
  name: string;
  description?: string;
  gifUrl?: string;
  createdById: string;
  isApproved: boolean;
  categoryId: string;
  primaryMuscleGroupId: string[];
  secondaryMuscleGroupIds: string[];
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
