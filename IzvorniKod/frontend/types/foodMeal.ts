import { FoodBase } from "./food";

export type FoodMealBase = {
  id: number;
  foodId: FoodBase;
  mealId: number;
  quantity: number;
};

export type CreateFoodMealInput = Omit<FoodMealBase, "id">;

export type UpdateFoodMealInput = Partial<
  Omit<FoodMealBase, "createdAt" | "updatedAt">
> & { id: number };
