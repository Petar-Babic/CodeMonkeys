"use client";
import React from "react";
import GoalsCard from "@/components/GoalsCard";
import ProfileHeader from "@/components/ProfileHeader";
import Graph from "@/components/Graph"; // Assuming Graph is in the same directory

export default function UserProfilePage() {
  // Prijasnje unesene mjere koje se pokazuju u grafovima
  const goals = [
    {
      name: "Weight"
    },
    {
      name: "Steps"
    }
  ];

  const measurements = [
    {
      name: "Weight",
      dataPoints: [
        { date: "2024-11-01", value: 75 },
        { date: "2024-11-02", value: 74.5 },
        { date: "2024-11-03", value: 74 },
        { date: "2024-11-04", value: 73.5 },
        { date: "2024-11-05", value: 73 },
      ],
    },
    {
      name: "Steps",
      dataPoints: [
        { date: "2024-11-01", value: 10000 },
        { date: "2024-11-02", value: 9500 },
        { date: "2024-11-03", value: 11000 },
        { date: "2024-11-04", value: 10200 },
        { date: "2024-11-05", value: 10500 },
      ],
    },
  ];

  return (
    <div className="p-6">
      <ProfileHeader />

      {/* Render Graphs for each goal */}
      <div className="space-y-8">
        {measurements.map((measure) => (
          <div key={measure.name}>
            <h2 className="text-xl font-semibold mb-2">{measure.name}</h2>
            <Graph goal={measure.name} dataPoints={measure.dataPoints} />
          </div>
        ))}
      </div>

      {/* Goals Card */}
      <GoalsCard initialGoals={goals.map((goal) => goal.name)} />
    </div>
  );
}
