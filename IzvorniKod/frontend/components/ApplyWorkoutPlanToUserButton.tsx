"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyWorkoutPlanToUserButton({
  workoutPlanId,
}: {
  workoutPlanId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { applyWorkoutPlanToUser } = useAppContext();

  const handleApplyWorkoutPlanToUser = async () => {
    setIsLoading(true);

    try {
      await applyWorkoutPlanToUser(workoutPlanId);
      router.push("/workout-plans");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full fixed bottom-14 border-none bg-white left-0 flex px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4">
      <Button
        onClick={handleApplyWorkoutPlanToUser}
        className="h-12 w-full  max-w-[25rem]"
      >
        {isLoading ? (
          <Loader2 className="animate-spin mr-2" size={16} />
        ) : (
          "Apply workout plan to user"
        )}
      </Button>
    </div>
  );
}
