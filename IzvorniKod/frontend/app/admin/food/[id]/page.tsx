import React from "react";
import { foods } from "@/data/food";
import { FoodBase } from "@/types/food";

const getFoodAPI = async (id: number): Promise<FoodBase | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return foods.find((food) => food.id === id);
};

export default async function FoodPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  const food = await getFoodAPI(id);

  if (!food) {
    return <div>Hrana nije pronađena</div>;
  }

  return (
    <div className="w-full pb-20 bg-white h-full flex-col flex relative max-xl:pt-14">
      <div className="w-full flex px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4">
        <div className="p-4 flex-col rounded-md shadow-lg max-w-[30rem] flex-grow flex space-y-2 xl:p-6 2xl:p-8">
          <h2 className="text-2xl font-bold">{food.name}</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-semibold">Kalorije</h3>
              <p>{food.calories} kcal</p>
            </div>
            <div>
              <h3 className="font-semibold">Proteini</h3>
              <p>{food.protein}g</p>
            </div>
            <div>
              <h3 className="font-semibold">Ugljikohidrati</h3>
              <p>{food.carbs}g</p>
            </div>
            <div>
              <h3 className="font-semibold">Masti</h3>
              <p>{food.fat}g</p>
            </div>
            <div>
              <h3 className="font-semibold">Jedinica</h3>
              <p>{food.unit}</p>
            </div>
            <div>
              <h3 className="font-semibold">Default number</h3>
              <p>{food.defaultNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
