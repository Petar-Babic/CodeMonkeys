import { AdminFoodForm } from "@/components/AdminFoodForm";
import React from "react";

export default function AdminCreateFoodPage() {
  return (
    <div className="w-full p-6 bg-white h-full flex-col flex xl:flex-row relative max-xl:pt-14">
      <AdminFoodForm food={null} />
    </div>
  );
}
