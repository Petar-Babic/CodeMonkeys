import { NutritionPlanBase } from "./nutritionPlan";

// MealSuggestion Types
export type MealSuggestionBase = {
  id: string;
  nutritionPlanId: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: Date;
  updatedAt: Date;
};

export type MealSuggestionWithRelations = MealSuggestionBase & {
  nutritionPlan: NutritionPlanBase; // Replace 'any' with actual NutritionPlan type
};

export type CreateMealSuggestionInput = Omit<
  MealSuggestionBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateMealSuggestionInput = Partial<
  Omit<MealSuggestionBase, "id" | "nutritionPlanId" | "createdAt" | "updatedAt">
>;
