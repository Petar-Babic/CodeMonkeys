import { ExerciseBase } from "@/types/exercise";

export const exercises: ExerciseBase[] = [
  {
    id: 1,
    name: "Barbell Squat",
    description:
      "A compound lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    gif: "/exercises/barbell-squat.gif",
    createdById: 1,
    isApproved: true,
    primaryMuscleGroupsIds: [1],
    secondaryMuscleGroupsIds: [2, 3],
  },
  {
    id: 2,
    name: "Push-up",
    description:
      "A bodyweight exercise that primarily targets the chest, shoulders, and triceps.",
    gif: "/exercises/push-up.gif",
    createdById: 2,
    isApproved: true,
    primaryMuscleGroupsIds: [4],
    secondaryMuscleGroupsIds: [5, 6],
  },
  {
    id: 3,
    name: "Deadlift",
    description:
      "A compound exercise that targets multiple muscle groups including the back, glutes, and hamstrings.",
    gif: "/exercises/deadlift.gif",
    createdById: 1,
    isApproved: true,
    primaryMuscleGroupsIds: [7],
    secondaryMuscleGroupsIds: [3, 2],
  },
  {
    id: 4,
    name: "Plank",
    description:
      "An isometric core exercise that also engages the shoulders and back.",
    gif: "/exercises/plank.gif",
    createdById: 3,
    isApproved: true,
    primaryMuscleGroupsIds: [8],
    secondaryMuscleGroupsIds: [5, 7],
  },
  {
    id: 5,
    name: "Dumbbell Bicep Curl",
    description: "An isolation exercise that targets the biceps.",
    gif: "/exercises/bicep-curl.gif",
    createdById: 2,
    isApproved: true,
    primaryMuscleGroupsIds: [9],
    secondaryMuscleGroupsIds: [],
  },
];
