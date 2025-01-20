import React from "react";
import UserWorkoutWithUserPlannedExerciseCard from "@/components/UserWorkoutWithUserPlannedExerciseCard"; // Ensure the import path is correct
import CompletedWorkoutsCard from "@/components/CompletedWorkoutCard"; // Prikazuje workout zavrsen u proslosti
import { workoutsWithExercises as mockWorkouts } from "@/data/workout";
import { workoutSessionsWithExercises } from "@/data/workoutSession";
export default function WorkoutPage() {
  // Mock workouts data

  return (
    <div className="w-full bg-white h-full flex-col items-center pb-10 flex xl:flex-row relative max-xl:pt-14">
      <h1 className="text-4xl font-bold text-white mt-16 text-center">
        Choose today&apos;s workout
      </h1>

      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6 px-4 mt-8">
        {mockWorkouts.map((workout) => (
          <UserWorkoutWithUserPlannedExerciseCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>

      <h2 className="text-4xl text-gray-800 mt-12 text-center">
        Completed Workouts
      </h2>
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6 px-4 mt-6">
        {workoutSessionsWithExercises.map((workout) => (
          <CompletedWorkoutsCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
