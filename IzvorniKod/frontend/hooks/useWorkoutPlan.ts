import { useState, useCallback } from "react";
import {
  WorkoutPlanBase,
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { workoutPlans as predefinedWorkoutPlans } from "@/data/workoutPlan";

export const useWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanBase[]>([]);

  const [workoutPlansLoading, setWorkoutPlansLoading] = useState(false);

  const createWorkoutPlan = useCallback(
    async (input: CreateWorkoutPlanInput): Promise<WorkoutPlanBase> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated logic (replace with actual API call)
        const newWorkoutPlan: WorkoutPlanBase = {
          id: Date.now().toString(),
          name: input.name,
          userId: input.userId,
          createdById: input.createdById,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    (id: string): WorkoutPlanBase | undefined => {
      return workoutPlans.find((plan) => plan.id === id);
    },
    [workoutPlans]
  );

  const getAllWorkoutPlans = useCallback(async (): Promise<
    WorkoutPlanBase[]
  > => {
    setWorkoutPlansLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const plans = predefinedWorkoutPlans;
    setWorkoutPlans(plans);
    console.log("Plans", plans);
    setWorkoutPlansLoading(false);
    return plans;
  }, []);

  const updateWorkoutPlan = useCallback(
    (input: UpdateWorkoutPlanInput): WorkoutPlanBase | undefined => {
      let updatedPlan: WorkoutPlanBase | undefined;

      setWorkoutPlans((prevPlans) =>
        prevPlans.map((plan) => {
          if (plan.id === input.id) {
            updatedPlan = {
              ...plan,
              ...input,
              updatedAt: new Date(),
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

  const deleteWorkoutPlan = useCallback((id: string): void => {
    setWorkoutPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  }, []);

  return {
    workoutPlans,
    setWorkoutPlans,
    createWorkoutPlan,
    getWorkoutPlanById,
    getAllWorkoutPlans,
    updateWorkoutPlan,
    deleteWorkoutPlan,
    workoutPlansLoading,
  } as UseWorkoutPlanContextType;
};

export type UseWorkoutPlanContextType = {
  workoutPlans: WorkoutPlanBase[];
  setWorkoutPlans: (workoutPlans: WorkoutPlanBase[]) => void;
  createWorkoutPlan: (
    input: CreateWorkoutPlanInput
  ) => Promise<WorkoutPlanBase>;
  getWorkoutPlanById: (id: string) => WorkoutPlanBase | undefined;
  getAllWorkoutPlans: () => Promise<WorkoutPlanBase[]>;
  updateWorkoutPlan: (
    input: UpdateWorkoutPlanInput
  ) => WorkoutPlanBase | undefined;
  deleteWorkoutPlan: (id: string) => void;
  workoutPlansLoading: boolean;
};
