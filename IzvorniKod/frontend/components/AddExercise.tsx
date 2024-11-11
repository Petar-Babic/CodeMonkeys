// components/exercises/AddExerciseModal.tsx

import React, { useState } from "react";
import { muscleGroups } from "@/data/muscleGroup";

interface AddExerciseModalProps {
  closeModal: () => void;
}

export default function AddExerciseModal({ closeModal }: AddExerciseModalProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondaryMuscle, setSecondaryMuscle] = useState("");

  const handleSave = () => {
    console.log({
      name: exerciseName,
      primaryMuscle,
      secondaryMuscle,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold">Add New Exercise</h2>
        
        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <select
          value={primaryMuscle}
          onChange={(e) => setPrimaryMuscle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Primary Muscle Group</option>
          {muscleGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <select
          value={secondaryMuscle}
          onChange={(e) => setSecondaryMuscle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Secondary Muscle Group</option>
          {muscleGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="bg-gray-100 text-gray-900 py-1 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-black text-white py-1 px-4 rounded-md"
          >
            Save Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
