"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importiramo useRouter
import WorkoutNowExerciseCard from "@/components/WorkoutNowExerciseCard";
import ExerciseInProgress from "@/components/ExerciseInProgress";

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

const selectedWorkout = {
  id: 1,
  name: "Full Body Workout",
  exercises: [
    { id: 1, name: "Push-up", sets: 3, reps: 12 },
    { id: 2, name: "Squat", sets: 3, reps: 15 },
  ],
};

export default function WorkoutNowPage() {
  const router = useRouter(); // Koristimo router za navigaciju
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<{
    [key: number]: number[];
  }>({});

  const handleComplete = (rpes: number[]) => {
    if (activeExercise) {
      setCompletedExercises({
        ...completedExercises,
        [activeExercise.id]: rpes,
      });
    }
    setActiveExercise(null);
  };

  const handleFinishWorkout = () => {
    const confirmFinish = window.confirm(
      "Are you sure you want to finish the workout early?"
    );
    if (confirmFinish) {
      console.log("Workout completed!", completedExercises);
      alert("Workout finished! Returning to workouts page.");
      // Navigiraj na "Workout" stranicu
      router.push("/workouts");
    }
  };

  return (
    <div className="p-4">
      {activeExercise ? (
        <ExerciseInProgress
          exercise={activeExercise}
          onComplete={handleComplete}
        />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{selectedWorkout.name}</h2>
          <div className="space-y-4">
            {selectedWorkout.exercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => setActiveExercise(exercise)}
                className="cursor-pointer"
              >
                <WorkoutNowExerciseCard exercise={exercise} />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={handleFinishWorkout}
              className="w-full py-2 px-4 bg-black text-white rounded-md"
            >
              Finish Workout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
