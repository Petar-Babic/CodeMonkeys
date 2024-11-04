"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CreateNutritionPlanInput,
  NutritionPlanBase,
} from "@/types/nutritionPlan";

// Simulated API call for creating a new nutrition plan
const createNutritionPlanAPI = async (
  data: CreateNutritionPlanInput
): Promise<NutritionPlanBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const newNutritionPlan: NutritionPlanBase = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Update local storage
  const nutritionPlans = JSON.parse(
    localStorage.getItem("nutritionPlans") || "[]"
  );
  nutritionPlans.push(newNutritionPlan);
  localStorage.setItem("nutritionPlans", JSON.stringify(nutritionPlans));

  return newNutritionPlan;
};

const getNutritionPlanAPI = async (
  userId: string
): Promise<NutritionPlanBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const nutritionPlans = JSON.parse(
    localStorage.getItem("nutritionPlans") || "[]"
  );

  const nutritionPlan = nutritionPlans.find(
    (plan: NutritionPlanBase) => plan.userId === userId
  );

  if (!nutritionPlan) {
    throw new Error("Nutrition plan not found");
  }

  return nutritionPlan;
};

export function useNutritionPlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanBase | null>(
    null
  );

  useEffect(() => {
    console.log("Nutrition Plan:", nutritionPlan);
  }, [nutritionPlan]);

  const createNutritionPlan = useCallback(
    async (data: CreateNutritionPlanInput) => {
      setIsLoading(true);
      setError(null);
      try {
        const newNutritionPlan = await createNutritionPlanAPI(data);
        setNutritionPlan(newNutritionPlan);
        return newNutritionPlan;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getNutritionPlan = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await getNutritionPlanAPI(userId);
      setNutritionPlan(plan);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
      return false;
    }
  }, []);

  return {
    isLoading,
    error,
    createNutritionPlan,
    nutritionPlan,
    setNutritionPlan,
    getNutritionPlan,
  };
}
