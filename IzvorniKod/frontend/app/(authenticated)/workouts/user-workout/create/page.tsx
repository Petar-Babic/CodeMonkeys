"use client";
import CreateUserWorkoutForm from "@/components/CreateUserWorkoutForm";
import { useAppContext } from "@/contexts/AppContext";

export default function CreateUserWorkoutPage() {
  const { userWorkoutPlan } = useAppContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Workout</h1>
      <CreateUserWorkoutForm
        onSubmit={() => {}}
        userWorkoutPlanId={userWorkoutPlan?.id ?? 1}
      />
    </div>
  );
}
