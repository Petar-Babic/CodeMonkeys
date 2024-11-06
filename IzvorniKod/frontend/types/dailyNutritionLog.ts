export type DailyNutritionLogBase = {
  id: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDailyNutritionLogInput = Omit<
  DailyNutritionLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateDailyNutritionLogInput = Partial<
  Omit<DailyNutritionLogBase, "createdAt" | "updatedAt">
> & { id: string };
