import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  return NextResponse.json(session);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  return NextResponse.json(session);
}
