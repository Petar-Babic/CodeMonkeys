import { UserWorkoutPlanForm } from "@/components/UserWorkoutPlanForm";
import React from "react";

export default function UserWorkoutPlanPage() {
  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <UserWorkoutPlanForm />
    </div>
  );
}
