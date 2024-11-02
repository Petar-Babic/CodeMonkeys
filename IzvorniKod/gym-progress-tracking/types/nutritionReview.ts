import { DailyNutritionLogBase } from "./dailyNutritionLog";
import { UserBase } from "./user";

// NutritionReview Types
export type NutritionReviewBase = {
  id: string;
  dailyNutritionLogId: string;
  userId: string;
  tasteRating: number;
  satisfactionRating: number;
  energyLevelRating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NutritionReviewWithRelations = NutritionReviewBase & {
  dailyNutritionLog: DailyNutritionLogBase; // Replace 'any' with actual DailyNutritionLog type
  user: UserBase; // Replace 'any' with actual User type
};

export type CreateNutritionReviewInput = Omit<
  NutritionReviewBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateNutritionReviewInput = Partial<
  Omit<
    NutritionReviewBase,
    "id" | "dailyNutritionLogId" | "userId" | "createdAt" | "updatedAt"
  >
>;
