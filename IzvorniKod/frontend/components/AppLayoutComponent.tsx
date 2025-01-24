"use client";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ExerciseBase } from "@/types/exercise";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import NutritionPlanRedirect from "./NutritionPlanRedirect";
import { backendUrl } from "@/data/backendUrl";
import { UserBase } from "@/types/user";
import { Toaster } from "sonner";
import { FoodBase } from "@/types/food";
import { Session } from "next-auth";
import { TrainerBase } from "@/types/trainer";
import { useEffect, useState } from "react";

const getInitialData = async (
  accessToken: string,
  trainer: UserBase | null
): Promise<{
  exercises: ExerciseBase[];
  muscleGroups: MuscleGroupBase[];
  nutritionPlan: NutritionPlanBase | null;
  userWorkoutPlan: WorkoutPlanWithWorkouts | null;
  workoutPlans: WorkoutPlanBase[];
  accessToken: string;
  user: UserBase | null;
  foods: FoodBase[];
  trainers: TrainerBase[];
  trainer: UserBase | null;
}> => {
  let user = null;

  let jwtResponse = null;

  try {
    jwtResponse = await fetch(`${backendUrl}/api/auth/jwt`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    jwtResponse = await jwtResponse.json();
    console.log("jwtResponse", jwtResponse);
  } catch (error) {
    console.error("Error fetching jwt:", error);
  }

  try {
    const apiUrl = `${backendUrl}/api/user/profile`;

    user = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }).then((response) => response.json());

    console.log("GET /api/user/profile", user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  let nutritionPlan = null;
  try {
    nutritionPlan = await fetch(`${backendUrl}/api/nutrition-plan`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      mode: "cors",
    }).then((response) => {
      return response.json();
    });
  } catch (error) {
    console.error("Error fetching nutrition plan:", error);
  }

  console.log("nutritionPlan", nutritionPlan);

  let muscleGroups: MuscleGroupBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/all-muscle-groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    muscleGroups = await response.json();
  } catch (error) {
    console.error("Error fetching muscle groups:", error);
  }

  let publicWorkoutPlans: WorkoutPlanBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/workout-plans/public`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    publicWorkoutPlans = await response.json();
  } catch (error) {
    console.error("Error fetching workout plans:", error);
  }

  let workoutPlansCreatedByUser: WorkoutPlanWithWorkouts[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/workout-plans/created-by`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    workoutPlansCreatedByUser = await response.json();
  } catch (error) {
    console.error("Error fetching workout plans created by user:", error);
  }

  console.log("workoutPlansCreatedByUser", workoutPlansCreatedByUser);

  let exercisesCreatedByUser: ExerciseBase[] = [];
  try {
    const response = await fetch(
      `${backendUrl}/api/all-exercises/created-by-user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    exercisesCreatedByUser = await response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }

  let exercisesPublic: ExerciseBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/all-exercises/public`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    exercisesPublic = await response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }

  let foods: FoodBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/food`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    foods = await response.json();
  } catch (error) {
    console.error("Error fetching foods:", error);
  }

  let trainers: TrainerBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/trainers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    trainers = await response.json();
  } catch (error) {
    console.error("Error fetching trainers:", error);
  }

  console.log("trainers", trainers);

  return {
    muscleGroups,
    exercises: [...exercisesCreatedByUser, ...exercisesPublic],
    nutritionPlan,
    userWorkoutPlan:
      workoutPlansCreatedByUser.length > 0
        ? workoutPlansCreatedByUser[0]
        : null,
    workoutPlans: [...publicWorkoutPlans, ...workoutPlansCreatedByUser],
    accessToken,
    user,
    foods,
    trainers,
    trainer,
  };
};

type InitialDataType = Omit<
  Awaited<ReturnType<typeof getInitialData>>,
  "user"
> & {
  user: UserBase;
  role: "USER" | "TRAINER" | "ADMIN";
};

export default function AppLayoutComponent({
  children,
  userId,
  accessToken,
  session,
}: Readonly<{
  children: React.ReactNode;
  userId: number;
  accessToken: string;
  session: Session;
}>) {
  const [initialData, setInitialData] = useState<InitialDataType | null>(null);
  const [localStorageAccessToken, setLocalStorageAccessToken] = useState<
    string | null
  >(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    setLocalStorageAccessToken(token);
  }, []);

  useEffect(() => {
    console.log("localStorageAccessToken", localStorageAccessToken);
    console.log("accessToken", accessToken);
  }, [localStorageAccessToken, accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInitialData(
        localStorageAccessToken ?? accessToken,
        session?.user?.role === "TRAINER" ? (session?.user as UserBase) : null
      );

      console.log("data", data);

      if (!data.user) {
        data.user = session?.user as UserBase;
      }

      if (!data.user) return;

      setInitialData({
        ...data,
        user: data.user,
        role: (session?.user?.role ?? "USER") as "USER" | "TRAINER" | "ADMIN",
      });
    };

    fetchData();
  }, [userId, accessToken, session, localStorageAccessToken]);

  if (!initialData) return null;

  return (
    <AppProvider initialData={initialData}>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <NutritionPlanRedirect
          innitialNutritionPlan={initialData.nutritionPlan}
        />
        <Header />
        <div className="flex flex-1 h-[calc(100dvh-60px)]">
          <div className="hidden xl:block">
            <Navigation orientation="vertical" role={initialData.user?.role} />
          </div>
          <main className="flex-1 overflow-y-auto max-xl:pb-[60px]">
            {children}
          </main>
        </div>
        <div className="xl:hidden fixed bottom-0 w-full">
          <Navigation orientation="horizontal" role={initialData.user?.role} />
        </div>
      </div>
    </AppProvider>
  );
}
