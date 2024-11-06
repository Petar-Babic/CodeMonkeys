import { ExerciseBase } from "@/types/exercise";

<<<<<<< HEAD
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
=======
export const exercises: ExerciseBase[] = [
  {
    id: "1",
    name: "Barbell Squat",
    description:
      "A compound lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    gifUrl: "/exercises/barbell-squat.gif",
    createdById: "user1",
    isApproved: true,
    categoryId: "1", // Assuming 1 is the ID for "Strength" category
    primaryMuscleGroupId: ["1"], // Assuming 1 is the ID for "Quadriceps" muscle group
    secondaryMuscleGroupIds: ["2", "3"], // Assuming 2 is "Hamstrings" and 3 is "Glutes"
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Push-up",
    description:
      "A bodyweight exercise that primarily targets the chest, shoulders, and triceps.",
    gifUrl: "/exercises/push-up.gif",
    createdById: "user2",
    isApproved: true,
    categoryId: "2", // Assuming 2 is the ID for "Bodyweight" category
    primaryMuscleGroupId: ["4"], // Assuming 4 is the ID for "Chest" muscle group
    secondaryMuscleGroupIds: ["5", "6"], // Assuming 5 is "Shoulders" and 6 is "Triceps"
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
>>>>>>> dev
  },
  {
    id: "3",
    name: "Deadlift",
    description:
<<<<<<< HEAD
      "A compound exercise that targets multiple muscle groups, primarily the back and legs.",
    gifUrl: "https://example.com/deadlift.gif",
    createdById: "admin",
    isApproved: true,
    categoryId: "back",
    primaryMuscleGroupId: MUSCLE_GROUP_IDS.BACK,
    secondaryMuscleGroupIds: [MUSCLE_GROUP_IDS.LEGS, MUSCLE_GROUP_IDS.ARMS],
    createdAt: new Date(),
    updatedAt: new Date(),
=======
      "A compound exercise that targets multiple muscle groups including the back, glutes, and hamstrings.",
    gifUrl: "/exercises/deadlift.gif",
    createdById: "trainer1",
    isApproved: true,
    categoryId: "1", // Strength
    primaryMuscleGroupId: ["7"], // Assuming 7 is the ID for "Back" muscle group
    secondaryMuscleGroupIds: ["3", "2"], // Glutes and Hamstrings
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-02-01"),
  },
  {
    id: "4",
    name: "Plank",
    description:
      "An isometric core exercise that also engages the shoulders and back.",
    gifUrl: "/exercises/plank.gif",
    createdById: "user3",
    isApproved: true,
    categoryId: "3", // Assuming 3 is the ID for "Core" category
    primaryMuscleGroupId: ["8"], // Assuming 8 is the ID for "Core" muscle group
    secondaryMuscleGroupIds: ["5", "7"], // Shoulders and Back
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    id: "5",
    name: "Dumbbell Bicep Curl",
    description: "An isolation exercise that targets the biceps.",
    gifUrl: "/exercises/bicep-curl.gif",
    createdById: "trainer2",
    isApproved: true,
    categoryId: "1", // Strength
    primaryMuscleGroupId: ["9"], // Assuming 9 is the ID for "Biceps" muscle group
    secondaryMuscleGroupIds: [],
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-01"),
>>>>>>> dev
  },
];
