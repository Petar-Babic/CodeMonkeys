<<<<<<< HEAD
import { DailyNutritionLogBase } from "./dailyNutritionLog";
import { UserBase } from "./user";

// Meal Types
=======
>>>>>>> dev
export type MealBase = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  userId: string;
  dailyNutritionLogId: string;
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type MealWithRelations = MealBase & {
  user: UserBase; // Replace 'any' with actual User type
  dailyNutritionLog: DailyNutritionLogBase; // Replace 'any' with actual DailyNutritionLog type
};

export type CreateMealInput = Omit<MealBase, "id" | "createdAt" | "updatedAt">;

export type UpdateMealInput = Partial<
  Omit<
    MealBase,
    "id" | "userId" | "dailyNutritionLogId" | "createdAt" | "updatedAt"
  >
>;
=======
export type CreateMealInput = Omit<MealBase, "id" | "createdAt" | "updatedAt">;

export type UpdateMealInput = Partial<
  Omit<MealBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
