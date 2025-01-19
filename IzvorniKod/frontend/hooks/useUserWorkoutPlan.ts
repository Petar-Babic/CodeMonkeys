"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CreateWorkoutPlanInput,
  WorkoutPlanWithWorkouts,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { userWorkoutPlans as initialUserWorkoutPlans } from "@/data/userWorkoutPlan";
import { useAuthContext } from "@/contexts/AuthContext";
import { exercises } from "@/data/exercise";

const getUserWorkoutPlanAPI = async (
  userId: string
): Promise<WorkoutPlanWithWorkouts | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the user workout plan for the given user
  const userWorkoutPlan = initialUserWorkoutPlans.find(
    (plan) => plan.userId === userId
  );

  console.log("User workout plan found:", userWorkoutPlan);

  return userWorkoutPlan;
};

export function useUserWorkoutPlan() {
  const [isLoadingUserWorkoutPlan, setIsLoadingUserWorkoutPlan] =
    useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userWorkoutPlan, setUserWorkoutPlan] =
    useState<WorkoutPlanWithWorkouts | null>(null);

  useEffect(() => {
    console.log("User Workout plan:", userWorkoutPlan);
  }, [userWorkoutPlan]);

  const { user } = useAuthContext();

  const userId = user?.id;

  const createUserWorkoutPlan = useCallback(
    async (data: CreateWorkoutPlanInput) => {
      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const plan: WorkoutPlanWithWorkouts = {
          ...data,
          id: `userWorkoutPlan${initialUserWorkoutPlans.length + 1}`,
          createdById: userId || "",
          workouts: data.workouts.map((workout, index) => ({
            ...workout,
            id: `workout${index + 1}`,
            workoutPlanId: `userWorkoutPlan${
              initialUserWorkoutPlans.length + 1
            }`,
            exercises: workout.exercises.map((exercise, i) => ({
              ...exercise,
              id: `exercise${i + 1}`,
              workoutId: `workout${index + 1}`,
            })),
          })),
        };

        setUserWorkoutPlan(plan);
        return plan;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      } finally {
        setIsLoadingUserWorkoutPlan(false);
      }
    },
    []
  );

  const getUserWorkoutPlan = useCallback(async (userId: string) => {
    setIsLoadingUserWorkoutPlan(true);
    setError(null);
    try {
      const plan = await getUserWorkoutPlanAPI(userId);
      if (plan) {
        setUserWorkoutPlan(plan);
      }
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoadingUserWorkoutPlan(false);
    }
  }, []);

  const updateUserWorkoutPlan = useCallback(
    async (data: UpdateWorkoutPlanInput) => {
      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      if (!userWorkoutPlan) {
        throw new Error("User workout plan not found");
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const prevPlan = userWorkoutPlan;

        console.log("Updating user workout plan:", data);

        const updatedPlan: WorkoutPlanWithWorkouts = {
          ...prevPlan,
          ...data,
          workouts: data.workouts.map((workout) => {
            return {
              id: workout.id,
              name:
                workout.name ||
                prevPlan.workouts.find((w) => w.id === workout.id)?.name ||
                "",
              description: workout.description || "",
              workoutPlanId: userWorkoutPlan.id,
              order: workout.order || 0,
              exercises: workout.exercises
                .filter((exercise) => Boolean(exercise.exerciseId))
                .map((exercise) => ({
                  id: exercise.id,
                  workoutId: workout.id,
                  exerciseId: exercise.exerciseId!,
                  sets: exercise.sets || 0,
                  reps: exercise.reps || 0,
                  rpe: exercise.rpe || 0,
                  order: exercise.order || 0,
                  exercise: exercises.find(
                    (e) => e.id === exercise.exerciseId
                  )!,
                })),
            };
          }),
        };

        setUserWorkoutPlan(updatedPlan);
        return updatedPlan;
      } catch (err) {
        console.error("Error updating user workout plan:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      } finally {
        setIsLoadingUserWorkoutPlan(false);
      }
    },
    [userWorkoutPlan]
  );

  return {
    isLoadingUserWorkoutPlan,
    error,
    setUserWorkoutPlan,
    createUserWorkoutPlan,
    userWorkoutPlan,
    getUserWorkoutPlan,
    updateUserWorkoutPlan,
  } as UseUserWorkoutPlanType;
}

export type UseUserWorkoutPlanType = {
  isLoadingUserWorkoutPlan: boolean;
  error: string | null;
  createUserWorkoutPlan: (
    data: CreateWorkoutPlanInput
  ) => Promise<WorkoutPlanWithWorkouts>;
  userWorkoutPlan: WorkoutPlanWithWorkouts | null;
  setUserWorkoutPlan: React.Dispatch<
    React.SetStateAction<WorkoutPlanWithWorkouts | null>
  >;
  getUserWorkoutPlan: (userId: string) => Promise<boolean>;
  updateUserWorkoutPlan: (
    data: UpdateWorkoutPlanInput
  ) => Promise<WorkoutPlanWithWorkouts>;
};
