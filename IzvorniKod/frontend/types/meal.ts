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

export type CreateMealInput = Omit<MealBase, "id" | "createdAt" | "updatedAt">;

export type UpdateMealInput = Partial<
  Omit<MealBase, "createdAt" | "updatedAt">
> & { id: string };
