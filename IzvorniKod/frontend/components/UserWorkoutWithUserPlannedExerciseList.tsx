"use client";
import React from "react";
import { WorkoutWithPlannedExercise } from "@/types/workout";
import UserWorkoutWithUserPlannedExerciseCard from "./UserWorkoutWithUserPlannedExerciseCard";

export default function UserWorkoutWithUserPlannedExerciseList({
  workouts,
}: {
  workouts: WorkoutWithPlannedExercise[];
}) {
  return (
    <div className="w-full flex-col space-y-3 flex">
      {workouts.map((workout) => (
        <UserWorkoutWithUserPlannedExerciseCard
          key={workout.id + "UserWorkoutWithUserPlannedExerciseCard"}
          workout={workout}
        />
      ))}
    </div>
  );
}
