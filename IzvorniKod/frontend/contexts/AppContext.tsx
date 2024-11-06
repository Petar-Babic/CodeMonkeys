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
import { useUser } from "@/hooks/useUser";
import { useNutritionPlan } from "@/hooks/useNutritionPlan";
import { useExercise } from "@/hooks/useExercise";
import { useMuscleGroup } from "@/hooks/useMuscleGroup";
import { useWorkoutPlan } from "@/hooks/useWorkoutPlan";
import { UserBase } from "@/types/user";
import { BodyStatsAndGoalDataType } from "@/types/bodyStatsAndGoal";
import {
  CreateNutritionPlanInput,
  NutritionPlanBase,
} from "@/types/nutritionPlan";
import { ExerciseBase, CreateExerciseInput } from "@/types/exercise";
import {
  MuscleGroupBase,
  CreateMuscleGroupInput,
  UpdateMuscleGroupInput,
} from "@/types/muscleGroup";
import {
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
  WorkoutPlanBase,
  WorkoutPlanWithExercises,
  WorkoutPlanListItem,
  WorkoutPlanSearchResult,
} from "@/types/workoutPlan";

type UserContextType = {
  user: UserBase | null;
  isLoading: boolean;
  error: string | null;
  changeUserWeight: (newWeight: number) => Promise<void>;
  changeUserHeight: (newHeight: number) => Promise<void>;
  bodyStatsAndGoal: (data: BodyStatsAndGoalDataType) => Promise<void>;
};

type NutritionPlanContextType = {
  createNutritionPlan: (
    data: CreateNutritionPlanInput
  ) => Promise<NutritionPlanBase>;
  getNutritionPlan: (userId: string) => Promise<boolean>;
  isNutritionPlanLoading: boolean;
  nutritionPlanError: string | null;
  nutritionPlan: NutritionPlanBase | null;
};

type ExerciseContextType = {
  exercises: ExerciseBase[];
  createExercise: (exerciseInput: CreateExerciseInput) => Promise<ExerciseBase>;
  getExerciseById: (id: string) => ExerciseBase | undefined;
  getAllExercises: () => Promise<ExerciseBase[]>;
  updateExercise: (
    id: string,
    updateData: Partial<ExerciseBase>
  ) => Promise<void>;
  deleteExercise: (id: string) => void;
};

type MuscleGroupContextType = {
  muscleGroups: MuscleGroupBase[];
  createMuscleGroup: (
    muscleGroupInput: CreateMuscleGroupInput
  ) => MuscleGroupBase;
  getMuscleGroupById: (id: string) => MuscleGroupBase | undefined;
  getAllMuscleGroups: () => Promise<MuscleGroupBase[]>;
  updateMuscleGroup: (id: string, updateData: UpdateMuscleGroupInput) => void;
  deleteMuscleGroup: (id: string) => void;
};

type WorkoutPlanContextType = {
  workoutPlans: WorkoutPlanBase[];
  createWorkoutPlan: (
    input: CreateWorkoutPlanInput
  ) => Promise<WorkoutPlanBase>;
  getWorkoutPlanById: (id: string) => WorkoutPlanBase | undefined;
  getAllWorkoutPlans: () => Promise<WorkoutPlanBase[]>;
  updateWorkoutPlan: (
    input: UpdateWorkoutPlanInput
  ) => WorkoutPlanBase | undefined;
  deleteWorkoutPlan: (id: string) => void;
  getWorkoutPlanWithExercises: (
    id: string
  ) => WorkoutPlanWithExercises | undefined;
  getWorkoutPlanListItems: () => WorkoutPlanListItem[];
  searchWorkoutPlans: (query: string) => WorkoutPlanSearchResult[];
};

