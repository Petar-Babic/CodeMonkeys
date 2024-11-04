import { UserBase } from "./user";

// WorkoutGoal Types
export type WorkoutGoalBase = {
  id: string;
  userId: string;
  description: string;
  targetDate: Date;
  achieved: boolean;
  achievedDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutGoalWithRelations = WorkoutGoalBase & {
  user: UserBase; // Replace 'any' with actual User type
};

export type CreateWorkoutGoalInput = Omit<
  WorkoutGoalBase,
  "id" | "achieved" | "achievedDate" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutGoalInput = Partial<
  Omit<WorkoutGoalBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
