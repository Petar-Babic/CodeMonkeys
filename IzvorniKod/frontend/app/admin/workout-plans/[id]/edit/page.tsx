import React from "react";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { AdminWorkoutPlanForm } from "@/components/AdminWorkoutPlanForm";
import { backendUrl } from "@/data/backendUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const getWorkoutPlanWithWorkoutsAPI = async (
  id: number
): Promise<WorkoutPlanWithWorkouts | undefined> => {
  let workoutPlan: WorkoutPlanWithWorkouts | undefined;

  const session = await getServerSession(authOptions);

  console.log("session", session);

  try {
    const res = await fetch(`${backendUrl}/api/workout-plans/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    workoutPlan = await res.json();
  } catch (error) {
    console.error("Error fetching workout plan:", error);
  }

  return workoutPlan;
};

export default async function AdminEditWorkoutPlanPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;

  const workoutPlan = await getWorkoutPlanWithWorkoutsAPI(id);

  console.log("workoutPlan", JSON.stringify(workoutPlan, null, 4));

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminWorkoutPlanForm workoutPlan={workoutPlan ?? null} />
    </div>
  );
}
