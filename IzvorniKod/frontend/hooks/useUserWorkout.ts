import { useState, useCallback } from "react";
import {
  UserWorkoutWithUserPlannedExercise,
  CreateUserWorkoutInput,
  UpdateUserWorkoutInput,
  UserWorkoutWithUserPlannedExerciseWithoutCreatedAt,
} from "@/types/userWorkout";

// Simulated API calls
const createUserWorkoutAPI = async (
  data: CreateUserWorkoutInput
): Promise<UserWorkoutWithUserPlannedExercise> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated creation logic
  const newUserWorkout: UserWorkoutWithUserPlannedExercise = {
    id: `workout-${Date.now()}`,
    ...data,
    exercises: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newUserWorkout;
};

const updateUserWorkoutAPI = async (
  data: UpdateUserWorkoutInput
): Promise<UserWorkoutWithUserPlannedExerciseWithoutCreatedAt> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated update logic
  const updatedUserWorkout: UserWorkoutWithUserPlannedExerciseWithoutCreatedAt =
    {
      ...data,
      exercises: [],
      updatedAt: new Date(),
    } as UserWorkoutWithUserPlannedExerciseWithoutCreatedAt;

  return updatedUserWorkout;
};

const deleteUserWorkoutAPI = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated deletion logic
  console.log(`User workout with id ${id} deleted`);
};

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
        const newUserWorkout = await createUserWorkoutAPI(data);
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
        const updatedUserWorkout = await updateUserWorkoutAPI(data);
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
      await deleteUserWorkoutAPI(id);
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
