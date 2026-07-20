import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, anonymous } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const senderName = anonymous ? "Anonymous Tipster" : name || "Anonymous";
    const replyTo = !anonymous && email ? email : undefined;

    const { error } = await resend.emails.send({
      from: "Ethics Reporter Tips <tips@theethicsreporter.com>",
      to: "theethicsreporter@gmail.com",
      subject: subject || "New Ethics Reporter Tip",
      replyTo,
      html: `
        <h2>New Tip Submission</h2>
        <p><strong>From:</strong> ${senderName}</p>
        ${replyTo ? `<p><strong>Email:</strong> ${replyTo}</p>` : "<p><em>Submitted anonymously</em></p>"}
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <hr />
        <div style="white-space: pre-wrap; font-family: Georgia, serif; line-height: 1.6;">
${message}
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send tip" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Tip API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
