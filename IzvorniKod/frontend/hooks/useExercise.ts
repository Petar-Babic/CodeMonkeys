import { useState, useCallback } from "react";
import { ExerciseBase, CreateExerciseInput } from "@/types/exercise";
import { backendUrl } from "@/data/backendUrl";

export const useExercise = () => {
  const [exercises, setExercises] = useState<ExerciseBase[]>([]);

  const createExercise = useCallback(
    async (exerciseInput: CreateExerciseInput) => {
      const token = localStorage.getItem("accessToken");

      console.log("exerciseInput", exerciseInput);

      const res = await fetch(`${backendUrl}/api/create-exercise`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseInput),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error creating exercise");
      }
      console.log("data", data);
      setExercises((prevExercises) => [...prevExercises, data]);
      return data;
    },
    []
  );

  const getExerciseById = useCallback(async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backendUrl}/api/exercises/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }, []);

  const updateExercise = useCallback(
    async (id: number, updateData: Partial<ExerciseBase>) => {
      const token = localStorage.getItem("accessToken");

      console.log("updateData", updateData);

      const res = await fetch(`${backendUrl}/api/exercises/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error updating exercise");
      }
      console.log("data", data);
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === id ? { ...exercise, ...data } : exercise
        )
      );
    },
    []
  );

  const deleteExercise = useCallback(async (id: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      await fetch(`${backendUrl}/api/exercises/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise.id !== id)
      );
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  }, []);

  return {
    exercises,
    setExercises,
    createExercise,
    getExerciseById,
    updateExercise,
    deleteExercise,
  } as UseExerciseContextType;
};

export type UseExerciseContextType = {
  exercises: ExerciseBase[];
  setExercises: (exercises: ExerciseBase[]) => void;
  createExercise: (exerciseInput: CreateExerciseInput) => Promise<ExerciseBase>;
  getExerciseById: (id: number) => Promise<ExerciseBase>;
  updateExercise: (
    id: number,
    updateData: Partial<ExerciseBase>
  ) => Promise<void>;
  deleteExercise: (id: number) => Promise<void>;
};
