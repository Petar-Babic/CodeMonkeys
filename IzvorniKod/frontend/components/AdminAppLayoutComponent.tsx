import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { ExerciseBase } from "@/types/exercise";
import { muscleGroups as predefinedMuscleGroups } from "@/data/muscleGroup";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { userWorkoutPlans } from "@/data/userWorkoutPlan";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import NutritionPlanRedirect from "./NutritionPlanRedirect";
import { backendUrl } from "@/data/backendUrl";
import { UserBase } from "@/types/user";
import Link from "next/link";
import { Toaster } from "sonner";
import { workoutPlans as workoutPlansData } from "@/data/workoutPlan";
const getInitialData = async (
  userId: number,
  accessToken: string
): Promise<{
  exercises: ExerciseBase[];
  muscleGroups: MuscleGroupBase[];
  userWorkoutPlan: WorkoutPlanWithWorkouts | null;
  workoutPlans: WorkoutPlanBase[];
  accessToken: string;
  user: UserBase | null;
}> => {
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

  let exercises: ExerciseBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/all-exercises`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    exercises = await response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }

  const userWorkoutPlan =
    userWorkoutPlans.find((plan) => plan.userId === userId) || null;

  return {
    muscleGroups: predefinedMuscleGroups,
    exercises,
    userWorkoutPlan,
    workoutPlans: [...workoutPlansData],
    accessToken,
    user,
  };
};

export default async function AdminAppLayoutComponent({
  children,
  userId,
  accessToken,
}: Readonly<{
  children: React.ReactNode;
  userId: number;
  accessToken: string;
}>) {
  const initialData = await getInitialData(userId, accessToken);

  if (!initialData.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <Toaster />
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
    role: "ADMIN",
  } as const;

  return (
    <AuthProvider>
      <AppProvider initialData={safeInitialData}>
        <div className="flex flex-col min-h-screen">
          <Toaster />
          <Header />
          <div className="flex flex-1 h-[calc(100dvh-60px)]">
            <div className="hidden xl:block">
              <Navigation orientation="vertical" role={"ADMIN"} />
            </div>
            <main className="flex-1 overflow-y-auto max-xl:pb-[60px]">
              {children}
            </main>
          </div>
          <div className="xl:hidden fixed bottom-0 w-full">
            <Navigation orientation="horizontal" role={"ADMIN"} />
          </div>
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
