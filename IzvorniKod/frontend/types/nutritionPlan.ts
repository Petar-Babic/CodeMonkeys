export type NutritionPlanBase = {
  id: string;
  userId: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  startDate: Date;
  endDate?: Date;
};

export type CreateNutritionPlanInput = Omit<
  NutritionPlanBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateNutritionPlanInput = Partial<
  Omit<NutritionPlanBase, "createdAt" | "updatedAt">
> & { id: string };
