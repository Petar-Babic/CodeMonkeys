import {
  PlannedExerciseWithExercise,
  UpdatePlannedExerciseInput,
  CreatePlannedExerciseInputForUserWorkout,
  PlannedExerciseBase,
} from "./plannedExercise";

export type WorkoutBase = {
  id: number;
  name: string;
  description: string;
  workoutPlanId: number;
  order: number;
};

export type CreateWorkoutInput = Omit<
  WorkoutBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutInput = Partial<
  Omit<WorkoutBase, "createdAt" | "updatedAt">
> & { id: number };

export type WorkoutWithPlannedExercisesBase = WorkoutBase & {
  exercises: PlannedExerciseBase[];
};

export type WorkoutWithPlannedExerciseBaseCreateInput = {
  name: string;
  description: string;
  order: number;
  exercises: CreatePlannedExerciseInputForUserWorkout[];
};

export type WorkoutWithPlannedExerciseBaseUpdateInput = Partial<
  Omit<WorkoutBase, "id" | "workoutPlanId">
> & { id: number } & {
  exercises: UpdatePlannedExerciseInput[];
};

export type WorkoutWithPlannedExercise = WorkoutBase & {
  exercises: PlannedExerciseWithExercise[];
};
