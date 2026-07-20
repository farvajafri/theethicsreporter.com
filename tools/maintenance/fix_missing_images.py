#!/usr/bin/env python3
"""Fix all posts missing featured images on theethicsreporter.com"""

import os, json, base64, ssl, time, re, subprocess, urllib.request

ctx = ssl.create_default_context()
API_KEY = "AIzaSyDgvYtRwIJAUUtmBoNW88WXsha02uwGyeQ"
POSTS_FILE = "/Users/farvascott/code/theethicsreporter/theethicsreporter.com/data/posts.json"
IMG_DIR = "/Users/farvascott/code/theethicsreporter/theethicsreporter.com/public/images/posts"

MOTIFS = {
    "disbar": "a lawyer's nameplate face-down on a mahogany desk, bar certificate torn in half",
    "suspend": "a gavel resting on its side with a red ribbon wrapped around the handle",
    "judge": "an empty judge's bench in a dimly lit courtroom, the chair pushed back",
    "judicial": "an empty judge's bench in a dimly lit courtroom, the chair pushed back, dramatic shadows",
    "misconduct": "courthouse hallway with dramatic shadows cast through tall windows",
    "fraud": "scattered financial documents and a broken fountain pen on a leather blotter",
    "court": "neoclassical courthouse exterior at dusk, columns casting long shadows",
    "law school": "empty law school lecture hall with a single spotlight on the podium",
    "economics": "empty law school lecture hall, diploma frames askew on the wall",
    "illusion": "empty law school lecture hall, diploma frames askew on the wall",
    "cartel": "dark courthouse corridor, doors locked with heavy chains",
    "sanction": "a judge's gavel slamming down, motion blur, dramatic courtroom lighting",
    "weaponiz": "courthouse hallway with dramatic shadows and locked doors",
    "retaliat": "a judge's bench with papers scattered in disarray, gavel on the floor",
    "epstein": "dark federal courthouse exterior at night, single lit window",
    "sociopath": "an empty judge's bench in a dimly lit courtroom, unsettling shadows",
    "chilling": "empty courtroom gallery, a lone figure at the defense table",
    "silenc": "empty courtroom gallery, a lone figure at the defense table",
    "loophole": "courthouse law library with shelves of dusty statutes, single lamp",
    "subvert": "crumpled legal documents on a courthouse floor",
    "cplr": "neoclassical courthouse hallway, marble floors, locked doors",
    "slumlord": "dark building exterior at night, windows boarded up",
    "default": "a closed law book and brass gavel on a dark wood surface, single shaft of light",
}

def get_motif(title):
    lower = title.lower()
    for kw, motif in MOTIFS.items():
        if kw in lower:
            return motif
    return MOTIFS["default"]

def make_prompt(title):
    motif = get_motif(title)
    return (
        "Create an image: Photorealistic editorial photograph in the style of a legal affairs magazine cover. "
        f"Scene: {motif}. "
        "Style: Dark, moody color palette dominated by deep navy, charcoal grays, and warm mahogany tones. "
        "A single accent of deep maroon (#8B0000) appears subtly — in a book spine, ribbon, wax seal, or fabric. "
        "Lighting: Dramatic chiaroscuro — strong directional light from one side creating deep shadows. "
        "Atmosphere: Somber, weighty, institutional. The mood of consequences and accountability. "
        "Composition: Cinematic 16:9 landscape. Shallow depth of field. Professional editorial photography. "
        "IMPORTANT: Do not include any text, words, letters, or numbers anywhere in the image."
    )

def generate_image(prompt, filename):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={API_KEY}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})

    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, context=ctx, timeout=90)
            data = json.loads(resp.read())
            for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
                if "inlineData" in part:
                    img_bytes = base64.b64decode(part["inlineData"]["data"])
                    png_path = os.path.join(IMG_DIR, filename.replace('.jpg', '.png'))
                    with open(png_path, "wb") as f:
                        f.write(img_bytes)
                    jpg_path = os.path.join(IMG_DIR, filename)
                    result = subprocess.run(
                        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "75", png_path, "--out", jpg_path],
                        capture_output=True
                    )
                    if os.path.exists(png_path):
                        os.remove(png_path)
                    return True
        except urllib.error.HTTPError as e:
            if e.code in (429, 503):
                wait = 15 * (attempt + 1)
                print(f"  rate limited, waiting {wait}s...", flush=True)
                time.sleep(wait)
            else:
                body = e.read().decode()[:200]
                print(f"  HTTP {e.code}: {body}", flush=True)
                return False
        except Exception as e:
            print(f"  ERR: {e}", flush=True)
            if attempt < 2:
                time.sleep(5)
    return False

os.makedirs(IMG_DIR, exist_ok=True)

with open(POSTS_FILE) as f:
    posts = json.load(f)

# Build work list
# 1. Posts with no featured_image
# 2. Posts with featured_image that doesn't exist on disk
work = []
for i, p in enumerate(posts):
    img = p.get("featured_image")
    if not img:
        slug = re.sub(r"['’‘]", "", p["slug"])[:80]
        filename = f"{slug}.jpg"
        work.append((i, filename, "no_image"))
    else:
        local_path = os.path.join(IMG_DIR, os.path.basename(img))
        if not os.path.exists(local_path):
            filename = os.path.basename(img)
            if not filename.endswith(".jpg"):
                filename = filename.rsplit(".", 1)[0] + ".jpg"
            work.append((i, filename, "missing_file"))

print(f"Posts needing images: {len(work)}")
for _, fn, reason in work:
    print(f"  [{reason}] {fn}")
print()

generated = 0
failed = 0

for i, (idx, filename, reason) in enumerate(work):
    p = posts[idx]
    title = p["title"]
    print(f"[{i+1}/{len(work)}] {title[:60]}", flush=True)

    prompt = make_prompt(title)
    if generate_image(prompt, filename):
        posts[idx]["featured_image"] = f"/images/posts/{filename}"
        generated += 1
        size = os.path.getsize(os.path.join(IMG_DIR, filename))
        print(f"  -> OK ({size//1024}KB) — {filename}", flush=True)
    else:
        failed += 1
        print(f"  -> FAILED", flush=True)

    time.sleep(2)

# Save updated posts.json
with open(POSTS_FILE, "w") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"\nDone. Generated: {generated}, Failed: {failed}")
print(f"posts.json updated.")
