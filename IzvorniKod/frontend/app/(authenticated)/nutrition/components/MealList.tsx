import React from "react";
import { Meal } from "../types";

const MealList = ({
  meals,
  openModal,
  deleteMeal,
}: {
  meals: Meal[];
  openModal: (meal?: Meal) => void;
  deleteMeal: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col w-1/2 space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{meal.name}</h3>
            <p>Calories: {meal.calories} kcal</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => openModal(meal)}
              className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMeal(meal.id)}
              className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => openModal()}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
      >
        + Add Meal
      </button>
    </div>
  );
};

export default MealList;
