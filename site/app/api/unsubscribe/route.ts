import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const TER_LIST_ID = 17;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new NextResponse("<html><body style='font-family:sans-serif;text-align:center;padding:60px'><h2>Missing email address.</h2></body></html>", {
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    // Remove from TER list
    await fetch(`https://api.brevo.com/v3/contacts/lists/${TER_LIST_ID}/contacts/remove`, {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ emails: [email] }),
    });

    return new NextResponse(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Unsubscribed | The Ethics Reporter</title></head>
<body style="margin:0;padding:60px 20px;font-family:Georgia,serif;background:#f5f0e8;text-align:center;">
  <div style="max-width:480px;margin:0 auto;background:#fff;padding:48px;border-top:5px solid #8B0000;">
    <p style="font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8B0000;margin:0 0 16px;">The Ethics Reporter</p>
    <h1 style="font-size:24px;margin:0 0 16px;color:#111;">You've been unsubscribed.</h1>
    <p style="color:#555;line-height:1.7;margin:0 0 24px;">You won't receive any more briefings from us. We're sorry to see you go.</p>
    <p style="color:#555;line-height:1.7;font-size:14px;">Changed your mind? <a href="https://www.theethicsreporter.com/newsletter" style="color:#8B0000;">Resubscribe here.</a></p>
  </div>
</body>
</html>`, {
      headers: { "Content-Type": "text/html" },
    });
  } catch {
    return new NextResponse("<html><body style='font-family:sans-serif;text-align:center;padding:60px'><h2>Something went wrong. Please try again.</h2></body></html>", {
      headers: { "Content-Type": "text/html" },
    });
  }
}
