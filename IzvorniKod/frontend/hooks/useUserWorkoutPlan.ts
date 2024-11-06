"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CreateUserWorkoutPlanInput,
  UserWorkoutPlanBase,
  UserWorkoutPlanWithRelations,
  UpdateUserWorkoutPlanInput,
} from "@/types/userWorkoutPlan";
import {
  userWorkoutPlans as initialUserWorkoutPlans,
  userWorkoutPlans,
} from "@/data/userWorkoutPlan";
import { workoutPlans } from "@/data/workoutPlan";
import { workoutsWithExercises } from "@/data/workout";
import { UserWorkoutWithUserPlannedExerciseBaseCreateInput } from "@/types/userWorkout";
import { CreatePlannedExerciseInputForUserWorkout } from "@/types/plannedExercise";
import { useAuthContext } from "@/contexts/AuthContext";

// Simulated API call for creating a new user workout plan
const createUserWorkoutPlanAPI = async (
  data: CreateUserWorkoutPlanInput
): Promise<UserWorkoutPlanWithRelations> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const newUserWorkoutPlan: UserWorkoutPlanBase = {
    id: `userWorkoutPlan${initialUserWorkoutPlans.length + 1}`,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // In a real application, you would add this to the database
  // For this simulation, we're just returning the new plan
  return {
    ...newUserWorkoutPlan,
    workoutPlan: workoutPlans.find(
      (plan) => plan.id === newUserWorkoutPlan.workoutPlanId
    ),
    userWorkouts: [],
    workoutSessions: [],
  };
};

const getUserWorkoutPlanAPI = async (
  userId: string
): Promise<UserWorkoutPlanWithRelations | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the user workout plan for the given user
  const userWorkoutPlan = initialUserWorkoutPlans.find(
    (plan) => plan.userId === userId
  );

  return userWorkoutPlan;
};

// Simulated API call for updating a user workout plan
const updateUserWorkoutPlanAPI = async (
  data: UpdateUserWorkoutPlanInput
): Promise<UserWorkoutPlanWithRelations> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the user workout plan to update
  const index = initialUserWorkoutPlans.findIndex(
    (plan) => plan.id === data.id
  );

  if (index === -1) {
    throw new Error("User workout plan not found");
  }

  // Update the plan
  const updatedPlan: UserWorkoutPlanWithRelations = {
    ...initialUserWorkoutPlans[index],
    ...data,
    updatedAt: new Date(),
  };

  // In a real application, you would update this in the database
  // For this simulation, we're just returning the updated plan
  return updatedPlan;
};

// apply workout plan to user
const applyWorkoutPlanToUserAPI = async (
  workoutPlanId: string,
  userId: string
): Promise<UserWorkoutPlanWithRelations | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const workoutPlan = workoutPlans.find((plan) => plan.id === workoutPlanId);
  // Find the workouts for the workout plan
  const workoutPlanWorkouts = workoutsWithExercises.filter(
    (workout) => workout.workoutPlanId === workoutPlanId
  );

  if (!workoutPlan) {
    return undefined;
  }

  const userWorkouts: UserWorkoutWithUserPlannedExerciseBaseCreateInput[] =
    workoutPlanWorkouts.map((workout) => {
      const userPlannedExercises: CreatePlannedExerciseInputForUserWorkout[] =
        workout.exercises.map((exercise) => {
          return {
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            rpe: exercise.reps,
            order: exercise.order,
          };
        });

      return {
        name: workout.name,
        order: workout.order,
        exercises: userPlannedExercises,
      };
    });

  const userWorkoutPlan: CreateUserWorkoutPlanInput = {
    name: workoutPlan.name,
    userId: userId,
    workoutPlanId: workoutPlanId,
    userWorkouts: userWorkouts,
  };

  console.log("User workout plan created:", userWorkoutPlan);

  return userWorkoutPlans[0];
};

export function useUserWorkoutPlan() {
  const [isLoadingUserWorkoutPlan, setIsLoadingUserWorkoutPlan] =
    useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userWorkoutPlan, setUserWorkoutPlan] =
    useState<UserWorkoutPlanWithRelations | null>(null);

  useEffect(() => {
    console.log("User Workout plan:", userWorkoutPlan);
  }, [userWorkoutPlan]);

  const { user } = useAuthContext();

  const userId = user?.id;

  const createUserWorkoutPlan = useCallback(
    async (data: CreateUserWorkoutPlanInput) => {
      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      try {
        const newUserWorkoutPlan = await createUserWorkoutPlanAPI(data);

        setUserWorkoutPlan(newUserWorkoutPlan);
        return newUserWorkoutPlan;
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
    async (data: UpdateUserWorkoutPlanInput) => {
      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      try {
        const updatedPlan = await updateUserWorkoutPlanAPI(data);
        setUserWorkoutPlan(updatedPlan);
        return updatedPlan;
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
    createUserWorkoutPlan,
    userWorkoutPlan,
    setUserWorkoutPlan,
    getUserWorkoutPlan,
    updateUserWorkoutPlan,
    applyWorkoutPlanToUser,
  } as UseUserWorkoutPlanType;
}

export type UseUserWorkoutPlanType = {
  isLoadingUserWorkoutPlan: boolean;
  error: string | null;
  createUserWorkoutPlan: (
    data: CreateUserWorkoutPlanInput
  ) => Promise<UserWorkoutPlanWithRelations>;
  userWorkoutPlan: UserWorkoutPlanWithRelations | null;
  setUserWorkoutPlan: React.Dispatch<
    React.SetStateAction<UserWorkoutPlanWithRelations | null>
  >;
  getUserWorkoutPlan: (userId: string) => Promise<boolean>;
  updateUserWorkoutPlan: (
    data: UpdateUserWorkoutPlanInput
  ) => Promise<UserWorkoutPlanWithRelations>;
  applyWorkoutPlanToUser: (
    workoutPlanId: string
  ) => Promise<UserWorkoutPlanWithRelations | undefined>;
};
