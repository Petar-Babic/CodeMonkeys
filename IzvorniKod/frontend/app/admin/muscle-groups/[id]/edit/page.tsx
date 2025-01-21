import React from "react";
import { muscleGroups } from "@/data/muscleGroup";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { AdminMuscleGroupForm } from "@/components/AdminMuscleGroupForm";

const getMuscleGroupAPI = async (
  id: number
): Promise<MuscleGroupBase | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the muscle group
  return muscleGroups.find((group) => group.id === id);
};

export default async function AdminEditMuscleGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const muscleGroup = await getMuscleGroupAPI(id);

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminMuscleGroupForm muscleGroup={muscleGroup ?? null} />
    </div>
  );
}
