#!/usr/bin/env python3
"""
Audit posts.json for missing thumbnail images and generate them with Gemini.
Fixes wrong /images/articles/ paths → /images/posts/ as well.
"""

import json, os, sys, ssl, base64, time, urllib.request

REPO = "/Users/farvascott/code/theethicsreporter"
POSTS_FILE = f"{REPO}/site/data/posts.json"
IMG_DIR = f"{REPO}/site/public/images/posts"
SECRETS_FILE = "/Users/farvascott/.openclaw/workspace/.secrets/gemini-api.json"

GEMINI_KEY = json.load(open(SECRETS_FILE))["api_key"]
ssl_ctx = ssl.create_default_context()

# Article-specific image prompts
PROMPTS = {
    "attorney-abandonment-appeal-rights-wisconsin-olr-systemic-failure":
        "A dramatic courtroom hallway with an empty chair, scattered legal documents on the floor, and a closed door with 'APPEAL' printed on frosted glass. Somber, investigative journalism aesthetic. No text.",

    "david-chandler-chief-counsel-second-eleventh-judicial-district-grievance-committee-inexperience":
        "New York state courthouse exterior, imposing stone columns, overcast sky. A gavel lying on legal scales. Serious accountability journalism photo. No text.",

    "walter-jones-canandaigua-town-court-racial-slur-removal-commission-judicial-conduct-2026":
        "A small-town courthouse in upstate New York, wooden judge's bench, American flag, somber gray lighting. Editorial accountability photography. No text.",

    "felicia-pitts-davis-syracuse-judge-censured-same-sex-marriage-refused-2026":
        "A courthouse exterior with a rainbow Pride flag reflection on glass doors, overcast sky, imposing stone facade. Dramatic accountability journalism editorial photo. No text.",

    "john-skinner-columbia-town-court-removal-ex-parte-pattern-misconduct-herkimer-2026":
        "A rural New York county courthouse, autumn trees, stormy sky. A judge's gavel lying sideways on a desk. Investigative journalism photo. No text.",

    "not-just-osterling-second-department-pattern-junior-chief-counsels-attorney-discipline-new-york":
        "Interior of a New York appellate courthouse, marble columns, wooden benches, dramatic window light. Serious investigative journalism aesthetic. No text.",

    "trump-pardon-influencer-network-doj-guidelines-clemency-2026":
        "The White House exterior at dusk, dramatic storm clouds, a stack of pardon documents on a desk in the foreground. Political investigative journalism editorial photo. No text.",

    "dan-berulis-doge-whistleblower-brake-lines-cut-musk-defamation-lawsuit-2026":
        "A car with a severed brake line shown close-up, dark moody lighting, investigative journalism dramatic photo. Abstract threat, no identifiable people. No text.",

    "broadview-six-grand-jury-misconduct-boutros-doj-cover-up-2026":
        "A federal courthouse exterior with Department of Justice seal, dramatic stormy sky, American flag, somber editorial lighting. Investigative journalism photo. No text.",

    "pardon-for-sale-trumps-pay-to-play-clemency-machine":
        "Stacks of cash next to a presidential pardon document with red wax seal, dramatic dark background, investigative journalism editorial photo. No text.",
}


def generate_image(prompt, slug):
    """Generate image using Gemini and save to IMG_DIR."""
    filename = f"{slug}.jpg"
    filepath = os.path.join(IMG_DIR, filename)
    
    if os.path.exists(filepath):
        print(f"  ✅ Already exists: {filename}")
        return filename

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={GEMINI_KEY}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})

    for attempt in range(4):
        try:
            resp = urllib.request.urlopen(req, context=ssl_ctx, timeout=90)
            data = json.loads(resp.read())
            for candidate in data.get("candidates", []):
                for part in candidate.get("content", {}).get("parts", []):
                    if "inlineData" in part:
                        img_bytes = base64.b64decode(part["inlineData"]["data"])
                        with open(filepath, "wb") as f:
                            f.write(img_bytes)
                        print(f"  ✅ Generated: {filename} ({len(img_bytes)//1024}KB)")
                        return filename
            print(f"  ⚠️ Attempt {attempt+1}: No image in response")
        except Exception as e:
            print(f"  ⚠️ Attempt {attempt+1} failed: {e}")
            time.sleep(4)
    
    print(f"  ❌ FAILED after 4 attempts: {slug}")
    return None


def main():
    posts = json.load(open(POSTS_FILE))
    changed = 0

    for p in posts:
        slug = p["slug"]
        img = p.get("featured_image", "")

        # Determine if image file exists
        img_missing = False
        if not img:
            img_missing = True
        else:
            # Normalize — always use /images/posts/
            fname = os.path.basename(img)
            fpath = os.path.join(IMG_DIR, fname)
            if not os.path.exists(fpath):
                img_missing = True

        if not img_missing:
            continue

        print(f"\n🔍 {slug[:70]}")
        print(f"   Title: {p['title'][:70]}")

        # Find the right prompt
        prompt = PROMPTS.get(slug)
        if not prompt:
            # Build generic prompt from title/categories
            cats = p.get("categories", [])
            topic = p.get("title", slug)
            if any("judge" in c.lower() or "judicial" in c.lower() for c in cats) or "judge" in slug:
                prompt = f"Dramatic editorial photograph of a courthouse exterior under stormy skies, a judge's gavel lying on scattered legal papers. Investigative journalism aesthetic. Subject: {topic[:60]}. No text."
            elif any("pardon" in c.lower() or "trump" in slug.lower() or "political" in c.lower() for c in cats):
                prompt = f"Political investigative journalism editorial photograph. US Capitol or White House in background, somber storm clouds. Subject: {topic[:60]}. No text."
            elif "whistleblow" in slug or "doge" in slug:
                prompt = f"Dramatic investigative journalism editorial photograph representing government accountability and whistleblower protection. Dark moody lighting. Subject: {topic[:60]}. No text."
            else:
                prompt = f"Dramatic editorial investigative journalism photograph. Courthouse, legal documents, American flag. Subject: {topic[:60]}. No text."

        result = generate_image(prompt, slug)
        if result:
            # Fix the path in posts.json to always be /images/posts/
            p["featured_image"] = f"/images/posts/{slug}.jpg"
            changed += 1
        
        time.sleep(2)  # Rate limiting

    if changed:
        with open(POSTS_FILE, "w") as f:
            json.dump(posts, f, indent=2)
        print(f"\n✅ Fixed {changed} posts in posts.json")
    else:
        print("\n✅ No changes needed")


if __name__ == "__main__":
    main()
