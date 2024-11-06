import {
  UserWorkoutWithUserPlannedExercise,
  UserWorkoutWithUserPlannedExerciseBaseCreateInput,
} from "./userWorkout";
import { WorkoutSessionBase } from "./workoutSession";
import { WorkoutPlanBase } from "./workoutPlan";

export type UserWorkoutPlanBase = {
  id: string;
  name: string;
  userId: string;
  workoutPlanId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserWorkoutPlanInput = Omit<
  UserWorkoutPlanBase,
  "id" | "createdAt" | "updatedAt"
> & { userWorkouts: UserWorkoutWithUserPlannedExerciseBaseCreateInput[] };

export type UpdateUserWorkoutPlanInput = Partial<
  Omit<UserWorkoutPlanBase, "createdAt" | "updatedAt">
> & { id: string; userWorkouts: UserWorkoutWithUserPlannedExercise[] };

export type UserWorkoutPlanWithRelations = UserWorkoutPlanBase & {
  workoutPlan: WorkoutPlanBase | undefined;
  userWorkouts: UserWorkoutWithUserPlannedExercise[];
  workoutSessions: WorkoutSessionBase[];
};
