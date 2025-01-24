import { WorkoutPlanBase } from "@/types/workoutPlan";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function WorkoutPlanCard({
  workoutPlan,
}: {
  workoutPlan: WorkoutPlanBase;
}) {
  return (
    <Link
      href={`/workout-plans/${workoutPlan.id}`}
      className="aspect-square bg-black relative border border-gray-200 rounded-md overflow-hidden block"
    >
      {workoutPlan?.image && (
        <Image
          src={`/api/upload/${workoutPlan.image}`}
          alt={workoutPlan.name}
          priority
          quality={85}
          fill
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold line-clamp-1">
          {workoutPlan.name}
        </h3>
        <p className="text-white text-xs line-clamp-2">
          {workoutPlan.description}
        </p>
        <Button variant="white" className="mt-3 w-full">
          <span className="text-black">Make yours now</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Link>
  );
}
