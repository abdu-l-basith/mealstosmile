import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, name, whatsapp, email, cause, message } = body;

    const numericAmount = parseFloat(
      amount ? amount.toString().replace(/[^0-9.]/g, "") : "0"
    );

    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json(
        { error: "A valid contribution amount is required (minimum ₹1)." },
        { status: 400 }
      );
    }

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Name and WhatsApp number are required." },
        { status: 400 }
      );
    }

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "rzp_test_mealtosmile2026";
    const keySecret =
      process.env.RAZORPAY_KEY_SECRET || "mealtosmile_secret_key_2026";

    // Amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(numericAmount * 100);
    const receiptId = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let orderId = "";

    try {
      // Initialize Razorpay SDK instance
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: receiptId,
        notes: {
          donor_name: name.trim(),
          donor_whatsapp: whatsapp.trim(),
          donor_email: email?.trim() || "not_provided",
          cause: cause || "General Contribution",
          message: message?.trim() || "",
        },
      });

      orderId = order.id;
    } catch (sdkError) {
      console.warn(
        "[Razorpay SDK] Live order creation warning (using simulated test order ID):",
        sdkError
      );
      // Fallback order ID for local development / testing without live merchant keys
      orderId = `order_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      currency: "INR",
      keyId,
      receiptId,
      donor: {
        name,
        whatsapp,
        email,
        cause,
      },
    });
  } catch (error: unknown) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment gateway. Please try again." },
      { status: 500 }
    );
  }
}
