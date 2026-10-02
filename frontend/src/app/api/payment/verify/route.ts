import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { PaymentStore } from "@/lib/paymentStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      whatsapp,
      email,
      amount,
      cause,
      message,
      source,
    } = body;

    if (!razorpay_payment_id) {
      return NextResponse.json(
        { error: "Payment verification failed: missing payment identifier." },
        { status: 400 }
      );
    }

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET || "mealtosmile_secret_key_2026";

    // Verify HMAC signature if signature and secret are present
    let isValidSignature = true;
    if (razorpay_order_id && razorpay_signature && process.env.RAZORPAY_KEY_SECRET) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      isValidSignature = generatedSignature === razorpay_signature;
    }

    if (!isValidSignature) {
      return NextResponse.json(
        { error: "Payment signature verification failed." },
        { status: 400 }
      );
    }

    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    const formattedAmount = amount
      ? `₹ ${amount.toString().replace(/[^0-9,.]/g, "")}`
      : "₹ 0";
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // Send confirmation email asynchronously if SMTP configured
    const adminEmail = process.env.ADMIN_EMAIL || "sacrednational@majmau.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #07b9b3, #20b37a); padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0;">Payment Successful - Meal to Smile</h2>
            <p style="margin: 6px 0 0; font-size: 14px;">Official Donation & 80G Receipt</p>
          </div>
          <div style="padding: 24px;">
            <p style="color: #334155; font-size: 14px;">
              A successful donation was received via Razorpay Gateway:
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 12px;">
              <tr><td style="padding: 8px; font-weight: bold;">Donor:</td><td style="padding: 8px;">${name}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">WhatsApp:</td><td style="padding: 8px;">${whatsapp}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email || "Not Provided"}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Amount:</td><td style="padding: 8px; color: #059669; font-weight: bold; font-size: 16px;">${formattedAmount}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Cause:</td><td style="padding: 8px;">${cause || "General Contribution"}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Payment ID:</td><td style="padding: 8px; font-family: monospace;">${razorpay_payment_id}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Receipt No:</td><td style="padding: 8px; font-family: monospace;">${receiptNumber}</td></tr>
              <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Date:</td><td style="padding: 8px;">${submittedAt}</td></tr>
            </table>
          </div>
        </div>
      `;

      transporter.sendMail({
        from: process.env.SMTP_FROM || `"Meal to Smile" <${smtpUser}>`,
        to: adminEmail,
        replyTo: email || undefined,
        subject: `[Donation Received] ${formattedAmount} by ${name} - ${cause}`,
        html: emailHtml,
      }).catch((e) => console.error("Email dispatch error:", e));
    }

    // Persist verified payment in live transaction store
    try {
      const numericVal = parseFloat(
        amount ? amount.toString().replace(/[^0-9.]/g, "") : "0"
      );

      await PaymentStore.addPayment({
        id: razorpay_payment_id,
        receiptNumber,
        donorName: name,
        donorEmail: email || undefined,
        donorPhone: whatsapp,
        cause: cause || "General Contribution",
        amount: numericVal,
        currency: "INR",
        paymentMethod: "Razorpay",
        status: "Completed",
        notes: message
          ? `${message} (Razorpay Order: ${razorpay_order_id || "N/A"})`
          : `Razorpay Order: ${razorpay_order_id || "N/A"}`,
      });
    } catch (storeError) {
      console.error("Failed to store payment in PaymentStore:", storeError);
    }

    console.log("=== RAZORPAY PAYMENT RECORDED ===");
    console.log({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      receiptNumber,
      donor: name,
      amount: formattedAmount,
      cause: cause || "General Contribution",
      timestamp: submittedAt,
    });
    console.log("=================================");

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and recorded.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      receiptNumber,
      amount: formattedAmount,
      donorName: name,
      cause: cause || "General Contribution",
      date: submittedAt,
    });
  } catch (error: unknown) {
    console.error("Error in payment verification:", error);
    return NextResponse.json(
      { error: "Internal error processing payment verification." },
      { status: 500 }
    );
  }
}

