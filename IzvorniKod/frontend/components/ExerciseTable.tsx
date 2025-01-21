"use client";
import React from "react";
import UniversalTable from "@/components/UniversalTable";
import { ExerciseBase } from "@/types/exercise";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trash2, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";

export default function ExerciseTable() {
  const { exercises, deleteExercise } = useAppContext();

  const columns = [
    {
      title: "ID",
      key: "id" as keyof ExerciseBase,
      sortable: true,
      width: "80px",
    },
    {
      title: "GIF",
      key: "gif" as keyof ExerciseBase,
      width: "100px",
      renderCell: (row: ExerciseBase) =>
        row.gif && (
          <div className="relative w-10 h-10">
            <Image
              src={row.gif}
              alt={row.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ),
    },
    {
      title: "Naziv",
      key: "name" as keyof ExerciseBase,
      sortable: true,
      searchable: true,
      width: "200px",
    },
    {
      title: "Opis",
      key: "description" as keyof ExerciseBase,
      searchable: true,
      renderCell: (row: ExerciseBase) => (
        <div className="max-w-md truncate">{row.description}</div>
      ),
    },
    {
      title: "Status",
      key: "isApproved" as keyof ExerciseBase,
      sortable: true,
      width: "120px",
      renderCell: (row: ExerciseBase) => (
        <div
          className={`px-2 py-1 rounded-full text-sm ${
            row.isApproved
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.isApproved ? "Odobreno" : "Na čekanju"}
        </div>
      ),
    },
    {
      title: "Akcije",
      key: "actions" as keyof ExerciseBase,
      width: "200px",
      renderCell: (row: ExerciseBase) => (
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
          <Link href={`/admin/exercises/${row.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/exercises/${row.id}`}>
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      deleteExercise(id);
      toast.success("Vježba je uspješno izbrisana");
    } catch (error) {
      console.error(error);
      toast.error("Greška prilikom brisanja vježbe");
    }
  };

  return (
    <UniversalTable<ExerciseBase>
      data={exercises}
      columns={columns}
      pageSize={10}
      searchable={true}
      emptyStateMessage="Nema pronađenih vježbi"
    />
  );
}
