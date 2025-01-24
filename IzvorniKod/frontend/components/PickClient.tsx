"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { backendUrl } from "@/data/backendUrl";
export default function PickClient({
  user,
}: {
  user: {
    userId: number;
    name: string;
    image?: string;
  };
}) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  const handlePickClient = async () => {
    const response = await fetch(`${backendUrl}/api/sessions/${user.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="relative h-[100px] bg-gray-900 w-[100px] mx-4 rounded-full focus:ring-0 flex justify-center items-center focus:ring-offset-0 hover:bg-gray-700"
    >
      <Avatar className="bg-transparent ">
        <AvatarImage
          src={user.image || undefined}
          alt={user.name || "User"}
          className="bg-black rounded-full"
        />
        <AvatarFallback className=" bg-transparent text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}
