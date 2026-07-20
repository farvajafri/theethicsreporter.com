#!/usr/bin/env python3
"""
Full audit fix: generate missing images for posts.json and tab-articles.json.
Run: python3 fix_broken_images_audit.py
"""

import os, json, base64, ssl, time, subprocess, urllib.request

REPO = "/Users/farvascott/code/theethicsreporter"
SECRETS_FILE = "/Users/farvascott/.openclaw/workspace/.secrets/gemini-api.json"
API_KEY = json.load(open(SECRETS_FILE))["api_key"]

POSTS_FILE = f"{REPO}/theethicsreporter.com/data/posts.json"
TABS_FILE  = f"{REPO}/theethicsreporter.com/data/tab-articles.json"
POSTS_IMG_DIR = f"{REPO}/theethicsreporter.com/public/images/posts"
TABS_IMG_DIR  = f"{REPO}/theethicsreporter.com/public/images/tab"

ctx = ssl.create_default_context()

# ── Specific prompts keyed by slug ──────────────────────────────────────────
PROMPTS = {
    # POSTS
    "three-judges-three-scandals-federal-judiciary-accountability-crisis-2026": (
        "Photorealistic editorial photograph: Three empty judge's chairs behind a long mahogany bench, "
        "each chair pushed back as if abandoned in disgrace. Dramatic chiaroscuro lighting, deep navy and charcoal tones, "
        "a single cracked gavel lying on the bench. Legal accountability investigative journalism cover image. "
        "Cinematic 16:9 landscape composition. No text, no letters, no numbers."
    ),
    "netanyahu-cross-examination-ends-corruption-trial-police-state-outburst-2026": (
        "Photorealistic editorial photograph: An ornate foreign courtroom interior with imposing stone walls, "
        "a lone witness chair under a single harsh spotlight, scattered legal documents on the floor. "
        "Dark, moody atmosphere — deep charcoal and navy tones with a subtle maroon accent. "
        "Political corruption trial investigative journalism. Cinematic 16:9 landscape. No text, no faces."
    ),

    # TAB ARTICLES
    "judge-wade-mccree-detroit-michigan-judicial-misconduct-sexting-murder-case": (
        "Photorealistic editorial photograph: A Wayne County-style courtroom interior, "
        "judge's bench with a shattered nameplate and a phone face-down on the bench. "
        "Dramatic shadows, deep navy and charcoal palette with maroon accent. "
        "Judicial misconduct investigative journalism. Cinematic 16:9. No text, no faces."
    ),
    "alex-kozinski-ninth-circuit-chief-judge-sexual-harassment-accountability-failure": (
        "Photorealistic editorial photograph: Ninth Circuit federal courthouse exterior at dusk, "
        "imposing neoclassical columns, a lone figure's silhouette walking away under harsh fluorescent light. "
        "Deep navy and charcoal tones. Accountability journalism cover image. "
        "Cinematic 16:9 landscape. No text, no identifiable faces."
    ),
    "rankin-county-goon-squad-ciavarella-jenkins-parker-mississippi-law-enforcement-torture": (
        "Photorealistic editorial photograph: A dark rural Mississippi road at night, "
        "police cruiser lights reflecting off wet pavement, an empty pair of handcuffs on the asphalt. "
        "Deep charcoal and navy palette, stark law enforcement accountability imagery. "
        "Investigative journalism cover. Cinematic 16:9. No text, no faces."
    ),
    "judge-todd-baugh-montana-rape-sentence-victim-blame-judicial-misconduct-stacey-rambold": (
        "Photorealistic editorial photograph: A Montana courthouse interior, "
        "a small lonely chair in front of an imposing judge's bench, "
        "calendar on the wall with a single date circled — a visual metaphor for injustice. "
        "Somber charcoal and navy tones, one maroon accent. Judicial misconduct journalism cover. "
        "Cinematic 16:9. No text, no identifiable numbers."
    ),
    "richard-glossip-oklahoma-death-row-prosecutorial-suppression-wrongful-conviction": (
        "Photorealistic editorial photograph: Oklahoma death row corridor, "
        "a solitary steel cell door ajar, harsh fluorescent lighting casting long shadows on concrete floor. "
        "Deep charcoal and navy palette with cold institutional whites. "
        "Wrongful conviction investigative journalism. Cinematic 16:9. No text, no faces."
    ),
    "wenatchee-washington-sex-abuse-hysteria-robert-perez-prosecutorial-misconduct-1994": (
        "Photorealistic editorial photograph: A small Pacific Northwest courthouse exterior, "
        "overcast stormy sky, bare winter trees flanking stone steps, "
        "a lone figure's shadow on the steps suggesting authority and menace. "
        "Deep charcoal and navy palette. Prosecutorial misconduct journalism cover. "
        "Cinematic 16:9. No text, no faces."
    ),
    "kalief-browder-rikers-island-pretrial-detention-bronx-court-failure": (
        "Photorealistic editorial photograph: An empty detention cell with bars, "
        "a thin mattress on a concrete slab, a single shaft of daylight cutting through a high narrow window, "
        "a tally scratched on the wall. Deep charcoal and shadow tones, stark and haunting. "
        "Pretrial detention injustice journalism cover. Cinematic 16:9. No text, no faces."
    ),
    "pauline-newman-federal-circuit-judicial-incapacity-lifetime-tenure-crisis": (
        "Photorealistic editorial photograph: A federal appellate courtroom, "
        "a very large, heavy judge's chair with an enormous hourglass beside it, "
        "the hourglass sand nearly run out. Deep navy and charcoal tones, dramatic single spotlight. "
        "Lifetime tenure constitutional crisis journalism cover. Cinematic 16:9. No text."
    ),
}

