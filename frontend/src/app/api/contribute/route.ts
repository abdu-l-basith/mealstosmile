import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, amount, message, cause, source } = body;

    // Validate required fields
    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Name and WhatsApp number are required." },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "sacrednational@majmau.com";
    const formattedAmount = amount ? `₹ ${amount.toString().replace(/[^0-9,]/g, "")}` : "Not Specified";
    const formattedEmail = email && email.trim() ? email.trim() : "Not Provided";
    const formattedMessage = message && message.trim() ? message.trim() : "No message";
    const formattedCause = cause || "General Contribution";
    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // HTML Email template
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #07b9b3 0%, #20b37a 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Meal to Smile</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">New Contribution & Support Inquiry</p>
        </div>

        <!-- Body -->
        <div style="padding: 24px;">
          <p style="font-size: 14px; color: #475569; margin-top: 0;">
            A new visitor has submitted the contribution form on the <strong>Sacred National - Meal to Smile</strong> website. Below are their details:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: 700; color: #1e293b; width: 35%;">Full Name:</td>
              <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
              <td style="padding: 12px 8px; font-weight: 700; color: #1e293b;">WhatsApp Number:</td>
              <td style="padding: 12px 8px; color: #07b9b3; font-weight: 700;">
                <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}" style="color: #07b9b3; text-decoration: none;">
                  ${whatsapp} ↗ (Chat on WhatsApp)
                </a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: 700; color: #1e293b;">Email Address:</td>
              <td style="padding: 12px 8px; color: #334155;">
                ${email ? `<a href="mailto:${email}" style="color: #20b37a;">${email}</a>` : '<span style="color: #94a3b8;">Not Provided</span>'}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
              <td style="padding: 12px 8px; font-weight: 700; color: #1e293b;">Cause / Purpose:</td>
              <td style="padding: 12px 8px; color: #0f172a; font-weight: 700;">
                <span style="background-color: #ecfdf5; color: #059669; padding: 3px 10px; border-radius: 9999px; font-size: 12px; display: inline-block;">
                  ${formattedCause}
                </span>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: 700; color: #1e293b;">Amount (INR):</td>
              <td style="padding: 12px 8px; color: #0f172a; font-weight: 800; font-size: 15px;">
                ${formattedAmount}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
              <td style="padding: 12px 8px; font-weight: 700; color: #1e293b; vertical-align: top;">Message:</td>
              <td style="padding: 12px 8px; color: #334155; line-height: 1.5; white-space: pre-line;">${formattedMessage}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Source:</td>
              <td style="padding: 12px 8px; color: #64748b; font-size: 12px;">${source || "Website Form"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; font-weight: 700; color: #64748b;">Time:</td>
              <td style="padding: 12px 8px; color: #64748b; font-size: 12px;">${submittedAt} (IST)</td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}" style="background: linear-gradient(135deg, #07b9b3 0%, #20b37a 100%); color: #ffffff; padding: 12px 24px; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 13px;">
              Contact Donor on WhatsApp
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
          Meal to Smile &bull; House 4/96 E, Firdaus Nagar, Aligarh, UP 202001 &bull; sacrednational@majmau.com
        </div>
      </div>
    `;

    // Send email via SMTP if configured
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

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Meal to Smile" <${smtpUser}>`,
        to: adminEmail,
        replyTo: email || undefined,
        subject: `[New Contribution] ${name} - ${formattedCause} (${formattedAmount})`,
        html: htmlContent,
      });
    } else {
      // Log lead details in server logs if SMTP is not configured yet
      console.log("=== NEW CONTRIBUTION INQUIRY RECEIVED ===");
      console.log({
        name,
        whatsapp,
        email: formattedEmail,
        amount: formattedAmount,
        cause: formattedCause,
        message: formattedMessage,
        source: source || "Website Form",
        time: submittedAt,
      });
      console.log("=========================================");
    }

    return NextResponse.json({
      success: true,
      message: "Details shared, our executive will contact you soon",
    });
  } catch (error: unknown) {
    console.error("Error processing contribution form:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
