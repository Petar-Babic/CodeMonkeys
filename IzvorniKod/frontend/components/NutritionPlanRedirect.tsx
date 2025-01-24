"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { useAppContext } from "@/contexts/AppContext";

export default function NutritionPlanRedirect({
  innitialNutritionPlan,
}: {
  innitialNutritionPlan: NutritionPlanBase | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { nutritionPlan, trainer } = useAppContext();
  useEffect(() => {
    if (
      innitialNutritionPlan === null &&
      nutritionPlan === null &&
      pathname !== "/body-stats-and-goals" &&
      pathname !== "/pick-client" &&
      trainer === null
    ) {
      router.push("/body-stats-and-goals");
    }
  }, [innitialNutritionPlan, nutritionPlan, router, pathname, trainer]);

  return null;
}
