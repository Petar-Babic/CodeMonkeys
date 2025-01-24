import { CreateFoodMealInput, FoodMealBase } from "./foodMeal";

export type MealBase = {
  id: number;
  suggetedId: number;
  isSuggestion: boolean;
  time: string;
  foodMeals?: FoodMealBase[];
};

export type CreateMealInput = Omit<
  MealBase,
  "id" | "createdAt" | "updatedAt" | "foodMeals"
> & {
  foodMeals: CreateFoodMealInput[];
};

export type UpdateMealInput = Partial<
  Omit<MealBase, "createdAt" | "updatedAt" | "foodMeals">
> & { id: number };
