import { NextRequest, NextResponse } from "next/server";

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

    const accessKey = process.env.WEB3FORMS_KEY;
    if (!accessKey) {
      return NextResponse.json(
        { error: "Form service not configured" },
        { status: 500 }
      );
    }

    const payload: Record<string, string> = {
      access_key: accessKey,
      subject: subject || "New Ethics Reporter Tip",
      from_name: anonymous ? "Anonymous Tipster" : name || "Anonymous",
      message: message,
    };

    if (!anonymous && email) {
      payload.email = email;
      payload.replyto = email;
    } else {
      payload.email = "anonymous@tip.theethicsreporter.com";
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to send tip" },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
