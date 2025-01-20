import { useState, useCallback, useMemo, useEffect } from "react";
import { ExerciseBase, CreateExerciseInput } from "@/types/exercise";
import { exercises as predefinedExercises } from "@/data/exercise";
import { useUser } from "./useUser";

// Simulated API call for creating a new exercise
const createExerciseAPI = async (
  data: CreateExerciseInput
): Promise<ExerciseBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const newExercise: ExerciseBase = {
    id: Math.random(),
    ...data,
    isApproved: false,
  };

  // Update local storage
  const exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
  exercises.push(newExercise);
  localStorage.setItem("exercises", JSON.stringify(exercises));

  return newExercise;
};

// Simulated API call for updating an exercise
const updateExerciseAPI = async (
  id: number,
  data: Partial<ExerciseBase>
): Promise<ExerciseBase> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  const exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
  const updatedExercise = exercises.find(
    (exercise: ExerciseBase) => exercise.id === id
  );

  if (!updatedExercise) {
    throw new Error("Exercise not found");
  }

  Object.assign(updatedExercise, data);
  updatedExercise.updatedAt = new Date();

  // Update local storage
  localStorage.setItem("exercises", JSON.stringify(exercises));

  return updatedExercise;
};

// Simulated API call for getting all exercises that are approved or this user created
const getExercisesAPI = async (
  userId: number | null
): Promise<ExerciseBase[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  return predefinedExercises.filter(
    (exercise: ExerciseBase) =>
      exercise.isApproved || exercise.createdById === userId
  );
};

export const useExercise = () => {
  const [exercises, setExercises] = useState<ExerciseBase[]>([]);
  const { user } = useUser();

  const userId = useMemo(() => user?.id ?? null, [user?.id]);

  const getAllExercises = useCallback(async () => {
    const fetchedExercises = await getExercisesAPI(userId);
    setExercises(fetchedExercises);
    return fetchedExercises;
  }, [userId]);

  const createExercise = useCallback(
    async (exerciseInput: CreateExerciseInput) => {
      const res = await createExerciseAPI(exerciseInput);
      const newExercise = {
        ...res,
        createdById: userId ?? 0,
      };
      setExercises((prevExercises) => [...prevExercises, newExercise]);
      return newExercise;
    },
    [userId]
  );

  const getExerciseById = useCallback(
    (id: number) => exercises.find((exercise) => exercise.id === id),
    [exercises]
  );

  const updateExercise = useCallback(
    async (id: number, updateData: Partial<ExerciseBase>) => {
      const res = await updateExerciseAPI(id, updateData);
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === id ? { ...exercise, ...res } : exercise
        )
      );
    },
    []
  );

  const deleteExercise = useCallback((id: number) => {
    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  }, []);

  return {
    exercises,
    setExercises,
    createExercise,
    getExerciseById,
    getAllExercises,
    updateExercise,
    deleteExercise,
  } as UseExerciseContextType;
};

export type UseExerciseContextType = {
  exercises: ExerciseBase[];
  setExercises: (exercises: ExerciseBase[]) => void;
  createExercise: (exerciseInput: CreateExerciseInput) => Promise<ExerciseBase>;
  getExerciseById: (id: number) => ExerciseBase | undefined;
  getAllExercises: () => Promise<ExerciseBase[]>;
  updateExercise: (
    id: number,
    updateData: Partial<ExerciseBase>
  ) => Promise<void>;
  deleteExercise: (id: number) => void;
};
