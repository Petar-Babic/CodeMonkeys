"use client";
import React from "react";

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

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.image}</div>
    </div>
  );
}
