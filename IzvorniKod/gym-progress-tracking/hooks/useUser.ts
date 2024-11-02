"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { BodyStatsAndGoalDataType } from "@/types/bodyStatsAndGoal";
import { UserBase } from "@/types/user";
import { useState, useCallback, useEffect } from "react";
import { useNutritionPlan } from "./useNutritionPlan";

// Simulated API call for updating body stats and goals
const bodyStatsAndGoalAPI = async (
  userId: string,
  data: BodyStatsAndGoalDataType,
  nutritionPlanId: string
): Promise<UserBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const updatedUser: UserBase = JSON.parse(
    localStorage.getItem("session") || "{}"
  ).user;
  updatedUser.height = convertToCm(
    parseFloat(data.height),
    data.isHeightImperial
  );
  updatedUser.weight = convertToKg(
    parseFloat(data.weight),
    data.isWeightImperial
  );
  updatedUser.activityLevel = data.activityLevel;
  updatedUser.gender = data.gender;
  updatedUser.currentNutritionPlanId = nutritionPlanId;
  updatedUser.updatedAt = new Date();

  // Update local storage
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  session.user = updatedUser;
  localStorage.setItem("session", JSON.stringify(session));

  return updatedUser;
};

const changeUserWeightAPI = async (
  userId: string,
  newWeight: number
): Promise<UserBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const updatedUser: UserBase = JSON.parse(
    localStorage.getItem("session") || "{}"
  ).user;
  updatedUser.weight = newWeight;

  updatedUser.updatedAt = new Date();

  // Update local storage
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  session.user = updatedUser;
  localStorage.setItem("session", JSON.stringify(session));

  return updatedUser;
};

const changeUserHeightAPI = async (
  userId: string,
  newHeight: number
): Promise<UserBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const updatedUser: UserBase = JSON.parse(
    localStorage.getItem("session") || "{}"
  ).user;
  updatedUser.height = newHeight;
  updatedUser.updatedAt = new Date();

  // Update local storage
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  session.user = updatedUser;
  localStorage.setItem("session", JSON.stringify(session));

  return updatedUser;
};

function convertToCm(value: number, isImperial: boolean): number {
  return isImperial ? value * 2.54 : value;
}

function convertToKg(value: number, isImperial: boolean): number {
  return isImperial ? value * 0.453592 : value;
}

export function useUser() {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createNutritionPlan } = useNutritionPlan();

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const bodyStatsAndGoal = useCallback(
    async (data: BodyStatsAndGoalDataType) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        const nutritionPlan = await createNutritionPlan({
          userId: user.id,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
          trainerId: null,
          calories: data.calories,
          startDate: new Date(),
          // endDate is the current date + values.durations weeks
          endDate: new Date(
            new Date().getTime() + data.timelineWeeks * 7 * 24 * 60 * 60 * 1000
          ),
        });

        const updatedUser = await bodyStatsAndGoalAPI(
          user.id,
          data,
          nutritionPlan.id
        );
        setUser(updatedUser);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUser, createNutritionPlan]
  );

  const changeUserWeight = useCallback(
    async (newWeight: number) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        const updatedUser = await changeUserWeightAPI(user.id, newWeight);
        setUser(updatedUser);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUser]
  );

  const changeUserHeight = useCallback(
    async (newHeight: number) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        const updatedUser = await changeUserHeightAPI(user.id, newHeight);
        setUser(updatedUser);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUser]
  );

  return {
    user,
    isLoading,
    error,
    bodyStatsAndGoal,
    changeUserWeight,
    changeUserHeight,
  };
}
