"use client";

import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
  protein: number;
  carbs: number;
  fats: number;
};

const NutritionPage = () => {
  const [macros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasUnsavedChangesFood, setHasUnsavedChangesFood] = useState(false);
  const [showConfirmDialogFood, setShowConfirmDialogFood] = useState(false);

  const [newFood, setNewFood] = useState<Food>({
    id: 0,
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const [currentMeal, setCurrentMeal] = useState<{
    id: number;
    name: string;
    calories: number;
    foods: {
      id: number;
      name: string;
      protein: number;
      carbs: number;
      fats: number;
      calories: number;
    }[];
    protein: number;
    carbs: number;
    fats: number;
  }>({
    id: 0,
    name: "",
    calories: 0,
    foods: [],
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  //Stats---------------------------------------------------------------------------------------------------------------------------------------------------------------
  const calculateTotalMacros = () => {
    return meals.reduce(
      (totals, meal) => {
        totals.protein += meal.protein;
        totals.carbs += meal.carbs;
        totals.fats += meal.fats;
        return totals;
      },
      { protein: 0, carbs: 0, fats: 0 }
    );
  };

  const calculateTotalCalories = () => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  useEffect(() => {
    calculateTotalCalories();
  }, [meals]);

  //Pie chart--------------------------------------------------------------------------------------------------------------------------------------------------------
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
    const totalCalories =
      macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;

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

  const [totalMacros, setTotalMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  useEffect(() => {
    const totalCalories =
      totalMacros.protein * 4 + totalMacros.carbs * 4 + totalMacros.fats * 9;
  
    if (totalCalories > 0) {
      setData({
        labels: ["Protein", "Carbs", "Fats"],
        datasets: [
          {
            data: [
              ((totalMacros.protein * 4) / totalCalories) * 100,
              ((totalMacros.carbs * 4) / totalCalories) * 100,
              ((totalMacros.fats * 9) / totalCalories) * 100,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverOffset: 3,
          },
        ],
      });
    }
  }, [totalMacros]);

  //Meal modal-----------------------------------------------------------------------------------------------------------------------------------------------------------
  const openModal = (meal?: Meal) => {
    setCurrentMeal(
      meal
        ? meal
        : {
            id: 0,
            name: "",
            calories: 0,
            foods: [],
            protein: 0,
            carbs: 0,
            fats: 0,
          }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      return;
    }
    setIsModalOpen(false);
  };

  const confirmModalClose = () => {
    setShowConfirmDialog(false);
    setHasUnsavedChanges(false); 
    setIsModalOpen(false);
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      [name]: name === "calories" ? Number(value) : value,
    }));

    setHasUnsavedChanges(true);
  };

  const saveMeal = () => {
    if (!currentMeal.name?.trim()) {
      alert("Please provide a name for your meal!");
      return;
    }
    const updatedMacros = calculateMealMacros(currentMeal);
    const updatedMeal: Meal = {
      ...currentMeal,
      calories: calculateMealCalories(currentMeal),
      protein: updatedMacros.protein,
      carbs: updatedMacros.carbs,
      fats: updatedMacros.fats,
    };

    setMeals((prevMeals) =>
      updatedMeal.id
        ? prevMeals.map((meal) =>
            meal.id === updatedMeal.id ? updatedMeal : meal
          )
        : [...prevMeals, { ...updatedMeal, id: prevMeals.length + 1 }]
    );
    setHasUnsavedChanges(false);
    setIsModalOpen(false);
  };

  const deleteMeal = (id: number) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  const calculateMealMacros = (meal: Meal) => {
    return meal.foods.reduce(
      (totals, food) => {
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fats += food.fats;
        return totals;
      },
      { protein: 0, carbs: 0, fats: 0 }
    );
  };

  const calculateMealCalories = (meal: Meal) => {
    return meal.foods.reduce((total, food) => total + food.calories, 0);
  };

  useEffect(() => {
    setTotalMacros(calculateTotalMacros());
  }, [meals]);

  //Food modal----------------------------------------------------------------------------------------------------------------------------------------------------------
  const openFoodModal = (food?: Food) => {
    setNewFood(
      food
        ? { ...food }
        : { id: 0, name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    setIsFoodModalOpen(true);
  };

  const closeFoodModal = () => {
    if (hasUnsavedChangesFood) {
      setShowConfirmDialogFood(true);
      return;
    }
    setIsFoodModalOpen(false);
  };

  const confirmFoodModalClose = () => {
    setShowConfirmDialogFood(false);
    setHasUnsavedChangesFood(false);
    setIsFoodModalOpen(false);
  };

  const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]:
        name === "calories" ||
        name === "protein" ||
        name === "carbs" ||
        name === "fats"
          ? Number(value)
          : value,
    }));

    setHasUnsavedChangesFood(true);
  };

  const addFood = () => {
    if (!newFood.name?.trim()) {
      alert("Please provide a name for the food!");
      return;
    }
  
    setCurrentMeal((prevMeal) => {
      const updatedFoods = prevMeal.foods.some((food) => food.id === newFood.id)
        ? prevMeal.foods.map((food) =>
            food.id === newFood.id ? newFood : food
          )
        : [...prevMeal.foods, { ...newFood, id: prevMeal.foods.length + 1 }];

      const updatedMeal = {
        ...prevMeal,
        foods: updatedFoods,
        calories: calculateMealCalories({ ...prevMeal, foods: updatedFoods }),
      };

      return updatedMeal;
    });

    setHasUnsavedChangesFood(false);
    setIsFoodModalOpen(false);
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

  const isAllZero = !Object.values(totalMacros).some((val) => val > 0);
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col w-full h-screen bg-white p-8 items-center relative">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">
        Nutrition
      </h1>
  
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
  
        <div className="flex items-center justify-center w-1/2">
          <div className="w-full max-w-md h-[420px]">
              {isAllZero ? (
                <p>No data available. Add meals to see your macros!</p>
              ) : (
                <Pie
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                  }}
                />
              )}
            </div>
          </div>
        </div> 
  
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-[90%] relative overflow-y-auto">
            {showConfirmDialog ? (
              <div className="absolute inset-0 bg-white p-6 rounded-md shadow-lg flex flex-col items-center justify-center z-20">
                <p className="mb-4 text-center text-gray-700">
                  You have unsaved changes. Are you sure you want to leave without saving?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmDialog(false);
                      setHasUnsavedChanges(false);
                      setIsModalOpen(false);
                      confirmModalClose
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                  <button
                    onClick={() => {
                      if (hasUnsavedChanges) {
                        setShowConfirmDialog(true);
                      } else {
                        closeModal();
                      }
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
                  >
                    &times;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
  
        {isFoodModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-[87.5%] relative overflow-y-auto">
            {showConfirmDialogFood ? (
              <div className="absolute inset-0 bg-white p-6 rounded-md shadow-lg flex flex-col items-center justify-center z-20">
                <p className="mb-4 text-center text-gray-700">
                  You have unsaved changes. Are you sure you want to leave without saving?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmDialogFood(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmDialogFood(false);
                      setHasUnsavedChangesFood(false);
                      setIsFoodModalOpen(false);
                      confirmFoodModalClose
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                <button
                  onClick={() => {
                    if (hasUnsavedChangesFood) {
                      setShowConfirmDialogFood(true);
                    } else {
                      closeFoodModal();
                    }
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
                >
                  &times;
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
  };
  
  export default NutritionPage;
  