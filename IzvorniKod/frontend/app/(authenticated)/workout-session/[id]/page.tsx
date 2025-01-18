import React from "react";
import { workoutSessions } from "@/data/workoutSession";
import {
  WorkoutSessionWithExercisesForPage,
  WorkoutSessionWithPerformedExercises,
} from "@/types/workoutSession";
import { exercises } from "@/data/exercise";
import { workoutsWithExercises } from "@/data/workout";

const getWorkoutSessionAPI = async (
  id: string
): Promise<WorkoutSessionWithExercisesForPage | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const workoutSession = workoutSessions.find((session) => session.id === id);

  if (!workoutSession) {
    return undefined;
  }

  const allExercisesIds = workoutSession.performedExercises.map(
    (exercise) => exercise.exerciseId
  );

  const allExercises = exercises.filter((exercise) =>
    allExercisesIds.includes(exercise.id)
  );

  const workout = workoutsWithExercises.find(
    (workout) => workout.id === workoutSession.workoutId
  );

  return { ...workoutSession, exercises: allExercises, workout };
};

export default async function WorkoutSessionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const workoutSession = await getWorkoutSessionAPI(id);
  console.log("workoutSession", JSON.stringify(workoutSession, null, 5));

  if (!workoutSession) {
    return <div>Workout session not found</div>;
  }

  return <div>page</div>;
}
