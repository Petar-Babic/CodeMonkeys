"use client";

import { useState, useCallback } from "react";
import {
  CreateWorkoutPlanInput,
  WorkoutPlanWithWorkouts,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { userWorkoutPlans as initialUserWorkoutPlans } from "@/data/userWorkoutPlan";
import { useAuthContext } from "@/contexts/AuthContext";
import { exercises } from "@/data/exercise";
import { backendUrl } from "@/data/backendUrl";

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
  const { user } = useAuthContext();

  const createUserWorkoutPlan = useCallback(
    async (data: CreateWorkoutPlanInput) => {
      console.log("data for createUserWorkoutPlan", data);

      console.log("user in createUserWorkoutPlan", user);

      const dataSend = {
        ...data,
        userId: user?.id,
        createdById: user?.id,
      };

      console.log("dataSend", dataSend);

      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token available");
        }

        const response = await fetch(`${backendUrl}/api/create-workout-plan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(dataSend),
        });

        const plan = await response.json();

        console.log("plan", plan);

        // const plan: WorkoutPlanWithWorkouts = {
        //   ...data,
        //   id: `userWorkoutPlan${initialUserWorkoutPlans.length + 1}`,
        //   createdById: user?.id || "",
        //   userId: user?.id,
        //   workouts: data.workouts.map((workout, index) => ({
        //     ...workout,
        //     id: `workout${index + 1}`,
        //     workoutPlanId: `userWorkoutPlan${
        //       initialUserWorkoutPlans.length + 1
        //     }`,
        //     exercises: workout.exercises.map((exercise, i) => ({
        //       ...exercise,
        //       id: `exercise${i + 1}`,
        //       workoutId: `workout${index + 1}`,
        //     })),
        //   })),
        // };

        console.log("plan", plan);

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
    [user]
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
              workoutPlanId: Number(userWorkoutPlan.id),
              order: workout.order || 0,
              exercises: workout.exercises
                .filter((exercise) => Boolean(exercise.exerciseId))
                .map((exercise) => ({
                  id: exercise.id,
                  workoutId: Number(workout.id),
                  exerciseId: Number(exercise.exerciseId),
                  sets: Number(exercise.sets),
                  reps: Number(exercise.reps),
                  rpe: Number(exercise.rpe),
                  order: Number(exercise.order),
                  exercise: exercises.find(
                    (e) => e.id === Number(exercise.exerciseId)
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
