import React from "react";
import Image from "next/image";
// import params and if the page body-stats-and-goals dontr shwo this
// loading screen

export default function LoadingAppScreen() {
  return (
    <div className="fixed z-50 inset-0 flex-col space-y-10 bg-black flex items-center justify-center">
      <Image
        src="/logo.png"
        width={400}
        height={400}
        alt="Logo"
        className="w-[80%] max-w-[30rem] object-contain animate-pulse"
      />
    </div>
  );
}
