import React from "react";
import { muscleGroups } from "@/data/muscleGroup";
import { MuscleGroupBase } from "@/types/muscleGroup";
import Image from "next/image";

const getMuscleGroupAPI = async (
  id: number
): Promise<MuscleGroupBase | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return muscleGroups.find((group) => group.id === id);
};

export default async function MuscleGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const muscleGroup = await getMuscleGroupAPI(id);

  if (!muscleGroup) {
    return <div>Mišićna grupa nije pronađena</div>;
  }

  return (
    <div className="w-full pb-20 bg-white h-full flex-col flex relative max-xl:pt-14">
      <div className="w-full flex px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4">
        <div className="p-4 flex-col rounded-md shadow-lg max-w-[30rem] flex-grow flex space-y-4 xl:p-6 2xl:p-8">
          <div className="relative w-full h-48">
            {muscleGroup.image && (
              <Image
                src={muscleGroup.image}
                alt={muscleGroup.name}
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{muscleGroup.name}</h2>
            <p className="text-gray-600">{muscleGroup.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
