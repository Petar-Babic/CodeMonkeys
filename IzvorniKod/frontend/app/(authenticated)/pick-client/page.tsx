import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import PickClient from "@/components/PickClient";

export default async function PickClientPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const clients = session.user.users;

  console.log("session pick client page", clients);

  return (
    <>
      <div className="w-full z-50 top-0 left-0 p-30 gap-10 justify-center items-center  bg-black h-full flex-col flex xl:flex-row absolute max-xl:pt-14">
        <h4 className="text-white w-full text-center absolute top-0 left-0 p-20 text-3xl font-bold">
          {clients && clients?.length > 0
            ? "Pick Client"
            : "Wait to some clients pick you as trainer"}
        </h4>
        {clients?.map((client) => (
          <div key={client.userId}>
            <PickClient user={client} />
          </div>
        ))}
      </div>
    </>
  );
}
