import FoodTable from "@/components/FoodTable";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminFoodPage() {
  return (
    <div className="w-full bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Upravljanje hranom</h1>
          <Link href="/admin/food/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj novu hranu
            </Button>
          </Link>
        </div>
        <FoodTable />
      </div>
    </div>
  );
}
