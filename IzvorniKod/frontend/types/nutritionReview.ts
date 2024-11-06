export type NutritionReviewBase = {
  id: string;
  dailyNutritionLogId: string;
  userId: string;
  tasteRating: number;
  satisfactionRating: number;
  energyLevelRating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNutritionReviewInput = Omit<
  NutritionReviewBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateNutritionReviewInput = Partial<
  Omit<NutritionReviewBase, "createdAt" | "updatedAt">
> & { id: string };
