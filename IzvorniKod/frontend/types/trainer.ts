<<<<<<< HEAD
import { NutritionPlanBase } from "./nutritionPlan";
import { UserBase } from "./user";
import { WorkoutPlanBase } from "./workoutPlan";

// Trainer Types
=======
>>>>>>> dev
export type TrainerBase = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type TrainerWithRelations = TrainerBase & {
  user: UserBase;
  clients: UserBase[];
  workoutPlans: WorkoutPlanBase[]; // Replace 'any' with actual WorkoutPlan type
  nutritionPlans: NutritionPlanBase[]; // Replace 'any' with actual NutritionPlan type
};

=======
>>>>>>> dev
export type CreateTrainerInput = Omit<
  TrainerBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTrainerInput = Partial<
<<<<<<< HEAD
  Omit<TrainerBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
=======
  Omit<TrainerBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
