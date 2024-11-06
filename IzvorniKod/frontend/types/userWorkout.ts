import { CreatePlannedExerciseInputForUserWorkout } from "./plannedExercise";
import {
  UserPlannedExerciseWithExercise,
  UserPlannedExerciseWithExerciseCreateInput,
  UserPlannedExerciseWithExerciseUpdateInput,
} from "./userPlannedExercise";

export type UserWorkoutBase = {
  id: string;
  name: string;
  userWorkoutPlanId?: string;
  workoutId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserWorkoutInput = Omit<
  UserWorkoutBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateUserWorkoutInput = Partial<
  Omit<UserWorkoutBase, "createdAt" | "updatedAt">
> & { id: string };

export type UserWorkoutWithUserPlannedExercise = UserWorkoutBase & {
  exercises: UserPlannedExerciseWithExercise[];
};

export type UserWorkoutWithUserPlannedExerciseCreateInput = {
  name: string;
  userWorkoutPlanId?: string;
  workoutId?: string;
  order: number;
  exercises: UserPlannedExerciseWithExerciseCreateInput[];
};

export type UserWorkoutWithUserPlannedExerciseWithoutCreatedAt = Omit<
  UserWorkoutWithUserPlannedExercise,
  "createdAt"
>;

export type UserWorkoutWithUserPlannedExerciseUpdateInput = Omit<
  UserWorkoutWithUserPlannedExerciseCreateInput,
  "exercises"
> & {
  exercises: UserPlannedExerciseWithExerciseUpdateInput[];
  id: string;
};
export type UserWorkoutWithUserPlannedExerciseBaseCreateInput = {
  name: string;
  userWorkoutPlanId?: string;
  workoutId?: string;
  order: number;
  exercises: CreatePlannedExerciseInputForUserWorkout[];
};
