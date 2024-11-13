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

type Food = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

type Meal = {
  id: number;
  name: string;
  calories: number;
  foods: Food[];
  protein: number,
  carbs: number,
  fat: number,
};

const NutritionPage = () => {
  const [macros, setMacros] = useState({
    protein: 150, 
    carbs: 250, 
    fats: 80, 
  });

  const [meals, setMeals] = useState<Meal[]>([
    { 
      id: 1, 
      name: "Breakfast", 
      calories: 0, 
      foods: [
        { id: 1, name: "Eggs", protein: 12, carbs: 1, fats: 10, calories: 150 },
        { id: 2, name: "Toast", protein: 5, carbs: 20, fats: 2, calories: 120 }
      ],
      protein: 17, 
      carbs: 21, 
      fat: 12 
    },
    { 
      id: 2, 
      name: "Lunch", 
      calories: 0, 
      foods: [],
      protein: 0, 
      carbs: 0, 
      fat: 0 
    },
    { 
      id: 3, 
      name: "Dinner", 
      calories: 0, 
      foods: [],
      protein: 0, 
      carbs: 0, 
      fat: 0 
    }
  ]);  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<{ 
    id: number; 
    name: string; 
    calories: number; 
    foods: { id: number; name: string; protein: number; carbs: number; fats: number; calories: number }[];
    protein: number;
    carbs: number;
    fat: number; 
  }>({
    id: 0,
    name: "",
    calories: 0,
    foods: [],
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [data, setData] = useState({
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [0, 0, 0], 
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 10,
      },
    ],
  });
  
  useEffect(() => {
    const totalCalories = macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;
  
    setData({
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
    });
  }, [macros]);
  

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

  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [newFood, setNewFood] = useState<Food>({
    id: 0,
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const openModal = (meal?: Meal) => {
    setCurrentMeal(
      meal
        ? meal
        : { id: 0, name: "", calories: 0, foods: [], protein: 0, carbs: 0, fat: 0 }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openFoodModal = (food?: Food) => {
    setNewFood(
      food
        ? { ...food } 
        : { id: 0, name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    setIsFoodModalOpen(true);
  };

  const closeFoodModal = () => {
    setIsFoodModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      [name]: name === "calories" ? Number(value) : value,
    }));
  };

  const calculateTotalMacros = () => {
    return meals.reduce(
      (totals, meal) => {
        totals.protein += meal.protein;
        totals.carbs += meal.carbs;
        totals.fats += meal.fat;
        return totals;
      },
      { protein: 0, carbs: 0, fats: 0 }
    );
  };
  
  const [totalMacros, setTotalMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

  useEffect(() => {
    setTotalMacros(calculateTotalMacros());
  }, [meals]);


  const calculateMealMacros = (meal: Meal) => {
    return meal.foods.reduce(
      (totals, food) => {
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fat += food.fats; 
        return totals;
      },
      { protein: 0, carbs: 0, fat: 0 }
    );
  };

  const saveMeal = () => {
    const updatedMacros = calculateMealMacros(currentMeal);
    const updatedMeal: Meal = {
      ...currentMeal,
      calories: calculateMealCalories(currentMeal),
      protein: updatedMacros.protein,
      carbs: updatedMacros.carbs,
      fat: updatedMacros.fat,  // Use `fat` instead of `fats`
    };
  
    setMeals((prevMeals) =>
      updatedMeal.id
        ? prevMeals.map((meal) =>
            meal.id === updatedMeal.id ? updatedMeal : meal
          )
        : [...prevMeals, { ...updatedMeal, id: prevMeals.length + 1 }]
    );
    closeModal();
  };
  
  useEffect(() => {
    setTotalMacros(calculateTotalMacros());
  }, [meals]);
  
  
  const deleteMeal = (id: number) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: name === "calories" || name === "protein" || name === "carbs" || name === "fats" ? Number(value) : value,
    }));
  };

  const addFood = () => {
    setCurrentMeal((prevMeal) => {
      const updatedFoods = prevMeal.foods.some((food) => food.id === newFood.id)
        ? prevMeal.foods.map((food) => (food.id === newFood.id ? newFood : food))
        : [...prevMeal.foods, { ...newFood, id: prevMeal.foods.length + 1 }];
  
      const updatedMeal = {
        ...prevMeal,
        foods: updatedFoods,
        calories: calculateMealCalories({ ...prevMeal, foods: updatedFoods }),
      };
  
      return updatedMeal;
    });
    closeFoodModal();
  };
  

  const deleteFood = (foodId: number) => {
    setCurrentMeal((prevMeal) => {
      const updatedFoods = prevMeal.foods.filter((food) => food.id !== foodId);
      const updatedMeal = { ...prevMeal, foods: updatedFoods };
      updatedMeal.calories = calculateMealCalories(updatedMeal);
      return updatedMeal;
    });
  };

  const scanBarcode = () => {
    // Logic to scan barcode here
    alert("Scan Barcode clicked");
  };

  const calculateMealCalories = (meal: Meal) => {
    return meal.foods.reduce((total, food) => total + food.calories, 0);
  };  

  const calculateTotalCalories = () => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  useEffect(() => {
    calculateTotalCalories();
  }, [meals]);
  

  return (
    <div className="flex flex-col w-full h-screen bg-white p-8 items-center relative">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">Nutrition</h1>

      <div className="flex w-full max-w-5xl justify-between mb-8 space-x-4">
      <div className="bg-gray-200 p-4 rounded-md shadow-md w-1/4 text-center">
        <h2 className="text-xl font-semibold">Total Calories</h2>
        <p>{calculateTotalCalories()} kcal</p>
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
        <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-3/4 relative overflow-y-auto"> {/* Increased width and height */}
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
            <label className="block text-gray-700">Total Calories</label>
            <p>{calculateMealCalories(currentMeal)} kcal</p>
          </div>

          {/* Food Table with Calories */}
          {currentMeal.foods.length > 0 && (
            <table className="macro-table w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Food</th>
                  <th className="px-4 py-2">Calories</th>
                  <th className="px-4 py-2">Protein (g)</th>
                  <th className="px-4 py-2">Carbs (g)</th>
                  <th className="px-4 py-2">Fats (g)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentMeal.foods.map((food) => (
                  <tr key={food.id}>
                    <td className="px-4 py-2">{food.name}</td>
                    <td className="px-4 py-2">{food.calories}</td>
                    <td className="px-4 py-2">{food.protein}</td>
                    <td className="px-4 py-2">{food.carbs}</td>
                    <td className="px-4 py-2">{food.fats}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openFoodModal(food)}
                        className="bg-blue-500 text-white p-1 rounded-md shadow-md hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFood(food.id)}
                        className="bg-red-500 text-white p-1 rounded-md shadow-md hover:bg-red-700 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between">
            <div className="flex">
              <button
                onClick={() => openFoodModal()}
                className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-700"
              >
                Add Custom Food
              </button>
              <button
                onClick={scanBarcode}
                className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-700 ml-2"
              >
                Scan Barcode
              </button>
            </div>
          </div>

          <div className="mt-2 flex justify-between">
            <button
              onClick={saveMeal}
              className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Save Meal
            </button>
            {currentMeal.id && (
              <button
                onClick={() => deleteMeal(currentMeal.id)}
                className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-700"
              >
                Delete Meal
              </button>
            )}
          </div>
        </div>
      </div>
    )}


      {/* Add Custom Food Modal */}
      {isFoodModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-3/4 relative overflow-y-auto">
            <button
              onClick={closeFoodModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Custom Food</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Food Name</label>
              <input
                type="text"
                name="name"
                value={newFood.name}
                onChange={handleFoodInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Calories</label>
              <input
                type="text" 
                inputMode="numeric" 
                name="calories"
                value={newFood.calories}
                onChange={handleFoodInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Protein (g)</label>
              <input
                type="text" 
                inputMode="numeric" 
                name="protein"
                value={newFood.protein}
                onChange={handleFoodInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Carbs (g)</label>
              <input
                type="text" 
                inputMode="numeric" 
                name="carbs"
                value={newFood.carbs}
                onChange={handleFoodInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fats (g)</label>
              <input
                type="text" 
                inputMode="numeric" 
                name="fats"
                value={newFood.fats}
                onChange={handleFoodInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-2 flex justify-between">

              <button
                onClick={addFood}
                className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Add Food
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default NutritionPage;
