export type Food = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number; 
  };
  
  export type Meal = {
    id: number;
    name: string;
    foods: Food[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  