export type WorkoutGoalBase = {
  id: number;
  userId: number;
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
> & { id: number };
