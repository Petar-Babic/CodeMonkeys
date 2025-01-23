import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { ExerciseBase } from "@/types/exercise";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { WorkoutPlanWithWorkouts } from "@/types/workoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import { backendUrl } from "@/data/backendUrl";
import { UserBase } from "@/types/user";
import Link from "next/link";
import { Toaster } from "sonner";
import { FoodBase } from "@/types/food";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

const getInitialData = async (
  userId: number,
  accessToken: string
): Promise<{
  exercises: ExerciseBase[];
  muscleGroups: MuscleGroupBase[];
  userWorkoutPlan: WorkoutPlanWithWorkouts | null;
  workoutPlans: WorkoutPlanBase[];
  accessToken: string;
  foods: FoodBase[];
}> => {
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

  console.log("muscleGroups", muscleGroups);

  let exercises: ExerciseBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/admin/all-exercises`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    exercises = await response.json();
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

  let workoutPlans: WorkoutPlanBase[] = [];
  try {
    const response = await fetch(`${backendUrl}/api/admin/workout-plans`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    workoutPlans = await response.json();
  } catch (error) {
    console.error("Error fetching workout plans:", error);
  }

  return {
    muscleGroups,
    exercises,
    userWorkoutPlan: null,
    workoutPlans,
    accessToken,
    foods,
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

  const session = await getServerSession(authOptions);
  const user = session?.user as UserBase;

  const safeInitialData = {
    ...initialData,
    role: "ADMIN",
    user,
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
