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
import { WorkoutPlanBase, WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { UserBase } from "@/types/user";
import {
  useWorkoutSession,
  UseWorkoutSessionContextType,
} from "@/hooks/useWorkoutSession";
import { useFood, UseFoodContextType } from "@/hooks/useFood";
import { FoodBase } from "@/types/food";
import { useFile, UseFileContextType } from "@/hooks/useFile";
import { useTrainers } from "@/hooks/useTrainers";
import { UseTrainersContextType } from "@/hooks/useTrainers";
import { TrainerBase } from "@/types/trainer";

type AppContextType = UseUserContextType &
  UseFileContextType &
  UseNutritionPlanContextType &
  UseExerciseContextType &
  UseWorkoutPlanContextType &
  UseMuscleGroupContextType &
  UseWorkoutSessionContextType &
  UseFoodContextType &
  UseUserWorkoutPlanType &
  UseTrainersContextType & {
    isLoading: boolean;
  } & {
    accessToken: string;
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
    nutritionPlan?: NutritionPlanBase | null;
    userWorkoutPlan?: WorkoutPlanWithWorkouts | null;
    trainers?: TrainerBase[];
    workoutPlans: WorkoutPlanBase[];
    accessToken: string;
    user: UserBase;
    trainer: UserBase | null;
    role: "ADMIN" | "USER" | "TRAINER";
    foods: FoodBase[];
  };
}) {
  const userContext = useUser();
  const nutritionPlanContext = useNutritionPlan();
  const exerciseContext = useExercise();
  const muscleGroupContext = useMuscleGroup();
  const workoutPlanContext = useWorkoutPlan();
  const userWorkoutPlanContext = useUserWorkoutPlan();
  const workoutSessionContext = useWorkoutSession();
  const foodContext = useFood();
  const fileContext = useFile();
  const trainersContext = useTrainers();
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<"ADMIN" | "USER" | "TRAINER">("USER");
  useEffect(() => {
    localStorage.setItem("accessToken", initialData.accessToken);
  }, [initialData.accessToken]);

  const { setExercises } = exerciseContext;
  const { setMuscleGroups } = muscleGroupContext;
  const { setWorkoutPlans } = workoutPlanContext;
  const { setUserWorkoutPlan } = userWorkoutPlanContext;
  const { setNutritionPlan } = nutritionPlanContext;
  const { setUserData } = userContext;
  const { setFoods } = foodContext;
  const { setTrainers } = trainersContext;
  const { setTrainer } = userContext;
  useEffect(() => {
    setExercises(initialData.exercises);
    setMuscleGroups(initialData.muscleGroups);
    setWorkoutPlans(initialData.workoutPlans);
    setUserWorkoutPlan(initialData.userWorkoutPlan ?? null);
    setNutritionPlan(initialData.nutritionPlan ?? null);
    setIsLoading(false);
    setUserData(initialData.user);
    setRole(initialData.role);
    setFoods(initialData.foods);
    setTrainers(initialData.trainers ?? []);
    if (initialData.trainer) {
      setTrainer(initialData.trainer);
    }
  }, [
    initialData,
    setExercises,
    setMuscleGroups,
    setWorkoutPlans,
    setUserWorkoutPlan,
    setNutritionPlan,
    setUserData,
    setFoods,
    setRole,
    setTrainers,
    setTrainer,
  ]);

  const appContextValue = useMemo<AppContextType>(
    () => ({
      ...fileContext,
      ...userContext,
      ...exerciseContext,
      ...muscleGroupContext,
      ...nutritionPlanContext,
      ...workoutPlanContext,
      ...workoutSessionContext,
      ...userWorkoutPlanContext,
      isLoading: isLoading,
      ...foodContext,
      accessToken: initialData.accessToken,
      role,
      ...trainersContext,
    }),
    [
      userContext,
      nutritionPlanContext,
      exerciseContext,
      muscleGroupContext,
      workoutPlanContext,
      workoutSessionContext,
      userWorkoutPlanContext,
      isLoading,
      initialData.accessToken,
      role,
      foodContext,
      fileContext,
      trainersContext,
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
