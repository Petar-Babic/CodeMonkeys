import { ExerciseCategoryBase } from "./exerciseCategory";
import { MuscleGroupBase } from "./muscleGroup";
import { PerformedExerciseBase } from "./performedExercise";
import { PersonalRecordBase } from "./personalRecord";
import { PlannedExerciseBase } from "./plannedExercise";
import { UserBase } from "./user";

// Exercise Types
export type ExerciseBase = {
  id: string;
  name: string;
  description: string | null;
  gifUrl: string | null;
  createdById: string;
  isApproved: boolean;
  categoryId: string;
  primaryMuscleGroupId: string;
  secondaryMuscleGroupIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type ExerciseWithRelations = ExerciseBase & {
  createdBy: UserBase; // Replace 'any' with actual User type
  category: ExerciseCategoryBase; // Replace 'any' with actual ExerciseCategory type
  primaryMuscleGroup: MuscleGroupBase; // Replace 'any' with actual MuscleGroup type
  secondaryMuscleGroups: MuscleGroupBase[]; // Replace 'any' with actual MuscleGroup type
  plannedExercises: PlannedExerciseBase[]; // Replace 'any' with actual PlannedExercise type
  performedExercises: PerformedExerciseBase[]; // Replace 'any' with actual PerformedExercise type
  personalRecords: PersonalRecordBase[]; // Replace 'any' with actual PersonalRecord type
};

export type CreateExerciseInput = Omit<
  ExerciseBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateExerciseInput = Partial<
  Omit<ExerciseBase, "id" | "createdAt" | "updatedAt">
>;
