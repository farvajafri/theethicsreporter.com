#!/usr/bin/env python3
"""
Daily generator: "What to do after your license is suspended" — state × profession guide.
Tone: reassuring, empathetic, practical. Not adversarial.
Runs at 2 PM ET daily. Picks next pending article from tracker.
"""

import json, os, sys, ssl, base64, time, urllib.request, subprocess
from datetime import datetime, timezone

REPO = "/Users/farvascott/code/theethicsreporter"
POSTS_FILE = f"{REPO}/site/data/posts.json"
IMG_DIR = f"{REPO}/site/public/images/posts"
TRACKER_FILE = f"{REPO}/suspended-license-tracker.json"
SECRETS_DIR = "/Users/farvascott/.openclaw/workspace/.secrets"
TER_CHANNEL = "1486847808362516572"

GEMINI_KEY = json.load(open(f"{SECRETS_DIR}/gemini-api.json"))["api_key"]
ssl_ctx = ssl.create_default_context()

# ── Profession-specific detail tables ─────────────────────────────────────────
PROFESSION_DATA = {
    "attorney": {
        "board_label": "State Bar",
        "license_type": "law license",
        "regulator": "State Bar / Supreme Court",
        "alternatives": [
            "Legal consulting (non-representational advice to businesses)",
            "Compliance analyst or risk manager roles",
            "Legal writing, research, or document review for law firms",
            "Paralegal or legal operations work",
            "Law school teaching or tutoring (bar prep)",
            "Mediation or arbitration training",
            "Starting a legal technology or consulting business",
            "Expert witness work in your practice area",
        ],
        "reinstatement_tips": [
            "Complete all required CLE hours during the suspension period",
            "Address the underlying issue head-on — ethics violations require demonstrated rehabilitation",
            "Retain an attorney who specializes in bar discipline matters",
            "Request a fitness evaluation proactively if substance abuse was involved",
            "Document community service, treatment, and character references systematically",
        ],
        "tone_note": "Suspension is not the end of a legal career — thousands of attorneys have returned to practice.",
    },
    "doctor": {
        "board_label": "Medical Board",
        "license_type": "medical license",
        "regulator": "State Medical Board",
        "alternatives": [
            "Medical consulting for insurance companies or law firms",
            "Expert witness testimony in medical malpractice cases",
            "Medical writing, research, or pharmaceutical consulting",
            "Healthcare administration or medical director roles",
            "Telemedicine in jurisdictions where you may still hold a valid license",
            "Medical education, training, or simulation",
            "FDA or pharmaceutical regulatory affairs consulting",
            "Hospital quality improvement or patient safety consulting",
        ],
        "reinstatement_tips": [
            "Enroll in the Physician Assessment and Clinical Education (PACE) program if competency was at issue",
            "Participate in a Physician Health Program (PHP) if substance abuse was involved",
            "Obtain an independent medical examination proactively",
            "Document peer review and supervision arrangements for reinstatement hearings",
            "Hire an attorney who exclusively practices medical board defense",
        ],
        "tone_note": "Medical boards are legally required to consider rehabilitation — a suspension is not a permanent bar.",
    },
    "nurse": {
        "board_label": "Board of Nursing",
        "license_type": "nursing license",
        "regulator": "State Board of Nursing",
        "alternatives": [
            "Healthcare administration, case management, or utilization review",
            "Medical coding and billing (certification available)",
            "Health coaching or wellness consulting",
            "Medical or clinical research coordination",
            "Drug and alcohol counseling support roles",
            "Home health aide or personal care work",
            "Medical writing or patient education content",
            "Nursing education or simulation lab work where license is not required",
        ],
        "reinstatement_tips": [
            "Many Boards of Nursing offer Alternative to Discipline (ATD) programs — ask about enrollment",
            "Document your sobriety, treatment, or therapy with dated records",
            "Get letters of support from supervisors, coworkers, and healthcare providers",
            "Keep your CPR and basic certifications current during suspension",
            "Contact the National Council of State Boards of Nursing (NCSBN) for multi-state license guidance",
        ],
        "tone_note": "Nursing boards process reinstatement petitions regularly — rehabilitation is the explicit goal of most state programs.",
    },
    "real-estate-agent": {
        "board_label": "Real Estate Commission",
        "license_type": "real estate license",
        "regulator": "State Real Estate Commission",
        "alternatives": [
            "Real estate investor (no license required to buy/sell your own property)",
            "Property management assistant under a licensed manager",
            "Real estate marketing, content, or social media consulting",
            "Mortgage loan processing support roles",
            "Title company or escrow coordination work",
            "Real estate data analysis or market research",
            "Referral arrangements in some states (check regulations carefully)",
            "Home staging, photography, or renovation project management",
        ],
        "reinstatement_tips": [
            "Complete any required ethics or continuing education courses immediately",
            "Resolve any outstanding trust account discrepancies before applying",
            "Request an informal conference with the Commission before the formal hearing",
            "Get a sponsoring broker committed before submitting your reinstatement petition",
            "Demonstrate compliance with any restitution orders promptly",
        ],
        "tone_note": "Real estate suspensions are often temporary and reinstatement rates are high for first-time violations.",
    },
    "teacher": {
        "board_label": "Department of Education / Educator Standards Board",
        "license_type": "teaching certificate",
        "regulator": "State Department of Education",
        "alternatives": [
            "Tutoring (private, in-person or online) — typically does not require a teaching license",
            "Corporate training and instructional design",
            "Curriculum development for educational publishers",
            "Teaching English abroad (many countries do not require US licensure)",
            "Online course creation on Udemy, Teachable, or similar platforms",
            "Educational consulting for nonprofits or community organizations",
            "Substitute teaching in states where it is permitted under different credentials",
            "Library or after-school program support roles",
        ],
        "reinstatement_tips": [
            "Complete any court-ordered requirements and obtain official clearance documentation",
            "Obtain an independent character reference from a former administrator or superintendent",
            "Research whether your district's HR department will provide a neutral reference",
            "Check your state's educator misconduct database — some entries can be contested",
            "Apply to the NASDTEC (National Association of State Directors of Teacher Education) clearinghouse for multi-state reciprocity guidance",
        ],
        "tone_note": "Many educators return to the classroom after suspension — especially for non-criminal violations.",
    },
    "cpa-accountant": {
        "board_label": "Board of Accountancy",
        "license_type": "CPA license",
        "regulator": "State Board of Accountancy",
        "alternatives": [
            "Accounting and bookkeeping for small businesses (some states allow unlicensed accounting work)",
            "Tax preparation for individuals (PTIN does not require a CPA license)",
            "Financial consulting or CFO advisory services",
            "Forensic accounting support roles under a licensed CPA",
            "Internal audit support for corporate employers",
            "Accounting software training and implementation consulting",
            "Personal finance coaching",
            "Enrolled Agent (EA) status with the IRS (separate from CPA licensure)",
        ],
        "reinstatement_tips": [
            "Contact the AICPA Ethics division for guidance on the reinstatement process",
            "Complete required CPE (Continuing Professional Education) during the suspension period",
            "Address any PCAOB or SEC bars separately — they are independent of state licensure",
            "Obtain a signed supervision plan if peer review issues were involved",
            "Document your rehabilitation steps in writing with dated records",
        ],
        "tone_note": "CPA boards routinely reinstate licenses after suspension periods — rehabilitation is explicitly factored in.",
    },
    "social-worker": {
        "board_label": "Board of Social Work",
        "license_type": "social work license",
        "regulator": "State Board of Social Work Examiners",
        "alternatives": [
            "Case management aide or behavioral health support roles",
            "Community outreach coordination for nonprofits",
            "Mental health peer specialist (certification separate from licensure)",
            "Administrative work in social services agencies",
            "Grant writing for social service organizations",
            "Crisis line or helpline support work",
            "Substance abuse recovery coaching (certified separately in many states)",
            "Foster care support and advocacy roles",
        ],
        "reinstatement_tips": [
            "Enroll in supervised practice arrangements immediately — boards want to see structure",
            "Obtain documentation of ongoing therapy or supervision",
            "Contact the NASW (National Association of Social Workers) for reinstatement resources",
            "Complete any required ethics training or additional supervision hours",
            "A written personal statement demonstrating insight is essential at the reinstatement hearing",
        ],
        "tone_note": "Social work boards are among the most rehabilitation-focused in the licensed professions — reinstatement is achievable.",
    },
    "pharmacist": {
        "board_label": "Board of Pharmacy",
        "license_type": "pharmacy license",
        "regulator": "State Board of Pharmacy",
        "alternatives": [
            "Pharmaceutical sales representative roles",
            "Drug utilization review analyst for insurance companies",
            "Pharmacy benefit management consulting",
            "Medical writing for pharmaceutical companies",
            "Clinical research coordination",
            "Healthcare compliance analyst roles",
            "Pharmacy technician work under licensed supervision (check state rules)",
            "Drug information services or poison control support",
        ],
        "reinstatement_tips": [
            "Enroll in the NAPB (National Association of Boards of Pharmacy) Pharmacist Recovery Network if substance abuse was involved",
            "Document chain-of-custody training if diversion was at issue",
            "Obtain a practice mentor committed to supervision before reinstatement",
            "Complete any required CE credits during the suspension period",
            "Voluntarily submit to random drug testing — boards strongly favor proactive compliance",
        ],
        "tone_note": "Pharmacy boards have established recovery programs specifically designed to bring pharmacists back to practice.",
    },
    "dentist": {
        "board_label": "Dental Board",
        "license_type": "dental license",
        "regulator": "State Board of Dental Examiners",
        "alternatives": [
            "Dental consulting or practice management advisory work",
            "Dental sales and equipment representative roles",
            "Dental school teaching or simulation lab instruction",
            "Oral health education and public health advocacy",
            "Dental insurance claims review and consulting",
            "Dental research or clinical trial support",
            "Medical or dental writing for professional publications",
            "Teledentistry consulting where permissible",
        ],
        "reinstatement_tips": [
            "Document participation in continuing education during the suspension",
            "Arrange supervised practice agreements with a current licensee for transition",
            "Contact your state's Dentist Well-Being Committee if impairment was a factor",
            "Review your DEA registration separately — it operates independently of dental licensure",
            "Submit a detailed personal narrative with your reinstatement petition",
        ],
        "tone_note": "Dental boards process reinstatement petitions regularly and many dentists return to full practice.",
    },
    "chiropractor": {
        "board_label": "Board of Chiropractic Examiners",
        "license_type": "chiropractic license",
        "regulator": "State Board of Chiropractic Examiners",
        "alternatives": [
            "Health and wellness coaching",
            "Chiropractic consulting for personal injury law firms",
            "Ergonomics consulting for employers",
            "Physical therapy aide or rehabilitation support (check state rules)",
            "Nutrition and lifestyle counseling (where separately certified)",
            "Medical or health content writing",
            "Chiropractic product sales or clinic management consulting",
            "Fitness or athletic performance coaching",
        ],
        "reinstatement_tips": [
            "Complete required continuing education during the suspension period",
            "Document rehabilitation steps thoroughly and in writing",
            "Contact the American Chiropractic Association for member support resources",
            "Understand whether your malpractice insurer must be notified",
            "A supervised practice arrangement post-reinstatement may be required — arrange it early",
        ],
        "tone_note": "Chiropractic license suspensions are frequently temporary and reinstatement is common for first violations.",
    },
    "financial-advisor": {
        "board_label": "Financial Industry Regulatory Authority (FINRA) / State Securities Regulator",
        "license_type": "securities license / investment advisor registration",
        "regulator": "FINRA and/or State Securities Division",
        "alternatives": [
            "Financial coaching or budgeting services (no license required for general education)",
            "Tax preparation (requires PTIN, separate from securities licensing)",
            "Insurance sales in lines not requiring securities licenses",
            "Corporate finance, FP&A, or treasury analyst roles",
            "Real estate investing or syndication",
            "Financial writing, blogging, or content creation",
            "Accounting or bookkeeping services",
            "Business valuation consulting (under supervision)",
        ],
        "reinstatement_tips": [
            "Check FINRA BrokerCheck immediately — understand exactly what is public",
            "A statutory disqualification (SD) requires a Member Firm Sponsorship application — find a sponsor early",
            "Expungement of certain U4 disclosures is possible — consult an attorney who specializes in FINRA proceedings",
            "Re-examination requirements vary by license type — confirm what exams you must retake",
            "Contact the North American Securities Administrators Association (NASAA) for state-level reinstatement guidance",
        ],
        "tone_note": "FINRA and state securities regulators have established reinstatement pathways — returning to practice is achievable.",
    },
    "contractor": {
        "board_label": "Contractors State License Board / State Licensing Board",
        "license_type": "contractor's license",
        "regulator": "State Contractors Board",
        "alternatives": [
            "Unlicensed work under a licensed contractor (as a subcontractor or employee)",
            "Construction consulting, estimating, or project management",
            "Building inspection preparation services",
            "Construction materials sales or supply chain roles",
            "Home repair handyman work (many states allow small jobs without a license)",
            "Construction equipment operation roles",
            "Safety and OSHA compliance consulting",
            "Real estate fix-and-flip investing (as property owner, no contractor license needed)",
        ],
        "reinstatement_tips": [
            "Resolve any outstanding workers compensation or liability insurance lapses immediately",
            "Pay any outstanding fines or judgments — boards check these at reinstatement",
            "Obtain a new surety bond before submitting the reinstatement application",
            "Document completion of any required continuing education",
            "If a criminal conviction was involved, obtain a certificate of rehabilitation first",
        ],
        "tone_note": "Contractor license reinstatement is a defined administrative process — compliance is the primary factor.",
    },
}

