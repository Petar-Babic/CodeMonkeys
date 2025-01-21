import { useState, useCallback } from "react";
import {
  WorkoutPlanBase,
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { useAuthContext } from "@/contexts/AuthContext";
import { backendUrl } from "@/data/backendUrl";

export const useWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanBase[]>([]);

  const { user } = useAuthContext();

  const userId = user?.id;

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
    (input: UpdateWorkoutPlanInput): WorkoutPlanBase | undefined => {
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

      return updatedPlan;
    },
    []
  );

  const deleteWorkoutPlan = useCallback((id: number): void => {
    setWorkoutPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  }, []);

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
  ) => WorkoutPlanBase | undefined;
  deleteWorkoutPlan: (id: number) => void;
  workoutPlansLoading: boolean;
};
