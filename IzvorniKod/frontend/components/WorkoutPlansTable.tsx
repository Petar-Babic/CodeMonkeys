"use client";
import React, { useEffect, useState } from "react";
import { workoutPlans as workoutPlansData } from "@/data/workoutPlan";
import UniversalTable from "@/components/UniversalTable";
import { WorkoutPlanBase } from "@/types/workoutPlan";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trash2, Pencil, Eye, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";
export default function WorkoutPlansTable() {
  const { workoutPlans, setWorkoutPlans } = useAppContext();

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
              <UserPlus className="h-4 w-4" />
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
    if (workoutPlan) {
      workoutPlan.userId = 0;
      setWorkoutPlans([...workoutPlans]);
    }
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
