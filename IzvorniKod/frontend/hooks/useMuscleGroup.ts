import { useState, useCallback, useEffect } from "react";
import {
  MuscleGroupBase,
  CreateMuscleGroupInput,
  UpdateMuscleGroupInput,
} from "@/types/muscleGroup";
import { muscleGroups as predefinedMuscleGroups } from "@/data/muscleGroup";
// Predefined muscle groups

// fetch all muscle groups
const getMuscleGroupsAPI = async (): Promise<MuscleGroupBase[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  return predefinedMuscleGroups;
};

export const useMuscleGroup = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupBase[]>(
    predefinedMuscleGroups
  );

  useEffect(() => {
    console.log("Muscle Groups:", muscleGroups);
  }, [muscleGroups]);

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
    const muscleGroups = await getMuscleGroupsAPI();
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
    createMuscleGroup,
    getMuscleGroupById,
    getAllMuscleGroups,
    updateMuscleGroup,
    deleteMuscleGroup,
  };
};