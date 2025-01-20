import { useState, useCallback } from "react";
import {
  WorkoutPlanBase,
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";

export const useWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanBase[]>([]);

  const createWorkoutPlan = useCallback(
    async (input: CreateWorkoutPlanInput): Promise<WorkoutPlanBase> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated logic (replace with actual API call)
        const newWorkoutPlan: WorkoutPlanBase = {
          id: Date.now(),
          name: input.name,
          userId: input.userId,
          createdById: 1,
        };
        setWorkoutPlans((prevPlans) => [...prevPlans, newWorkoutPlan]);
        return newWorkoutPlan;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create workout plan");
      }
    },
    []
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
