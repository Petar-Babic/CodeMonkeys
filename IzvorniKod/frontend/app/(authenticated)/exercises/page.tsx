"use client";

import React from "react";
import ExerciseCategory from "@/components/ExerciseMuscleGroups";
import PageTitle from "@/components/PageTitle";
import { useAppContext } from "@/contexts/AppContext";

export default function ExercisesPage() {
  const { muscleGroups } = useAppContext();

  return (
    <div className="p-4">
      <PageTitle title="exercise categories" />
      <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {muscleGroups.map((group) => (
          <ExerciseCategory
            key={group.id}
            id={group.id}
            name={group.name}
            image={`/api/upload/${group.image}`}
          />
        ))}
      </ul>
    </div>
  );
}
