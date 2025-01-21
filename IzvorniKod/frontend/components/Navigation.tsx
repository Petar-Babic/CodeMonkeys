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
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItemsForUser: NavItem[] = [
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

const navItemsForAdmin: NavItem[] = [
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
  },
  {
    title: "Workout Plans",
    href: "/admin/workout-plans",
    icon: NotebookText,
  },
  {
    title: "Food",
    href: "/admin/food",
    icon: Utensils,
  },
  {
    title: "Muscle Groups",
    href: "/admin/muscle-groups",
    icon: User,
  },
];

const navItemsForTrainer: NavItem[] = [
  {
    title: "Trainer",
    href: "/trainer",
    icon: Settings,
  },
];

export default function Navigation({
  orientation = "vertical",
  role,
}: {
  orientation?: "vertical" | "horizontal";
  role?: string;
}) {
  const pathname = usePathname();

  const getNavItems = (role: string | undefined) => {
    if (role === "ADMIN") {
      return navItemsForAdmin;
    }
    if (role === "TRAINER") {
      return navItemsForTrainer;
    }
    return navItemsForUser;
  };

  const getVariant = (href: string) => {
    console.log("pathname", pathname);
    console.log("href", href);
    if (href === "/admin") {
      return href === pathname ? "default" : "ghost";
    }
    return pathname.includes(href) ? "default" : "ghost";
  };

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
          {getNavItems(role).map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  variant={getVariant(item.href)}
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
