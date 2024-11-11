import React from "react";

interface MuscleGroupDetailProps {
  name: string;
  description: string | undefined;
}

export default function MuscleGroupDetail({ name, description }: MuscleGroupDetailProps) {
  return (
    <div className="p-4 mb-6 rounded-md">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
}
