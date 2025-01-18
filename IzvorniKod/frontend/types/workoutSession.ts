import { ExerciseBase } from "./exercise";
import { PerformedExerciseWithPerformedSet } from "./performedExercise";
import { ReviewBase } from "./review";
import { WorkoutBase } from "./workout";

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

export type WorkoutSessionWithExercisesForPage = WorkoutSessionBase & {
  performedExercises: PerformedExerciseWithPerformedSet[];
  exercises: ExerciseBase[];
  workout: WorkoutBase;
};
