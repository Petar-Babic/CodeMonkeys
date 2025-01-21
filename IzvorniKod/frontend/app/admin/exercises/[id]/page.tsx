import React from "react";
import { ExerciseBase } from "@/types/exercise";
import Image from "next/image";
import { backendUrl } from "@/data/backendUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const getExerciseAPI = async (
  id: number
): Promise<ExerciseBase | undefined> => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No token found");
  }

  console.log(token);

  try {
    const response = await fetch(`${backendUrl}/exercise/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch exercise");
  }
};

export default async function ExercisePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  let exercise: ExerciseBase | undefined;
  try {
    exercise = await getExerciseAPI(id);
  } catch (error) {
    console.error(error);
    return <div>Greška pri dohvaćanju vježbe</div>;
  }

  if (!exercise) {
    return <div>Vježba nije pronađena</div>;
  }

  return (
    <div className="w-full pb-20 bg-white h-full flex-col flex relative max-xl:pt-14">
      <div className="w-full flex px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4">
        <div className="p-4 flex-col rounded-md shadow-lg max-w-[30rem] flex-grow flex space-y-4 xl:p-6 2xl:p-8">
          {exercise.gif && (
            <div className="relative w-full h-48">
              <Image
                src={exercise.gif}
                alt={exercise.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <p className="text-gray-600">{exercise.description}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  exercise.isApproved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {exercise.isApproved ? "Odobreno" : "Na čekanju"}
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Primarne mišićne grupe:</h3>
              <div className="flex flex-wrap gap-2">
                {exercise.primaryMuscleGroupsIds.map((id) => (
                  <span
                    key={id}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
            {exercise.secondaryMuscleGroupsIds.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Sekundarne mišićne grupe:</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscleGroupsIds.map((id) => (
                    <span
                      key={id}
                      className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
