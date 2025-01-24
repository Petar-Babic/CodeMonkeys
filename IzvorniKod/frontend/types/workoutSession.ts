import { ExerciseBase } from "./exercise";
import {
  CreatePerformedExerciseWithPerformedSetInput,
  PerformedExerciseWithPerformedSet,
} from "./performedExercise";
import { ReviewBase } from "./review";
import { WorkoutBase } from "./workout";

export type WorkoutSessionBase = {
  id: number;
  userId: number;
  workoutId: number;
  date: Date;
  userReviewId?: number;
  trainerReviewId?: number;
};

export type WorkoutSessionWithReview = WorkoutSessionBase & {
  userReview?: ReviewBase;
  trainerReview?: ReviewBase;
};

export type CreateWorkoutSessionInput = Omit<
  WorkoutSessionBase,
  "id" | "createdAt" | "updatedAt"
> & {
  performedExercises: CreatePerformedExerciseWithPerformedSetInput[];
};

export type UpdateWorkoutSessionInput = Partial<
  Omit<WorkoutSessionBase, "createdAt" | "updatedAt">
> & { id: number };

export type WorkoutSessionWithPerformedExercises = WorkoutSessionBase & {
  performedExercises: PerformedExerciseWithPerformedSet[];
};

export type WorkoutSessionWithExercisesForPage = WorkoutSessionBase & {
  performedExercises: PerformedExerciseWithPerformedSet[];
  exercises: ExerciseBase[];
  workout: WorkoutBase;
};
