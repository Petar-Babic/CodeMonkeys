import { Meal } from "../types"; // Adjust the path based on your file structure

// Calculate total macros from all meals
export const calculateTotalMacros = (meals: Meal[]) => {
  return meals.reduce(
    (totals, meal) => {
      totals.protein += meal.protein;
      totals.carbs += meal.carbs;
      totals.fats += meal.fats;
      return totals;
    },
    { protein: 0, carbs: 0, fats: 0 }
  );
};

// Calculate macros for a single meal
export const calculateMealMacros = (meal: Meal) => {
  return meal.foods.reduce(
    (totals, food) => {
      totals.protein += food.protein;
      totals.carbs += food.carbs;
      totals.fats += food.fats;
      return totals;
    },
    { protein: 0, carbs: 0, fats: 0 }
  );
};

// Calculate total calories from all meals
export const calculateTotalCalories = (meals: Meal[]) => {
  return meals.reduce((total, meal) => total + meal.calories, 0);
};

// Calculate total calories for a single meal
export const calculateMealCalories = (meal: Meal) => {
  return meal.foods.reduce((total, food) => total + food.calories, 0);
};
