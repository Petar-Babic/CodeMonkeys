"use client";

import React, { useState } from "react";

interface GoalProps {
  text: string;
}

const Goal: React.FC<GoalProps> = ({ text }) => {
  // State za broj cilja i mjernu jedinicu
  const [value, setValue] = useState<number | string>(""); // Broj cilja
  const [unit, setUnit] = useState<string>(""); // Mjerna jedinica

  // Funkcija za promjenu broja cilja
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Funkcija za promjenu mjernih jedinica
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      {/* Naziv cilja - poravnan lijevo */}
      <span className="text-lg font-medium w-1/4 text-left">{text}</span>

      {/* Sekcija za unos vrijednosti i mjernih jedinica */}
      <div className="flex items-center justify-center w-3/4 space-x-2">
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          placeholder="Enter v."
          className="w-24 p-2 border rounded text-center"
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="p-2 border rounded"
        >
          <option value=""></option>
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
          <option value="cm">cm</option>
          <option value="steps">steps</option>
        </select>
        {/* Gumb za spremanje */}
        <button className="bg-black text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default Goal;
