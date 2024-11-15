import { UserWorkoutPlanWithRelations } from "@/types/userWorkoutPlan";
import { workoutPlans } from "./workoutPlan";
import { userWorkouts } from "./userWorkout";

export const userWorkoutPlans: UserWorkoutPlanWithRelations[] = [
  {
    id: "1",
    userId: "user1",
    name: "Beginner Full Body Workout",
    workoutPlanId: "1",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
    workoutPlan: workoutPlans[0],
    userWorkouts: userWorkouts.splice(0, 2),
    workoutSessions: [
      {
        id: "1",
        userId: "user1",
        userWorkoutPlanId: "1",
        userWorkoutId: "1",
        date: new Date("2024-04-11"),
        createdAt: new Date("2024-04-11"),
        updatedAt: new Date("2024-04-11"),
      },
    ],
  },
];
