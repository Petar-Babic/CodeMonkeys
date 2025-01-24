import { AdminWorkoutPlanForm } from "@/components/AdminWorkoutPlanForm";
import React from "react";

export default function AdminCreateWorkoutPlanPage() {
  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminWorkoutPlanForm workoutPlan={null} />
    </div>
  );
}
