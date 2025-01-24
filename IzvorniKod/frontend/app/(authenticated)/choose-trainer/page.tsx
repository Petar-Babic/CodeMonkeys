"use client";
import React from "react";
import ChooseTrainer from "@/components/ChooseTrainer";
import { useAppContext } from "@/contexts/AppContext";

export default function ChooseTrainerPage() {
  const { trainers } = useAppContext();

  console.log("trainers", trainers);

  return (
    <>
      <div className="w-full z-50 top-0 left-0 p-30 gap-10 justify-center items-center  bg-black h-full flex-col flex xl:flex-row absolute max-xl:pt-14">
        <h4 className="text-white w-full text-center absolute top-0 left-0 p-20 text-3xl font-bold">
          Choose Trainer
        </h4>
        {trainers?.map((trainer) => (
          <div key={trainer.userId}>
            <ChooseTrainer trainer={trainer} />
          </div>
        ))}
      </div>
    </>
  );
}
