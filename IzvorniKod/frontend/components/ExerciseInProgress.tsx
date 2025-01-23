"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

export default function ExerciseInProgress({
  exercise,
  onComplete,
}: {
  exercise: Exercise;
  onComplete: (sets: { weight: number; rpe: number }[]) => void;
}) {
  const [currentSet, setCurrentSet] = useState(1);
  const [sets, setSets] = useState(
    Array.from({ length: exercise.sets }, () => ({ weight: 0, rpe: 0 }))
  );

  const handleWeightChange = (setIndex: number, value: number) => {
    const updatedSets = [...sets];
    updatedSets[setIndex].weight = value;
    setSets(updatedSets);
  };

  const handleRpeChange = (setIndex: number, value: number) => {
    const updatedSets = [...sets];
    updatedSets[setIndex].rpe = value;
    setSets(updatedSets);
  };

  const handleAddSet = () => {
    setSets([...sets, { weight: 0, rpe: 0 }]);
  };

  const handleRemoveSet = () => {
    if (sets.length > 1) {
      const updatedSets = sets.slice(0, -1);
      setSets(updatedSets);
      if (currentSet > updatedSets.length) {
        setCurrentSet(updatedSets.length);
      }
    }
  };

  const handleFinishEarly = () => {
    const confirmFinish = window.confirm(
      "Are you sure you want to finish this exercise early?"
    );
    if (confirmFinish) {
      onComplete(sets.slice(0, currentSet));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 uppercase text-center border-b border-gray-700 pb-2">
        {exercise.name}
      </h2>
      <p className="text-lg mb-4">
        SET {currentSet} OF {sets.length} - {exercise.reps} REPS
      </p>

      <div className="w-full max-w-md space-y-4">
        {sets.map((set, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-md space-y-2 border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">Set {index + 1}</label>
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <label className="text-xs text-gray-400">Weight</label>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={set.weight}
                    onChange={(e) =>
                      handleWeightChange(index, parseFloat(e.target.value) || 0)
                    }
                    className="w-20 bg-black text-white border border-gray-700 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-xs text-gray-400">RPE</label>
                  <input
                    type="number"
                    placeholder="RPE"
                    value={set.rpe}
                    onChange={(e) =>
                      handleRpeChange(index, parseFloat(e.target.value) || 0)
                    }
                    className="w-20 bg-black text-white border border-gray-700 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-6">
        <Button
          onClick={() =>
            currentSet < sets.length
              ? setCurrentSet(currentSet + 1)
              : onComplete(sets)
          }
          className="bg-green-500 text-black font-semibold py-2 px-4 rounded-md"
        >
          {currentSet < sets.length ? "Next Set" : "Finish Exercise"}
        </Button>

        <Button
          onClick={handleAddSet}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Set
        </Button>

        <Button
          onClick={handleRemoveSet}
          className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md"
          disabled={sets.length === 1}
        >
          Remove Set
        </Button>

        <Button
          onClick={handleFinishEarly}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Finish Early
        </Button>
      </div>
    </div>
  );
}
