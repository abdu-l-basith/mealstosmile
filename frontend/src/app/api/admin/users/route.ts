import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "This module will be enabled soon",
    users: [],
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "This module will be enabled soon",
  });
}