# ── State licensing board info ─────────────────────────────────────────────────
STATE_ATTORNEY_BOARDS = {
    "California": ("State Bar of California", "https://www.calbar.ca.gov", "(415) 538-2000"),
    "Texas": ("State Bar of Texas", "https://www.texasbar.com", "(512) 463-1463"),
    "Florida": ("The Florida Bar", "https://www.floridabar.org", "(850) 561-5600"),
    "New York": ("New York State Bar Association / Appellate Division", "https://www.nysba.org", "(518) 463-3200"),
    "Illinois": ("Illinois Attorney Registration and Disciplinary Commission", "https://www.iardc.org", "(312) 565-2600"),
    "Pennsylvania": ("Disciplinary Board of the Supreme Court of Pennsylvania", "https://www.padisciplinaryboard.org", "(717) 772-8572"),
    "Ohio": ("Ohio Supreme Court / Disciplinary Counsel", "https://www.sc.ohio.gov/Boards/Disciplinary", "(614) 387-9370"),
    "Georgia": ("State Bar of Georgia", "https://www.gabar.org", "(404) 527-8700"),
    "Michigan": ("Attorney Grievance Commission of Michigan", "https://www.agcmi.com", "(313) 961-6585"),
    "North Carolina": ("North Carolina State Bar", "https://www.ncbar.gov", "(919) 828-4620"),
    "New Jersey": ("Supreme Court of New Jersey / Office of Attorney Ethics", "https://www.njcourts.gov/attorneys/oae.html", "(609) 530-4008"),
    "Virginia": ("Virginia State Bar", "https://www.vsb.org", "(804) 775-0500"),
    "Washington": ("Washington State Bar Association", "https://www.wsba.org", "(206) 443-9722"),
    "Arizona": ("State Bar of Arizona", "https://www.azbar.org", "(602) 252-4804"),
    "Massachusetts": ("Board of Bar Overseers", "https://www.massbbo.org", "(617) 728-8750"),
}

