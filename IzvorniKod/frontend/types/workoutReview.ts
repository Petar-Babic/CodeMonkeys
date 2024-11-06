export type WorkoutReviewBase = {
  id: string;
  workoutSessionId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateWorkoutReviewInput = Omit<
  WorkoutReviewBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutReviewInput = Partial<
  Omit<WorkoutReviewBase, "createdAt" | "updatedAt">
> & { id: string };
