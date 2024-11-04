import { NutritionPlanBase } from "./nutritionPlan";
import { UserBase } from "./user";
import { WorkoutPlanBase } from "./workoutPlan";

// Trainer Types
export type TrainerBase = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TrainerWithRelations = TrainerBase & {
  user: UserBase;
  clients: UserBase[];
  workoutPlans: WorkoutPlanBase[]; // Replace 'any' with actual WorkoutPlan type
  nutritionPlans: NutritionPlanBase[]; // Replace 'any' with actual NutritionPlan type
};

export type CreateTrainerInput = Omit<
  TrainerBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTrainerInput = Partial<
  Omit<TrainerBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
