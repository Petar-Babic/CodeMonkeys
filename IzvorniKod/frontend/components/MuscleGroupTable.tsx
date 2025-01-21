"use client";
import React from "react";
import UniversalTable from "@/components/UniversalTable";
import { MuscleGroupBase } from "@/types/muscleGroup";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trash2, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";

export default function MuscleGroupTable() {
  const { muscleGroups, setMuscleGroups } = useAppContext();

  const columns = [
    {
      title: "ID",
      key: "id" as keyof MuscleGroupBase,
      sortable: true,
      width: "80px",
    },
    {
      title: "Slika",
      key: "image" as keyof MuscleGroupBase,
      width: "100px",
      renderCell: (row: MuscleGroupBase) => (
        <div className="relative w-10 h-10">
          <Image
            src={row.image || ""}
            alt={row.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      title: "Naziv",
      key: "name" as keyof MuscleGroupBase,
      sortable: true,
      searchable: true,
      width: "200px",
    },
    {
      title: "Opis",
      key: "description" as keyof MuscleGroupBase,
      searchable: true,
      renderCell: (row: MuscleGroupBase) => (
        <div className="max-w-md truncate">{row.description}</div>
      ),
    },
    {
      title: "Akcije",
      key: "actions" as keyof MuscleGroupBase,
      width: "200px",
      renderCell: (row: MuscleGroupBase) => (
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
          <Link href={`/admin/muscle-groups/${row.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/muscle-groups/${row.id}`}>
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
      setMuscleGroups(muscleGroups.filter((group) => group.id !== id));
      toast.success("Mišićna grupa je uspješno izbrisana");
    } catch (error) {
      console.error(error);
      toast.error("Greška prilikom brisanja mišićne grupe");
    }
  };

  return (
    <UniversalTable<MuscleGroupBase>
      data={muscleGroups}
      columns={columns}
      pageSize={10}
      searchable={true}
      emptyStateMessage="Nema pronađenih mišićnih grupa"
    />
  );
}
