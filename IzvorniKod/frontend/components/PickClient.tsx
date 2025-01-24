"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { backendUrl } from "@/data/backendUrl";
import { useRouter } from "next/navigation";

export default function PickClient({
  user,
}: {
  user: {
    userId: number;
    name: string;
    image?: string;
  };
}) {
  const router = useRouter();

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  const handlePickClient = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `${backendUrl}/api/trainer/pick-client/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("data after pick client", data);

      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("userId", user.userId.toString());

      router.refresh();
      router.push("/workouts");
    } catch (error) {
      console.error("Error picking client", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        variant="outline"
        className="relative h-[100px] bg-gray-900 w-[100px] mx-4 rounded-full focus:ring-0 flex justify-center items-center focus:ring-offset-0 hover:bg-gray-700"
        onClick={handlePickClient}
      >
        <Avatar className="bg-transparent">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || "User"}
            className="bg-black rounded-full"
          />
          <AvatarFallback className="bg-transparent text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Button>

      <h5 className="text-white mt-2">{user.name}</h5>
    </div>
  );
}
