import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const TO_EMAIL = "theethicsreporter@gmail.com";
const TO_NAME = "Ethics Reporter Admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, profession, state, complaint, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>New Ethics Defense Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone || "Not provided"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Profession</td><td style="padding:8px;border:1px solid #ddd;">${profession || "Not specified"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">State</td><td style="padding:8px;border:1px solid #ddd;">${state || "Not specified"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Complaint Type</td><td style="padding:8px;border:1px solid #ddd;">${complaint || "Not specified"}</td></tr>
      </table>
      <h3 style="margin-top:20px;">Message</h3>
      <div style="background:#f9f9f9;padding:16px;border-left:4px solid #8B0000;font-family:Georgia,serif;line-height:1.6;white-space:pre-wrap;">${message}</div>
      <p style="color:#666;font-size:12px;margin-top:20px;">Submitted via theethicsreporter.com/defend</p>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Ethics Defense Inquiry", email: "noreply@theethicsreporter.com" },
        to: [{ email: TO_EMAIL, name: TO_NAME }],
        replyTo: { email, name },
        subject: `Ethics Defense Inquiry — ${name} (${profession || "Unknown profession"}, ${state || "Unknown state"})`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Brevo error:", err);
      return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Defend contact error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
