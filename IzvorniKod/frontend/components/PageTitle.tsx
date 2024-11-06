import React from "react";

export default function PageTitle({ title }: { title: string }) {
  return (
    <section className="w-full flex px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4">
      <h1 className="text-lg uppercase font-bold">{title}</h1>
    </section>
  );
}
