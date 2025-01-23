"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WorkoutNowExerciseCard from "@/components/WorkoutNowExerciseCard";
import ExerciseInProgress from "@/components/ExerciseInProgress";
import { useAppContext } from "@/contexts/AppContext";

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

export default function WorkoutNowPage() {
  const router = useRouter();
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<{
    [key: number]: number[];
  }>({});
  const pathname = usePathname();

  const workoutId = pathname.split("/")[2];

  console.log(pathname);
  console.log(workoutId);

  const { userWorkoutPlan } = useAppContext();

  const selectedWorkout = userWorkoutPlan?.workouts.find(
    (workout) => workout.id === parseInt(workoutId)
  );

  console.log(selectedWorkout);

  if (!selectedWorkout) {
    return <div>Workout not found</div>;
  }

  const handleComplete = (sets: { weight: number; rpe: number }[]) => {
    if (activeExercise) {
      setCompletedExercises({
        ...completedExercises,
        [activeExercise.id]: sets.map((set) => set.rpe),
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
      router.push("/workouts");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {activeExercise ? (
        <ExerciseInProgress
          exercise={activeExercise}
          onComplete={handleComplete}
        />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{selectedWorkout.name}</h2>
          <div className="w-full max-w-md space-y-4">
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
