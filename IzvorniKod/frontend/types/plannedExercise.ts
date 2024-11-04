import { ExerciseBase } from "./exercise";
import { WorkoutPlanBase } from "./workoutPlan";

// PlannedExercise Types
export type PlannedExerciseBase = {
  id: string;
  workoutPlanId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  rpe: number | null;
  order: number;
};

export type PlannedExerciseWithRelations = PlannedExerciseBase & {
  workoutPlan: WorkoutPlanBase; // Replace 'any' with actual WorkoutPlan type
  exercise: ExerciseBase; // Replace 'any' with actual Exercise type
};

export type CreatePlannedExerciseInput = Omit<PlannedExerciseBase, "id">;

export type UpdatePlannedExerciseInput = Partial<
  Omit<PlannedExerciseBase, "id" | "workoutPlanId" | "exerciseId">
>;
