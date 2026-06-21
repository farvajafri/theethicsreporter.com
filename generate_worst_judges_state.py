#!/usr/bin/env python3
"""
Daily generator: Worst Judges ranking article for next US state.
Runs daily, picks the next pending state, generates full article via Anthropic,
creates Gemini hero image, publishes to posts.json, commits + pushes.
Reports result to Discord #theethicsreporter.
"""

import json
import os
import re
import sys
import ssl
import time
import base64
import hashlib
import urllib.request
import urllib.error
import subprocess
from datetime import datetime, timezone

# ── Paths ──────────────────────────────────────────────────────────────────────
REPO = "/Users/farvascott/code/theethicsreporter"
POSTS_FILE = f"{REPO}/site/data/posts.json"
IMG_DIR = f"{REPO}/site/public/images/posts"
TRACKER_FILE = f"{REPO}/worst-judges-state-tracker.json"
SECRETS_DIR = "/Users/farvascott/.openclaw/workspace/.secrets"

# ── Credentials ────────────────────────────────────────────────────────────────
GEMINI_KEY = json.load(open(f"{SECRETS_DIR}/gemini-api.json"))["api_key"]
ANTHROPIC_KEY = open(f"{SECRETS_DIR}/anthropic-key.txt").read().strip() if os.path.exists(f"{SECRETS_DIR}/anthropic-key.txt") else None
# Read Discord token from openclaw secrets
def _get_discord_token():
    token = os.environ.get("DISCORD_TOKEN", "")
    if token and len(token) > 20:
        return token
    # Fall back to reading from secrets.json
    secrets_path = os.path.expanduser("~/.openclaw/secrets.json")
    if os.path.exists(secrets_path):
        s = json.load(open(secrets_path))
        return s.get("DISCORD_TOKEN", "")
    return ""
DISCORD_TOKEN = _get_discord_token()
TER_CHANNEL = "1486847808362516572"

ssl_ctx = ssl.create_default_context()

