import React, { useState, useEffect } from "react";
import Image from "next/image";
import { backendUrl } from "@/data/backendUrl";

interface ExerciseModalProps {
  exercise: {
    id: number; 
    name: string;
    description: string;
    gifUrl: string;
  };
  closeModal: () => void;
}

interface PerformedExerciseResponse {
  id: number;
  date: string;
  performedSets: {
    id: number;
    reps: number;
    rpe: number;
    weight: number;
  }[];
}

export default function ExerciseModal({
  exercise,
  closeModal,
}: ExerciseModalProps) {
  const [activeTab, setActiveTab] = useState("About");
  const [history, setHistory] = useState<PerformedExerciseResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (activeTab !== "History") return;

      setLoading(true);
      setError(null);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${backendUrl}/api/exercises/history/${exercise.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 404) {
          setHistory([]);
        } else if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        } else {
          const data = await response.json();
          setHistory(data); 
        }
      } catch (err: any) {
        setError(err.message || "Failed to load history.");
      } finally {
        setLoading(false); 
      }
    };

    fetchHistory();
  }, [activeTab, exercise.id]);

  return (
    <div className="fixed top-5 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full h-[70vh] flex flex-col">
        <h3 className="text-3xl font-bold mb-4">{exercise.name}</h3>

        <div className="flex space-x-4 mb-4 border-b pb-2">
          <button
            className={`font-semibold ${
              activeTab === "About" ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("About")}
          >
            About
          </button>
          <button
            className={`font-semibold ${
              activeTab === "History" ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("History")}
          >
            History
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
              {loading ? (
                <p className="text-lg">Loading history...</p>
              ) : error ? (
                <p className="text-lg text-red-500">{error}</p>
              ) : history.length === 0 ? (
                <p className="text-lg">No history for now...</p>
              ) : (
                <div>
                  {history.map((entry) => (
                    <div key={entry.id} className="mb-4">
                      <p className="font-semibold">Date: {entry.date}</p>
                      <div>
                        {entry.performedSets.map((set) => (
                          <div key={set.id} className="ml-4">
                            <p>Reps: {set.reps}</p>
                            <p>Weight: {set.weight} kg</p>
                            <p>RPE: {set.rpe}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
