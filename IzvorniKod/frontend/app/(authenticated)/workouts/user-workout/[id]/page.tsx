"use client";
import { EditUserWorkoutForm } from "@/components/EditUserWorkoutForm";
import { useAppContext } from "@/contexts/AppContext";
import { WorkoutWithUserPlannedExerciseUpdateInput } from "@/types/workout";

export default function EditUserWorkoutPage() {
  const { userWorkoutPlan } = useAppContext();

  const userWorkouts = userWorkoutPlan?.workouts;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Workout</h1>

      {userWorkouts && (
        <EditUserWorkoutForm
          workout={userWorkouts[0]}
          onSubmit={async (data: WorkoutWithUserPlannedExerciseUpdateInput) => {
            // handle the form submission
            return new Promise<void>((resolve) => {
              console.log(data);
              resolve();
            });
          }}
        />
      )}
    </div>
  );
}
