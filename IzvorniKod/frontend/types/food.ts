export type FoodBase = {
  id: number;
  name: string;
  calories: number;
  unit: string;
  protein: number;
  defaultNumber: number;
  fat: number;
  carbs: number;
};

export type CreateFoodInput = Omit<FoodBase, "id">;
export type UpdateFoodInput = Partial<FoodBase> & { id: number };
