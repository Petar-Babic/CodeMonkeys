import {
  WorkoutWithPlannedExerciseBaseCreateInput,
  WorkoutWithPlannedExerciseBaseUpdateInput,
  WorkoutWithPlannedExercisesBase,
} from "./workout";

export type WorkoutPlanBase = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  userId?: number;
  createdById: number;
  originalWorkoutPlanId?: number;
};

export type CreateWorkoutPlanInput = Omit<
  WorkoutPlanBase,
  "id" | "createdById"
> & {
  workouts: WorkoutWithPlannedExerciseBaseCreateInput[];
};

export type UpdateWorkoutPlanInput = Partial<WorkoutPlanBase> & {
  id: number;
  workouts: WorkoutWithPlannedExerciseBaseUpdateInput[];
};

export type WorkoutPlanWithWorkouts = WorkoutPlanBase & {
  workouts: WorkoutWithPlannedExercisesBase[];
};
