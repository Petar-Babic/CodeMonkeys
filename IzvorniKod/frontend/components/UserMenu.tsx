// components/UserMenu.tsx
"use client";

import React from "react";
import { ChevronRight, LogOut, User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { Role } from "@/types/user";

export default function UserMenu() {
  const { session, isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
  };

  if (!isAuthenticated || !session?.user) {
    return null;
  }

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  console.log("session", session);

  const role = session.user.role;

  const isUser =
    role.toString().toLowerCase() === Role.USER.toString().toLowerCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mx-4 focus:outline-none">
        <Button
          variant="ghost"
          className="relative h-8 w-8 mx-4 rounded-full focus:ring-0 focus:ring-offset-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user.image || undefined}
              alt={session.user.email || "User"}
              className="bg-green-50"
            />
            <AvatarFallback className="bg-green-50">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex space-y-1">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={session.user.image || undefined}
                alt={session.user.email || "User"}
                className="bg-green-50"
              />
              <AvatarFallback className="bg-green-50">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center space-y-1 pl-4">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                {session.user.name}
              </p>
              <p className="text-xs font-light leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="pl-4 flex items-center cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <User className="w-4 h-4 mr-2" />
          <span className="font-light text-sm text-gray-700">Account</span>
          <ChevronRight
            className="w-4 h-4 ml-auto text-gray-700"
            strokeWidth={1}
          />
        </DropdownMenuItem>
        {isUser && (
          <DropdownMenuItem
            className="pl-4 flex items-center cursor-pointer"
            onClick={() => {
              router.push("/choose-trainer");
            }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            <span className="font-light text-sm text-gray-700">
              Choose Trainer
            </span>
            <ChevronRight
              className="w-4 h-4 ml-auto text-gray-700"
              strokeWidth={1}
            />
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={handleLogout}
          className="pl-4 flex items-center cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="font-light text-sm text-gray-700">Log out</span>
          <ChevronRight
            className="w-4 h-4 ml-auto text-gray-700"
            strokeWidth={1}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
