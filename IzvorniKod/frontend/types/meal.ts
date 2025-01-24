export type MealBase = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  userId: number;
  dailyNutritionLogId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateMealInput = Omit<MealBase, "id" | "createdAt" | "updatedAt">;

export type UpdateMealInput = Partial<
  Omit<MealBase, "createdAt" | "updatedAt">
> & { id: number };
