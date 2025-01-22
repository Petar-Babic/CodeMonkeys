import React from "react";
import { exercises } from "@/data/exercise";
import { ExerciseBase } from "@/types/exercise";
import { AdminExerciseForm } from "@/components/AdminExerciseForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { backendUrl } from "@/data/backendUrl";

const getExerciseAPI = async (
  id: number
): Promise<ExerciseBase | undefined> => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${backendUrl}/api/exercises/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  console.log("data exercise", data);
  return data;
};

export default async function AdminEditExercisePage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;

  const exercise = await getExerciseAPI(id);

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminExerciseForm exercise={exercise ?? null} />
    </div>
  );
}
