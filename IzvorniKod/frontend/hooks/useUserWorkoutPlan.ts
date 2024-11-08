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
import { exercises as predefinedExercises } from "@/data/exercise";

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

// // Simulated API call for updating a user workout plan
// const updateUserWorkoutPlanAPI = async (
//   data: UpdateUserWorkoutPlanInput
// ): Promise<UserWorkoutPlanWithRelations> => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // Find the user workout plan to update
//   const index = initialUserWorkoutPlans.findIndex(
//     (plan) => plan.id === data.id
//   );

//   if (index === -1) {
//     throw new Error("User workout plan not found");
//   }

//   // Update the plan
//   const updatedPlan: UserWorkoutPlanWithRelations = {
//     ...initialUserWorkoutPlans[index],
//     ...data,
//     updatedAt: new Date(),
//   };

//   // In a real application, you would update this in the database
//   // For this simulation, we're just returning the updated plan
//   return updatedPlan;
// };

// apply workout plan to user
const applyWorkoutPlanToUserAPI = async (
  workoutPlanId: string,
  userId: string
): Promise<UserWorkoutPlanWithRelations | undefined> => {
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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newUserWorkoutPlan: UserWorkoutPlanBase = {
          id: `userWorkoutPlan${initialUserWorkoutPlans.length + 1}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: userId || "userId", // Replace with actual userId
        };

        const plan: UserWorkoutPlanWithRelations = {
          ...newUserWorkoutPlan,
          workoutPlan: workoutPlans.find(
            (plan) => plan.id === newUserWorkoutPlan.workoutPlanId
          ),
          userWorkouts: data.userWorkouts.map((workout) => ({
            ...workout,
            id: `userWorkout${initialUserWorkoutPlans.length + 1}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            exercises: workout.exercises.map((exercise) => ({
              ...exercise,
              id: `exercise${initialUserWorkoutPlans.length + 1}`,
              userWorkoutId: `userWorkout${initialUserWorkoutPlans.length + 1}`,
              createdAt: new Date(),
              updatedAt: new Date(),
              exercise: predefinedExercises.find(
                (e) => e.id === exercise.exerciseId
              ) || {
                id: exercise.exerciseId,
                name: "Exercise Name", // Replace with actual exercise name
                description: "Exercise Description", // Replace with actual exercise description
                createdById: "createdById", // Replace with actual createdById
                isApproved: true, // Replace with actual approval status
                categoryId: "categoryId", // Replace with actual categoryId
                primaryMuscleGroupId: ["primaryMuscleGroupId"], // Replace with actual primaryMuscleGroupId
                secondaryMuscleGroupId: "secondaryMuscleGroupId", // Replace with actual secondaryMuscleGroupId
                secondaryMuscleGroupIds: [], // Replace with actual secondaryMuscleGroupIds
                createdAt: new Date(), // Replace with actual createdAt
                updatedAt: new Date(), // Replace with actual updatedAt
              },
            })),
          })),
          workoutSessions: [],
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
    async (data: UpdateUserWorkoutPlanInput) => {
      setIsLoadingUserWorkoutPlan(true);
      setError(null);
      if (!userWorkoutPlan) {
        throw new Error("User workout plan not found");
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const prevPlan = userWorkoutPlan;

        console.log("Updating user workout plan:", data);

        const updatedPlan: UserWorkoutPlanWithRelations = {
          ...prevPlan,
          ...data,
          updatedAt: new Date(),
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
