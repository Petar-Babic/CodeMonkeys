import {
  WorkoutWithPlannedExercise,
  WorkoutWithPlannedExerciseBaseCreateInput,
  WorkoutWithPlannedExerciseBaseUpdateInput,
  WorkoutWithPlannedExercisesBase,
} from "./workout";

export type WorkoutPlanBase = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  userId?: string;
  createdById: string;
  originalWorkoutPlanId?: string;
};

export type CreateWorkoutPlanInput = Omit<
  WorkoutPlanBase,
  "id" | "createdById"
> & {
  workouts: WorkoutWithPlannedExerciseBaseCreateInput[];
};

export type UpdateWorkoutPlanInput = Partial<WorkoutPlanBase> & {
  id: string;
  workouts: WorkoutWithPlannedExerciseBaseUpdateInput[];
};

export type WorkoutPlanWithWorkouts = WorkoutPlanBase & {
  workouts: WorkoutWithPlannedExercisesBase[];
};
