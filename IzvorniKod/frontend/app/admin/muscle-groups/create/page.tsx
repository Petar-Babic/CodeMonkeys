import { AdminMuscleGroupForm } from "@/components/AdminMuscleGroupForm";
import React from "react";

export default function AdminCreateMuscleGroupPage() {
  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminMuscleGroupForm muscleGroup={null} />
    </div>
  );
}
