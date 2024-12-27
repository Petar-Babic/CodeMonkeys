import React from "react";
import { Meal } from "../types";
import { calculateTotalMacros, calculateTotalCalories } from "../utils/calculateMacros";

const StatTile = ({ meals }: { meals: Meal[] }) => {
  const totalMacros = calculateTotalMacros(meals);

  return (
    <div className="flex w-full max-w-5xl justify-between mb-8 space-x-4">
      <div className="bg-gray-200 p-4 rounded-md shadow-md w-1/4 text-center">
        <h2 className="text-xl font-semibold">Total Calories</h2>
        <p>{calculateTotalCalories(meals)} kcal</p>
      </div>

      <div className="bg-red-100 p-4 rounded-md shadow-md w-1/4 text-center">
        <h2 className="text-xl font-semibold">Protein</h2>
        <p>{totalMacros.protein}g</p>
      </div>

      <div className="bg-blue-100 p-4 rounded-md shadow-md w-1/4 text-center">
        <h2 className="text-xl font-semibold">Carbs</h2>
        <p>{totalMacros.carbs}g</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-md shadow-md w-1/4 text-center">
        <h2 className="text-xl font-semibold">Fats</h2>
        <p>{totalMacros.fats}g</p>
      </div>
    </div>
  );
};

export default StatTile;