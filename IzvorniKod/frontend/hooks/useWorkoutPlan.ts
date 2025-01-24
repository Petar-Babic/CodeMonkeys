import { useState, useCallback, useEffect } from "react";
import {
  WorkoutPlanBase,
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { useAuthContext } from "@/contexts/AuthContext";
import { backendUrl } from "@/data/backendUrl";
import { useFile } from "@/hooks/useFile";

export const useWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanBase[]>([]);

  const { user } = useAuthContext();
  const { deleteFile } = useFile();

  const userId = user?.id;

  useEffect(() => {
    console.log("workoutPlans", workoutPlans);
  }, [workoutPlans]);

  const createWorkoutPlan = useCallback(
    async (input: CreateWorkoutPlanInput): Promise<WorkoutPlanBase> => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token is not set");
        }

        const workoutPlanForm = {
          ...input,
          createdByUserId: userId,
        };

        console.log("workoutPlanForm", workoutPlanForm);

        const res = await fetch(`${backendUrl}/api/create-workout-plan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(workoutPlanForm),
        });

        console.log("res", res);

        const newWorkoutPlan = await res.json();

        console.log("newWorkoutPlan", newWorkoutPlan);

        setWorkoutPlans((prevPlans) => [...prevPlans, newWorkoutPlan]);
        return newWorkoutPlan;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create workout plan");
      }
    },
    [userId]
  );

  const getWorkoutPlanById = useCallback(
    (id: number): WorkoutPlanBase | undefined => {
      return workoutPlans.find((plan) => plan.id === id);
    },
    [workoutPlans]
  );

  const updateWorkoutPlan = useCallback(
    async (
      input: UpdateWorkoutPlanInput
    ): Promise<WorkoutPlanBase | undefined> => {
      let updatedPlan: WorkoutPlanBase | undefined;

      setWorkoutPlans((prevPlans) =>
        prevPlans.map((plan) => {
          if (plan.id === input.id) {
            updatedPlan = {
              ...plan,
              ...input,
            };
            return updatedPlan;
          }
          return plan;
        })
      );

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token is not set");
      }

      console.log("updateWorkoutPlan input", input);

      await fetch(`${backendUrl}/api/workout-plans/${input.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(input),
      });

      return updatedPlan;
    },
    []
  );

  const deleteWorkoutPlan = useCallback(
    async (id: number): Promise<void> => {
      setWorkoutPlans(workoutPlans.filter((plan) => plan.id !== id));

      const workoutPlan = workoutPlans.find((plan) => plan.id === id);
      if (workoutPlan && workoutPlan.image) {
        await deleteFile(workoutPlan.image);
      }

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token is not set");
      }
      await fetch(`${backendUrl}/api/workout-plans/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    [deleteFile, workoutPlans]
  );

  return {
    workoutPlans,
    setWorkoutPlans,
    createWorkoutPlan,
    getWorkoutPlanById,
    updateWorkoutPlan,
    deleteWorkoutPlan,
  } as UseWorkoutPlanContextType;
};

export type UseWorkoutPlanContextType = {
  workoutPlans: WorkoutPlanBase[];
  setWorkoutPlans: (workoutPlans: WorkoutPlanBase[]) => void;
  createWorkoutPlan: (
    input: CreateWorkoutPlanInput
  ) => Promise<WorkoutPlanBase>;
  getWorkoutPlanById: (id: number) => WorkoutPlanBase | undefined;
  updateWorkoutPlan: (
    input: UpdateWorkoutPlanInput
  ) => Promise<WorkoutPlanBase | undefined>;
  deleteWorkoutPlan: (id: number) => Promise<void>;
  workoutPlansLoading: boolean;
};
