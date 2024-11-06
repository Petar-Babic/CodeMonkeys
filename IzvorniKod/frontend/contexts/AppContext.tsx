"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useUser, UseUserContextType } from "@/hooks/useUser";
import {
  useNutritionPlan,
  UseNutritionPlanContextType,
} from "@/hooks/useNutritionPlan";
import { useExercise, UseExerciseContextType } from "@/hooks/useExercise";
import {
  useMuscleGroup,
  UseMuscleGroupContextType,
} from "@/hooks/useMuscleGroup";
import {
  useWorkoutPlan,
  UseWorkoutPlanContextType,
} from "@/hooks/useWorkoutPlan";
import {
  useUserWorkoutPlan,
  UseUserWorkoutPlanType,
} from "@/hooks/useUserWorkoutPlan";
import { useAuthContext } from "./AuthContext";

type AppContextType = UseUserContextType &
  UseNutritionPlanContextType &
  UseExerciseContextType &
  UseWorkoutPlanContextType &
  UseMuscleGroupContextType &
  UseUserWorkoutPlanType & {
    isLoading: boolean;
  };

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const userContext = useUser();
  const nutritionPlanContext = useNutritionPlan();
  const exerciseContext = useExercise();
  const muscleGroupContext = useMuscleGroup();
  const workoutPlanContext = useWorkoutPlan();
  const userWorkoutPlanContext = useUserWorkoutPlan();
  const [isLoading, setIsLoading] = useState(true);

  const { getAllMuscleGroups } = muscleGroupContext;
  const { getAllExercises } = exerciseContext;
  const { getNutritionPlan } = nutritionPlanContext;
  const { getUserWorkoutPlan } = userWorkoutPlanContext;
  const { getAllWorkoutPlans } = workoutPlanContext;

  const { user } = useAuthContext();

  const userId = user?.id;

  useEffect(() => {
    loadAppData();
  }, [userId]);

  const loadAppData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (userId) {
        await Promise.all([
          getNutritionPlan(userId),
          getAllMuscleGroups(),
          getAllExercises(),
          getUserWorkoutPlan(userId),
          getAllWorkoutPlans(),
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error loading app data:", error);
    }
  }, [userId]);

  const appContextValue = useMemo<AppContextType>(
    () => ({
      ...userContext,
      ...exerciseContext,
      ...muscleGroupContext,
      ...nutritionPlanContext,
      ...workoutPlanContext,
      ...userWorkoutPlanContext,
      isLoading: isLoading,
    }),
    [
      userContext,
      nutritionPlanContext,
      exerciseContext,
      muscleGroupContext,
      workoutPlanContext,
      userWorkoutPlanContext,
      isLoading,
    ]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
