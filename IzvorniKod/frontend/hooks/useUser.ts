"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { BodyStatsAndGoalDataType } from "@/types/bodyStatsAndGoal";
import { UserBase } from "@/types/user";
import { useState, useCallback, useEffect } from "react";
import { backendUrl } from "@/data/backendUrl";

function convertToCm(value: number, isImperial: boolean): number {
  return isImperial ? value * 2.54 : value;
}

function convertToKg(value: number, isImperial: boolean): number {
  return isImperial ? value * 0.453592 : value;
}

function convertActivityLevel(level: string): string {
  const mapping: { [key: string]: string } = {
    sedentary: "SEDENTARY",
    light: "LIGHT",
    moderate: "MODERATE",
    active: "ACTIVE",
    "very-active": "VERY",
  };
  return mapping[level] || level;
}

export function useUser() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserBase | null>(null);

  const bodyStatsAndGoal = useCallback(
    async (data: BodyStatsAndGoalDataType) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + data.timelineWeeks * 7);

        const requestData = {
          activityLevel: convertActivityLevel(data.activityLevel),
          gender: data.gender.toUpperCase(),
          height: convertToCm(data.height, data.isHeightImperial),
          weight: convertToKg(data.weight, data.isWeightImperial),
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
          calories: data.calories,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        };

        const token = localStorage.getItem("accessToken");

        if (!token) {
          // Pokušaj osvježiti token ako je istekao
          // token = await refreshAccessToken();
          if (!token) throw new Error("No access token");
        }

        const response = await fetch(
          `${backendUrl}/api/user/body-stats-and-goals`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
          }
        );

        console.log("POST /api/user/body-stats-and-goals", response);

        const updatedUser = {
          ...user,
          height: convertToCm(data.height, data.isHeightImperial),
          weight: convertToKg(data.weight, data.isWeightImperial),
          activityLevel: data.activityLevel,
          gender: data.gender,
          updatedAt: new Date(),
        };

        setUserData(updatedUser);
      } catch (err) {
        console.error("Error setting body stats and goal:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUserData]
  );

  // Pratimo promjene user stanja
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  useEffect(() => {
    console.log("UserData state changed:", userData);
  }, [userData]);

  return {
    user,
    isLoading,
    error,
    bodyStatsAndGoal,
    userData,
    setUserData,
  } as UseUserContextType;
}

export type UseUserContextType = {
  user: UserBase | null;
  isLoading: boolean;
  error: string | null;
  bodyStatsAndGoal: (data: BodyStatsAndGoalDataType) => Promise<void>;
  userData: UserBase | null;
  setUserData: (user: UserBase) => void;
};
