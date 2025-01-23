import { useState, useCallback, useEffect } from "react";
import {
  WorkoutSessionBase,
  CreateWorkoutSessionInput,
  UpdateWorkoutSessionInput,
  WorkoutSessionWithPerformedExercises,
} from "@/types/workoutSession";
import { useAuthContext } from "@/contexts/AuthContext";
import { backendUrl } from "@/data/backendUrl";
import { useFile } from "@/hooks/useFile";

export const useWorkoutSession = () => {
  const [workoutSessions, setWorkoutSessions] = useState<
    WorkoutSessionWithPerformedExercises[]
  >([]);

  const { user } = useAuthContext();
  const { deleteFile } = useFile();

  const userId = user?.id;

  useEffect(() => {
    console.log("workoutSessions", workoutSessions);
  }, [workoutSessions]);

  const createWorkoutSession = useCallback(
    async (
      input: CreateWorkoutSessionInput
    ): Promise<WorkoutSessionWithPerformedExercises> => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token is not set");
        }

        const workoutSessionForm = {
          ...input,
          userId: userId,
        };

        console.log("workoutSessionForm", workoutSessionForm);

        const res = await fetch(`${backendUrl}/api/create-workout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(workoutSessionForm),
        });

        console.log("res", res);

        const newWorkoutSession = await res.json();

        console.log("newWorkoutSession", newWorkoutSession);

        setWorkoutSessions((prevSessions) => [
          ...prevSessions,
          newWorkoutSession,
        ]);
        return newWorkoutSession;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create workout session");
      }
    },
    [userId]
  );

  const getWorkoutSessionById = useCallback(
    (id: number): WorkoutSessionWithPerformedExercises | undefined => {
      return workoutSessions.find((session) => session.id === id);
    },
    [workoutSessions]
  );

  const updateWorkoutSession = useCallback(
    async (
      input: UpdateWorkoutSessionInput
    ): Promise<WorkoutSessionWithPerformedExercises | undefined> => {
      let updatedSession: WorkoutSessionWithPerformedExercises | undefined;

      console.log("input", input);

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token is not set");
      }

      await fetch(`${backendUrl}/api/workout-plans/${input.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(input),
      });

      return updatedSession;
    },
    []
  );

  const deleteWorkoutSession = useCallback(
    async (id: number): Promise<void> => {
      setWorkoutSessions(
        workoutSessions.filter((session) => session.id !== id)
      );

      const workoutSession = workoutSessions.find(
        (session) => session.id === id
      );

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token is not set");
      }
      await fetch(`${backendUrl}/api/workout-sessions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    [workoutSessions]
  );

  const getWorkoutSessions = useCallback(
    async (startDate: Date, endDate: Date) => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${backendUrl}/api/workout-sessions/?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
    []
  );

  return {
    workoutSessions,
    setWorkoutSessions,
    createWorkoutSession,
    getWorkoutSessionById,
    updateWorkoutSession,
    deleteWorkoutSession,
    getWorkoutSessions,
  } as UseWorkoutSessionContextType;
};

export type UseWorkoutSessionContextType = {
  workoutSessions: WorkoutSessionWithPerformedExercises[];
  setWorkoutSessions: (
    workoutSessions: WorkoutSessionWithPerformedExercises[]
  ) => void;
  createWorkoutSession: (
    input: CreateWorkoutSessionInput
  ) => Promise<WorkoutSessionWithPerformedExercises>;
  getWorkoutSessionById: (
    id: number
  ) => WorkoutSessionWithPerformedExercises | undefined;
  updateWorkoutSession: (
    input: UpdateWorkoutSessionInput
  ) => Promise<WorkoutSessionWithPerformedExercises | undefined>;
  deleteWorkoutSession: (id: number) => Promise<void>;
  getWorkoutSessions: (
    startDate: Date,
    endDate: Date
  ) => Promise<WorkoutSessionWithPerformedExercises[]>;
};
