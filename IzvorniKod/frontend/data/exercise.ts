import { ExerciseBase } from "@/types/exercise";

// Predefined muscle group IDs (matching the ones from useMuscleGroup.ts)
const MUSCLE_GROUP_IDS = {
  CHEST: "1",
  BACK: "2",
  LEGS: "3",
  SHOULDERS: "4",
  ARMS: "5",
  CORE: "6",
};

// Predefined exercises
export const exercises: ExerciseBase[] = [
  {
    id: "1",
    name: "Bench Press",
    description:
      "A compound exercise that primarily targets the chest muscles.",
    gifUrl: "https://example.com/bench-press.gif",
    createdById: "admin",
    isApproved: true,
    categoryId: "chest",
    primaryMuscleGroupId: MUSCLE_GROUP_IDS.CHEST,
    secondaryMuscleGroupIds: [
      MUSCLE_GROUP_IDS.ARMS,
      MUSCLE_GROUP_IDS.SHOULDERS,
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Squat",
    description:
      "A compound lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    gifUrl: "https://example.com/squat.gif",
    createdById: "admin",
    isApproved: true,
    categoryId: "legs",
    primaryMuscleGroupId: MUSCLE_GROUP_IDS.LEGS,
    secondaryMuscleGroupIds: [MUSCLE_GROUP_IDS.CORE],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Deadlift",
    description:
      "A compound exercise that targets multiple muscle groups, primarily the back and legs.",
    gifUrl: "https://example.com/deadlift.gif",
    createdById: "admin",
    isApproved: true,
    categoryId: "back",
    primaryMuscleGroupId: MUSCLE_GROUP_IDS.BACK,
    secondaryMuscleGroupIds: [MUSCLE_GROUP_IDS.LEGS, MUSCLE_GROUP_IDS.ARMS],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
