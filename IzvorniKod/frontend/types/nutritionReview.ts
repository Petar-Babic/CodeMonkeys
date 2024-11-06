<<<<<<< HEAD
import { DailyNutritionLogBase } from "./dailyNutritionLog";
import { UserBase } from "./user";

// NutritionReview Types
=======
>>>>>>> dev
export type NutritionReviewBase = {
  id: string;
  dailyNutritionLogId: string;
  userId: string;
  tasteRating: number;
  satisfactionRating: number;
  energyLevelRating: number;
<<<<<<< HEAD
  comment: string | null;
=======
  comment?: string;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type NutritionReviewWithRelations = NutritionReviewBase & {
  dailyNutritionLog: DailyNutritionLogBase; // Replace 'any' with actual DailyNutritionLog type
  user: UserBase; // Replace 'any' with actual User type
};

=======
>>>>>>> dev
export type CreateNutritionReviewInput = Omit<
  NutritionReviewBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateNutritionReviewInput = Partial<
<<<<<<< HEAD
  Omit<
    NutritionReviewBase,
    "id" | "dailyNutritionLogId" | "userId" | "createdAt" | "updatedAt"
  >
>;
=======
  Omit<NutritionReviewBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
