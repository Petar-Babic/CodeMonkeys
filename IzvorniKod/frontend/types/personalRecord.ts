import { ExerciseBase } from "./exercise";
import { UserBase } from "./user";

// PersonalRecord Types
export type PersonalRecordBase = {
  id: string;
  userId: string;
  exerciseId: string;
  weight: number;
  reps: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type PersonalRecordWithRelations = PersonalRecordBase & {
  user: UserBase; // Replace 'any' with actual User type
  exercise: ExerciseBase; // Replace 'any' with actual Exercise type
};

export type CreatePersonalRecordInput = Omit<
  PersonalRecordBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdatePersonalRecordInput = Partial<
  Omit<
    PersonalRecordBase,
    "id" | "userId" | "exerciseId" | "createdAt" | "updatedAt"
  >
>;
