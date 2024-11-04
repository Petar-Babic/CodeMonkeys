import { MealBase } from "./meal";
import { NutritionReviewBase } from "./nutritionReview";
import { UserBase } from "./user";

// DailyNutritionLog Types
export type DailyNutritionLogBase = {
  id: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type DailyNutritionLogWithRelations = DailyNutritionLogBase & {
  user: UserBase; // Replace 'any' with actual User type
  meals: MealBase[]; // Replace 'any' with actual Meal type
  review: NutritionReviewBase | null; // Replace 'any' with actual NutritionReview type
};

export type CreateDailyNutritionLogInput = Omit<
  DailyNutritionLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateDailyNutritionLogInput = Partial<
  Omit<DailyNutritionLogBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
