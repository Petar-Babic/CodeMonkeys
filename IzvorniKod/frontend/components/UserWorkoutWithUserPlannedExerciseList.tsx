import React from "react";
import { UserWorkoutWithUserPlannedExercise } from "@/types/userWorkout";
import UserWorkoutWithUserPlannedExerciseCard from "./UserWorkoutWithUserPlannedExerciseCard";

export default function UserWorkoutWithUserPlannedExerciseList({
  workouts,
}: {
  workouts: UserWorkoutWithUserPlannedExercise[];
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
