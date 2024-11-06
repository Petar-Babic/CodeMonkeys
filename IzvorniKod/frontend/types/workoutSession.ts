<<<<<<< HEAD
import { ExerciseBase } from "./exercise";
import { UserBase } from "./user";
import { WorkoutPlanBase } from "./workoutPlan";
import { WorkoutReviewBase } from "./workoutReview";

// WorkoutSession Types
export type WorkoutSessionBase = {
  id: string;
  userId: string;
  workoutPlanId: string;
=======
export type WorkoutSessionBase = {
  id: string;
  userId: string;
  userWorkoutPlanId: string;
  userWorkoutId: string;
>>>>>>> dev
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type WorkoutSessionWithRelations = WorkoutSessionBase & {
  user: UserBase;
  workoutPlan: WorkoutPlanBase; // Replace 'any' with actual WorkoutPlan type
  exercises: ExerciseBase[]; // Replace 'any' with actual PerformedExercise type
  review: WorkoutReviewBase | null; // Replace 'any' with actual WorkoutReview type
};

=======
>>>>>>> dev
export type CreateWorkoutSessionInput = Omit<
  WorkoutSessionBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutSessionInput = Partial<
<<<<<<< HEAD
  Omit<WorkoutSessionBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
=======
  Omit<WorkoutSessionBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
