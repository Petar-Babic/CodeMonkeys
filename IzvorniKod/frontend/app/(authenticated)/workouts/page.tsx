import React from "react";
import { UserWorkoutWithUserPlannedExercise } from "@/types/userWorkout";
import UserWorkoutWithUserPlannedExerciseCard from "@/components/UserWorkoutWithUserPlannedExerciseCard"; // Ensure the import path is correct
import CompletedWorkoutsCard from "@/components/CompletedWorkoutCard"; // Prikazuje workout zavrsen u proslosti

export default function WorkoutPage() {
  // Mock workouts data
  const mockWorkouts: UserWorkoutWithUserPlannedExercise[] = [
    {
      id: "1",
      name: "Full Body Workout",
      order: 1,
      createdAt: new Date("2024-11-10T00:00:00Z"),
      updatedAt: new Date("2024-11-10T00:00:00Z"),
      exercises: [
        {
          id: "1",
          userWorkoutId: "1",
          exerciseId: "101",
          exercise: {
            id: "101",
            name: "Push-up",
            description: "A basic push-up exercise.",
            gifUrl: "https://example.com/pushup.gif",
            createdById: "user1",
            isApproved: true,
            categoryId: "strength",
            primaryMuscleGroupId: ["chest"],
            secondaryMuscleGroupIds: ["triceps", "shoulders"],
            createdAt: new Date("2024-11-10T00:00:00Z"),
            updatedAt: new Date("2024-11-10T00:00:00Z"),
          },
          sets: 3,
          reps: 12,
          order: 1,
          createdAt: new Date("2024-11-10T00:00:00Z"),
          updatedAt: new Date("2024-11-10T00:00:00Z"),
        },
        {
          id: "2",
          userWorkoutId: "1",
          exerciseId: "102",
          exercise: {
            id: "102",
            name: "Squat",
            description: "A basic squat exercise.",
            gifUrl: "https://example.com/squat.gif",
            createdById: "user2",
            isApproved: true,
            categoryId: "strength",
            primaryMuscleGroupId: ["legs"],
            secondaryMuscleGroupIds: ["glutes", "core"],
            createdAt: new Date("2024-11-10T00:00:00Z"),
            updatedAt: new Date("2024-11-10T00:00:00Z"),
          },
          sets: 3,
          reps: 15,
          order: 2,
          createdAt: new Date("2024-11-10T00:00:00Z"),
          updatedAt: new Date("2024-11-10T00:00:00Z"),
        },
      ],
    },
    // Additional mock workouts can be added here if needed...
  ];

  // Mock data for completed workouts (this can be replaced by actual data)
  const completedWorkouts = [
    {
      id: "1",
      name: "Full Body Workout",
      completedAt: new Date("2024-11-05T00:00:00Z"),
      exercises: [
        {
          id: "1",
          name: "Push-up",
          sets: [
            { reps: 12, RP: 9 },
            { reps: 12, RP: 8 },
            { reps: 12, RP: 7 },
          ],
        },
        {
          id: "2",
          name: "Squat",
          sets: [
            { reps: 15, RP: 8 },
            { reps: 15, RP: 7 },
            { reps: 15, RP: 6 },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Upper Body Workout",
      completedAt: new Date("2024-11-03T00:00:00Z"),
      exercises: [
        {
          id: "1",
          name: "Push-up",
          sets: [
            { reps: 10, RP: 8 },
            { reps: 10, RP: 7 },
            { reps: 10, RP: 6 },
            { reps: 10, RP: 5 },
          ],
        },
        {
          id: "2",
          name: "Pull-up",
          sets: [
            { reps: 8, RP: 9 },
            { reps: 8, RP: 8 },
            { reps: 8, RP: 7 },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start relative">
      <h1 className="text-4xl font-bold text-white mt-16 text-center">
        Choose today&apos;s workout
      </h1>

      {/* Workouts List */}
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6 px-4 mt-8">
        {mockWorkouts.map((workout) => (
          <UserWorkoutWithUserPlannedExerciseCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>

      {/* Completed Workouts Section */}
      <h2 className="text-4xl text-gray-800 mt-12 text-center">
        Completed Workouts
      </h2>
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6 px-4 mt-6">
        {completedWorkouts.map((workout) => (
          <CompletedWorkoutsCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
