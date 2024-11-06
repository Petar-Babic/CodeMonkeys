import { NutritionPlanBase } from "@/types/nutritionPlan";

export const nutritionPlans: NutritionPlanBase[] = [
  {
    id: "nutrition1",
    userId: "user1", // This corresponds to John Doe's user ID
    trainerId: "trainer1",
    calories: 2500,
    protein: 150,
    carbs: 300,
    fat: 83,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    createdAt: new Date("2023-05-25"),
    updatedAt: new Date("2023-05-25"),
  },
  // We don't have a nutrition plan for Jane (user2)
];
