export type WorkoutReviewBase = {
  id: number;
  workoutSessionId: number;
  userId: number;
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
> & { id: number };
