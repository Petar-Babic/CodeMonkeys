"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isPast,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Event = {
  name: string;
  date: Date;
  href: string;
};

type CalendarProps = {
  events: Event[];
};

export default function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={previousMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {monthDays.map((day, index) => {
          const dayEvents = events.filter((event) =>
            isSameDay(event.date, day)
          );
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isPastDay = isPast(day) && !isToday(day);
          return (
            <div
              key={index}
              className={`p-2 border ${
                isCurrentMonth ? "bg-white" : "bg-gray-100"
              } ${
                isPastDay ? "opacity-50" : ""
              } min-h-[80px] transition-opacity duration-200`}
            >
              <div
                className={`text-right ${
                  isToday(day)
                    ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                    : ""
                }`}
              >
                {format(day, "d")}
              </div>
              {dayEvents.map((event, eventIndex) => (
                <Link
                  key={eventIndex}
                  href={event.href}
                  className={`block text-sm p-1 mt-1 rounded truncate ${
                    isPastDay
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-blue-100 hover:bg-blue-200"
                  }`}
                >
                  {event.name}
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
