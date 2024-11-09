import React from "react";

export default function CalendarEvents({
  events,
}: {
  events: { date: Date; href: string }[];
}) {
  console.log(events);

  return (
    <div className="mb-2 w-full xl:w-1/2 rounded-sm border border-gray-100 p-4"></div>
  );
}
