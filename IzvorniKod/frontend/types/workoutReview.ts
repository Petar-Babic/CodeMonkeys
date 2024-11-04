import { UserBase } from "./user";
import { WorkoutSessionBase } from "./workoutSession";

// WorkoutReview Types
export type WorkoutReviewBase = {
  id: string;
  workoutSessionId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutReviewWithRelations = WorkoutReviewBase & {
  workoutSession: WorkoutSessionBase; // Replace 'any' with actual WorkoutSession type
  user: UserBase; // Replace 'any' with actual User type
};

export type CreateWorkoutReviewInput = Omit<
  WorkoutReviewBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutReviewInput = Partial<
  Omit<
    WorkoutReviewBase,
    "id" | "workoutSessionId" | "userId" | "createdAt" | "updatedAt"
  >
>;
