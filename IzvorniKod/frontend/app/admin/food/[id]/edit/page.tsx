import React from "react";
import { foods } from "@/data/food";
import { FoodBase } from "@/types/food";
import { AdminFoodForm } from "@/components/AdminFoodForm";

const getFoodAPI = async (id: number): Promise<FoodBase | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the food item
  return foods.find((food) => food.id === id);
};

export default async function AdminEditFoodPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  const food = await getFoodAPI(id);

  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminFoodForm food={food ?? null} />
    </div>
  );
}
