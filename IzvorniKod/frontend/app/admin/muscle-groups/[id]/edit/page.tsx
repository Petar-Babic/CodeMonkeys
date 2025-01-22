import React from "react";
import { AdminMuscleGroupForm } from "@/components/AdminMuscleGroupForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { backendUrl } from "@/data/backendUrl";
import { MuscleGroupBase } from "@/types/muscleGroup";

const getMuscleGroupAPI = async (
  id: number
): Promise<MuscleGroupBase | undefined> => {
  let muscleGroup: MuscleGroupBase | undefined;

  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${backendUrl}/api/muscle-groups/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    muscleGroup = await res.json();
  } catch (error) {
    console.error("Error fetching muscle group:", error);
  }

  return muscleGroup;
};

export default async function AdminEditMuscleGroupPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  const muscleGroup = await getMuscleGroupAPI(id);

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminMuscleGroupForm muscleGroup={muscleGroup ?? null} />
    </div>
  );
}
