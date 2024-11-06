<<<<<<< HEAD
import { BodyMeasurementBase } from "./bodyMeasurement";
import { DailyNutritionLogBase } from "./dailyNutritionLog";
import { ExerciseBase } from "./exercise";
import { MealBase } from "./meal";
import { NutritionPlanBase } from "./nutritionPlan";
import { NutritionReviewBase } from "./nutritionReview";
import { PersonalRecordBase } from "./personalRecord";
import { ProgressLogBase } from "./progressLog";
import { SleepLogBase } from "./sleepLog";
import { TrainerBase } from "./trainer";
import { WorkoutGoalBase } from "./workoutGoal";
import { WorkoutPlanBase } from "./workoutPlan";
import { WorkoutReviewBase } from "./workoutReview";
import { WorkoutSessionBase } from "./workoutSession";
=======
// User Types
export type UserBase = {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role: Role;
  height?: number;
  weight?: number;
  gender?: Gender;
  activityLevel?: ActivityLevel;
  currentNutritionPlanId?: string;
  trainerId?: string;
  workoutPlanId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = Omit<
  UserBase,
  "id" | "createdAt" | "updatedAt" | "emailVerified"
>;

export type UpdateUserInput = Partial<
  Omit<UserBase, "id" | "createdAt" | "updatedAt">
>;
>>>>>>> dev

// Enum definitions (since we're not using Prisma)
export enum Role {
  USER = "user",
  TRAINER = "trainer",
  ADMIN = "admin",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum ActivityLevel {
  SEDENTARY = "sedentary",
  LIGHT = "light",
  MODERATE = "moderate",
  ACTIVE = "active",
<<<<<<< HEAD
  VERY_ACTIVE = "very-active",
}

// User Types
export type UserBase = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  height: number | null;
  weight: number | null;
  gender: Gender | null;
  activityLevel: ActivityLevel | null;
  currentNutritionPlanId: string | null;
  trainerId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithRelations = UserBase & {
  currentNutritionPlan: NutritionPlanBase | null; // Replace 'any' with actual NutritionPlan type
  trainer: TrainerBase | null; // Replace 'any' with actual Trainer type
  workoutPlans: WorkoutPlanBase[]; // Replace 'any' with actual WorkoutPlan type
  createdWorkoutPlans: WorkoutPlanBase[]; // Replace 'any' with actual WorkoutPlan type
  workoutSessions: WorkoutSessionBase[]; // Replace 'any' with actual WorkoutSession type
  nutritionPlans: NutritionPlanBase[]; // Replace 'any' with actual NutritionPlan type
  dailyNutritionLogs: DailyNutritionLogBase[]; // Replace 'any' with actual DailyNutritionLog type
  meals: MealBase[]; // Replace 'any' with actual Meal type
  progressLogs: ProgressLogBase[]; // Replace 'any' with actual ProgressLog type
  bodyMeasurements: BodyMeasurementBase[]; // Replace 'any' with actual BodyMeasurement type
  personalRecords: PersonalRecordBase[]; // Replace 'any' with actual PersonalRecord type
  workoutGoals: WorkoutGoalBase[]; // Replace 'any' with actual WorkoutGoal type
  sleepLogs: SleepLogBase[]; // Replace 'any' with actual SleepLog type
  workoutReviews: WorkoutReviewBase[]; // Replace 'any' with actual WorkoutReview type
  nutritionReviews: NutritionReviewBase[]; // Replace 'any' with actual NutritionReview type
  createdExercises: ExerciseBase[]; // Replace 'any' with actual Exercise type
  trainerProfile: TrainerBase | null; // Replace 'any' with actual Trainer type
};

export type CreateUserInput = Omit<
  UserBase,
  "id" | "createdAt" | "updatedAt" | "emailVerified"
>;

export type UpdateUserInput = Partial<
  Omit<UserBase, "id" | "email" | "createdAt" | "updatedAt">
>;
=======
  VERY_ACTIVE = "very",
}
>>>>>>> dev
