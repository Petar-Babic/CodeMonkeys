import { PerformedExerciseWithPerformedSet } from "./performedExercise";
import { ReviewBase } from "./review";

export type WorkoutSessionBase = {
  id: string;
  userId: string;
  workoutId: string;
  date: Date;
  userReviewId?: string;
  trainerReviewId?: string;
};

export type WorkoutSessionWithReview = WorkoutSessionBase & {
  userReview?: ReviewBase;
  trainerReview?: ReviewBase;
};

export type CreateWorkoutSessionInput = Omit<
  WorkoutSessionBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutSessionInput = Partial<
  Omit<WorkoutSessionBase, "createdAt" | "updatedAt">
> & { id: string };

export type WorkoutSessionWithPerformedExercises = WorkoutSessionBase & {
  performedExercises: PerformedExerciseWithPerformedSet[];
};
