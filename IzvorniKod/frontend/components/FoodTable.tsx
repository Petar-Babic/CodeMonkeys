"use client";
import React from "react";
import UniversalTable from "@/components/UniversalTable";
import { FoodBase } from "@/types/food";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trash2, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/AppContext";

export default function FoodTable() {
  const { foods, setFoods } = useAppContext();

  const columns = [
    {
      title: "ID",
      key: "id" as keyof FoodBase,
      sortable: true,
      width: "80px",
    },
    {
      title: "Naziv",
      key: "name" as keyof FoodBase,
      sortable: true,
      searchable: true,
      width: "200px",
    },
    {
      title: "Kalorije",
      key: "calories" as keyof FoodBase,
      sortable: true,
      width: "120px",
    },
    {
      title: "Proteini (g)",
      key: "protein" as keyof FoodBase,
      sortable: true,
      width: "120px",
    },
    {
      title: "Ugljikohidrati (g)",
      key: "carbs" as keyof FoodBase,
      sortable: true,
      width: "120px",
    },
    {
      title: "Masti (g)",
      key: "fat" as keyof FoodBase,
      sortable: true,
      width: "120px",
    },

    {
      title: "Akcije",
      key: "actions" as keyof FoodBase,
      width: "200px",
      renderCell: (row: FoodBase) => (
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
          <Link
            href={`/admin/food/${row.id}/edit`}
            className="hover:text-blue-500 w-8 h-8 flex items-center justify-center"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/food/${row.id}`}
            className="hover:text-blue-500 w-8 h-8 flex items-center justify-center"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      setFoods(foods.filter((food) => food.id !== id));
      toast.success("Hrana je uspješno izbrisana");
    } catch (error) {
      console.error(error);
      toast.error("Greška prilikom brisanja hrane");
    }
  };

  return (
    <UniversalTable<FoodBase>
      data={foods}
      columns={columns}
      pageSize={10}
      searchable={true}
      emptyStateMessage="Nema pronađene hrane"
    />
  );
}
