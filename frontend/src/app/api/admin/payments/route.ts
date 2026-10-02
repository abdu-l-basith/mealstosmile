import { NextRequest, NextResponse } from "next/server";
import { PaymentStore } from "@/lib/paymentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payments = await PaymentStore.getAllPayments();
    return NextResponse.json({
      success: true,
      payments,
      count: payments.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API Admin Payments] Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      donorName,
      donorEmail,
      donorPhone,
      cause,
      amount,
      paymentMethod,
      panNumber,
      notes,
      status,
    } = body;

    if (!donorName || !amount) {
      return NextResponse.json(
        { error: "Donor Name and Amount are required." },
        { status: 400 }
      );
    }

    const createdPayment = await PaymentStore.addPayment({
      donorName,
      donorEmail,
      donorPhone,
      cause,
      amount: parseFloat(amount),
      paymentMethod: paymentMethod || "UPI",
      status: status || "Completed",
      panNumber,
      notes: notes || "Manual Admin Entry",
    });

    return NextResponse.json({
      success: true,
      payment: createdPayment,
      message: "Transaction recorded successfully.",
    });
  } catch (error) {
    console.error("[API Admin Payments] Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to record manual transaction." },
      { status: 500 }
    );
  }
}
