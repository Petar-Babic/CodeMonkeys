import { UserWorkoutWithUserPlannedExercise } from "@/types/userWorkout";
import { exercises } from "./exercise";

export const userWorkouts: UserWorkoutWithUserPlannedExercise[] = [
  {
    id: "1",
    name: "Beginner Full Body Workout - Day 2",
    userWorkoutPlanId: "1",
    workoutId: "1", // Assuming this corresponds to a workout in the "Beginner Full Body Workout" plan
    order: 1,
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
    exercises: [
      {
        id: "1",
        sets: 3,
        reps: 10,
        rpe: 7,
        order: 1,
        userWorkoutId: "1", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[1],
        exerciseId: exercises[1].id, // Add exerciseId
      },
      {
        id: "2",
        sets: 4,
        reps: 8,
        rpe: 7,
        order: 2, // Add order
        userWorkoutId: "1", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[2],
        exerciseId: exercises[2].id, // Add exerciseId
      },
      {
        id: "3",
        sets: 4,
        reps: 10,
        rpe: 10,
        order: 3, // Add order
        userWorkoutId: "1", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[3],
        exerciseId: exercises[3].id, // Add exerciseId
      },
      {
        id: "4",
        sets: 3,
        reps: 10, // Add reps
        order: 4, // Add order
        userWorkoutId: "1", // Add userWorkoutId
        exerciseId: exercises[4].id, // Add exerciseId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[4],
      },
    ],
  },
  {
    id: "2",
    name: "Beginner Full Body Workout - Day 2",
    userWorkoutPlanId: "1",
    workoutId: undefined, // No specific workout associated
    order: 2,
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
    exercises: [
      {
        id: "5",
        sets: 3,
        reps: 10,
        rpe: 7,
        order: 1,
        userWorkoutId: "2", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[1],
        exerciseId: exercises[1].id, // Add exerciseId
      },
      {
        id: "6",
        sets: 4,
        reps: 8,
        rpe: 7,
        order: 2, // Add order
        userWorkoutId: "2", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[2],
        exerciseId: exercises[2].id, // Add exerciseId
      },
      {
        id: "7",
        sets: 4,
        reps: 10,
        rpe: 10,
        order: 3, // Add order
        userWorkoutId: "2", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[3],
        exerciseId: exercises[3].id, // Add exerciseId
      },
      {
        id: "8",
        sets: 3,
        reps: 10, // Add reps
        order: 4, // Add order
        userWorkoutId: "2", // Add userWorkoutId
        exerciseId: exercises[4].id, // Add exerciseId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[4],
      },
    ],
  },
  {
    id: "3",
    name: "Beginner Full Body Workout - Day 2",
    userWorkoutPlanId: "1",
    workoutId: undefined, // No specific workout associated
    order: 3,
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
    exercises: [
      {
        id: "9",
        sets: 3,
        reps: 10,
        rpe: 7,
        order: 1,
        userWorkoutId: "3", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[1],
        exerciseId: exercises[1].id, // Add exerciseId
      },
      {
        id: "10",
        sets: 4,
        reps: 8,
        rpe: 7,
        order: 2, // Add order
        userWorkoutId: "3", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[2],
        exerciseId: exercises[2].id, // Add exerciseId
      },
      {
        id: "11",
        sets: 4,
        reps: 10,
        rpe: 10,
        order: 3, // Add order
        userWorkoutId: "3", // Add userWorkoutId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[3],
        exerciseId: exercises[3].id, // Add exerciseId
      },
      {
        id: "12",
        sets: 3,
        reps: 10, // Add reps
        order: 4, // Add order
        userWorkoutId: "3", // Add userWorkoutId
        exerciseId: exercises[4].id, // Add exerciseId
        createdAt: new Date("2023-01-06"),
        updatedAt: new Date("2023-01-06"),
        exercise: exercises[4],
      },
    ],
  },
];