def generate_image(prompt, out_path):
    """Generate image via Gemini, save as JPG. Returns True on success."""
    if os.path.exists(out_path):
        print(f"  ✅ Already exists: {os.path.basename(out_path)}")
        return True

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"gemini-2.5-flash-image:generateContent?key={API_KEY}"
    )
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})

    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, context=ctx, timeout=120)
            data = json.loads(resp.read())
            for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
                if "inlineData" in part:
                    img_bytes = base64.b64decode(part["inlineData"]["data"])
                    # Save as PNG first, then convert to JPG via sips
                    png_path = out_path.replace(".jpg", ".png")
                    with open(png_path, "wb") as f:
                        f.write(img_bytes)
                    result = subprocess.run(
                        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80",
                         png_path, "--out", out_path],
                        capture_output=True
                    )
                    if os.path.exists(png_path):
                        os.remove(png_path)
                    if os.path.exists(out_path):
                        return True
            print(f"  ⚠️  No image in response")
            return False
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:300]
            if e.code in (429, 503):
                wait = 20 * (attempt + 1)
                print(f"  ⏳ Rate-limited ({e.code}), waiting {wait}s…")
                time.sleep(wait)
            else:
                print(f"  ❌ HTTP {e.code}: {body}")
                return False
        except Exception as e:
            print(f"  ❌ ERR: {e}")
            if attempt < 2:
                time.sleep(8)
    return False

# ── Work list ─────────────────────────────────────────────────────────────────
work = []

# posts.json
with open(POSTS_FILE) as f:
    posts = json.load(f)
posts_idx = {p["slug"]: i for i, p in enumerate(posts)}

for slug, prompt in PROMPTS.items():
    if slug not in posts_idx:
        continue
    filename = f"{slug}.jpg"
    out_path = os.path.join(POSTS_IMG_DIR, filename)
    if not os.path.exists(out_path):
        work.append({"kind": "post", "slug": slug, "prompt": prompt,
                     "out_path": out_path, "json_path": f"/images/posts/{filename}"})

# tab-articles.json
with open(TABS_FILE) as f:
    tabs = json.load(f)
tabs_idx = {t["slug"]: i for i, t in enumerate(tabs)}

for slug, prompt in PROMPTS.items():
    if slug not in tabs_idx:
        continue
    filename = f"{slug}.jpg"
    out_path = os.path.join(TABS_IMG_DIR, filename)
    if not os.path.exists(out_path):
        work.append({"kind": "tab", "slug": slug, "prompt": prompt,
                     "out_path": out_path, "json_path": f"/images/tab/{filename}"})

os.makedirs(POSTS_IMG_DIR, exist_ok=True)
os.makedirs(TABS_IMG_DIR, exist_ok=True)

print(f"🔍 Images to generate: {len(work)}")
for item in work:
    print(f"  [{item['kind']}] {item['slug'][:60]}")
print()

generated, failed = 0, 0

for i, item in enumerate(work):
    slug = item["slug"]
    print(f"[{i+1}/{len(work)}] {slug[:70]}", flush=True)
    print(f"  dir: {item['out_path']}", flush=True)

    if generate_image(item["prompt"], item["out_path"]):
        size = os.path.getsize(item["out_path"])
        print(f"  ✅ {size // 1024}KB — {os.path.basename(item['out_path'])}", flush=True)
        generated += 1
        # Update JSON in memory
        if item["kind"] == "post" and slug in posts_idx:
            posts[posts_idx[slug]]["featured_image"] = item["json_path"]
        elif item["kind"] == "tab" and slug in tabs_idx:
            tabs[tabs_idx[slug]]["featured_image"] = item["json_path"]
    else:
        failed += 1
        print(f"  ❌ FAILED", flush=True)

    time.sleep(3)  # Rate limit buffer

# Save updated JSON files
with open(POSTS_FILE, "w") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)
with open(TABS_FILE, "w") as f:
    json.dump(tabs, f, indent=2, ensure_ascii=False)

print(f"\n{'='*60}")
print(f"✅ Generated: {generated}  ❌ Failed: {failed}")
print(f"posts.json + tab-articles.json saved.")
