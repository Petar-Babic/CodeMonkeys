"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const changeAccessTokenFromSession = async (accessToken: string) => {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("session before change", session);
    session.accessToken = accessToken;
    console.log("session after change", session);
  }
};