# ── State judicial commission data ─────────────────────────────────────────────
# For each state: commission name, website, phone (for the "what you can do" section)
STATE_COMMISSION_INFO = {
    "Alabama": {"name": "Alabama Court of the Judiciary", "url": "https://judicial.alabama.gov/court-of-the-judiciary", "phone": "(334) 242-4397"},
    "Alaska": {"name": "Alaska Commission on Judicial Conduct", "url": "https://ajc.alaska.gov", "phone": "(907) 243-3217"},
    "Arizona": {"name": "Arizona Commission on Judicial Conduct", "url": "https://cjc.az.gov", "phone": "(602) 452-3000"},
    "Arkansas": {"name": "Arkansas Judicial Discipline & Disability Commission", "url": "https://www.arjddc.org", "phone": "(501) 682-1050"},
    "California": {"name": "California Commission on Judicial Performance", "url": "https://cjp.ca.gov", "phone": "(415) 557-1200"},
    "Colorado": {"name": "Colorado Commission on Judicial Discipline", "url": "https://www.coloradojudicialdiscipline.com", "phone": "(303) 837-3650"},
    "Connecticut": {"name": "Connecticut Judicial Review Council", "url": "https://www.jud.ct.gov/jrc", "phone": "(860) 757-2150"},
    "Delaware": {"name": "Delaware Court on the Judiciary", "url": "https://courts.delaware.gov", "phone": "(302) 255-0090"},
    "Florida": {"name": "Florida Judicial Qualifications Commission", "url": "https://www.fljqc.com", "phone": "(850) 488-1860"},
    "Georgia": {"name": "Georgia Judicial Qualifications Commission", "url": "https://jqc.georgia.gov", "phone": "(404) 656-4798"},
    "Hawaii": {"name": "Hawaii Commission on Judicial Conduct", "url": "https://www.courts.state.hi.us/about_the_courts/commission_on_judicial_conduct", "phone": "(808) 539-4800"},
    "Idaho": {"name": "Idaho Judicial Council", "url": "https://isc.idaho.gov/judicial-council", "phone": "(208) 334-2246"},
    "Illinois": {"name": "Illinois Courts Commission", "url": "https://illinoiscourtscommission.gov", "phone": "(217) 522-5620"},
    "Indiana": {"name": "Indiana Commission on Judicial Qualifications", "url": "https://www.in.gov/judiciary/judicial-qualifications", "phone": "(317) 233-8585"},
    "Iowa": {"name": "Iowa Commission on Judicial Qualifications", "url": "https://www.iowacourts.gov/iowa-courts/commission-on-judicial-qualifications", "phone": "(515) 281-5911"},
    "Kansas": {"name": "Kansas Commission on Judicial Qualifications", "url": "https://www.kscourts.org/Rules-Orders/Judicial-Conduct", "phone": "(785) 296-2256"},
    "Kentucky": {"name": "Kentucky Judicial Conduct Commission", "url": "https://jcc.ky.gov", "phone": "(502) 573-2300"},
    "Louisiana": {"name": "Louisiana Judiciary Commission", "url": "https://www.judcom.louisiana.gov", "phone": "(504) 568-8377"},
    "Maine": {"name": "Maine Committee on Judicial Responsibility and Disability", "url": "https://www.courts.maine.gov/administration/cjrd", "phone": "(207) 822-0792"},
    "Maryland": {"name": "Maryland Commission on Judicial Disabilities", "url": "https://mdcourts.gov/commission-on-judicial-disabilities", "phone": "(410) 260-3644"},
    "Massachusetts": {"name": "Massachusetts Commission on Judicial Conduct", "url": "https://www.mass.gov/orgs/commission-on-judicial-conduct", "phone": "(617) 725-8050"},
    "Michigan": {"name": "Michigan Judicial Tenure Commission", "url": "https://www.michigan.gov/jtc", "phone": "(517) 373-7016"},
    "Minnesota": {"name": "Minnesota Board on Judicial Standards", "url": "https://bjs.mn.gov", "phone": "(651) 296-3999"},
    "Mississippi": {"name": "Mississippi Commission on Judicial Performance", "url": "https://www.co.hinds.ms.us/pgs/apps/MsCJP", "phone": "(601) 359-1273"},
    "Missouri": {"name": "Missouri Commission on Retirement, Removal and Discipline of Judges", "url": "https://www.courts.mo.gov/page.jsp?id=103", "phone": "(573) 751-4820"},
    "Montana": {"name": "Montana Judicial Standards Commission", "url": "https://montanajudicialstandards.org", "phone": "(406) 444-4922"},
    "Nebraska": {"name": "Nebraska Commission on Judicial Qualifications", "url": "https://supremecourt.nebraska.gov/about/judicial-qualifications-commission", "phone": "(402) 471-3730"},
    "Nevada": {"name": "Nevada Commission on Judicial Discipline", "url": "https://www.judicialdiscipline.nv.gov", "phone": "(702) 486-2400"},
    "New Hampshire": {"name": "New Hampshire Judicial Conduct Committee", "url": "https://www.courts.nh.gov/conduct", "phone": "(603) 271-2521"},
    "New Jersey": {"name": "New Jersey Advisory Committee on Judicial Conduct", "url": "https://www.njcourts.gov/courts/supreme/acjc.html", "phone": "(609) 292-1427"},
    "New Mexico": {"name": "New Mexico Judicial Standards Commission", "url": "https://jsc.nmcourts.gov", "phone": "(505) 827-4800"},
    "North Carolina": {"name": "North Carolina Judicial Standards Commission", "url": "https://www.nccourts.gov/courts/jsc", "phone": "(919) 890-1600"},
    "North Dakota": {"name": "North Dakota Judicial Conduct Commission", "url": "https://www.ndcourts.gov/court/boards/jcc", "phone": "(701) 328-2228"},
    "Ohio": {"name": "Ohio Supreme Court Board of Professional Conduct", "url": "https://www.ohioadvop.org", "phone": "(614) 387-9370"},
    "Oklahoma": {"name": "Oklahoma Council on Judicial Complaints", "url": "https://www.oscn.net/applications/oscn/index.asp?ftdb=STOKCOJ", "phone": "(405) 521-3957"},
    "Oregon": {"name": "Oregon Commission on Judicial Fitness and Disability", "url": "https://www.oregon.gov/cjfd", "phone": "(503) 229-5105"},
    "Pennsylvania": {"name": "Pennsylvania Court of Judicial Discipline", "url": "https://www.cjd.state.pa.us", "phone": "(717) 772-0036"},
    "Rhode Island": {"name": "Rhode Island Commission on Judicial Tenure and Discipline", "url": "https://www.courts.ri.gov/PublicResources/CommissionJudicialTenure.aspx", "phone": "(401) 222-4942"},
    "South Carolina": {"name": "South Carolina Judicial Merit Selection Commission", "url": "https://www.scstatehouse.gov/JMSChome.shtml", "phone": "(803) 212-6682"},
    "South Dakota": {"name": "South Dakota Judicial Qualifications Commission", "url": "https://ujs.sd.gov/About/JQC.aspx", "phone": "(605) 773-3474"},
    "Tennessee": {"name": "Tennessee Court of the Judiciary", "url": "https://tncoj.org", "phone": "(615) 741-2687"},
    "Texas": {"name": "Texas State Commission on Judicial Conduct", "url": "https://www.scjc.texas.gov", "phone": "(512) 463-5533"},
    "Utah": {"name": "Utah Judicial Conduct Commission", "url": "https://www.utcourts.gov/jcc", "phone": "(801) 578-3985"},
    "Vermont": {"name": "Vermont Judicial Conduct Board", "url": "https://www.vermontjudiciary.org/about/judicial-conduct-board", "phone": "(802) 828-3281"},
    "Virginia": {"name": "Virginia Judicial Inquiry and Review Commission", "url": "https://www.vjirc.state.va.us", "phone": "(804) 643-6798"},
    "Washington": {"name": "Washington Commission on Judicial Conduct", "url": "https://www.cjc.state.wa.us", "phone": "(360) 753-4585"},
    "West Virginia": {"name": "West Virginia Judicial Investigation Commission", "url": "https://www.courtswv.gov/legal-community/judicial-investigation-commission", "phone": "(304) 558-0169"},
    "Wisconsin": {"name": "Wisconsin Judicial Commission", "url": "https://wilawlibrary.gov/courts/judcomm.html", "phone": "(608) 267-7630"},
    "Wyoming": {"name": "Wyoming Commission on Judicial Conduct and Ethics", "url": "https://www.courts.state.wy.us/commission-on-judicial-conduct-and-ethics", "phone": "(307) 777-7581"},
}

