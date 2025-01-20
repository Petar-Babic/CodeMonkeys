"use client";

import { useAppContext } from "@/contexts/AppContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import UserWorkoutWithUserPlannedExerciseList from "./UserWorkoutWithUserPlannedExerciseList";
import Calendar from "./Calendar";
import { useWorkoutSession } from "@/hooks/useWorkoutSession";
import { WorkoutSessionWithPerformedExercises } from "@/types/workoutSession";

export default function UserWorkoutPlanCard() {
  const { userWorkoutPlan } = useAppContext();
  const [workoutSessions, setWorkoutSessions] = useState<
    WorkoutSessionWithPerformedExercises[]
  >([]);
  const { exercises } = useAppContext();

  const { getWorkoutSessions } = useWorkoutSession();

  useEffect(() => {
    getWorkoutSessions(
      new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
      new Date().toISOString()
    ).then((workoutSessions) => setWorkoutSessions(workoutSessions));
  }, [getWorkoutSessions]);

  const events = workoutSessions.map((workoutSession) => ({
    name:
      userWorkoutPlan?.workouts.find(
        (workout) => workout.id === workoutSession.workoutId
      )?.name || "",
    href: `/workout-session/${workoutSession.id}`,
    date: workoutSession.date,
  }));

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

          {userWorkoutPlan?.workouts && (
            <UserWorkoutWithUserPlannedExerciseList
              workouts={userWorkoutPlan?.workouts?.map((workout) => ({
                ...workout,
                exercises: workout.exercises.map((exercise) => ({
                  ...exercise,
                  exercise: exercises.find(
                    (e) => e.id === exercise.exerciseId
                  )!,
                })),
              }))}
            />
          )}
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
