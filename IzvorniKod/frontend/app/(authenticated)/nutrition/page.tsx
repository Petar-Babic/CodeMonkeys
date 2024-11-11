"use client";

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionPage = () => {
  // Mock data for calories and macros
  const [macros, setMacros] = useState({
    protein: 150, // grams
    carbs: 250, // grams
    fats: 80, // grams
  });

  const [meals, setMeals] = useState([
    { id: 1, name: "Breakfast", calories: 500 },
    { id: 2, name: "Lunch", calories: 700 },
    { id: 3, name: "Dinner", calories: 600 },
    { id: 4, name: "Snack", calories: 300 },
  ]);

  const totalCalories = macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;

  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [
          ((macros.protein * 4) / totalCalories) * 100,
          ((macros.carbs * 4) / totalCalories) * 100,
          ((macros.fats * 9) / totalCalories) * 100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
      },
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white p-8 items-center">
      {/* Centered Header */}
      <h1 className="text-4xl font-bold text-black mb-8 text-center">Nutrition</h1>

      {/* Macro Tiles in a Row */}
      <div className="flex w-full max-w-5xl justify-between mb-8 space-x-4">
        <div className="bg-gray-100 p-4 rounded-md shadow-md w-1/4 text-center">
          <h2 className="text-xl font-semibold">Total Calories</h2>
          <p>{totalCalories} kcal</p>
        </div>
        <div className="bg-red-100 p-4 rounded-md shadow-md w-1/4 text-center">
          <h2 className="text-xl font-semibold">Protein</h2>
          <p>{macros.protein}g</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md shadow-md w-1/4 text-center">
          <h2 className="text-xl font-semibold">Carbs</h2>
          <p>{macros.carbs}g</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md shadow-md w-1/4 text-center">
          <h2 className="text-xl font-semibold">Fats</h2>
          <p>{macros.fats}g</p>
        </div>
      </div>

      {/* Meals and Pie Chart Row */}
      <div className="flex w-full max-w-5xl justify-between">
        {/* Meal Tiles on the Left */}
        <div className="flex flex-col w-1/2 space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-gray-100 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <p>Calories: {meal.calories} kcal</p>
            </div>
          ))}
        </div>

        {/* Pie Chart on the Right */}
        <div className="flex items-center justify-center w-1/2">
          <div className="w-3/4 max-w-md">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
