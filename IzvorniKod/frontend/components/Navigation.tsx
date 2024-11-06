"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LucideIcon,
  Dumbbell,
  NotebookText,
  LayoutList,
  User,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: "Workout Plans",
    href: "/workout-plans",
    icon: NotebookText,
  },
  {
    title: "Exercises",
    href: "/exercises",
    icon: LayoutList,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Nutrition",
    href: "/nutrition",
    icon: Utensils,
  },
  {
    title: "User Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Navigation({
  orientation = "vertical",
}: {
  orientation?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={`flex ${
          orientation === "vertical"
            ? "flex-col w-[60px] h-full"
            : "w-full h-[60px]"
        } items-center bg-background p-3 ${
          orientation === "vertical" ? "border-r" : "border-t"
        }`}
      >
        <div
          className={`flex ${
            orientation === "vertical" ? "flex-col" : "justify-around w-full"
          } gap-3`}
        >
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  variant={pathname.includes(item?.href) ? "default" : "ghost"}
                  size="icon"
                  className="h-10 w-10"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side={orientation === "vertical" ? "right" : "top"}
              >
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
