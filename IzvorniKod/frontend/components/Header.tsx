import React from "react";
import UserMenu from "./UserMenu";
import Image from "next/image";

export default function Header() {
  return (
    <header className="pr-3 h-12 flex-shrink-0 flex justify-between max-xl:fixed max-xl:top-0 z-10 bg-white w-full items-center xl:bg-gray-100 xl:border-b border-gray-200">
      <div className="xl:flex hidden items-center h-full ml-4 space-x-2">
        <Image
          src="/logo-light.png"
          alt="Gym Progress Tracking"
          width={1000}
          height={1000}
          className="h-full w-[10rem] py-2 object-contain "
        />
      </div>{" "}
      <UserMenu />
    </header>
  );
}
