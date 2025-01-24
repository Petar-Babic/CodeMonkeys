import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken } = body;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    // Ažuriraj session
    session.accessToken = accessToken;

    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
}
