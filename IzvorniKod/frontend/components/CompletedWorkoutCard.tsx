import React from "react";

interface CompletedWorkoutsCardProps {
    workout: {
        id: string;
        name: string;
        completedAt: Date;
        exercises: Array<{
            id: string;
            name: string;
            sets: Array<{ // Menjamo tip "sets" kako bi bio niz
                reps: number;
                RP: number;
            }>;
        }>;
    };
}

const CompletedWorkoutsCard: React.FC<CompletedWorkoutsCardProps> = ({ workout }) => {
    return (
        <div className="w-full bg-gray-900 text-white flex flex-col relative p-3 shadow-md rounded-md">
            <h5 className="text-sm font-semibold mb-2">{workout.name}</h5>

            {/* Prikazujemo datum završetka */}
            <p className="text-xs text-gray-300 mb-3">
                Completed on: {workout.completedAt.toLocaleDateString()}
            </p>

            <ul>
                {workout.exercises.map((exercise) => (
                    <li key={exercise.id} className="mb-2">
                        <p className="text-xs font-medium text-gray-400">{exercise.name}</p>
                        <ul className="pl-3">
                            {exercise.sets.map((set, index) => (
                                <li key={index} className="text-xs text-gray-400">
                                    Set {index + 1}: {set.reps} reps - RP: {set.RP}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedWorkoutsCard;
