import React, { useState } from "react";
import Image from "next/image";

interface ExerciseModalProps {
  exercise: {
    name: string;
    description: string;
    gifUrl: string;
  };
  closeModal: () => void;
}

export default function ExerciseModal({
  exercise,
  closeModal,
}: ExerciseModalProps) {
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="fixed top-5 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full h-[70vh] flex flex-col">
        <h3 className="text-3xl font-bold mb-4">{exercise.name}</h3>

        <div className="flex space-x-4 mb-4 border-b pb-2">
          <button
            className={`font-semibold ${
              activeTab === "About"
                ? "text-gray-800 border-b-2 border-gray-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("About")}
          >
            About
          </button>
          <button
            className={`font-semibold ${
              activeTab === "History"
                ? "text-gray-800 border-b-2 border-gray-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("History")}
          >
            History
          </button>
          <button
            className={`font-semibold ${
              activeTab === "HowTo"
                ? "text-gray-800 border-b-2 border-gray-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("HowTo")}
          >
            How to do
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {activeTab === "About" && (
            <div>
              <div className="relative w-64 h-64 mb-4">
                <Image
                  src={`/api/upload/${exercise.gifUrl}`}
                  alt={exercise.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mb-4 text-lg">{exercise.description}</p>
            </div>
          )}
          {activeTab === "History" && (
            <div>
              <p className="text-lg">No history...</p>
            </div>
          )}
          {activeTab === "HowTo" && (
            <div>
              <p className="text-lg">Instructions...</p>
            </div>
          )}
        </div>

        <button
          onClick={closeModal}
          className="bg-black text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-800 self-end"
        >
          Close
        </button>
      </div>
    </div>
  );
}
