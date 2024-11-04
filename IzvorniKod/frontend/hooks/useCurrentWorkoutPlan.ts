"use client";

import { WorkoutPlanBase } from "@/types/workoutPlan";
import { useState, useCallback } from "react";

// Simulated API calls
const fetchWorkoutPlan = async (id: string): Promise<WorkoutPlanBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated workout plan data
  const plan: WorkoutPlanBase = {
    id: id,
    name: "Push/Pull/Legs",
    description: "A classic 3-day split workout plan",
    image: "https://via.placeholder.com/150",
    userId: "1",
    trainerId: "2",
    createdById: "1",
    isApproved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return plan;
};

const setWorkoutPlanAPI = async (
  planId: string
): Promise<{ success: boolean; message: string }> => {
  console.log("Setting workout plan with ID:", planId);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: "Workout plan set successfully" };
};

const quitWorkoutPlanAPI = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  console.log("Quitting current workout plan");
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: "Workout plan quit successfully" };
};

export function useCurrentWorkoutPlan() {
  const [userWorkoutPlan, setUserWorkoutPlan] =
    useState<WorkoutPlanBase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setCurrentWorkoutPlan = useCallback(async (planId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { success, message } = await setWorkoutPlanAPI(planId);
      if (success) {
        const plan = await fetchWorkoutPlan(planId);
        setUserWorkoutPlan(plan);
      } else {
        throw new Error(message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setUserWorkoutPlan(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const quitCurrentWorkoutPlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { success, message } = await quitWorkoutPlanAPI();
      if (success) {
        setUserWorkoutPlan(null);
      } else {
        throw new Error(message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    userWorkoutPlan,
    isLoading,
    error,
    setCurrentWorkoutPlan,
    quitCurrentWorkoutPlan,
  };
}
