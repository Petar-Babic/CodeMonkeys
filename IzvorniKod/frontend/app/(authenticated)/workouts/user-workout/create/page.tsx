"use client";
import CreateUserWorkoutForm from "@/components/CreateUserWorkoutForm";

export default function CreateUserWorkoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Workout</h1>
      <CreateUserWorkoutForm onSubmit={() => {}} userWorkoutPlanId={"1"} />
    </div>
  );
}
