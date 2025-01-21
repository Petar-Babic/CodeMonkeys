import React from "react";
import { exercises } from "@/data/exercise";
import { ExerciseBase } from "@/types/exercise";
import { AdminExerciseForm } from "@/components/AdminExerciseForm";

const getExerciseAPI = async (
  id: number
): Promise<ExerciseBase | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the exercise
  return exercises.find((exercise) => exercise.id === id);
};

export default async function AdminEditExercisePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const exercise = await getExerciseAPI(id);

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminExerciseForm exercise={exercise ?? null} />
    </div>
  );
}