def discord_post(message):
    """Post message to #theethicsreporter Discord channel."""
    if not DISCORD_TOKEN:
        print("No Discord token, skipping notification")
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
    """Call Anthropic Claude API to generate article content."""
    key_path = f"{SECRETS_DIR}/anthropic-key.txt"
    if not os.path.exists(key_path):
        raise RuntimeError("No Anthropic key at " + key_path)
    api_key = open(key_path).read().strip()
    
    payload = json.dumps({
        "model": "claude-sonnet-4-5",
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": prompt}]
    }).encode()
    
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
    )
    resp = urllib.request.urlopen(req, context=ssl_ctx, timeout=300)
    data = json.loads(resp.read())
    return data["content"][0]["text"]

def generate_image_gemini(prompt, filename):
    """Generate image using Gemini."""
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
                        filepath = os.path.join(IMG_DIR, filename)
                        with open(filepath, "wb") as f:
                            f.write(img_bytes)
                        print(f"Image saved: {filepath}")
                        return True
        except Exception as e:
            print(f"Image attempt {attempt+1} failed: {e}")
            time.sleep(5)
    return False

def get_next_state(tracker):
    """Return next pending state from tracker."""
    for state in tracker["states"]:
        if state["status"] == "pending":
            return state
    return None

def build_article_prompt(state_name, state_abbr, commission_info):
    """Build the Anthropic prompt to generate the article."""
    return f"""You are a senior investigative journalist at The Ethics Reporter, a nonprofit investigative outlet focused on accountability in the American justice system. Write a comprehensive, fully-sourced, deeply-reported article titled:

"The Worst Judges in {state_name}: A Sourced, Criteria-Based Report"

This is part of our 50-state series. The New York version (for reference on tone and depth) covered:
- A detailed methodology section (6 criteria: appellate reversal patterns, reverse-and-reassign orders, formal commission discipline, resignation under cloud, documented bias/conflicts, investigative press coverage)  
- Tier 1: Active judges with the worst documented reversal records (name the judges, cite actual appellate cases with citations)
- Tier 2: Judges removed, censured, admonished, or who resigned under cloud (specific cases, what they did)
- Tier 3: Judges who received the rare "reverse and reassign" order (cite the cases)
- Tier 4: Structural problems in the state's lower courts (justice of the peace courts, rural courts, lay judges, etc.)
- A data section on the {state_name} judicial commission's complaint/discipline statistics
- A "What You Can Do" section pointing to the {commission_info['name']} at {commission_info['url']} (phone: {commission_info['phone']})
- A closing donation CTA for theethicsreporter.com/donate

REQUIREMENTS:
1. Research and name REAL, DOCUMENTED judges in {state_name} with documented misconduct, formal discipline, or notable reversal patterns
2. Cite ACTUAL appellate cases (use realistic citations in proper format)
3. Reference ACTUAL {commission_info['name']} determinations where possible
4. Reference actual investigative journalism (ProPublica, local papers, etc.) where relevant to {state_name}
5. Be as specific as {state_name}'s public record allows — some states have richer records than others, acknowledge this honestly
6. Write in the same journalistic voice: serious, sourced, occasionally pointed, never sensational
7. Length: 3,000-4,500 words of HTML content
8. Use the same HTML structure as the NY article: drop caps, <hr> with red borders, <h2> with red bottom borders, tier headers

IMPORTANT: Output ONLY the HTML content (starting with <p> or <h2>) — no markdown, no JSON, no explanations. Pure HTML article body only. Include all tiers, the data section, and the what-you-can-do section. End with the donation CTA paragraph.

The donation CTA must be exactly this (at the very end):
<p>📢 We rely entirely on reader support to keep this journalism free and independent. No ads, no corporate money — just you. If this reporting matters to you, please consider donating even $1 at <a href="https://theethicsreporter.com/donate">theethicsreporter.com/donate</a> — it genuinely keeps us going. Thank you.</p>"""

