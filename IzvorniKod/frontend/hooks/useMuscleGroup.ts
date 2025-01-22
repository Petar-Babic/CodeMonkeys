import { useState, useCallback } from "react";
import {
  MuscleGroupBase,
  CreateMuscleGroupInput,
  UpdateMuscleGroupInput,
} from "@/types/muscleGroup";
import { muscleGroups as predefinedMuscleGroups } from "@/data/muscleGroup";
import { backendUrl } from "@/data/backendUrl";
// Predefined muscle groups

export const useMuscleGroup = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupBase[]>(
    predefinedMuscleGroups
  );

  const createMuscleGroup = useCallback(
    async (muscleGroupInput: CreateMuscleGroupInput) => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${backendUrl}/api/create-muscle-group`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(muscleGroupInput),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error creating muscle group");
      }
      console.log("data", data);

      setMuscleGroups((prevMuscleGroups) => [...prevMuscleGroups, data]);
      return data;
    },
    []
  );

  const getMuscleGroupById = useCallback(async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backendUrl}/api/muscle-groups/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error getting muscle group");
    }
    return data;
  }, []);

  const getAllMuscleGroups = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backendUrl}/api/all-muscle-groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error getting muscle groups");
    }
    return data;
  }, []);

  const updateMuscleGroup = useCallback(
    async (updateData: UpdateMuscleGroupInput) => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${backendUrl}/api/muscle-groups/${updateData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error updating muscle group");
      }
      console.log("data", data);
      setMuscleGroups((prevMuscleGroups) =>
        prevMuscleGroups.map((muscleGroup) =>
          muscleGroup.id === updateData.id
            ? { ...muscleGroup, ...data }
            : muscleGroup
        )
      );
    },
    []
  );

  const deleteMuscleGroup = useCallback(async (id: number) => {
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
  ) => Promise<MuscleGroupBase>;
  getMuscleGroupById: (id: number) => Promise<MuscleGroupBase>;
  getAllMuscleGroups: () => Promise<MuscleGroupBase[]>;
  updateMuscleGroup: (updateData: UpdateMuscleGroupInput) => Promise<void>;
  deleteMuscleGroup: (id: number) => Promise<void>;
};
