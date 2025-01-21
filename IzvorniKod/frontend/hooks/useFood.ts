import { useState, useCallback } from "react";
import { FoodBase, CreateFoodInput, UpdateFoodInput } from "@/types/food";
import { useAuthContext } from "@/contexts/AuthContext";
import { foods as predefinedFoods } from "@/data/food";
import { backendUrl } from "@/data/backendUrl";

export const useFood = () => {
  const [foods, setFoods] = useState<FoodBase[]>(predefinedFoods);

  const createFood = useCallback(
    async (input: CreateFoodInput): Promise<FoodBase> => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token is not set");
        }

        const res = await fetch(`${backendUrl}/api/food`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(input),
        });

        const newFood = await res.json();

        console.log(newFood);

        setFoods((prevFoods) => [...prevFoods, newFood]);
        return newFood;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create food");
      }
    },
    []
  );

  const getFoodById = useCallback(
    async (id: number): Promise<FoodBase | undefined> => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token is not set");
      }

      const res = await fetch(`${backendUrl}/api/food/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const food = await res.json();
      return food;
    },
    []
  );

  const updateFood = useCallback(
    async (input: UpdateFoodInput): Promise<FoodBase | undefined> => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token is not set");
      }

      const res = await fetch(`${backendUrl}/api/food/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(input),
      });

      const updatedFood = await res.json();

      setFoods((prevFoods) =>
        prevFoods.map((food) => {
          if (food.id === input.id) {
            return {
              ...food,
              ...input,
            };
          }
          return food;
        })
      );

      console.log(updatedFood);

      return updatedFood;
    },
    []
  );

  const deleteFood = useCallback((id: number): void => {
    setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
  }, []);

  return {
    foods,
    setFoods,
    createFood,
    getFoodById,
    updateFood,
    deleteFood,
  };
};

export type UseFoodContextType = {
  foods: FoodBase[];
  setFoods: (foods: FoodBase[]) => void;
  createFood: (input: CreateFoodInput) => Promise<FoodBase>;
  updateFood: (input: UpdateFoodInput) => Promise<FoodBase | undefined>;
  deleteFood: (id: number) => void;
  getFoodById: (id: number) => Promise<FoodBase | undefined>;
};
