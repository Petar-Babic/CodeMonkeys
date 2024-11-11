"use client";

import React, { useState, useEffect } from "react";

export default function NutritionsPage() {
  const [macrosData, setMacrosData] = useState({ calories: 2000, carbs: 250, protein: 150, fats: 70 });
  const [meals, setMeals] = useState([
    { id: 1, name: "Breakfast", calories: 500 },
    { id: 2, name: "Lunch", calories: 700 },
    { id: 3, name: "Dinner", calories: 600 },
  ]);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-start relative p-6">
      <h1 className="text-4xl font-bold text-black mt-8 text-center">
        Nutrition
      </h1>

      {/* Macros and Total Calories Section */}
      <div className="w-full max-w-lg space-y-4 mt-6">
        <div className="bg-gray-200 p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Calories</h2>
          <p className="text-xl font-bold">{macrosData.calories} kcal</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow-md">
            <h3 className="text-gray-600">Carbs</h3>
            <p className="text-lg font-bold">{macrosData.carbs}g</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow-md">
            <h3 className="text-gray-600">Protein</h3>
            <p className="text-lg font-bold">{macrosData.protein}g</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow-md">
            <h3 className="text-gray-600">Fats</h3>
            <p className="text-lg font-bold">{macrosData.fats}g</p>
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className="w-full max-w-lg space-y-4 mt-8">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white p-4 rounded shadow-md border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800">{meal.name}</h3>
            <p className="text-gray-600">Calories: {meal.calories} kcal</p>
          </div>
        ))}
      </div>
    </div>
  );
}

