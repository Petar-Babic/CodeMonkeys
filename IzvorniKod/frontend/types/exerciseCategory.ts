export type ExerciseCategoryBase = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateExerciseCategoryInput = Omit<
  ExerciseCategoryBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateExerciseCategoryInput = Partial<
  Omit<ExerciseCategoryBase, "createdAt" | "updatedAt">
> & { id: string };
