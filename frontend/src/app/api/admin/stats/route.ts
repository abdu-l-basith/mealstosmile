import { NextResponse } from "next/server";
import { PaymentStore } from "@/lib/paymentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await PaymentStore.getDynamicStats();
    return NextResponse.json({
      success: true,
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API Admin Stats] Error generating stats:", error);
    return NextResponse.json(
      { error: "Failed to generate dynamic dashboard statistics." },
      { status: 500 }
    );
  }
}