def get_discord_token():
    token = os.environ.get("DISCORD_TOKEN", "")
    if token and len(token) > 20:
        return token
    secrets_path = os.path.expanduser("~/.openclaw/secrets.json")
    if os.path.exists(secrets_path):
        return json.load(open(secrets_path)).get("DISCORD_TOKEN", "")
    return ""

DISCORD_TOKEN = get_discord_token()

def discord_post(message):
    if not DISCORD_TOKEN:
        return
    payload = json.dumps({"content": message}).encode()
    req = urllib.request.Request(
        f"https://discord.com/api/v10/channels/{TER_CHANNEL}/messages",
        data=payload,
        headers={"Authorization": f"Bot {DISCORD_TOKEN}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        urllib.request.urlopen(req, context=ssl_ctx, timeout=15)
    except Exception as e:
        print(f"Discord error: {e}")

def call_anthropic(prompt, max_tokens=8000):
    key_path = f"{SECRETS_DIR}/anthropic-key.txt"
    api_key = open(key_path).read().strip()
    payload = json.dumps({
        "model": "claude-sonnet-4-5",
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": prompt}]
    }).encode()
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={"x-api-key": api_key, "anthropic-version": "2023-06-01", "content-type": "application/json"}
    )
    resp = urllib.request.urlopen(req, context=ssl_ctx, timeout=300)
    return json.loads(resp.read())["content"][0]["text"]

def generate_image(prompt, slug):
    filename = f"{slug}.jpg"
    filepath = os.path.join(IMG_DIR, filename)
    if os.path.exists(filepath):
        return filename
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={GEMINI_KEY}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, context=ssl_ctx, timeout=90)
            data = json.loads(resp.read())
            for candidate in data.get("candidates", []):
                for part in candidate.get("content", {}).get("parts", []):
                    if "inlineData" in part:
                        img_bytes = base64.b64decode(part["inlineData"]["data"])
                        with open(filepath, "wb") as f:
                            f.write(img_bytes)
                        print(f"  Image: {filename} ({len(img_bytes)//1024}KB)")
                        return filename
        except Exception as e:
            print(f"  Image attempt {attempt+1}: {e}")
            time.sleep(4)
    return None

