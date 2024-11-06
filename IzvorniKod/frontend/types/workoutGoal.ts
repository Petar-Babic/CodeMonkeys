<<<<<<< HEAD
import { UserBase } from "./user";

// WorkoutGoal Types
=======
>>>>>>> dev
export type WorkoutGoalBase = {
  id: string;
  userId: string;
  description: string;
  targetDate: Date;
  achieved: boolean;
<<<<<<< HEAD
  achievedDate: Date | null;
=======
  achievedDate?: Date;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
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
=======
export type CreateWorkoutGoalInput = Omit<
  WorkoutGoalBase,
  "id" | "createdAt" | "updatedAt" | "achieved" | "achievedDate"
>;

export type UpdateWorkoutGoalInput = Partial<
  Omit<WorkoutGoalBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
