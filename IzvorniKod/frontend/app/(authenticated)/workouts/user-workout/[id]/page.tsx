"use client";
import { EditUserWorkoutForm } from "@/components/EditUserWorkoutForm";
import { userWorkouts } from "@/data/userWorkout";
import { UserWorkoutWithUserPlannedExerciseUpdateInput } from "@/types/userWorkout";

export default function EditUserWorkoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Workout</h1>
      <EditUserWorkoutForm
        workout={userWorkouts[0]}
        onSubmit={async (
          data: UserWorkoutWithUserPlannedExerciseUpdateInput
        ) => {
          // handle the form submission
          return new Promise<void>((resolve) => {
            console.log(data);
            resolve();
          });
        }}
      />
    </div>
  );
}
