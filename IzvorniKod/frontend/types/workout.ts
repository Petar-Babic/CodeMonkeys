import { UserPlannedExerciseWithExercise } from "./userPlannedExercise";

export type WorkoutBase = {
  id: string;
  name: string;
  description?: string;
  workoutPlanId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateWorkoutInput = Omit<
  WorkoutBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutInput = Partial<
  Omit<WorkoutBase, "createdAt" | "updatedAt">
> & { id: string };

export type WorkoutWithPlannedExercises = WorkoutBase & {
  exercises: UserPlannedExerciseWithExercise[];
};
