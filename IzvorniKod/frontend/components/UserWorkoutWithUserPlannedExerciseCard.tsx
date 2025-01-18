import { WorkoutWithPlannedExercise } from "@/types/workout";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Dumbbell } from "lucide-react";

export default function UserWorkoutWithUserPlannedExerciseCard({
  workout,
}: {
  workout: WorkoutWithPlannedExercise;
}) {
  console.log(workout);

  return (
    <Link
      href={`/workout-now`}
      className="w-full bg-white flex flex-col relative p-3 shadow-md rounded-md"
    >
      <h5 className="text-sm font-semibold mb-2">{workout.name} </h5>{" "}
      <ul>
        {workout.exercises.map((exercise) => (
          <li key={exercise.id}>
            <p className="text-xs mt-1 text-gray-500">
              {exercise.exercise?.name} - {exercise?.sets} sets -{" "}
              {exercise?.reps} reps
            </p>
          </li>
        ))}
      </ul>
      <Button className="mt-2 bg-gray-800">
        <span>Start workout</span>
        <Dumbbell className="w-6 h-6 ml-2" />
      </Button>
    </Link>
  );
}
