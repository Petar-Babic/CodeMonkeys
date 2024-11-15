import { useState, useCallback } from "react";
import {
  UserWorkoutWithUserPlannedExercise,
  CreateUserWorkoutInput,
  UpdateUserWorkoutInput,
  UserWorkoutWithUserPlannedExerciseWithoutCreatedAt,
} from "@/types/userWorkout";

export const useUserWorkout = () => {
  const [userWorkouts, setUserWorkouts] = useState<
    UserWorkoutWithUserPlannedExercise[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUserWorkout = useCallback(
    async (data: CreateUserWorkoutInput) => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated creation logic
        const newUserWorkout: UserWorkoutWithUserPlannedExercise = {
          id: `workout-${Date.now()}`,
          ...data,
          exercises: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUserWorkouts((prevWorkouts) => [...prevWorkouts, newUserWorkout]);
        return newUserWorkout;
      } catch (err) {
        setError("Failed to create user workout");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateUserWorkout = useCallback(
    async (data: UpdateUserWorkoutInput) => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated update logic
        const updatedUserWorkout: UserWorkoutWithUserPlannedExerciseWithoutCreatedAt =
          {
            ...data,
            exercises: [],
            updatedAt: new Date(),
          } as UserWorkoutWithUserPlannedExerciseWithoutCreatedAt;
        setUserWorkouts((prevWorkouts) =>
          prevWorkouts.map((workout) =>
            workout.id === updatedUserWorkout.id
              ? { ...workout, ...updatedUserWorkout }
              : workout
          )
        );
        return updatedUserWorkout;
      } catch (err) {
        setError("Failed to update user workout");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteUserWorkout = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      setUserWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.id !== id)
      );
    } catch (err) {
      setError("Failed to delete user workout");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserWorkoutById = useCallback(
    (id: string) => {
      return userWorkouts.find((workout) => workout.id === id);
    },
    [userWorkouts]
  );

  return {
    userWorkouts,
    isLoading,
    error,
    createUserWorkout,
    updateUserWorkout,
    deleteUserWorkout,
    getUserWorkoutById,
  };
};

export type UseUserWorkoutType = ReturnType<typeof useUserWorkout>;
