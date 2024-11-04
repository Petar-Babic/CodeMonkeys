import { ExerciseBase } from "./exercise";
import { UserBase } from "./user";
import { WorkoutPlanBase } from "./workoutPlan";
import { WorkoutReviewBase } from "./workoutReview";

// WorkoutSession Types
export type WorkoutSessionBase = {
  id: string;
  userId: string;
  workoutPlanId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutSessionWithRelations = WorkoutSessionBase & {
  user: UserBase;
  workoutPlan: WorkoutPlanBase; // Replace 'any' with actual WorkoutPlan type
  exercises: ExerciseBase[]; // Replace 'any' with actual PerformedExercise type
  review: WorkoutReviewBase | null; // Replace 'any' with actual WorkoutReview type
};

export type CreateWorkoutSessionInput = Omit<
  WorkoutSessionBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutSessionInput = Partial<
  Omit<WorkoutSessionBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
