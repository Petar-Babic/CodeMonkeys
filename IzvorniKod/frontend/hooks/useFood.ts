import { useState, useCallback } from "react";
import { FoodBase, CreateFoodInput, UpdateFoodInput } from "@/types/food";
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

      try {
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
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get food by id");
      }
    },
    []
  );

  const updateFood = useCallback(
    async (input: UpdateFoodInput): Promise<FoodBase | undefined> => {
      const accessToken = localStorage.getItem("accessToken");
      try {
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

        console.log(updatedFood);

        return updatedFood;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to update food");
      } finally {
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
      }
    },
    []
  );

  const deleteFood = useCallback(
    async (id: number): Promise<void> => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        if (!accessToken) {
          throw new Error("Access token is not set");
        }

        await fetch(`${backendUrl}/api/food/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
      } catch (err) {
        console.error(err);
        throw new Error("Failed to delete food");
      }
    },
    [setFoods]
  );

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
  deleteFood: (id: number) => Promise<void>;
  getFoodById: (id: number) => Promise<FoodBase | undefined>;
};
