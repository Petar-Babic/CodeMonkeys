import PageTitle from "@/components/PageTitle";
import UserWorkoutPlanCard from "@/components/UserWorkoutPlanCard";
import WorkoutPlansList from "@/components/WorkouPlansList";
import React from "react";

export default function WorkoutPlansPage() {
  return (
    <div className="w-full bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <div className="flex-col w-full xl:w-1/3">
        <PageTitle title="your plan" />
        <UserWorkoutPlanCard />
      </div>
      <div className="flex-col w-full xl:w-2/3">
        <PageTitle title="workout plans" />
        <p className="text-sm mb-2 text-gray-500 px-4 xl:px-6 2xl:px-8">
          Here you can find all the workout plans that are available to you.
        </p>
        <WorkoutPlansList />
      </div>
    </div>
  );
}
