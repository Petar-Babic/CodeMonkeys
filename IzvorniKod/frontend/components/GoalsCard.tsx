"use client";

import { FC, useState } from "react";
import Goal from "./Goal"; // Provjerite je li put do Goal ispravan
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";

interface GoalsCardProps {
  initialGoals?: string[];
}

const GoalsCard: FC<GoalsCardProps> = ({ initialGoals = ["steps"] }) => {
  const [goals, setGoals] = useState<string[]>(initialGoals);
  const [newGoal, setNewGoal] = useState<string>("");
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal]);
      setNewGoal("");
      setIsAddingGoal(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-sm">
      <div className="space-y-4">
        {/* Render existing goals */}
        {goals.map((goal, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-4"
          >
            {/* Poravnanje kućica za unos */}
            <Goal text={goal} />
            <button
              className="bg-black text-white py-2 px-6 rounded-md"
              onClick={() => {
                console.log(`Save button clicked for goal: ${goal}`);
              }}
            >
              Save
            </button>
          </div>
        ))}

        {/* Add new goal */}
        {isAddingGoal ? (
          <div className="flex items-center space-x-4">
            {/* Input za unos ciljeva */}
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter your custom goal"
              className="flex-grow text-center"
            />
            {/* Save gumb */}
            <button
              onClick={handleAddGoal}
              className="bg-black text-white py-2 px-6 rounded-md"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mt-3">
            {/* Add custom goal button */}
            <button
              onClick={() => setIsAddingGoal(true)}
              className="w-full flex items-center justify-center py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Custom Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsCard;
