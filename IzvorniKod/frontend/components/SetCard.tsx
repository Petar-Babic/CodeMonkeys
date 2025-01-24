import React from "react";

type SetCardProps = {
  setNumber: number;
  weight: number;
  rpe: number;
  onWeightChange: (value: number) => void;
  onRpeChange: (value: number) => void;
};

export default function SetCard({
  setNumber,
  weight,
  rpe,
  onWeightChange,
  onRpeChange,
}: SetCardProps) {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 w-full max-w-md">
      <h3 className="font-bold mb-2">Set {setNumber}</h3>

      <label className="block mb-2 text-sm">Weight (kg):</label>
      <input
        type="number"
        min="0"
        value={weight || ""}
        onChange={(e) => onWeightChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      />

      <label className="block mb-2 text-sm">
        RPE (Rate of Perceived Exertion):
      </label>
      <input
        type="number"
        min="1"
        max="10"
        value={rpe || ""}
        onChange={(e) => onRpeChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      />
    </div>
  );
}