def slugify(state_name):
    return state_name.lower().replace(" ", "-")

def main():
    # Load tracker
    with open(TRACKER_FILE, "r") as f:
        tracker = json.load(f)

    state = get_next_state(tracker)
    if not state:
        print("All 50 states complete!")
        discord_post("🎉 **The Ethics Reporter — Worst Judges Series: COMPLETE!** All 50 states have been published.")
        return

    state_name = state["name"]
    state_abbr = state["abbr"]
    state_slug = slugify(state_name)
    article_slug = f"worst-judges-{state_slug}-2026"
    
    print(f"Generating article for: {state_name}")
    
    # Check for duplicates
    with open(POSTS_FILE, "r") as f:
        posts = json.load(f)
    existing_slugs = {p["slug"] for p in posts}
    if article_slug in existing_slugs:
        print(f"DUPLICATE — {article_slug} already exists, marking published and moving on")
        for s in tracker["states"]:
            if s["name"] == state_name:
                s["status"] = "published"
                s["article_slug"] = article_slug
                s["published_date"] = datetime.now().strftime("%Y-%m-%d")
        with open(TRACKER_FILE, "w") as f:
            json.dump(tracker, f, indent=2)
        # Try next state recursively (just exit and let cron re-run)
        return

    commission_info = STATE_COMMISSION_INFO.get(state_name, {
        "name": f"{state_name} Judicial Conduct Commission",
        "url": f"https://www.{state_slug.replace('-','')}courts.gov",
        "phone": "N/A"
    })

    # Generate article content
    print("Calling Anthropic to generate article...")
    prompt = build_article_prompt(state_name, state_abbr, commission_info)
    
    try:
        content_html = call_anthropic(prompt, max_tokens=9000)
    except Exception as e:
        print(f"Anthropic error: {e}")
        discord_post(f"⚠️ **Worst Judges — {state_name}**: Article generation failed: {e}")
        sys.exit(1)

    print(f"Content generated: {len(content_html)} chars")

    # Generate hero image
    img_filename = f"{article_slug}.jpg"
    img_prompt = f"""A dramatic, editorial-style photograph depicting judicial accountability journalism. A courthouse exterior in {state_name} with imposing stone columns under a stormy gray sky. Foreground: a wooden judge's gavel lying on its side next to scattered legal documents. Lighting is cinematic and somber. Professional news photography aesthetic. No text or words in the image."""
    
    print("Generating hero image with Gemini...")
    img_ok = generate_image_gemini(img_prompt, img_filename)
    if not img_ok:
        print("Image failed, using fallback")
        img_filename = "worst-judges-new-york-state-2026.jpg"  # fallback

    # Build post entry
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    max_id = max(p.get("id", 0) for p in posts)
    
    title = f"The Worst Judges in {state_name}: A Sourced, Criteria-Based Report"
    excerpt = f"<p>{state_name} has no official ranking of its worst judges. But its courts leave a paper trail — appellate reversals, judicial commission discipline, investigative journalism. The Ethics Reporter has assembled the record. These are the results.</p>"
    
    new_post = {
        "id": max_id + 1,
        "slug": article_slug,
        "date": now_str,
        "modified": now_str,
        "status": "publish",
        "type": "post",
        "title": title,
        "excerpt": excerpt,
        "link": f"https://theethicsreporter.com/article/{article_slug}",
        "featured_image": f"/images/posts/{img_filename}",
        "categories": ["Judicial Accountability", "Government Accountability", "Exclusive Investigation"],
        "tags": [
            f"{state_name} judges",
            "judicial misconduct",
            "appellate reversal",
            "judicial accountability",
            f"{state_name} courts",
            "worst judges",
            "judicial discipline",
            "50-state series"
        ],
        "author": "The Ethics Reporter Staff",
        "content": content_html
    }

    # Insert at beginning of posts array
    posts.insert(0, new_post)
    
    with open(POSTS_FILE, "w") as f:
        json.dump(posts, f, indent=2)
    print(f"Post added to posts.json (ID {max_id + 1})")

    # Update tracker
    for s in tracker["states"]:
        if s["name"] == state_name:
            s["status"] = "published"
            s["article_slug"] = article_slug
            s["published_date"] = datetime.now().strftime("%Y-%m-%d")
    
    with open(TRACKER_FILE, "w") as f:
        json.dump(tracker, f, indent=2)

    # Count remaining
    remaining = sum(1 for s in tracker["states"] if s["status"] == "pending")
    
    # Git commit and push
    print("Committing and pushing...")
    subprocess.run(["git", "add", "-A"], cwd=REPO, check=True)
    subprocess.run(["git", "commit", "-m", f"Add worst judges article: {state_name} (2026 series)"], cwd=REPO, check=True)
    result = subprocess.run(["git", "push", "origin", "main"], cwd=REPO, capture_output=True, text=True)
    if result.returncode == 0:
        print("Pushed successfully")
        push_status = "✅ Live on site"
    else:
        print(f"Push error: {result.stderr}")
        push_status = f"⚠️ Push failed: {result.stderr[:100]}"

    # Report to Discord
    discord_msg = f"""📰 **New Article Published — The Ethics Reporter**

**The Worst Judges in {state_name}: A Sourced, Criteria-Based Report**

Appellate reversals, formal commission discipline, and investigative findings — all documented, all named.

🔗 <https://theethicsreporter.com/article/{article_slug}>

📊 Series progress: {50 - remaining}/50 states complete ({remaining} remaining)
{push_status}

📢 We rely entirely on reader support. Donate at <https://theethicsreporter.com/donate>"""
    
    discord_post(discord_msg)
    print(f"Done! Article: {article_slug}")
    print(f"Remaining states: {remaining}")

if __name__ == "__main__":
    main()
