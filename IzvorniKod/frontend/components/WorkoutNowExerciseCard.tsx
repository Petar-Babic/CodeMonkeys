"use client";

import React from "react";

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

export default function WorkoutNowExerciseCard({
  exercise,
}: {
  exercise: Exercise;
}) {
  return (
    <div className="w-full bg-white p-4 shadow-md rounded-md mb-4">
      <h5 className="text-lg font-semibold mb-2">{exercise.name}</h5>
      <p className="text-sm text-gray-500">
        {exercise.sets} sets - {exercise.reps} reps
      </p>
    </div>
  );
}
