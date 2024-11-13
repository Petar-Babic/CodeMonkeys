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
  VERY_ACTIVE = "very",
}
