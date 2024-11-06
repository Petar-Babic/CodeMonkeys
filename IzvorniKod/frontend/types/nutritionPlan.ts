<<<<<<< HEAD
import { MealSuggestionBase } from "./mealSuggestion";
import { TrainerBase } from "./trainer";
import { UserBase } from "./user";

// NutritionPlan Types
export type NutritionPlanBase = {
  id: string;
  userId: string;
  trainerId: string | null;
=======
export type NutritionPlanBase = {
  id: string;
  userId: string;
  trainerId?: string;
>>>>>>> dev
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  startDate: Date;
<<<<<<< HEAD
  endDate: Date | null;
=======
  endDate?: Date;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type NutritionPlanWithRelations = NutritionPlanBase & {
  user: UserBase; // Replace 'any' with actual User type
  trainer: TrainerBase | null; // Replace 'any' with actual Trainer type
  currentUsers: UserBase[]; // Replace 'any' with actual User type
  mealSuggestions: MealSuggestionBase[]; // Replace 'any' with actual MealSuggestion type
};

=======
>>>>>>> dev
export type CreateNutritionPlanInput = Omit<
  NutritionPlanBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateNutritionPlanInput = Partial<
<<<<<<< HEAD
  Omit<NutritionPlanBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
=======
  Omit<NutritionPlanBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
