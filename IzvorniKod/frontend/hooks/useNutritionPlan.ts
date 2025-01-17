"use client";

import { useState, useCallback } from "react";
import {
  CreateNutritionPlanInput,
  NutritionPlanBase,
} from "@/types/nutritionPlan";
import { backendUrl } from "@/data/backendUrl";

export function useNutritionPlan() {
  const [isLoadingNutritionalPlan, setIsLoadingNutritionalPlan] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanBase | null>(
    null
  );

  const createNutritionPlan = useCallback(
    async (data: CreateNutritionPlanInput) => {
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token available");
        }

        console.log("Access token:", token);
        console.log("data for nutrition plan:", data);

        const response = await fetch(`${backendUrl}/api/nutrition-plan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newNutritionPlan = await response.json();
        setNutritionPlan(newNutritionPlan);
        return newNutritionPlan;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.log("Error creating nutrition plan:", err);
        throw err;
      }
    },
    []
  );

  const getNutritionPlan = useCallback(async (): Promise<boolean> => {
    setIsLoadingNutritionalPlan(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`${backendUrl}/api/nutrition-plan`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const plan = await response.json();
      setNutritionPlan(plan);
      return true;
    } catch (err) {
      console.error("Error getting nutrition plan:", err);
      return false;
    } finally {
      setIsLoadingNutritionalPlan(false);
    }
  }, []);

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
  getNutritionPlan: () => Promise<boolean>;
};
