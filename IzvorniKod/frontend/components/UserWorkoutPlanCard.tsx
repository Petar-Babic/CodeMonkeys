"use client";

import { useAppContext } from "@/contexts/AppContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import UserWorkoutWithUserPlannedExerciseList from "./UserWorkoutWithUserPlannedExerciseList";
import Calendar from "./Calendar";

export default function UserWorkoutPlanCard() {
  const { userWorkoutPlan } = useAppContext();

  const events =
    userWorkoutPlan?.workoutSessions.map((session) => ({
      name: userWorkoutPlan.name,
      date: session.createdAt,
      href: `/workout-session/${session.id}`,
    })) || [];

  return (
    <section className="w-full  flex-col space-y-3 flex px-4 xl:px-6 2xl:px-8 py-2 ">
      {userWorkoutPlan ? (
        <>
          <div className="flex-col flex w-full xl:w-1/2 items-start xr:pl-4 p2-4 xl:pb-0">
            <h4 className="text-md  font-semibold text-gray-800">
              {userWorkoutPlan?.name || "Untitled"}
            </h4>
          </div>
          <Link
            href="/workout-plans/user-workout-plan/"
            className="flex mb-2 items-center max-w-[20rem]"
          >
            <Button variant="white" className="w-full">
              <span>Edit your workout plan</span>
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
          <div className="flex-col flex w-full xl:w-1/2 items-start xr:pl-4 p2-4 xl:pb-0">
            <h4 className="text-md  font-semibold text-gray-800">
              Workout&apos;s list
            </h4>
          </div>
          <UserWorkoutWithUserPlannedExerciseList
            workouts={userWorkoutPlan.userWorkouts}
          />
          <div className="p-5 shadow-md rounded-sm bg-white">
            <Calendar events={events} />
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-3">
            You don&apos;t have a workout plan yet.
          </p>
          <Link
            href="/workout-plans/user-workout-plan/"
            className="flex items-center max-w-[20rem]"
          >
            <Button className="w-full">
              <span>Create from scratch</span>
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </>
      )}
    </section>
  );
}
