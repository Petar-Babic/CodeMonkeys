"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CreateNutritionPlanInput,
  NutritionPlanBase,
} from "@/types/nutritionPlan";
import { nutritionPlans as initialNutritionPlans } from "@/data/nutritionPlan";

export function useNutritionPlan() {
  const [isLoadingNutritionalPlan, setIsLoadingNutritionalPlan] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanBase | null>(
    null
  );

  useEffect(() => {
    console.log("Nutrition plan:", nutritionPlan);
  }, [nutritionPlan]);

  const createNutritionPlan = useCallback(
    async (data: CreateNutritionPlanInput) => {
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated logic (replace with actual API call)
        const newNutritionPlan: NutritionPlanBase = {
          id: `nutrition${initialNutritionPlans.length + 1}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setNutritionPlan(newNutritionPlan);
        return newNutritionPlan;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      }
    },
    []
  );

  const getNutritionPlan = useCallback(
    async (userId: string): Promise<boolean> => {
      setIsLoadingNutritionalPlan(true);
      setError(null);

      console.log("Getting nutrition plan for user:", userId);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find the nutrition plan for the given user
        const plan = initialNutritionPlans.find(
          (plan) => plan.userId === userId
        );
        if (!plan) {
          console.error("Nutrition plan not found for user:", userId);
          return false;
        } else {
          setIsLoadingNutritionalPlan(false);
          setNutritionPlan(plan);
          console.log("Nutrition plan found:", plan);
          return true;
        }
      } catch (err) {
        console.error("Error getting nutrition plan:", err);
        return false;
      } finally {
        setIsLoadingNutritionalPlan(false);
      }
    },
    []
  );

  return {
    isLoadingNutritionalPlan,
    error,
    createNutritionPlan,
    nutritionPlan,
    setNutritionPlan,
    getNutritionPlan,
  } as UseNutritionPlanContextType;
}

export type UseNutritionPlanContextType = {
  isLoadingNutritionalPlan: boolean;
  error: string | null;
  createNutritionPlan: (
    data: CreateNutritionPlanInput
  ) => Promise<NutritionPlanBase>;
  nutritionPlan: NutritionPlanBase | null;
  setNutritionPlan: (plan: NutritionPlanBase | null) => void;
  getNutritionPlan: (userId: string) => Promise<boolean>;
};
