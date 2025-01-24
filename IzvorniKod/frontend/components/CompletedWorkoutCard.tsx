"use client";
import React from "react";
import { WorkoutSessionWithExercisesForPage } from "@/types/workoutSession";
const CompletedWorkoutsCard: React.FC<{
  workout: WorkoutSessionWithExercisesForPage;
}> = ({ workout }) => {
  return (
    <div className="w-full   flex flex-col relative p-3 shadow-md rounded-md">
      <h5 className="text-sm font-semibold mb-2">{workout.workout.name}</h5>

      {/* Prikazujemo datum završetka */}
      <p className="text-xs text-gray-700 mb-3">
        Completed on: {workout.date.toLocaleDateString()}
      </p>

      <ul>
        {workout.performedExercises.map((exercise) => (
          <li key={exercise.id} className="mb-2">
            <p className="text-xs font-medium text-gray-800">
              {
                workout.exercises.find((e) => e.id === exercise.exerciseId)
                  ?.name
              }
            </p>
            <ul className="pl-3">
              {exercise.performedSets.map((set, index) => (
                <li key={index} className="text-xs text-gray-800">
                  Set {index + 1}: {set.reps} reps - RP: {set.rpe}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedWorkoutsCard;
