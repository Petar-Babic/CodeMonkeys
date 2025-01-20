import { NutritionPlanBase } from "@/types/nutritionPlan";

export const nutritionPlans: NutritionPlanBase[] = [
  {
    id: 1,
    userId: 1,
    calories: 2500,
    protein: 150,
    carbs: 300,
    fat: 83,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
  },
];
