import React from "react";
import { workoutPlans } from "@/data/workoutPlan";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { AdminWorkoutPlanForm } from "@/components/AdminWorkoutPlanForm";
import { workoutsWithExercises } from "@/data/workout";
const getWorkoutPlanWithWorkoutsAPI = async (
  id: number
): Promise<WorkoutPlanWithWorkouts | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("getWorkoutPlanWithWorkoutsAPI id", id);

  console.log("workoutPlans", workoutPlans);

  // Find the workout plan
  const workoutPlan = workoutPlans.find((plan) => plan.id === id);

  if (!workoutPlan) {
    return undefined;
  }

  const workoutPlanWorkouts = workoutsWithExercises.filter(
    (workout) => workout.workoutPlanId === id
  );

  return {
    ...workoutPlan,
    workouts: workoutPlanWorkouts,
  };
};

export default async function AdminEditWorkoutPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const workoutPlan = await getWorkoutPlanWithWorkoutsAPI(id);

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminWorkoutPlanForm workoutPlan={workoutPlan ?? null} />
    </div>
  );
}
