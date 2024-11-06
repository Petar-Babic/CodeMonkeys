import { useState, useCallback } from "react";
import {
  WorkoutPlanBase,
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { workoutPlans as predefinedWorkoutPlans } from "@/data/workoutPlan";

// Simulated API call for creating a new workout plan
const createWorkoutPlanAPI = async (
  input: CreateWorkoutPlanInput
): Promise<WorkoutPlanBase> => {
  // Simulate API delay
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

  return newWorkoutPlan;
};

// Simulated API call for getting all workout plans
const getWorkoutPlansAPI = async (): Promise<WorkoutPlanBase[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Getting all workout plans", predefinedWorkoutPlans);

  return predefinedWorkoutPlans;
};

export const useWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanBase[]>([]);

  const [workoutPlansLoading, setWorkoutPlansLoading] = useState(false);

  const createWorkoutPlan = useCallback(
    async (input: CreateWorkoutPlanInput): Promise<WorkoutPlanBase> => {
      const newWorkoutPlan = await createWorkoutPlanAPI(input);
      setWorkoutPlans((prevPlans) => [...prevPlans, newWorkoutPlan]);
      return newWorkoutPlan;
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
    const plans = await getWorkoutPlansAPI();
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
