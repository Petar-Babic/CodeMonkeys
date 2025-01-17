import {
  PlannedExerciseWithExercise,
  UpdatePlannedExerciseInput,
  CreatePlannedExerciseInputForUserWorkout,
} from "./plannedExercise";

export type WorkoutBase = {
  id: string;
  name: string;
  description: string;
  workoutPlanId: string;
  order: number;
};

export type CreateWorkoutInput = Omit<
  WorkoutBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutInput = Partial<
  Omit<WorkoutBase, "createdAt" | "updatedAt">
> & { id: string };

export type WorkoutWithPlannedExercises = WorkoutBase & {
  exercises: PlannedExerciseWithExercise[];
};

export type WorkoutWithPlannedExerciseBaseCreateInput = {
  name: string;
  description: string;
  order: number;
  exercises: CreatePlannedExerciseInputForUserWorkout[];
};

export type WorkoutWithPlannedExerciseBaseUpdateInput = Partial<
  Omit<WorkoutBase, "id" | "workoutPlanId">
> & { id: string } & {
  exercises: UpdatePlannedExerciseInput[];
};
