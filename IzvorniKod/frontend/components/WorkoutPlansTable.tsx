"use client";
import React from "react";
import UniversalTable from "@/components/UniversalTable";
import {
  CreateWorkoutPlanInput,
  WorkoutPlanBase,
  WorkoutPlanWithWorkouts,
} from "@/types/workoutPlan";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trash2, Pencil, Eye, Users } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";
import { workoutsWithExercises } from "@/data/workout";

export default function WorkoutPlansTable() {
  const { workoutPlans, setWorkoutPlans, createWorkoutPlan } = useAppContext();

  const columns = [
    {
      title: "ID",
      key: "id" as keyof WorkoutPlanBase,
      sortable: true,
      width: "80px",
    },
    {
      title: "Name",
      key: "name" as keyof WorkoutPlanBase,
      sortable: true,
      searchable: true,
      width: "200px",
    },
    {
      title: "Description",
      key: "description" as keyof WorkoutPlanBase,
      searchable: true,
      renderCell: (row: WorkoutPlanBase) => (
        <div className="max-w-md truncate">{row.description}</div>
      ),
    },
    {
      title: "Created By",
      key: "createdById" as keyof WorkoutPlanBase,
      sortable: true,
      customSort: (a: WorkoutPlanBase, b: WorkoutPlanBase) => {
        // Primjer prilagođenog sortiranja
        return a.createdById - b.createdById;
      },
      renderCell: (row: WorkoutPlanBase) => <div>{row.createdById}</div>,
    },
    {
      title: "User ID",
      key: "userId" as keyof WorkoutPlanBase,
      sortable: true,
      customSort: (a: WorkoutPlanBase, b: WorkoutPlanBase) => {
        return (a.userId ?? 0) - (b.userId ?? 0);
      },
      renderCell: (row: WorkoutPlanBase) => <div>{row.userId ?? "N/A"}</div>,
    },
    {
      title: "Akcije",
      key: "actions" as keyof WorkoutPlanBase,
      renderCell: (row: WorkoutPlanBase) => (
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Link href={`/admin/workout-plans/${row.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/workout-plans/${row.id}`}>
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          {row.userId && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => makePublic(row.id)}
            >
              <Users className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
      width: "200px",
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      setWorkoutPlans(workoutPlans.filter((plan) => plan.id !== id));
      toast.success("Plan vježbanja je uspješno izbrisan");
    } catch (error) {
      toast.error("Greška prilikom brisanja plana vježbanja");
    }
  };

  const makePublic = async (id: number) => {
    const workoutPlan = workoutPlans.find((plan) => plan.id === id);
    // now i need to createa a workout plan with the same id and the same name and description
    // and the same image
    // and the same createdById
    // with undefined userId
    // and the same workouts

    // kasnije kada se napravi API prvo ce se pozvati za dobijanje workout
    // plan-a te onda ce se pozvati kreiranje workout plan-a

    const workoutPlanWorkouts = workoutsWithExercises.filter(
      (workout) => workout.workoutPlanId === id
    );

    if (!workoutPlan) {
      toast.error("Plan vježbanja nije pronađen");
      return;
    }

    const newWorkoutPlan: CreateWorkoutPlanInput = {
      ...workoutPlan,
      userId: undefined,
      workouts: workoutPlanWorkouts,
    };

    await createWorkoutPlan(newWorkoutPlan);
  };

  return (
    <UniversalTable<WorkoutPlanBase>
      data={workoutPlans}
      columns={columns}
      pageSize={5}
      searchable={true}
      emptyStateMessage="Nema pronađenih planova vježbanja"
    />
  );
}
