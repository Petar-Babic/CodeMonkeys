"use client";

import { useAppContext } from "@/contexts/AppContext";
import React from "react";
import WorkoutPlanCard from "./WorkoutPlanCard";

export default function WorkoutPlansList() {
  const { workoutPlans } = useAppContext();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4">
      {workoutPlans.map((workoutPlan) => (
        <WorkoutPlanCard key={workoutPlan.id} workoutPlan={workoutPlan} />
      ))}
    </section>
  );
}
