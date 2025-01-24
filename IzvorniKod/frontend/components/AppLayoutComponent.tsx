import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { ExerciseBase } from "@/types/exercise";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import NutritionPlanRedirect from "./NutritionPlanRedirect";
import { backendUrl } from "@/data/backendUrl";
import { UserBase } from "@/types/user";
import Link from "next/link";
import { Toaster } from "sonner";
import { FoodBase } from "@/types/food";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { TrainerBase } from "@/types/trainer";

const getInitialData = async (
  userId: number,
  accessToken: string,
  role: string
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
}> => {
  let user = null;

  try {
    let apiUrl = `${backendUrl}/api/user/profile`;
    if (role === "TRAINER") {
      apiUrl = `${backendUrl}/api/trainer`;
    }

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
  };
};

export default async function AppLayoutComponent({
  children,
  userId,
  accessToken,
}: Readonly<{
  children: React.ReactNode;
  userId: number;
  accessToken: string;
}>) {
  const session = await getServerSession(authOptions);

  const initialData = await getInitialData(
    userId,
    accessToken,
    session?.user?.role ?? "USER"
  );

  if (!initialData.user) {
    const user = session?.user as UserBase;
    initialData.user = user;
  }

  const safeInitialData = {
    ...initialData,
    user: initialData.user,
    role: "USER",
  } as const;

  return (
    <AuthProvider>
      <AppProvider initialData={safeInitialData}>
        <div className="flex flex-col min-h-screen">
          <Toaster />
          <NutritionPlanRedirect
            innitialNutritionPlan={initialData.nutritionPlan}
          />
          <Header />
          <div className="flex flex-1 h-[calc(100dvh-60px)]">
            <div className="hidden xl:block">
              <Navigation
                orientation="vertical"
                role={initialData.user?.role}
              />
            </div>
            <main className="flex-1 overflow-y-auto max-xl:pb-[60px]">
              {children}
            </main>
          </div>
          <div className="xl:hidden fixed bottom-0 w-full">
            <Navigation
              orientation="horizontal"
              role={initialData.user?.role}
            />
          </div>
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
