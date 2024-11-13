"use client";

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionPage = () => {
  const [macros, setMacros] = useState({
    protein: 150, 
    carbs: 250, 
    fats: 80, 
  });

  const [meals, setMeals] = useState([
    { id: 1, name: "Breakfast", calories: 500 },
    { id: 2, name: "Lunch", calories: 700 },
    { id: 3, name: "Dinner", calories: 600 },
    { id: 4, name: "Snack", calories: 300 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<{ id: number; name: string; calories: number }>({
    id: 0,
    name: "",
    calories: 0,
  });

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

  const options: ChartOptions<"pie"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw as number;
            return `${tooltipItem.label}: ${value.toFixed(2)}%`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  const openModal = (meal?: { id: number; name: string; calories: number }) => {
    setCurrentMeal(meal || { id: 0, name: "", calories: 0 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      [name]: name === "calories" ? Number(value) : value,
    }));
  };

  const saveMeal = () => {
    setMeals((prevMeals) =>
      currentMeal.id
        ? prevMeals.map((meal) =>
            meal.id === currentMeal.id ? currentMeal : meal
          )
        : [...prevMeals, { ...currentMeal, id: prevMeals.length + 1 }]
    );
    closeModal();
  };

  const deleteMeal = (id: number) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white p-8 items-center relative">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">Nutrition</h1>

      <div className="flex w-full max-w-5xl justify-between mb-8 space-x-4">
        <div className="bg-gray-200 p-4 rounded-md shadow-md w-1/4 text-center">
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

      <div className="flex w-full max-w-5xl justify-center">
        <div className="flex flex-col w-1/2 space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{meal.name}</h3>
                <p>Calories: {meal.calories} kcal</p>
              </div>
              <button
                onClick={() => openModal(meal)}
                className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          ))}
          <button
            onClick={() => openModal()}
            className="mt-4 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
          >
            + Add Meal
          </button>
        </div>

        <div className="flex items-center justify-center w-1/2">
          <div className="w-3/4 max-w-md">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
          >
            &times;
          </button>
            <h2 className="text-2xl font-bold mb-4">
              {currentMeal.id ? "Edit Meal" : "Add Meal"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Meal Name</label>
              <input
                type="text"
                name="name"
                value={currentMeal.name}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Calories</label>
              <input
                type="text" 
                inputMode="numeric" 
                name="calories"
                value={currentMeal.calories}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-between">
              {currentMeal.id && (
                <button
                  onClick={() => deleteMeal(currentMeal.id)}
                  className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              <button
                onClick={saveMeal}
                className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600 ml-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPage;
