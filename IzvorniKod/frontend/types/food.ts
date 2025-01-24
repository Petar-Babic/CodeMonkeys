export type FoodBase = {
  id: number;
  name: string;
  calories: number;
  unit: string;
  protein: number;
  defaultNumber: number;
  fats: number;
  carbs: number;
  approved: boolean;
};

export type CreateFoodInput = Omit<FoodBase, "id">;
export type UpdateFoodInput = Partial<FoodBase> & { id: number };
