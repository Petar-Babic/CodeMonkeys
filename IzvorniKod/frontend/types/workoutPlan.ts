import { PlannedExerciseBase } from "./plannedExercise";
import { TrainerBase } from "./trainer";
import { UserBase } from "./user";
import { WorkoutSessionBase } from "./workoutSession";

// Base WorkoutPlan type (for get from database without populating anything)
export type WorkoutPlanBase = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  userId: string;
  trainerId: string | null;
  createdById: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// WorkoutPlan type with populated exercises
export type WorkoutPlanWithExercises = WorkoutPlanBase & {
  exercises: PlannedExerciseBase[];
};

// WorkoutPlan type with all relations populated
export type WorkoutPlanFull = WorkoutPlanBase & {
  user: UserBase;
  trainer: TrainerBase | null;
  createdBy: UserBase;
  exercises: PlannedExerciseBase[];
  workoutSessions: WorkoutSessionBase[];
};

// Type for creating a new WorkoutPlan
export type CreateWorkoutPlanInput = {
  name: string;
  description?: string;
  image?: string;
  userId: string;
  trainerId?: string;
  createdById: string;
  isApproved?: boolean;
  exercises?: Omit<PlannedExerciseBase, "id" | "workoutPlanId">[];
};

// Type for updating an existing WorkoutPlan
export type UpdateWorkoutPlanInput = Partial<
  Omit<CreateWorkoutPlanInput, "userId" | "createdById">
> & {
  id: string;
};

// Type for WorkoutPlan with exercise count
export type WorkoutPlanWithExerciseCount = WorkoutPlanBase & {
  _count: {
    exercises: number;
  };
};

// Type for WorkoutPlan list item (used in overview lists)
export type WorkoutPlanListItem = Pick<
  WorkoutPlanBase,
  "id" | "name" | "image" | "isApproved" | "createdAt"
> & {
  exerciseCount: number;
  createdBy: Pick<UserBase, "id" | "name">;
};

// Type for WorkoutPlan search result
export type WorkoutPlanSearchResult = Pick<
  WorkoutPlanBase,
  "id" | "name" | "description" | "image"
> & {
  exerciseCount: number;
  createdBy: Pick<UserBase, "id" | "name">;
};
