import { useState, useCallback } from "react";
import {
  MuscleGroupBase,
  CreateMuscleGroupInput,
  UpdateMuscleGroupInput,
} from "@/types/muscleGroup";
import { muscleGroups as predefinedMuscleGroups } from "@/data/muscleGroup";
// Predefined muscle groups

export const useMuscleGroup = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupBase[]>(
    predefinedMuscleGroups
  );

  const createMuscleGroup = useCallback(
    (muscleGroupInput: CreateMuscleGroupInput) => {
      const newMuscleGroup: MuscleGroupBase = {
        ...muscleGroupInput,
        id: Math.random(), // Generate a unique ID (in a real app, this would be handled by the backend)
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMuscleGroups((prevMuscleGroups) => [
        ...prevMuscleGroups,
        newMuscleGroup,
      ]);
      return newMuscleGroup;
    },
    []
  );

  const getMuscleGroupById = useCallback(
    (id: number) => {
      return muscleGroups.find((muscleGroup) => muscleGroup.id === id);
    },
    [muscleGroups]
  );

  const getAllMuscleGroups = useCallback(async () => {
    const muscleGroups = predefinedMuscleGroups;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMuscleGroups(muscleGroups);
    return muscleGroups;
  }, []);

  const updateMuscleGroup = useCallback(
    (updateData: UpdateMuscleGroupInput) => {
      setMuscleGroups((prevMuscleGroups) =>
        prevMuscleGroups.map((muscleGroup) =>
          muscleGroup.id === updateData.id
            ? { ...muscleGroup, ...updateData, updatedAt: new Date() }
            : muscleGroup
        )
      );
    },
    []
  );

  const deleteMuscleGroup = useCallback((id: number) => {
    setMuscleGroups((prevMuscleGroups) =>
      prevMuscleGroups.filter((muscleGroup) => muscleGroup.id !== id)
    );
  }, []);

  return {
    muscleGroups,
    setMuscleGroups,
    createMuscleGroup,
    getMuscleGroupById,
    getAllMuscleGroups,
    updateMuscleGroup,
    deleteMuscleGroup,
  } as UseMuscleGroupContextType;
};

export type UseMuscleGroupContextType = {
  muscleGroups: MuscleGroupBase[];
  setMuscleGroups: (muscleGroups: MuscleGroupBase[]) => void;
  createMuscleGroup: (
    muscleGroupInput: CreateMuscleGroupInput
  ) => MuscleGroupBase;
  getMuscleGroupById: (id: number) => MuscleGroupBase | undefined;
  getAllMuscleGroups: () => Promise<MuscleGroupBase[]>;
  updateMuscleGroup: (updateData: UpdateMuscleGroupInput) => void;
  deleteMuscleGroup: (id: number) => void;
};
