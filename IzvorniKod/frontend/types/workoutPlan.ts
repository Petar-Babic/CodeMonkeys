import { WorkoutWithPlannedExercises } from "./workout";

export type WorkoutPlanBase = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  userId?: string;
  trainerId?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateWorkoutPlanInput = Omit<
  WorkoutPlanBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutPlanInput = Partial<
  Omit<WorkoutPlanBase, "createdAt" | "updatedAt">
> & { id: string };

export type WorkoutPlanWithWorkouts = WorkoutPlanBase & {
  workouts: WorkoutWithPlannedExercises[];
};
