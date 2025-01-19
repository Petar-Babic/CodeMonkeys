import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { exercises as predefinedExercises } from "@/data/exercise";
import { ExerciseBase } from "@/types/exercise";
import { muscleGroups as predefinedMuscleGroups } from "@/data/muscleGroup";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { userWorkoutPlans } from "@/data/userWorkoutPlan";
import { workoutPlans } from "@/data/workoutPlan";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import NutritionPlanRedirect from "./NutritionPlanRedirect";
import { backendUrl } from "@/data/backendUrl";
import { UserBase } from "@/types/user";
import Link from "next/link";

const getInitialData = async (
  userId: string,
  accessToken: string,
  refreshToken: string
): Promise<{
  exercises: ExerciseBase[];
  muscleGroups: MuscleGroupBase[];
  nutritionPlan: NutritionPlanBase | null;
  userWorkoutPlan: WorkoutPlanWithWorkouts | null;
  workoutPlans: WorkoutPlanBase[];
  accessToken: string;
  refreshToken: string;
  user: UserBase | null;
}> => {
  const filteredExercises = predefinedExercises.filter(
    (exercise: ExerciseBase) =>
      exercise.isApproved || exercise.createdById === userId
  );

  let user = null;

  try {
    user = await fetch(`${backendUrl}/api/user/profile`, {
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

  const userWorkoutPlan =
    userWorkoutPlans.find((plan) => plan.userId === userId) || null;

  return {
    exercises: filteredExercises,
    muscleGroups: predefinedMuscleGroups,
    nutritionPlan,
    userWorkoutPlan,
    workoutPlans,
    accessToken,
    refreshToken,
    user,
  };
};

export default async function AppLayoutComponent({
  children,
  userId,
  accessToken,
  refreshToken,
}: Readonly<{
  children: React.ReactNode;
  userId: string;
  accessToken: string;
  refreshToken: string;
}>) {
  const initialData = await getInitialData(userId, accessToken, refreshToken);

  if (!initialData.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <Link
          href="/sign-in"
          className="bg-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300 p-2 rounded-md w-1/2 text-center"
        >
          Login
        </Link>
      </div>
    );
  }

  const safeInitialData = {
    ...initialData,
    user: initialData.user,
  } as const;

  console.log("nutritionPlan", initialData.nutritionPlan);
  console.log("user", initialData.user);
  if (initialData.nutritionPlan) {
    return (
      <AuthProvider>
        <AppProvider initialData={safeInitialData}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 h-[calc(100dvh-60px)]">
              <div className="hidden xl:block">
                <Navigation orientation="vertical" />
              </div>
              <main className="flex-1 overflow-y-auto max-xl:pb-[60px]">
                {children}
              </main>
            </div>
            <div className="xl:hidden fixed bottom-0 w-full">
              <Navigation orientation="horizontal" />
            </div>
          </div>
        </AppProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <AppProvider initialData={safeInitialData}>
        <div className="flex bg-black flex-col min-h-screen">
          <NutritionPlanRedirect nutritionPlan={initialData.nutritionPlan} />
          {children}
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
