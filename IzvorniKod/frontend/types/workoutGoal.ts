export type WorkoutGoalBase = {
  id: string;
  userId: string;
  description: string;
  targetDate: Date;
  achieved: boolean;
  achievedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateWorkoutGoalInput = Omit<
  WorkoutGoalBase,
  "id" | "createdAt" | "updatedAt" | "achieved" | "achievedDate"
>;

export type UpdateWorkoutGoalInput = Partial<
  Omit<WorkoutGoalBase, "createdAt" | "updatedAt">
> & { id: string };
