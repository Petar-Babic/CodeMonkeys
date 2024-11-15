import { ExerciseBase } from "./exercise";
export type UserPlannedExerciseBase = {
  id: string;
  userWorkoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  rpe?: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserPlannedExerciseInput = Omit<
  UserPlannedExerciseBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateUserPlannedExerciseInput = Partial<
  Omit<UserPlannedExerciseBase, "createdAt" | "updatedAt">
> & { id: string };

export type UserPlannedExerciseWithExercise = UserPlannedExerciseBase & {
  exercise: ExerciseBase;
};

export type UserPlannedExerciseWithExerciseCreateInput = {
  exerciseId: string;
  sets: number;
  reps: number;
  rpe?: number;
  order: number;
  exercise: ExerciseBase;
};

export type UserPlannedExerciseWithExerciseUpdateInput = Omit<
  UserPlannedExerciseWithExercise,
  "createdAt"
> & { id: string };