def build_prompt(article):
    prof_slug = article["profession_slug"]
    prof_data = PROFESSION_DATA.get(prof_slug, {})
    state = article["state"]
    prof_name = article["profession"]
    state_abbr = article["state_abbr"]

    alternatives = "\n".join(f"- {a}" for a in prof_data.get("alternatives", []))
    tips = "\n".join(f"- {t}" for t in prof_data.get("reinstatement_tips", []))
    tone = prof_data.get("tone_note", "Suspension is not the end of your career.")
    board_label = prof_data.get("board_label", "licensing board")

    return f"""You are a senior journalist and legal researcher at The Ethics Reporter writing a deeply helpful, reassuring, practical guide for professionals who have just had their license suspended.

Write a comprehensive article titled:
"Your {prof_name} License Was Suspended in {state}: Here's What to Do Next"

TONE: This is NOT an adversarial article. This is a lifeline for someone in crisis. Be warm, direct, and genuinely helpful. Acknowledge that this is terrifying and disorienting. Then give them real, actionable information.

TARGET READER: A {prof_name.lower()} in {state} who just received a suspension order and is panicking. They need to know: what happens now, what can they legally do, how do they get reinstated, and how do they survive financially in the meantime.

REQUIRED SECTIONS (use styled HTML — h2 with red bottom border, clean paragraphs):

1. **Opening** — A calm, reassuring opening. Acknowledge how devastating this feels. State clearly: this is survivable, thousands of {prof_name.lower()}s have been through this and returned to practice. Drop cap on first letter.

2. **What Just Happened: Understanding Your Suspension Order** — Explain what a suspension actually means legally in {state}. Types of suspension (interim, definite term, indefinite). What the {board_label} in {state} is required to notify you about. What you must stop doing immediately. What you do NOT have to give up.

3. **Your First 72 Hours: The Checklist** — Concrete immediate actions. Numbered list. Includes: retain a license defense attorney, read the order carefully, understand appeal deadlines (these are CRITICAL), notify your employer if required, check malpractice/insurance implications, do NOT make public statements, preserve all records and communications.

4. **Your Appeal Rights in {state}** — Explain the appeal or reconsideration process specific to {state} for {prof_name.lower()}s. Timelines matter. Most states have 30-day windows. Explain what an appeal can and cannot accomplish. Encourage them to pursue it.

5. **What You Can Still Do Legally** — This is a critical section. Many suspended {prof_name.lower()}s don't realize how much they CAN still do. Cover:
{alternatives}

6. **How to Survive Financially During Your Suspension** — Practical income guidance. Be honest that this is hard, but concrete about what works. Include: the alternatives above, temporary employment options, professional loans and credit options, whether unemployment may apply, whether 401k early withdrawal makes sense in extreme cases.

7. **The Path Back: How Reinstatement Works in {state}** — Specific reinstatement process for {prof_name.lower()}s in {state}. Timeline expectations. What the board is looking for. Key things that help:
{tips}

8. **How to Choose a License Defense Attorney** — What to look for, questions to ask, why a specialist matters more than a general attorney, red flags to avoid. Approximate cost ranges (be honest).

9. **The Mental Health Reality — and Why It Matters for Reinstatement** — Address burnout, depression, shame, and isolation directly. Explain that boards actually look favorably on people who sought help. Resources: state professional assistance programs, SAMHSA, therapist directories.

10. **What to Tell Your Family, Colleagues, and Clients** — Practical script guidance. What you're legally required to disclose vs. what's your choice. How to handle colleagues who ask. Client notification requirements specific to {state} {prof_name.lower()} regulations.

11. **Closing: The Comeback Is Real** — End with a powerful, honest section. Real statistics on reinstatement rates where available. The message: {tone} This is not the end. What matters most is what you do in the next 90 days.

IMPORTANT:
- Write 3,000–4,500 words of rich HTML
- Use drop cap on first paragraph
- Use <hr style="border:none;border-top:3px solid #8B0000;margin:40px 0;"> between major sections
- Use <h2 style="font-size:1.6em;border-bottom:2px solid #8B0000;padding-bottom:8px;"> for section headers
- Be specific to {state} and {prof_name} wherever possible
- Reference the {board_label} by name
- End with this EXACT donation CTA paragraph:
<p>📢 We rely entirely on reader support to keep this journalism free and independent. No ads, no corporate money — just you. If this reporting matters to you, please consider donating even $1 at <a href="https://theethicsreporter.com/donate">theethicsreporter.com/donate</a> — it genuinely keeps us going. Thank you.</p>

Output ONLY the HTML body content. No markdown. No explanation. Start directly with the first paragraph."""

