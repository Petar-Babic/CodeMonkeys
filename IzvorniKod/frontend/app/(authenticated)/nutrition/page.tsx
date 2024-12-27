"use client";

import React, { useState, useEffect } from "react";
import { Food, Meal } from "./types";
import {
  calculateTotalMacros,
  calculateTotalCalories,
  calculateMealCalories,
} from "./utils/calculateMacros";
import StatTile from "./components/StatTile";
import MealList from "./components/MealList";
import MealModal from "./components/MealModal";
import FoodModal from "./components/FoodModal";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionPage = () => {
  const [macros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const [meals, setMeals] = useState<Meal[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const deleteMeal = (id: number) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
    setIsModalOpen(false);
  };

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

  const isAllZero = Object.values(macros).every((val) => val === 0);

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

  const openFoodModal = (food?: Food) => {
    setNewFood(
      food || { id: Date.now(), name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    setIsFoodModalOpen(true);
  };  

  const closeFoodModal = () => {
    setIsFoodModalOpen(false);
  };

  const [totalMacros, setTotalMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  useEffect(() => {
    setTotalMacros(calculateTotalMacros(meals));
  }, [meals]);

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
  };

  const addFood = () => {
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
    closeFoodModal();
  };  

  useEffect(() => {
    calculateTotalCalories(meals);
  }, [meals]);

  return (
    <div className="flex flex-col w-full h-screen bg-white p-8 items-center relative">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">
        Nutrition
      </h1>

      <StatTile meals={meals} />
      
      <div className="flex w-full max-w-5xl justify-center">
        <MealList meals={meals} openModal={openModal} deleteMeal={deleteMeal}/>

        <div className="flex items-center justify-center w-1/2">
          <div className="w-3/4 max-w-md">
          {isAllZero ? (
            <p>No data available. Add meals to see your macros!</p>
          ) : (
            <Pie data={data} options={options} />
          )}
          </div>
        </div>
      </div>

      <MealModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentMeal={currentMeal}
        setMeals={setMeals}
        meals={meals}
        isFoodModalOpen={isFoodModalOpen}
        setIsFoodModalOpen={setIsFoodModalOpen}
        newFood={newFood}
        handleFoodInputChange={handleFoodInputChange}
        addFood={addFood}
        openFoodModal={openFoodModal}
      />

      <FoodModal
        isFoodModalOpen={isFoodModalOpen}
        closeFoodModal={closeFoodModal}
        newFood={newFood}
        handleFoodInputChange={handleFoodInputChange}
        addFood={addFood}
      />
    </div>
  );
};

export default NutritionPage;
