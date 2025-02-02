import { AdminExerciseForm } from "@/components/AdminExerciseForm";
import React from "react";

export default function AdminCreateExercisePage() {
  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminExerciseForm exercise={null} />
    </div>
  );
}
