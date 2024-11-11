import React, { useState } from "react";

interface GoalProps {
    text: string;
}

const Goal: React.FC<GoalProps> = ({ text }) => {
    // State za broj cilja i mjernu jedinicu
    const [value, setValue] = useState<number | string>(""); // Broj cilja
    const [unit, setUnit] = useState<string>("kg"); // Mjerna jedinica

    // Funkcija za promenu broja cilja
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // Funkcija za promenu mjernih jedinica
    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUnit(e.target.value);
    };

    return (
        <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">{text}</span>
            <div className="flex space-x-2">
                <input
                    type="number"
                    value={value}
                    onChange={handleValueChange}
                    placeholder="Enter value"
                    className="w-20 p-1 border rounded"
                />
                <select
                    value={unit}
                    onChange={handleUnitChange}
                    className="p-1 border rounded"
                >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="cm">cm</option>
                    <option value="steps">steps</option>
                </select>
            </div>
        </div>
    );
};

export default Goal;
