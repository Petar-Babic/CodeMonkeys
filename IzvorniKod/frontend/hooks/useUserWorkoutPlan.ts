"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CreateWorkoutPlanInput,
  WorkoutPlanWithWorkouts,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import {
  userWorkoutPlans as initialUserWorkoutPlans,
  userWorkoutPlans,
} from "@/data/userWorkoutPlan";
import { workoutPlans } from "@/data/workoutPlan";
import { workoutsWithExercises } from "@/data/workout";
import { WorkoutWithPlannedExerciseBaseCreateInput } from "@/types/workout";
import {
  CreatePlannedExerciseInputForUserWorkout,
  CreatePlannedExerciseInput,
} from "@/types/plannedExercise";
import { useAuthContext } from "@/contexts/AuthContext";

const getUserWorkoutPlanAPI = async (
  userId: string
): Promise<WorkoutPlanWithWorkouts | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the user workout plan for the given user
  const userWorkoutPlan = initialUserWorkoutPlans.find(
    (plan) => plan.userId === userId
  );

  return userWorkoutPlan;
};

// apply workout plan to user
const applyWorkoutPlanToUserAPI = async (
  workoutPlanId: string,
  userId: string
): Promise<WorkoutPlanWithWorkouts | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Applying workout plan to user:", workoutPlanId, userId);

  const workoutPlan = workoutPlans.find((plan) => plan.id === workoutPlanId);
  // Find the workouts for the workout plan
  const workoutPlanWorkouts = workoutsWithExercises.filter(
    (workout) => workout.workoutPlanId === workoutPlanId
  );

  if (!workoutPlan) {
    return undefined;
  }

  const userWorkouts: WorkoutWithPlannedExerciseBaseCreateInput[] =
    workoutPlanWorkouts.map((workout) => {
      const userPlannedExercises: CreatePlannedExerciseInput[] =
        workout.exercises.map((exercise) => {
          const exerciseInput: CreatePlannedExerciseInputForUserWorkout = {
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            rpe: exercise.reps,
            order: exercise.order,
          };
          return {
            ...exerciseInput,
            workoutId: workout.id,
          };
        });

      return {
        name: workout.name,
        order: workout.order,
        description: workout.description || "",
        exercises: userPlannedExercises,
      };
    });

  const userWorkoutPlan: CreateWorkoutPlanInput = {
    name: workoutPlan.name,
    workouts: userWorkouts,
  };

  console.log("User workout plan created:", userWorkoutPlan);

  return userWorkoutPlans[0];
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
              exercise: {
                id: exercise.exerciseId,
                name: "",
                createdById: "",
                isApproved: false,
                primaryMuscleGroupsIds: [],
                secondaryMuscleGroupsIds: [],
              },
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
                  exercise: {
                    id: exercise.exerciseId!,
                    name: "",
                    createdById: "",
                    isApproved: false,
                    primaryMuscleGroupsIds: [],
                    secondaryMuscleGroupsIds: [],
                  },
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

  const applyWorkoutPlanToUser = useCallback(
    async (workoutPlanId: string) => {
      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      try {
        if (!userId) {
          console.log("User ID is not available");
          throw new Error("User ID is not available");
        }
        const userWorkoutPlan = await applyWorkoutPlanToUserAPI(
          workoutPlanId,
          userId
        );
        if (userWorkoutPlan) {
          setUserWorkoutPlan(userWorkoutPlan);
        }
        return userWorkoutPlan;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      } finally {
        setIsLoadingUserWorkoutPlan(false);
      }
    },
    [userId]
  );

  return {
    isLoadingUserWorkoutPlan,
    error,
    setUserWorkoutPlan,
    createUserWorkoutPlan,
    userWorkoutPlan,
    getUserWorkoutPlan,
    updateUserWorkoutPlan,
    applyWorkoutPlanToUser,
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
  applyWorkoutPlanToUser: (
    workoutPlanId: string
  ) => Promise<WorkoutPlanWithWorkouts | undefined>;
};
