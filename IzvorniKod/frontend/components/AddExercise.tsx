import React, { useState } from "react";
import { muscleGroups } from "@/data/muscleGroup";

interface AddExerciseModalProps {
  closeModal: () => void;
}

export default function AddExerciseModal({ closeModal }: AddExerciseModalProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondaryMuscle, setSecondaryMuscle] = useState("");
  const [additionalSecondaryMuscles, setAdditionalSecondaryMuscles] = useState<string[]>([]);
  const [showAddAnother, setShowAddAnother] = useState(true); 
  const [description, setDescription] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddAnotherSecondaryMuscle = () => {
    setAdditionalSecondaryMuscles((prev) => [...prev, ""]);
    setShowAddAnother(false); 
  };

  const handleSecondaryMuscleChange = (index: number, value: string) => {
    if (index === 0) {
      setSecondaryMuscle(value);
    } else {
      const updatedSecondaryMuscles = [...additionalSecondaryMuscles];
      updatedSecondaryMuscles[index - 1] = value; 
      setAdditionalSecondaryMuscles(updatedSecondaryMuscles);
    }
  };

  const handleSave = () => {
    if (!exerciseName.trim() || !primaryMuscle) {
      setErrorMessage("Name and Primary Muscle Group are required.");
      return; 
    }
    setErrorMessage("");
    console.log({
      name: exerciseName,
      primaryMuscle,
      secondaryMuscles: [secondaryMuscle, ...additionalSecondaryMuscles], 
    });
    closeModal();
  };

  return (
    <div className="fixed top-5 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold">Add New Exercise</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p> 
        )}
        
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
          onChange={(e) => handleSecondaryMuscleChange(0, e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Secondary Muscle Group</option>
          {muscleGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        {secondaryMuscle && showAddAnother && (
          <button
            onClick={handleAddAnotherSecondaryMuscle}
            className="text-gray-600">+ Add Another Group 
          </button>
        )}

        {additionalSecondaryMuscles.map((muscle, index) => (
          <select
            key={index}
            value={muscle}
            onChange={(e) => handleSecondaryMuscleChange(index + 1, e.target.value)} 
            className="w-full border border-gray-300 rounded-md p-2">
            <option value="">Select Secondary Muscle Group</option>
            {muscleGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        ))}

        <textarea
          placeholder="Exercise Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
        />

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
