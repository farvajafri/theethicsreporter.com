import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const ADMIN_PASSWORD = process.env.ADMIN_OPINIONS_PASSWORD || "TERAdmin2026!";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, opinionHtml, opinionText, reviewerName, password } = body;

    // Auth check
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!sessionId || (!opinionHtml && !opinionText)) {
      return NextResponse.json({ error: "Session ID and opinion content are required." }, { status: 400 });
    }

    // Retrieve Stripe session to get client info + metadata
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const meta = session.metadata || {};

    const clientEmail = meta.yourEmail || session.customer_details?.email;
    const clientName = meta.yourName || session.customer_details?.name || "Client";
    const attorneyName = meta.attorneyName || "the attorney";
    const attorneyState = meta.attorneyState || "";

    if (!clientEmail) {
      return NextResponse.json({ error: "Could not determine client email from Stripe session." }, { status: 400 });
    }

    const deliveredAt = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Format the opinion body — use provided HTML or wrap plain text
    const opinionBody = opinionHtml || `<div style="white-space:pre-wrap;line-height:1.9;font-size:15px;">${opinionText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`;

    const htmlContent = `
      <div style="font-family:Georgia,serif;max-width:680px;margin:0 auto;padding:20px;">

        <!-- Header -->
        <div style="background:#1a0000;padding:28px;border-radius:8px 8px 0 0;text-align:center;">
          <p style="color:#e8c07a;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">The Ethics Reporter</p>
          <h1 style="color:white;margin:0;font-size:26px;font-family:Georgia,serif;">Professional Ethics Opinion</h1>
          <p style="color:#aaa;margin:10px 0 0;font-size:13px;font-family:Arial,sans-serif;">
            Delivered: ${deliveredAt} ET
          </p>
        </div>

        <!-- Body -->
        <div style="background:#fff;border:2px solid #1a0000;border-top:none;padding:36px;border-radius:0 0 8px 8px;">

          <p style="font-size:15px;line-height:1.8;margin-top:0;">Dear ${clientName},</p>

          <p style="font-size:15px;line-height:1.8;">
            Thank you for submitting your grievance to The Ethics Reporter. Below is your
            professional ethics opinion regarding the conduct of <strong>${attorneyName}</strong>
            ${attorneyState ? `(licensed in <strong>${attorneyState}</strong>)` : ""}.
            This opinion has been reviewed and approved by a licensed attorney.
          </p>

          <div style="border-left:4px solid #8B0000;padding-left:16px;margin:8px 0 24px;">
            <p style="font-size:12px;color:#888;font-family:Arial,sans-serif;margin:0;">
              <em>
                Disclaimer: This opinion is an analytical assessment of the conduct described in your
                submission against applicable Rules of Professional Conduct. It does not constitute
                legal advice and does not create an attorney-client relationship. For formal legal
                representation, please consult a licensed attorney.
              </em>
            </p>
          </div>

          <!-- Divider -->
          <hr style="border:none;border-top:2px solid #8B0000;margin:28px 0;" />

          <!-- Opinion Content -->
          <h2 style="font-family:Arial,sans-serif;color:#1a0000;font-size:18px;margin-top:0;">
            Ethics Opinion
          </h2>

          ${opinionBody}

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid #ddd;margin:32px 0;" />

          <!-- Reviewer -->
          <p style="font-size:13px;color:#555;font-family:Arial,sans-serif;margin-bottom:4px;">
            Opinion reviewed and approved by:
          </p>
          <p style="font-size:14px;font-weight:bold;font-family:Arial,sans-serif;color:#1a0000;margin:0;">
            ${reviewerName || "The Ethics Reporter Attorney Review Team"}
          </p>
          <p style="font-size:12px;color:#888;font-family:Arial,sans-serif;margin-top:4px;">
            The Ethics Reporter · theethicsreporter.com
          </p>

          <!-- Next steps -->
          <div style="background:#fdf8f0;border:1px solid #e8c07a;border-radius:8px;padding:20px;margin-top:28px;">
            <h3 style="font-family:Arial,sans-serif;color:#8B0000;font-size:14px;margin-top:0;">Need to Take This Further?</h3>
            <ul style="font-size:13px;line-height:1.8;color:#555;margin:0;padding-left:18px;">
              <li>File a formal grievance with the <a href="https://www.theethicsreporter.com/state" style="color:#8B0000;">state disciplinary authority</a></li>
              <li>Request a referral to an attorney who handles legal malpractice</li>
              <li>Contact us at <a href="mailto:opinions@theethicsreporter.com" style="color:#8B0000;">opinions@theethicsreporter.com</a> with questions</li>
            </ul>
          </div>

          <p style="font-size:12px;color:#aaa;font-family:Arial,sans-serif;margin-top:24px;text-align:center;">
            Reference: ${sessionId} · The Ethics Reporter · theethicsreporter.com<br/>
            This opinion is strictly confidential and intended solely for ${clientName}.
          </p>
        </div>
      </div>
    `;

    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "The Ethics Reporter", email: "opinions@theethicsreporter.com" },
        to: [{ email: clientEmail, name: clientName }],
        replyTo: { email: "opinions@theethicsreporter.com", name: "The Ethics Reporter" },
        subject: `Your Ethics Opinion — ${attorneyName} (${attorneyState}) | The Ethics Reporter`,
        htmlContent,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error("Brevo deliver error:", err);
      return NextResponse.json({ error: "Email delivery failed. Check Brevo logs." }, { status: 500 });
    }

    return NextResponse.json({ success: true, deliveredTo: clientEmail });
  } catch (err) {
    console.error("Grievance deliver error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
