"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { NutritionPlanBase } from "@/types/nutritionPlan";

export default function NutritionPlanRedirect({
  nutritionPlan,
}: {
  nutritionPlan: NutritionPlanBase | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (nutritionPlan === null && pathname !== "/body-stats-and-goals") {
      router.push("/body-stats-and-goals");
    }
  }, [nutritionPlan, router, pathname]);

  return null;
}
