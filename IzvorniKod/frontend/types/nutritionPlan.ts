import { MealSuggestionBase } from "./mealSuggestion";
import { TrainerBase } from "./trainer";
import { UserBase } from "./user";

// NutritionPlan Types
export type NutritionPlanBase = {
  id: string;
  userId: string;
  trainerId: string | null;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NutritionPlanWithRelations = NutritionPlanBase & {
  user: UserBase; // Replace 'any' with actual User type
  trainer: TrainerBase | null; // Replace 'any' with actual Trainer type
  currentUsers: UserBase[]; // Replace 'any' with actual User type
  mealSuggestions: MealSuggestionBase[]; // Replace 'any' with actual MealSuggestion type
};

export type CreateNutritionPlanInput = Omit<
  NutritionPlanBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateNutritionPlanInput = Partial<
  Omit<NutritionPlanBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
