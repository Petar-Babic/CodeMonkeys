export type MealSuggestionBase = {
  id: number;
  nutritionPlanId: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateMealSuggestionInput = Omit<
  MealSuggestionBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateMealSuggestionInput = Partial<
  Omit<MealSuggestionBase, "createdAt" | "updatedAt">
> & { id: number };