def get_next_article(tracker):
    for a in tracker["articles"]:
        if a["status"] == "pending":
            return a
    return None

def main():
    tracker = json.load(open(TRACKER_FILE))
    article = get_next_article(tracker)
    if not article:
        print("All 600 articles complete!")
        discord_post("🎉 **Suspended License Guide: COMPLETE** — all 600 state×profession articles published!")
        return

    slug = article["article_slug"]
    prof_name = article["profession"]
    state_name = article["state"]
    print(f"Generating: {prof_name} — {state_name}")

    # Duplicate check
    posts = json.load(open(POSTS_FILE))
    if slug in {p["slug"] for p in posts}:
        print(f"DUPLICATE — skipping {slug}")
        for a in tracker["articles"]:
            if a["article_slug"] == slug:
                a["status"] = "published"
        json.dump(tracker, open(TRACKER_FILE, "w"), indent=2)
        return

    # Generate content
    print("Calling Claude...")
    prompt = build_prompt(article)
    try:
        content = call_anthropic(prompt, max_tokens=9000)
    except Exception as e:
        print(f"Anthropic error: {e}")
        discord_post(f"⚠️ Suspended License Guide — {prof_name}/{state_name}: generation failed: {e}")
        sys.exit(1)

    print(f"Content: {len(content)} chars")

    # Generate image
    img_prompt = f"A professional, warm, and hopeful editorial photograph representing career recovery and professional resilience. A {prof_name.lower()} in {state_name} — suggest their workplace environment (courthouse, clinic, classroom, office) with soft morning light. Person seen from behind looking toward open doors or windows. Hopeful, not defeated. Professional journalism photography. No text."
    img_file = generate_image(img_prompt, slug)

    # Build post
    posts = json.load(open(POSTS_FILE))
    max_id = max(p.get("id", 0) for p in posts)
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")

    title = f"Your {prof_name} License Was Suspended in {state_name}: Here's What to Do Next"
    excerpt = f"<p>A suspended {prof_name.lower()} license in {state_name} is not the end of your career. Here is exactly what to do in the next 72 hours, how to appeal, what you can legally do while suspended, and the real path to reinstatement.</p>"

    new_post = {
        "id": max_id + 1,
        "slug": slug,
        "date": now_str,
        "modified": now_str,
        "status": "publish",
        "type": "post",
        "title": title,
        "excerpt": excerpt,
        "link": f"https://theethicsreporter.com/article/{slug}",
        "featured_image": f"/images/posts/{img_file}" if img_file else "/images/posts/worst-judges-new-york-state-2026.jpg",
        "categories": ["License Defense", "Professional Accountability", "Career Recovery"],
        "tags": [
            f"{state_name} {prof_name.lower()}",
            "license suspension",
            "reinstatement",
            "license defense",
            f"{prof_name.lower()} license",
            state_name,
            "professional license",
            "career recovery"
        ],
        "author": "The Ethics Reporter Staff",
        "content": content
    }

    posts.insert(0, new_post)
    json.dump(posts, open(POSTS_FILE, "w"), indent=2)
    print(f"Published ID {max_id + 1}")

    # Update tracker
    for a in tracker["articles"]:
        if a["article_slug"] == slug:
            a["status"] = "published"
            a["published_date"] = datetime.now().strftime("%Y-%m-%d")
    json.dump(tracker, open(TRACKER_FILE, "w"), indent=2)

    remaining = sum(1 for a in tracker["articles"] if a["status"] == "pending")
    done = 600 - remaining

    # Git + Vercel
    print("Committing...")
    subprocess.run(["git", "add", "-A"], cwd=REPO, check=True)
    subprocess.run(["git", "commit", "-m", f"Add license guide: {prof_name} — {state_name}"], cwd=REPO, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=REPO, capture_output=True)

    print("Deploying to Vercel...")
    deploy = subprocess.run(["vercel", "--prod", "--yes"], cwd=f"{REPO}/site", capture_output=True, text=True, timeout=300)
    deploy_ok = deploy.returncode == 0
    status_line = "✅ Live" if deploy_ok else "⚠️ Deploy failed — manual push needed"

    # Discord
    discord_post(f"""📋 **New Guide Published — The Ethics Reporter**

**{title}**

A step-by-step survival guide: 72-hour checklist, appeal rights, legal income alternatives, and the real reinstatement path.

🔗 <https://theethicsreporter.com/article/{slug}>

📊 Series: {done}/600 guides published ({remaining} remaining)
{status_line}

📢 Support independent journalism → <https://theethicsreporter.com/donate>""")

    print(f"Done. {done}/600 published, {remaining} remaining.")

if __name__ == "__main__":
    main()