type AppContextType = UserContextType &
  NutritionPlanContextType &
  ExerciseContextType &
  WorkoutPlanContextType &
  MuscleGroupContextType & {
    isLoading: boolean;
  };

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const userContext = useUser();
  const nutritionPlanContext = useNutritionPlan();
  const exerciseContext = useExercise();
  const muscleGroupContext = useMuscleGroup();
  const workoutPlanContext = useWorkoutPlan();
  const [isLoading, setIsLoading] = useState(true);

  const { getAllMuscleGroups } = muscleGroupContext;
  const { getAllWorkoutPlans } = workoutPlanContext;
  const { getAllExercises } = exerciseContext;

  const loadAppData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        getAllMuscleGroups(),
        getAllWorkoutPlans(),
        getAllExercises(),
      ]);
    } catch (error) {
      console.error("Error loading app data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getAllMuscleGroups, getAllWorkoutPlans, getAllExercises]);

  useEffect(() => {
    loadAppData();
  }, [loadAppData]);

  const appContextValue = useMemo<AppContextType>(
    () => ({
      ...userContext,
      ...nutritionPlanContext,
      ...exerciseContext,
      ...muscleGroupContext,
      ...workoutPlanContext,
      isLoading:
        isLoading || userContext.isLoading || nutritionPlanContext.isLoading,
      isNutritionPlanLoading: nutritionPlanContext.isLoading,
      nutritionPlanError: nutritionPlanContext.error,
      nutritionPlan: nutritionPlanContext.nutritionPlan,
    }),
    [
      userContext,
      nutritionPlanContext,
      exerciseContext,
      muscleGroupContext,
      workoutPlanContext,
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
<<<<<<< HEAD
=======

("use client");

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useUser } from "@/hooks/useUser";
import { useNutritionPlan } from "@/hooks/useNutritionPlan";
import { useExercise } from "@/hooks/useExercise";
import { useMuscleGroup } from "@/hooks/useMuscleGroup";
import { useWorkoutPlan } from "@/hooks/useWorkoutPlan";
import { UserBase } from "@/types/user";
import { BodyStatsAndGoalDataType } from "@/types/bodyStatsAndGoal";
import {
  CreateNutritionPlanInput,
  NutritionPlanBase,
} from "@/types/nutritionPlan";
import { ExerciseBase, CreateExerciseInput } from "@/types/exercise";
import {
  MuscleGroupBase,
  CreateMuscleGroupInput,
  UpdateMuscleGroupInput,
} from "@/types/muscleGroup";
import {
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
  WorkoutPlanBase,
  WorkoutPlanWithExercises,
  WorkoutPlanListItem,
  WorkoutPlanSearchResult,
} from "@/types/workoutPlan";

type UserContextType = {
  user: UserBase | null;
  isLoading: boolean;
  error: string | null;
  changeUserWeight: (newWeight: number) => Promise<void>;
  changeUserHeight: (newHeight: number) => Promise<void>;
  bodyStatsAndGoal: (data: BodyStatsAndGoalDataType) => Promise<void>;
};

type NutritionPlanContextType = {
  createNutritionPlan: (
    data: CreateNutritionPlanInput
  ) => Promise<NutritionPlanBase>;
  getNutritionPlan: (userId: string) => Promise<boolean>;
  isNutritionPlanLoading: boolean;
  nutritionPlanError: string | null;
  nutritionPlan: NutritionPlanBase | null;
};

type ExerciseContextType = {
  exercises: ExerciseBase[];
  createExercise: (exerciseInput: CreateExerciseInput) => Promise<ExerciseBase>;
  getExerciseById: (id: string) => ExerciseBase | undefined;
  getAllExercises: () => Promise<ExerciseBase[]>;
  updateExercise: (
    id: string,
    updateData: Partial<ExerciseBase>
  ) => Promise<void>;
  deleteExercise: (id: string) => void;
};

type MuscleGroupContextType = {
  muscleGroups: MuscleGroupBase[];
  createMuscleGroup: (
    muscleGroupInput: CreateMuscleGroupInput
  ) => MuscleGroupBase;
  getMuscleGroupById: (id: string) => MuscleGroupBase | undefined;
  getAllMuscleGroups: () => Promise<MuscleGroupBase[]>;
  updateMuscleGroup: (id: string, updateData: UpdateMuscleGroupInput) => void;
  deleteMuscleGroup: (id: string) => void;
};

type WorkoutPlanContextType = {
  workoutPlans: WorkoutPlanBase[];
  createWorkoutPlan: (
    input: CreateWorkoutPlanInput
  ) => Promise<WorkoutPlanBase>;
  getWorkoutPlanById: (id: string) => WorkoutPlanBase | undefined;
  getAllWorkoutPlans: () => Promise<WorkoutPlanBase[]>;
  updateWorkoutPlan: (
    input: UpdateWorkoutPlanInput
  ) => WorkoutPlanBase | undefined;
  deleteWorkoutPlan: (id: string) => void;
  getWorkoutPlanWithExercises: (
    id: string
  ) => WorkoutPlanWithExercises | undefined;
  getWorkoutPlanListItems: () => WorkoutPlanListItem[];
  searchWorkoutPlans: (query: string) => WorkoutPlanSearchResult[];
};

type AppContextType = UserContextType &
  NutritionPlanContextType &
  ExerciseContextType &
  WorkoutPlanContextType &
  MuscleGroupContextType & {
    isLoading: boolean;
  };

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const userContext = useUser();
  const nutritionPlanContext = useNutritionPlan();
  const exerciseContext = useExercise();
  const muscleGroupContext = useMuscleGroup();
  const workoutPlanContext = useWorkoutPlan();
  const [isLoading, setIsLoading] = useState(true);

  const { getAllMuscleGroups } = muscleGroupContext;
  const { getAllWorkoutPlans } = workoutPlanContext;
  const { getAllExercises } = exerciseContext;

  const loadAppData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        getAllMuscleGroups(),
        getAllWorkoutPlans(),
        getAllExercises(),
      ]);
    } catch (error) {
      console.error("Error loading app data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getAllMuscleGroups, getAllWorkoutPlans, getAllExercises]);

  useEffect(() => {
    loadAppData();
  }, [loadAppData]);

  const appContextValue = useMemo<AppContextType>(
    () => ({
      ...userContext,
      ...nutritionPlanContext,
      ...exerciseContext,
      ...muscleGroupContext,
      ...workoutPlanContext,
      isLoading:
        isLoading || userContext.isLoading || nutritionPlanContext.isLoading,
      isNutritionPlanLoading: nutritionPlanContext.isLoading,
      nutritionPlanError: nutritionPlanContext.error,
      nutritionPlan: nutritionPlanContext.nutritionPlan,
    }),
    [
      userContext,
      nutritionPlanContext,
      exerciseContext,
      muscleGroupContext,
      workoutPlanContext,
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
>>>>>>> dev
