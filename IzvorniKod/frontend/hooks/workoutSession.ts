"use client";

import { useState, useCallback, useEffect } from "react";
import { WorkoutSessionWithPerformedExercises } from "@/types/workoutSession";
import { workoutSessions as workoutSessionsData } from "@/data/workoutSession";

export function useWorkoutSession() {
  const [workoutSessions, setWorkoutSessions] = useState<
    WorkoutSessionWithPerformedExercises[]
  >([]);

  const getWorkoutSessions = useCallback(async () => {
    setWorkoutSessions(workoutSessionsData);
  }, []);

  useEffect(() => {
    getWorkoutSessions();
  }, [getWorkoutSessions]);

  return {
    workoutSessions,
    setWorkoutSessions,
    getWorkoutSessions,
  } as UseWorkoutSessionType;
}

export type UseWorkoutSessionType = {
  workoutSessions: WorkoutSessionWithPerformedExercises[];
  setWorkoutSessions: React.Dispatch<
    React.SetStateAction<WorkoutSessionWithPerformedExercises[]>
  >;
  getWorkoutSessions: () => Promise<void>;
};
