import React from "react";

export default function ExerciseList({ 
  exercises, 
  openModal 
}: { 
  exercises: any[]; 
  openModal: (exercise: any) => void; 
}) {
  return (
    <ul className="space-y-4">
      {exercises.length === 0 ? (
        <p>No exercises found for this category.</p>
      ) : (
        exercises.map((exercise) => (
          <li
            key={exercise.id}
            className="border p-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={() => openModal(exercise)}
          >
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <p>{exercise.description}</p>
          </li>
        ))
      )}
    </ul>
  );
}
