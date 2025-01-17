import { ExerciseBase } from "@/types/exercise";

export const exercises: ExerciseBase[] = [
  {
    id: "1",
    name: "Barbell Squat",
    description:
      "A compound lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    gif: "/exercises/barbell-squat.gif",
    createdById: "user1",
    isApproved: true,
    primaryMuscleGroupsIds: ["1"], // Assuming 1 is the ID for "Quadriceps" muscle group
    secondaryMuscleGroupsIds: ["2", "3"], // Assuming 2 is "Hamstrings" and 3 is "Glutes"
  },
  {
    id: "2",
    name: "Push-up",
    description:
      "A bodyweight exercise that primarily targets the chest, shoulders, and triceps.",
    gif: "/exercises/push-up.gif",
    createdById: "user2",
    isApproved: true,
    primaryMuscleGroupsIds: ["4"], // Assuming 4 is the ID for "Chest" muscle group
    secondaryMuscleGroupsIds: ["5", "6"], // Assuming 5 is "Shoulders" and 6 is "Triceps"
  },
  {
    id: "3",
    name: "Deadlift",
    description:
      "A compound exercise that targets multiple muscle groups including the back, glutes, and hamstrings.",
    gif: "/exercises/deadlift.gif",
    createdById: "trainer1",
    isApproved: true,
    primaryMuscleGroupsIds: ["7"], // Assuming 7 is the ID for "Back" muscle group
    secondaryMuscleGroupsIds: ["3", "2"], // Glutes and Hamstrings
  },
  {
    id: "4",
    name: "Plank",
    description:
      "An isometric core exercise that also engages the shoulders and back.",
    gif: "/exercises/plank.gif",
    createdById: "user3",
    isApproved: true,
    primaryMuscleGroupsIds: ["8"], // Assuming 8 is the ID for "Core" muscle group
    secondaryMuscleGroupsIds: ["5", "7"], // Shoulders and Back
  },
  {
    id: "5",
    name: "Dumbbell Bicep Curl",
    description: "An isolation exercise that targets the biceps.",
    gif: "/exercises/bicep-curl.gif",
    createdById: "trainer2",
    isApproved: true,
    primaryMuscleGroupsIds: ["9"], // Assuming 9 is the ID for "Biceps" muscle group
    secondaryMuscleGroupsIds: [],
  },
];
