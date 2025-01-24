"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { backendUrl } from "@/data/backendUrl";
import { useRouter } from "next/navigation";
import { TrainerBase } from "@/types/trainer";
export default function ChooseTrainer({ trainer }: { trainer: TrainerBase }) {
  const router = useRouter();
  const initials = trainer.name
    ? trainer.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  const handleChooseTrainer = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      const data = {
        userId: trainer.userId,
      };

      console.log(data);

      await fetch(`${backendUrl}/api/user/choose-trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      alert("Trainer chosen successfully");

      router.push("/workouts");
    } catch (error) {
      console.error("Error choosing trainer", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        variant="outline"
        className="relative h-[100px] bg-gray-900 w-[100px] mx-4 rounded-full focus:ring-0 flex justify-center items-center focus:ring-offset-0 hover:bg-gray-700"
        onClick={handleChooseTrainer}
      >
        <Avatar className="bg-transparent ">
          <AvatarImage
            src={trainer.image || undefined}
            alt={trainer.name || "Trainer"}
            className="bg-black rounded-full"
          />
          <AvatarFallback className=" bg-transparent text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Button>

      <h5 className="text-white mt-2">{trainer.name}</h5>
      <p className="text-white mt-2 text-xs">
        Currently has {trainer.numberOfClients} clients
      </p>
    </div>
  );
}
