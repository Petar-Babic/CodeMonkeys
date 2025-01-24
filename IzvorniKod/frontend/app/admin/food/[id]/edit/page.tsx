import React from "react";
import { FoodBase } from "@/types/food";
import { AdminFoodForm } from "@/components/AdminFoodForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { backendUrl } from "@/data/backendUrl";

const getFoodAPI = async (id: number): Promise<FoodBase | undefined> => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${backendUrl}/api/food/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const food = await res.json();
  return food;
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
