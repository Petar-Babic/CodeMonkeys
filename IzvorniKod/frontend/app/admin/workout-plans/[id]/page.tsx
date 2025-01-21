import React from "react";
import { workoutPlans } from "@/data/workoutPlan";
import { workoutsWithExercises } from "@/data/workout";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import Image from "next/image";
import WorkoutsFromPublicWorkoutPlan from "@/components/WorkoutsFromPublicWorkoutPlan";

const getWorkoutPlanWithWorkoutsAPI = async (
  id: number
): Promise<WorkoutPlanWithWorkouts | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("getWorkoutPlanWithWorkoutsAPI id", id);

  console.log("workoutPlans", workoutPlans);

  // Find the workout plan
  const workoutPlan = workoutPlans.find((plan) => plan.id === id);

  console.log("getWorkoutPlanWithWorkoutsAPI workoutPlan", workoutPlan);

  // Find the workouts for the workout plan
  const workoutPlanWorkouts = workoutsWithExercises.filter(
    (workout) => workout.workoutPlanId === id
  );

  console.log("workoutPlanWorkouts", workoutPlanWorkouts);

  if (!workoutPlan) {
    return undefined;
  }

  return {
    ...workoutPlan,
    workouts: workoutPlanWorkouts,
  };
};

export default async function WorkoutPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const workoutPlan = await getWorkoutPlanWithWorkoutsAPI(id);

  console.log("workoutPlan", workoutPlan);

  if (!workoutPlan) {
    return <div>Workout plan not found</div>;
  }

  return (
    <div className="w-full pb-20 bg-white h-full flex-col flex  relative max-xl:pt-14">
      {workoutPlan?.image && (
        <div className="w-full h-[25rem] xl:h-[30rem] relative bg-black  border   overflow-hidden block">
          <Image
            src={`/api/upload/${workoutPlan.image}`}
            alt={workoutPlan.name}
            priority
            quality={85}
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-[2rem] flex-col left-[2rem] text-white">
            <h1 className="text-white text-2xl xl:text-[4rem] xl:leading-[1.4] font-black line-clamp-1">
              {workoutPlan.name}
            </h1>
            <p className="text-white text-sm xl:text-lg line-clamp-2">
              {workoutPlan.description}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4 space-4  relative  flex-wrap overflow-hidden space-x-3">
        {workoutPlan.workouts.map((workout) => (
          <div
            key={workout.id}
            className="p-4 flex-col rounded-md shadow-lg max-w-[30rem] flex-grow flex space-y-2 xl:p-6 2xl:p-8"
          >
            <h2 className="text-lg font-bold">{workout.name}</h2>
            <p className="text-sm text-gray-600">{workout.description}</p>
            <h6 className="text-xs text-gray-600">Exercises:</h6>
            <ul className="list-disc ml-4 mt-1">
              <WorkoutsFromPublicWorkoutPlan workouts={workoutPlan.workouts} />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
