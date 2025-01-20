/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { muscleGroups } from "@/data/muscleGroup";
import { exercises } from "@/data/exercise";
import MuscleGroupDetail from "@/components/MuscleGroupDetail";
import SearchBar from "@/components/SearchBar";
import ExerciseList from "@/components/ExerciseList";
import ExerciseModal from "@/components/ExerciseWindow";
import AddExerciseModal from "@/components/AddExercise";

export default function MuscleGroupPage() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const group = muscleGroups.find((group) => group.id === Number(id));

  console.log(group);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);

  useEffect(() => {
    if (group) {
      const filtered = exercises.filter(
        (exercise) =>
          exercise.primaryMuscleGroupsIds.includes(group.id) &&
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  }, [searchQuery, group]);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  const openAddExerciseModal = () => setIsAddExerciseModalOpen(true);
  const closeAddExerciseModal = () => setIsAddExerciseModalOpen(false);

  if (!group) {
    return <p>Not found</p>;
  }

  return (
    <div className="p-4 pt-12 xl:pt-4 space-y-7 relative">
      <MuscleGroupDetail name={group.name} description={group.description} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ExerciseList
        exercises={filteredExercises.map((exercise) => ({
          ...exercise,
          description: exercise.description || "No description available",
        }))}
        openModal={openModal}
      />

      {isModalOpen && selectedExercise && (
        <ExerciseModal exercise={selectedExercise} closeModal={closeModal} />
      )}

      {isAddExerciseModalOpen && (
        <AddExerciseModal closeModal={closeAddExerciseModal} />
      )}

      <button
        onClick={openAddExerciseModal}
        className="fixed bottom-20 right-6 xl:bottom-6 bg-black text-white py-3 px-6 rounded shadow-lg text-lg hover:bg-gray-800"
      >
        Add Exercise
      </button>
    </div>
  );
}
