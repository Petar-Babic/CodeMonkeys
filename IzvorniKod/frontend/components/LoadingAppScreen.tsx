"use client";
import { useAppContext } from "@/contexts/AppContext";
import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
// import params and if the page body-stats-and-goals dontr shwo this
// loading screen
import { usePathname } from "next/navigation";

export default function LoadingAppScreen() {
  const { isLoading } = useAppContext();
  const pathname = usePathname();

  if (pathname === "/body-stats-and-goals") return null;

  if (!isLoading) return null;

  return (
    <div className="fixed z-10 inset-0 flex-col space-y-10 bg-black flex items-center justify-center">
      <Image
        src="/logo.png"
        width={400}
        height={400}
        alt="Logo"
        className="w-[80%] max-w-[30rem] object-contain animate-in"
      />
      <Loader2 className="h-8 w-8 text-white animate-spin" />
    </div>
  );
}
