import { NextResponse } from "next/server";
import { PaymentStore } from "@/lib/paymentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const activities = await PaymentStore.getActivities();
    return NextResponse.json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("[API Admin Activities] Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities." },
      { status: 500 }
    );
  }
}
