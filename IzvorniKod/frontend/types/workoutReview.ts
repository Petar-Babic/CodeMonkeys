<<<<<<< HEAD
import { UserBase } from "./user";
import { WorkoutSessionBase } from "./workoutSession";

// WorkoutReview Types
=======
>>>>>>> dev
export type WorkoutReviewBase = {
  id: string;
  workoutSessionId: string;
  userId: string;
  rating: number;
<<<<<<< HEAD
  comment: string | null;
=======
  comment?: string;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type WorkoutReviewWithRelations = WorkoutReviewBase & {
  workoutSession: WorkoutSessionBase; // Replace 'any' with actual WorkoutSession type
  user: UserBase; // Replace 'any' with actual User type
};

=======
>>>>>>> dev
export type CreateWorkoutReviewInput = Omit<
  WorkoutReviewBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutReviewInput = Partial<
<<<<<<< HEAD
  Omit<
    WorkoutReviewBase,
    "id" | "workoutSessionId" | "userId" | "createdAt" | "updatedAt"
  >
>;
=======
  Omit<WorkoutReviewBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
