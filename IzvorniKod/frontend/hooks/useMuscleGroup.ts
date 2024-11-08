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
        id: Date.now().toString(), // Generate a unique ID (in a real app, this would be handled by the backend)
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
    (id: string) => {
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
    (id: string, updateData: UpdateMuscleGroupInput) => {
      setMuscleGroups((prevMuscleGroups) =>
        prevMuscleGroups.map((muscleGroup) =>
          muscleGroup.id === id
            ? { ...muscleGroup, ...updateData, updatedAt: new Date() }
            : muscleGroup
        )
      );
    },
    []
  );

  const deleteMuscleGroup = useCallback((id: string) => {
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
  getMuscleGroupById: (id: string) => MuscleGroupBase | undefined;
  getAllMuscleGroups: () => Promise<MuscleGroupBase[]>;
  updateMuscleGroup: (id: string, updateData: UpdateMuscleGroupInput) => void;
  deleteMuscleGroup: (id: string) => void;
};
