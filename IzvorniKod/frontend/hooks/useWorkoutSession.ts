"use client";

import { useCallback } from "react";
import { WorkoutSessionWithPerformedExercises } from "@/types/workoutSession";
import { backendUrl } from "@/data/backendUrl";

export function useWorkoutSession() {
  const getWorkoutSessions = useCallback(
    async (startDate: string, endDate: string) => {
      const accessToken = localStorage.getItem("accessToken");

      console.log("useWorkoutSession getWorkoutSessions", {
        startDate,
        endDate,
      });

      // Pretvaranje datuma u ispravan format
      const formattedStartDate = new Date(startDate).toLocaleDateString(
        "hr-HR"
      );
      const formattedEndDate = new Date(endDate).toLocaleDateString("hr-HR");

      const response = await fetch(
        `${backendUrl}/api/workout-session?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      console.log("useWorkoutSession getWorkoutSessions", data);
      return data;
    },
    []
  );

  return {
    getWorkoutSessions,
  } as UseWorkoutSessionType;
}

export type UseWorkoutSessionType = {
  getWorkoutSessions: (
    startDate: string,
    endDate: string
  ) => Promise<WorkoutSessionWithPerformedExercises[]>;
};
