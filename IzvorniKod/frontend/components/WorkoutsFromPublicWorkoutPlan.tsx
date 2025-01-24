"use client";
import { useAppContext } from "@/contexts/AppContext";
import { ExerciseBase } from "@/types/exercise";
import { WorkoutWithPlannedExercisesBase } from "@/types/workout";
import React from "react";

export default function WorkoutsFromPublicWorkoutPlan({
  workouts,
}: {
  workouts: WorkoutWithPlannedExercisesBase[];
}) {
  const { exercises } = useAppContext();

  console.log("exercises in WorkoutsFromPublicWorkoutPlan", exercises);

  const getExerciseName = (exerciseId: number) => {
    console.log(exerciseId);
    return (
      exercises.find((e: ExerciseBase) => e.id === exerciseId)?.name ||
      "Vježba nije pronađena"
    );
  };

  return (
    <>
      {workouts.map((workout) => (
        <li className="text-xs" key={workout.id}>
          {workout.exercises.map((exercise) => (
            <li className="text-xs" key={exercise.id}>
              {getExerciseName(exercise.exerciseId)} - {exercise.sets} x{" "}
              {exercise.reps} - {"RPE: " + exercise.rpe}
            </li>
          ))}
        </li>
      ))}
    </>
  );
}
