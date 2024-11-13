import { WorkoutBase } from "@/types/workout";
import { WorkoutWithPlannedExercises } from "@/types/workout";
import { exercises } from "./exercise";

export const workouts: WorkoutBase[] = [
  {
    id: "1",
    name: "Full Body Workout A",
    description:
      "A comprehensive full body workout focusing on major muscle groups.",
    workoutPlanId: "1", // Corresponds to "Beginner Full Body Workout" plan
    order: 1,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Full Body Workout B",
    description: "An alternate full body workout with different exercises.",
    workoutPlanId: "1", // Corresponds to "Beginner Full Body Workout" plan
    order: 2,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    name: "Upper Body Push",
    description: "Focus on pushing movements for the upper body.",
    workoutPlanId: "2", // Corresponds to "Advanced Upper Body Split" plan
    order: 1,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    id: "4",
    name: "HIIT Cardio",
    description: "High-intensity interval training for cardiovascular fitness.",
    workoutPlanId: "3", // Corresponds to "Cardio and Core Blast" plan
    order: 1,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10"),
  },
  {
    id: "5",
    name: "Leg Hypertrophy",
    description: "Intense leg workout focused on muscle growth.",
    workoutPlanId: "4", // Corresponds to "Leg Day Destroyer" plan
    order: 1,
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05"),
  },
];

export const workoutsWithExercises: WorkoutWithPlannedExercises[] = [
  {
    id: "1",
    name: "Full Body Workout A",
    description:
      "A comprehensive full body workout focusing on major muscle groups.",
    workoutPlanId: "1", // Corresponds to "Beginner Full Body Workout" plan
    order: 1,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
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
    name: "Full Body Workout B",
    description: "An alternate full body workout with different exercises.",
    workoutPlanId: "1", // Corresponds to "Beginner Full Body Workout" plan
    order: 2,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
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
    id: "3",
    name: "Upper Body Push",
    description: "Focus on pushing movements for the upper body.",
    workoutPlanId: "2", // Corresponds to "Advanced Upper Body Split" plan
    order: 1,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
    exercises: [
      {
        id: "5",
        sets: 4,
        reps: 8,
        rpe: 8,
        order: 1,
        userWorkoutId: "2", // Add userWorkoutId
        createdAt: new Date("2023-02-15"),
        updatedAt: new Date("2023-02-15"),
        exercise: exercises[4],
        exerciseId: exercises[4].id, // Add exerciseId
      },
    ],
  },
];
