"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
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

import { ExerciseBase } from "@/types/exercise";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { UserWorkoutPlanWithRelations } from "@/types/userWorkoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";

type AppContextType = UseUserContextType &
  UseNutritionPlanContextType &
  UseExerciseContextType &
  UseWorkoutPlanContextType &
  UseMuscleGroupContextType &
  UseUserWorkoutPlanType & {
    isLoading: boolean;
  };

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: {
    exercises: ExerciseBase[];
    muscleGroups: MuscleGroupBase[];
    nutritionPlan: NutritionPlanBase | null;
    userWorkoutPlan: UserWorkoutPlanWithRelations | null;
    workoutPlans: WorkoutPlanBase[];
  };
}) {
  const userContext = useUser();
  const nutritionPlanContext = useNutritionPlan();
  const exerciseContext = useExercise();
  const muscleGroupContext = useMuscleGroup();
  const workoutPlanContext = useWorkoutPlan();
  const userWorkoutPlanContext = useUserWorkoutPlan();
  const [isLoading, setIsLoading] = useState(true);

  const { setExercises } = exerciseContext;
  const { setMuscleGroups } = muscleGroupContext;
  const { setWorkoutPlans } = workoutPlanContext;
  const { setUserWorkoutPlan } = userWorkoutPlanContext;
  const { setNutritionPlan } = nutritionPlanContext;

  useEffect(() => {
    setExercises(initialData.exercises);
    setMuscleGroups(initialData.muscleGroups);
    setWorkoutPlans(initialData.workoutPlans);
    setUserWorkoutPlan(initialData.userWorkoutPlan);
    setNutritionPlan(initialData.nutritionPlan);

    setIsLoading(false);
  }, [
    initialData,
    setExercises,
    setMuscleGroups,
    setWorkoutPlans,
    setUserWorkoutPlan,
    setNutritionPlan,
  ]);

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
