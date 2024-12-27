import React from "react";
import { Food } from "../types";

const FoodModal = ({
  isFoodModalOpen,
  closeFoodModal,
  newFood,
  handleFoodInputChange,
  addFood,
}: {
  isFoodModalOpen: boolean;
  closeFoodModal: () => void;
  newFood: Food;
  handleFoodInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addFood: () => void;
}) => {
  if (!isFoodModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-7/8 relative overflow-y-auto">
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
  );
};

export default FoodModal;
