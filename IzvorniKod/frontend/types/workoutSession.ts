export type WorkoutSessionBase = {
  id: string;
  userId: string;
  userWorkoutPlanId: string;
  userWorkoutId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateWorkoutSessionInput = Omit<
  WorkoutSessionBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkoutSessionInput = Partial<
  Omit<WorkoutSessionBase, "createdAt" | "updatedAt">
> & { id: string };
