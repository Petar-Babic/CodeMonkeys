import { useState, useCallback, useEffect } from "react";
import {
  WorkoutPlanBase,
  WorkoutPlanWithExercises,
  CreateWorkoutPlanInput,
  UpdateWorkoutPlanInput,
  WorkoutPlanListItem,
  WorkoutPlanSearchResult,
} from "@/types/workoutPlan";
import { UserBase } from "@/types/user";
import { workoutPlans as predefinedWorkoutPlans } from "@/data/workoutPlan";

// Simulated user data for the created by field
const sampleUser: Pick<UserBase, "id" | "name"> = {
  id: "user1",
  name: "John Doe",
};

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
    description: input.description || null,
    image: input.image || null,
    userId: input.userId,
    trainerId: input.trainerId || null,
    createdById: input.createdById,
    isApproved: input.isApproved || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newWorkoutPlan;
};

// Simulated API call for getting all workout plans
const getWorkoutPlansAPI = async (): Promise<WorkoutPlanBase[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated logic (replace with actual API call)
  return predefinedWorkoutPlans;
};

export const useWorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanBase[]>([]);

  useEffect(() => {
    console.log("Workout Plans:", workoutPlans);
  }, [workoutPlans]);

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
    const plans = await getWorkoutPlansAPI();
    setWorkoutPlans(plans);
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

  const getWorkoutPlanWithExercises = useCallback(
    (id: string): WorkoutPlanWithExercises | undefined => {
      const plan = workoutPlans.find((plan) => plan.id === id);
      if (!plan) return undefined;

      // In a real application, you would fetch the exercises from your backend
      // For this example, we'll just return an empty array
      return {
        ...plan,
        exercises: [],
      };
    },
    [workoutPlans]
  );

  const getWorkoutPlanListItems = useCallback((): WorkoutPlanListItem[] => {
    return workoutPlans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      image: plan.image,
      isApproved: plan.isApproved,
      createdAt: plan.createdAt,
      exerciseCount: 0, // In a real app, you would get this from your backend
      createdBy: sampleUser, // In a real app, you would get this from your backend
    }));
  }, [workoutPlans]);

  const searchWorkoutPlans = useCallback(
    (query: string): WorkoutPlanSearchResult[] => {
      return workoutPlans
        .filter(
          (plan) =>
            plan.name.toLowerCase().includes(query.toLowerCase()) ||
            (plan.description &&
              plan.description.toLowerCase().includes(query.toLowerCase()))
        )
        .map((plan) => ({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          image: plan.image,
          exerciseCount: 0, // In a real app, you would get this from your backend
          createdBy: sampleUser, // In a real app, you would get this from your backend
        }));
    },
    [workoutPlans]
  );

  return {
    workoutPlans,
    createWorkoutPlan,
    getWorkoutPlanById,
    getAllWorkoutPlans,
    updateWorkoutPlan,
    deleteWorkoutPlan,
    getWorkoutPlanWithExercises,
    getWorkoutPlanListItems,
    searchWorkoutPlans,
  };
};
