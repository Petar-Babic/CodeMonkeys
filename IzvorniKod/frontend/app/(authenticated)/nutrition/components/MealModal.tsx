import React, { useState, useEffect } from "react";
import { Meal, Food } from "../types";
import {
  calculateMealMacros,
  calculateMealCalories,
} from "../utils/calculateMacros";

interface MealModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentMeal: Meal;
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  meals: Meal[];
  isFoodModalOpen: boolean;
  setIsFoodModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newFood: Food;
  handleFoodInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addFood: () => void;
  openFoodModal: () => void;
}

const MealModal: React.FC<MealModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    currentMeal,
    setMeals,
    openFoodModal,
    newFood,
    addFood,
  }) => {
    if (!isModalOpen) return null;
  
    const [meal, setMeal] = useState<Meal>(currentMeal);
  
    useEffect(() => {
      if (isModalOpen) {
        setMeal(currentMeal); // Sync meal when the modal is opened
      }
    }, [isModalOpen]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setMeal((prevMeal) => ({
        ...prevMeal,
        [name]: value,
      }));
    };
  
    const saveMeal = () => {
      const updatedMacros = calculateMealMacros(meal);
      const updatedMeal: Meal = {
        ...meal,
        calories: calculateMealCalories(meal),
        protein: updatedMacros.protein,
        carbs: updatedMacros.carbs,
        fats: updatedMacros.fats,
      };
  
      setMeals((prevMeals) =>
        updatedMeal.id
          ? prevMeals.map((m) => (m.id === updatedMeal.id ? updatedMeal : m))
          : [...prevMeals, { ...updatedMeal, id: prevMeals.length + 1 }]
      );
  
      setIsModalOpen(false);
    };
  
    const scanBarcode = () => {
      alert("Scan Barcode clicked");
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-3/4 relative overflow-y-auto">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">
            {meal.id ? "Edit Meal" : "Add Meal"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Meal Name</label>
            <input
              type="text"
              name="name"
              value={meal.name || ""}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Calories</label>
            <p>{calculateMealCalories(meal)} kcal</p>
          </div>
          {meal.foods?.length > 0 && (
            <table className="macro-table w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Food</th>
                  <th className="px-4 py-2">Calories</th>
                  <th className="px-4 py-2">Protein (g)</th>
                  <th className="px-4 py-2">Carbs (g)</th>
                  <th className="px-4 py-2">Fats (g)</th>
                </tr>
              </thead>
              <tbody>
                {meal.foods.map((food) => (
                  <tr key={food.id}>
                    <td className="px-4 py-2">{food.name}</td>
                    <td className="px-4 py-2">{food.calories}</td>
                    <td className="px-4 py-2">{food.protein}</td>
                    <td className="px-4 py-2">{food.carbs}</td>
                    <td className="px-4 py-2">{food.fats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4 flex justify-between">
            <button
              onClick={openFoodModal}
              className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
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
          <div className="mt-2 flex justify-between">
            <button
              onClick={saveMeal}
              className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Save Meal
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default MealModal;
  