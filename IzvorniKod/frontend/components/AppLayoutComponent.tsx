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
import { UserWorkoutPlanWithRelations } from "@/types/userWorkoutPlan";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import NutritionPlanRedirect from "./NutritionPlanRedirect";
import { backendUrl } from "@/data/backendUrl";

const getInitialData = async (
  userId: string,
  accessToken: string
): Promise<{
  exercises: ExerciseBase[];
  muscleGroups: MuscleGroupBase[];
  nutritionPlan: NutritionPlanBase | null;
  userWorkoutPlan: UserWorkoutPlanWithRelations | null;
  workoutPlans: WorkoutPlanBase[];
  accessToken: string;
}> => {
  const filteredExercises = predefinedExercises.filter(
    (exercise: ExerciseBase) =>
      exercise.isApproved || exercise.createdById === userId
  );

  let nutritionPlan = null;
  try {
    nutritionPlan = await fetch(`${backendUrl}/api/nutrition-plan`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      mode: "cors",
    }).then((response) => {
      console.log("response", response);
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
  };
};

export default async function AppLayoutComponent({
  children,
  userId,
  accessToken,
}: Readonly<{
  children: React.ReactNode;
  userId: string;
  accessToken: string;
}>) {
  const initialData = await getInitialData(userId, accessToken);

  console.log("nutritionPlan", initialData.nutritionPlan);

  if (initialData.nutritionPlan) {
    return (
      <AuthProvider>
        <AppProvider initialData={initialData}>
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
      <AppProvider initialData={initialData}>
        <div className="flex bg-black flex-col min-h-screen">
          <NutritionPlanRedirect nutritionPlan={initialData.nutritionPlan} />
          {children}
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
