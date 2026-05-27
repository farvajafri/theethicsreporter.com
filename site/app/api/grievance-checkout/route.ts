import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const REVIEW_EMAIL = "theethicsreporter@gmail.com";
const REVIEW_NAME = "Ethics Opinion Review Team";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theethicsreporter.com";

function ruleLabel(val: string): string {
  const map: Record<string, string> = {
    rule_1_1: "Rule 1.1 — Competence",
    rule_1_3: "Rule 1.3 — Diligence",
    rule_1_4: "Rule 1.4 — Communication",
    rule_1_5: "Rule 1.5 — Fees",
    rule_1_6: "Rule 1.6 — Confidentiality",
    rule_1_7: "Rule 1.7 — Conflicts of Interest (current clients)",
    rule_1_8: "Rule 1.8 — Conflicts of Interest (prohibited transactions)",
    rule_1_9: "Rule 1.9 — Duties to Former Clients",
    rule_1_15: "Rule 1.15 — Safekeeping Property",
    rule_1_16: "Rule 1.16 — Declining or Terminating Representation",
    rule_3_1: "Rule 3.1 — Meritorious Claims",
    rule_3_3: "Rule 3.3 — Candor Toward the Tribunal",
    rule_3_4: "Rule 3.4 — Fairness to Opposing Party",
    rule_4_1: "Rule 4.1 — Truthfulness in Statements to Others",
    rule_8_4: "Rule 8.4 — Misconduct",
    rule_8_5: "Rule 8.5 — Disciplinary Authority",
    unsure:   "Not sure (reviewers to identify)",
    multiple: "Multiple rules",
  };
  return map[val] ?? val;
}

function outcomeLabel(val: string): string {
  const map: Record<string, string> = {
    understand: "Understand if a violation occurred",
    grievance: "Intends to file a formal grievance",
    malpractice: "Considering malpractice lawsuit",
    negotiate: "Wants leverage to negotiate",
    multiple: "Multiple / not sure",
  };
  return (map[val] ?? val) || "Not specified";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      yourName,
      yourEmail,
      yourPhone,
      attorneyName,
      attorneyBarNumber,
      attorneyState,
      rulesAlleged,
      incidentDate,
      description,
      desiredOutcome,
      priorFiling,
    } = body;

    // Basic validation
    if (!yourName || !yourEmail || !attorneyName || !attorneyState || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Stripe metadata has 500-char limit per value; truncate description for metadata
    const descTruncated = description.slice(0, 490);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: yourEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Professional Ethics Opinion",
              description: `Attorney-reviewed, caselaw-cited ethics opinion — 24-hour delivery`,
            },
            unit_amount: 25000, // $250.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${SITE_URL}/submit-grievance/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/submit-grievance/apply`,
      metadata: {
        type: "grievance_opinion",
        yourName,
        yourEmail,
        yourPhone: yourPhone || "",
        attorneyName,
        attorneyBarNumber: attorneyBarNumber || "",
        attorneyState,
        rulesAlleged,
        incidentDate: incidentDate || "",
        desiredOutcome: desiredOutcome || "",
        priorFiling: priorFiling || "no",
        // Description stored truncated in metadata; full version in notification email
        descriptionPreview: descTruncated,
      },
    });

    // Immediately email the full grievance to the review team
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    const adminLink = `${SITE_URL}/admin/opinions?session=${session.id}`;

    const htmlContent = `
      <div style="font-family:Georgia,serif;max-width:680px;margin:0 auto;padding:20px;">
        <div style="background:#1a0000;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="color:#e8c07a;margin:0;font-size:22px;font-family:Arial,sans-serif;">
            ⚖️ New Grievance Submission — $250 Paid
          </h1>
          <p style="color:#ccc;margin:8px 0 0;font-size:14px;">
            Submitted: ${submittedAt} ET
          </p>
        </div>

        <div style="background:#fdf8f0;border:2px solid #8B0000;border-top:none;padding:30px;border-radius:0 0 8px 8px;">

          <h2 style="color:#8B0000;font-family:Arial,sans-serif;font-size:16px;margin-top:0;">
            SUBMITTER INFORMATION
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;width:200px;background:#fff8f0;">Name</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${yourName}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Email</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;"><a href="mailto:${yourEmail}">${yourEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Phone</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${yourPhone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Desired Outcome</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${outcomeLabel(desiredOutcome)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Prior Grievance Filed?</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${priorFiling === "yes" ? "Yes — already filed" : priorFiling === "pending" ? "Pending / In process" : "No"}</td>
            </tr>
          </table>

          <h2 style="color:#8B0000;font-family:Arial,sans-serif;font-size:16px;">
            ATTORNEY SUBJECT OF COMPLAINT
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;width:200px;background:#fff8f0;">Attorney Name</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${attorneyName}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">State Licensed</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${attorneyState}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Bar Number</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${attorneyBarNumber || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Rule(s) Alleged</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;"><strong>${ruleLabel(rulesAlleged)}</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;font-family:Arial,sans-serif;font-size:13px;background:#fff8f0;">Incident Date</td>
              <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;">${incidentDate || "Not specified"}</td>
            </tr>
          </table>

          <h2 style="color:#8B0000;font-family:Arial,sans-serif;font-size:16px;">
            GRIEVANCE DESCRIPTION
          </h2>
          <div style="background:#fff;border-left:4px solid #8B0000;padding:20px;border-radius:4px;font-size:14px;line-height:1.8;white-space:pre-wrap;margin-bottom:24px;">
${description}
          </div>

          <div style="background:#1a0000;padding:16px;border-radius:8px;text-align:center;margin-top:20px;">
            <p style="color:#e8c07a;font-family:Arial,sans-serif;font-size:14px;margin:0 0 10px;">
              ⏱ <strong>24-HOUR DELIVERY REQUIRED</strong>
            </p>
            <a href="${adminLink}" style="background:#8B0000;color:white;text-decoration:none;padding:12px 24px;border-radius:6px;font-family:Arial,sans-serif;font-weight:bold;font-size:14px;">
              Open Admin Panel to Submit Opinion →
            </a>
          </div>

          <p style="font-size:12px;color:#999;margin-top:20px;text-align:center;font-family:Arial,sans-serif;">
            Stripe Session: ${session.id} · Submitted: ${submittedAt} ET
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
        sender: { name: "Ethics Opinion System", email: "noreply@theethicsreporter.com" },
        to: [{ email: REVIEW_EMAIL, name: REVIEW_NAME }],
        cc: [{ email: "theethicsreporter@gmail.com", name: "Ethics Reporter Admin" }],
        replyTo: { email: yourEmail, name: yourName },
        subject: `⚖️ NEW GRIEVANCE — ${yourName} vs. ${attorneyName} (${attorneyState}) — ${ruleLabel(rulesAlleged)}`,
        htmlContent,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error("Brevo grievance email error:", err);
      // Don't fail the checkout — log but continue
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Grievance checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
