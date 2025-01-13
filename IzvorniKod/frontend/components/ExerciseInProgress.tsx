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
  onComplete: (rpe: number[]) => void;
}) {
  const [currentSet, setCurrentSet] = useState(1);
  const [rpes, setRpes] = useState<number[]>(Array(exercise.sets).fill(0));
  const [extraSets, setExtraSets] = useState<number>(0);

  const totalSets = exercise.sets + extraSets;

  const handleRpeChange = (value: number) => {
    const updatedRpes = [...rpes];
    updatedRpes[currentSet - 1] = value;
    setRpes(updatedRpes);
  };

  const handleNextSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
    } else {
      onComplete(rpes.slice(0, totalSets));
    }
  };

  const handleFinishEarly = () => {
    const confirmFinish = window.confirm(
      "Are you sure you want to finish this exercise early?"
    );
    if (confirmFinish) {
      onComplete(rpes.slice(0, currentSet)); // Završava s unesenim RPE-ovima
    }
  };

  const handleAddExtraSet = () => {
    setExtraSets(extraSets + 1);
    setRpes([...rpes, 0]); // Dodaj RPE za novi set
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">{exercise.name}</h2>
      <p className="text-lg mb-4">
        Set {currentSet} of {totalSets} - {exercise.reps} reps
      </p>

      <label className="mb-2 text-sm">RPE (Rate of Perceived Exertion):</label>
      <input
        type="number"
        min="1"
        max="10"
        value={rpes[currentSet - 1] || ""}
        onChange={(e) => handleRpeChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md p-2 mb-4 w-20 text-center"
      />

      <div className="flex space-x-4">
        <Button onClick={handleNextSet} className="bg-black text-white">
          {currentSet < totalSets ? "Next Set" : "Finish Exercise"}
        </Button>
        <Button onClick={handleAddExtraSet} className="bg-blue-500 text-white">
          Add Extra Set
        </Button>
        <Button onClick={handleFinishEarly} className="bg-red-500 text-white">
          Finish Early
        </Button>
      </div>
    </div>
  );
}
