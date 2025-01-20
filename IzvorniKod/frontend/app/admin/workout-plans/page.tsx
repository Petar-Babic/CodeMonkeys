// src/app/admin/workout-plans/page.tsx
import WorkoutPlansTable from "@/components/WorkoutPlansTable";
import React from "react";

export default function AdminWorkoutPlansPage() {
  return (
    <div className="w-full bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <WorkoutPlansTable />
    </div>
  );
}
