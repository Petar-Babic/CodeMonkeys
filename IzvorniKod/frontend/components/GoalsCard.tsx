// GoalsCard.tsx
"use client";

import { FC, useState } from "react";
import Goal from "./Goal"; // Ensure this is the correct path to Goal component
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";

interface GoalsCardProps {
    initialGoals?: string[];
}

const GoalsCard: FC<GoalsCardProps> = ({ initialGoals = [] }) => {
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
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <div className="space-y-3">
                {goals.map((goal, index) => (
                    <Goal key={index} text={goal} />
                ))}

                {isAddingGoal ? (
                    <div className="flex items-center space-x-2">
                        <Input
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            placeholder="Enter your custom goal"
                            className="flex-grow"
                        />
                        <button
                            onClick={handleAddGoal}
                            className="bg-black text-white py-2 px-4 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="mt-3">
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
