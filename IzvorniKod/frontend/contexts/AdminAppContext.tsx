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
import { WorkoutPlanBase } from "@/types/workoutPlan";
import { UserBase } from "@/types/user";

type AppContextType = UseUserContextType &
  UseNutritionPlanContextType &
  UseExerciseContextType &
  UseWorkoutPlanContextType &
  UseMuscleGroupContextType &
  UseUserWorkoutPlanType & {
    isLoading: boolean;
  } & {
    accessToken: string;
  };

const AdminAppContext = createContext<AppContextType | undefined>(undefined);

export function AdminAppProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: {
    exercises: ExerciseBase[];
    muscleGroups: MuscleGroupBase[];
    workoutPlans: WorkoutPlanBase[];
    accessToken: string;
    user: UserBase;
  };
}) {
  const userContext = useUser();
  const nutritionPlanContext = useNutritionPlan();
  const exerciseContext = useExercise();
  const muscleGroupContext = useMuscleGroup();
  const workoutPlanContext = useWorkoutPlan();
  const userWorkoutPlanContext = useUserWorkoutPlan();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("accessToken", initialData.accessToken);
  }, [initialData.accessToken]);

  const { setExercises } = exerciseContext;
  const { setMuscleGroups } = muscleGroupContext;
  const { setWorkoutPlans } = workoutPlanContext;
  const { setUserData } = userContext;

  useEffect(() => {
    setExercises(initialData.exercises);
    setMuscleGroups(initialData.muscleGroups);
    setWorkoutPlans(initialData.workoutPlans);

    setIsLoading(false);
    setUserData(initialData.user);
  }, [
    initialData,
    setExercises,
    setMuscleGroups,
    setWorkoutPlans,
    setUserData,
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
      accessToken: initialData.accessToken,
    }),
    [
      userContext,
      nutritionPlanContext,
      exerciseContext,
      muscleGroupContext,
      workoutPlanContext,
      userWorkoutPlanContext,
      isLoading,
      initialData.accessToken,
    ]
  );

  return (
    <AdminAppContext.Provider value={appContextValue}>
      {children}
    </AdminAppContext.Provider>
  );
}

export function useAdminAppContext() {
  const context = useContext(AdminAppContext);
  if (context === undefined) {
    throw new Error(
      "useAdminAppContext must be used within an AdminAppProvider"
    );
  }
  return context;
}
