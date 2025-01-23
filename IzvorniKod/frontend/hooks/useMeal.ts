import { useState, useCallback } from "react";
import { MealBase, CreateMealInput } from "@/types/meal";
import { backendUrl } from "@/data/backendUrl";

export const useMeal = () => {
  const [meals, setMeals] = useState<MealBase[]>([]);

  const createMeal = useCallback(async (mealInput: CreateMealInput) => {
    const token = localStorage.getItem("accessToken");

    console.log("mealInput", mealInput);

    const res = await fetch(`${backendUrl}/api/create-meal`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealInput),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error creating meal");
    }
    console.log("data", data);
    setMeals((prevMeals) => [...prevMeals, data]);
    return data;
  }, []);

  const getMealById = useCallback(async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backendUrl}/api/meals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }, []);

  const updateMeal = useCallback(
    async (id: number, updateData: Partial<MealBase>) => {
      const token = localStorage.getItem("accessToken");

      console.log("updateData", updateData);

      const res = await fetch(`${backendUrl}/api/meals/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error updating meal");
      }
      console.log("data", data);
      setMeals((prevMeals) =>
        prevMeals.map((meal) => (meal.id === id ? { ...meal, ...data } : meal))
      );
    },
    []
  );

  const deleteMeal = useCallback(async (id: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      await fetch(`${backendUrl}/api/meals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  }, []);

  return {
    meals,
    setMeals,
    createMeal,
    getMealById,
    updateMeal,
    deleteMeal,
  } as UseMealContextType;
};

export type UseMealContextType = {
  meals: MealBase[];
  setMeals: (meals: MealBase[]) => void;
  createMeal: (mealInput: CreateMealInput) => Promise<MealBase>;
  getMealById: (id: number) => Promise<MealBase>;
  updateMeal: (id: number, updateData: Partial<MealBase>) => Promise<void>;
  deleteMeal: (id: number) => Promise<void>;
};
