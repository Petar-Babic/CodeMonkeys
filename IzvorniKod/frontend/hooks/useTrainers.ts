import { TrainerBase } from "@/types/trainer";
import { useState, useCallback } from "react";
import { backendUrl } from "@/data/backendUrl";

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<TrainerBase[]>([]);

  const pickTrainer = useCallback(async (userId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await fetch(
        `${backendUrl}/api/user/choose-trainer/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error picking trainer", error);
    }
  }, []);

  const becomeTrainer = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${backendUrl}/api/user/trainer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error becoming trainer", error);
    }
  }, []);

  return { pickTrainer, trainers, setTrainers } as UseTrainersContextType;
};

export type UseTrainersContextType = {
  pickTrainer: (userId: number) => Promise<void>;
  trainers: TrainerBase[];
  setTrainers: (trainers: TrainerBase[]) => void;
};
