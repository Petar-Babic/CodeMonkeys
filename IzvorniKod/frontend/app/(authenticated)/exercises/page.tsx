"use client";

import React, { useState, useEffect } from "react";
import { muscleGroups as predefinedMuscleGroups } from "@/data/muscleGroup";
import ExerciseCategory from "@/components/ExerciseMuscleGroups";
import PageTitle from "@/components/PageTitle";
import { MuscleGroupBase } from "@/types/muscleGroup";

const simulateFetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(predefinedMuscleGroups);
    }, 200);
  });
};

export default function ExercisesPage() {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupBase[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await simulateFetchData()) as MuscleGroupBase[];
      setMuscleGroups(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <PageTitle title="exercise categories" />
      <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {muscleGroups.map((group) => (
          <ExerciseCategory
            key={group.id}
            id={group.id}
            name={group.name}
            image={group.image}
          />
        ))}
      </ul>
    </div>
  );
}
