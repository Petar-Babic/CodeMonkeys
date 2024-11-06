<<<<<<< HEAD
import { MealBase } from "./meal";
import { NutritionReviewBase } from "./nutritionReview";
import { UserBase } from "./user";

// DailyNutritionLog Types
=======
>>>>>>> dev
export type DailyNutritionLogBase = {
  id: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type DailyNutritionLogWithRelations = DailyNutritionLogBase & {
  user: UserBase; // Replace 'any' with actual User type
  meals: MealBase[]; // Replace 'any' with actual Meal type
  review: NutritionReviewBase | null; // Replace 'any' with actual NutritionReview type
};

=======
>>>>>>> dev
export type CreateDailyNutritionLogInput = Omit<
  DailyNutritionLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateDailyNutritionLogInput = Partial<
<<<<<<< HEAD
  Omit<DailyNutritionLogBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
=======
  Omit<DailyNutritionLogBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
