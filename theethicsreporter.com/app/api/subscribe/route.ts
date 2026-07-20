import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const TER_LIST_ID = 17; // TER Newsletter Subscribers
const SITE_URL = "https://www.theethicsreporter.com";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    // Add contact to Brevo with double opt-in
    // First, create/update the contact
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: {
          FIRSTNAME: firstName?.trim() || "",
        },
        listIds: [TER_LIST_ID],
        updateEnabled: true,
      }),
    });

    // 204 = already exists (updated), 201 = created, both are fine
    if (!contactRes.ok && contactRes.status !== 204) {
      const err = await contactRes.json().catch(() => ({}));
      // Code 4 = contact already exists in Brevo — that's fine
      if (err.code !== "duplicate_parameter") {
        console.error("Brevo contact error:", err);
        return NextResponse.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
      }
    }

    // Send confirmation / welcome email via Brevo transactional
    const confirmRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "The Ethics Reporter", email: "briefing@theethicsreporter.com" },
        to: [{ email: email.toLowerCase().trim(), name: firstName || "" }],
        subject: "You're subscribed to The Ethics Reporter Briefing",
        htmlContent: buildWelcomeEmail(firstName || "Reader"),
      }),
    });

    if (!confirmRes.ok) {
      console.error("Welcome email failed:", await confirmRes.text());
      // Still return success — they're subscribed even if welcome email fails
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}

function buildWelcomeEmail(firstName: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-top:5px solid #8B0000;max-width:600px;">
        <tr>
          <td style="padding:40px 40px 20px;">
            <p style="font-family:sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#8B0000;margin:0 0 16px;">The Ethics Reporter</p>
            <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#111;margin:0 0 20px;line-height:1.3;">You're in, ${firstName}.</h1>
            <p style="font-size:17px;line-height:1.7;color:#333;margin:0 0 16px;">
              Starting tomorrow, you'll receive The Ethics Reporter Briefing — our daily digest of the accountability journalism that matters most.
            </p>
            <p style="font-size:17px;line-height:1.7;color:#333;margin:0 0 16px;">
              Every morning, we'll send you the stories we're watching, the court decisions we're tracking, and the judges and officials we believe the public deserves to know about.
            </p>
            <p style="font-size:17px;line-height:1.7;color:#333;margin:0 0 32px;">
              No ads. No corporate sponsors. No interference.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;background:#fdf8f0;border-top:1px solid #e8e0d0;">
            <p style="font-family:sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#8B0000;margin:0 0 12px;">Before you go — one ask</p>
            <p style="font-size:16px;line-height:1.7;color:#333;margin:0 0 16px;">
              The Ethics Reporter has no advertisers and no corporate backers. We exist entirely because readers like you believe this reporting matters enough to support it.
            </p>
            <p style="font-size:16px;line-height:1.7;color:#333;margin:0 0 20px;">
              If you can spare even $5 a month, it keeps us going. Every dollar goes directly into reporting, not overhead.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#8B0000;border-radius:4px;">
                  <a href="${SITE_URL}/donate" style="display:inline-block;padding:14px 28px;font-family:sans-serif;font-size:14px;font-weight:bold;color:#fff;text-decoration:none;letter-spacing:0.5px;">Support The Ethics Reporter →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #e8e0d0;">
            <p style="font-family:sans-serif;font-size:11px;color:#999;margin:0;line-height:1.6;">
              You're receiving this because you subscribed at theethicsreporter.com.<br>
              <a href="${SITE_URL}/unsubscribe?email={{contact.EMAIL}}" style="color:#8B0000;">Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
