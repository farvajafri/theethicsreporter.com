#!/usr/bin/env python3
"""
Ethics Reporter — Branded Image Generator
Generates consistent editorial images via Gemini with brand cohesion.
"""

import os
import json
import urllib.request
import base64
import ssl
import time
import re
import subprocess

ctx = ssl.create_default_context()
API_KEY = "AIzaSyABP5c1gwuH2MjzUt3dKksxIxuyT4x-MvM"
POSTS_FILE = "/Users/farvascott/code/theethicsreporter/site/data/posts.json"
IMG_DIR = "/Users/farvascott/code/theethicsreporter/site/public/images/posts"

# Visual motifs mapped to article keywords
MOTIFS = {
    "disbar": "a lawyer's nameplate face-down on a mahogany desk, bar certificate torn in half",
    "suspend": "a gavel resting on its side with a red ribbon wrapped around the handle",
    "reprimand": "an open disciplinary letter on a judge's desk under a brass desk lamp",
    "censure": "a formal censure document with a red seal on a dark leather blotter",
    "judge": "an empty judge's bench in a dimly lit courtroom, the chair pushed back",
    "fraud": "scattered financial documents and a broken fountain pen on a leather blotter",
    "theft": "an open empty safe in a law office, papers strewn on the floor",
    "steal": "an open empty safe in a law office, papers strewn on the floor",
    "misappropriat": "a ledger book with red ink entries beside an empty client trust envelope",
    "misconduct": "courthouse hallway with dramatic shadows cast through tall windows",
    "neglect": "an unanswered phone on a cluttered attorney's desk, dust motes in light beam",
    "abandon": "an empty client chair facing a vacant attorney's desk, door ajar",
    "convict": "courthouse steps at dusk with long shadows from the columns",
    "felon": "courthouse steps at dusk with long shadows from the columns",
    "ethics": "the scales of justice slightly tilted on a marble pedestal, dramatic lighting",
    "florida": "art deco courthouse facade with palm tree shadows, golden hour",
    "miami": "art deco courthouse facade with palm tree shadows, golden hour",
    "new york": "neoclassical courthouse columns in rain, wet stone reflecting streetlights",
    "maryland": "brick federal courthouse with bare winter trees, overcast sky",
    "california": "modernist courthouse with harsh sun casting geometric shadows",
    "tennessee": "stone courthouse with southern columns, foggy morning light",
    "indiana": "limestone courthouse at dawn, frost on the steps",
    "georgia": "antebellum courthouse with spanish moss shadows",
    "illinois": "chicago-style courthouse corridor with dramatic overhead lighting",
    "new jersey": "art deco courthouse lobby with terrazzo floors reflecting overhead light",
    "connecticut": "colonial courthouse with white clapboard, autumn light",
    "oklahoma": "red sandstone courthouse at sunset",
    "patent": "a stack of patent documents beside a magnifying glass on a wood desk",
    "immigrat": "immigration court waiting room chairs in harsh fluorescent light",
    "dui": "a set of car keys beside a gavel on a judge's bench",
    "owi": "a set of car keys beside a gavel on a judge's bench",
    "domestic": "a cracked family photo frame on a law office bookshelf",
    "divorce": "two wedding rings on a legal brief, one cracked",
    "probate": "an aged will document under a brass reading lamp",
    "bankruptcy": "empty office with only a desk and single banker's lamp remaining",
    "law school": "empty law school lecture hall with a single spotlight on the podium",
    "bar complaint": "a sealed complaint envelope on a desk with a red CONFIDENTIAL stamp",
    "iolta": "a trust account ledger with mismatched entries in red and black ink",
    "forgery": "a magnifying glass over a signature on a legal document, ink smeared",
}

def decode_entities(text):
    entities = {"&#038;": "&", "&amp;": "&", "&#8217;": "'", "&#8216;": "'",
                "&#8220;": '"', "&#8221;": '"', "&#8211;": "-", "&#8212;": "-",
                "&#039;": "'"}
    for ent, char in entities.items():
        text = text.replace(ent, char)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    return text

def get_motif(title):
    lower = title.lower()
    for keyword, motif in MOTIFS.items():
        if keyword in lower:
            return motif
    return "a closed law book and brass gavel on a dark wood surface, with a single shaft of light"

def make_prompt(title):
    title = decode_entities(title)
    motif = get_motif(title)
    return (
        f"Create an image: Photorealistic editorial photograph in the style of a legal affairs magazine cover. "
        f"Scene: {motif}. "
        f"Style: Dark, moody color palette dominated by deep navy, charcoal grays, and warm mahogany tones. "
        f"A single accent of deep maroon (#8B0000) appears subtly — in a book spine, ribbon, wax seal, or fabric. "
        f"Lighting: Dramatic chiaroscuro — strong directional light from one side creating deep shadows. "
        f"Atmosphere: Somber, weighty, institutional. The mood of consequences and accountability. "
        f"Composition: Cinematic 16:9 landscape. Shallow depth of field. Professional editorial photography. "
        f"IMPORTANT: Do not include any text, words, letters, or numbers anywhere in the image."
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
            resp = urllib.request.urlopen(req, context=ctx, timeout=60)
            data = json.loads(resp.read())
            for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
                if "inlineData" in part:
                    img_bytes = base64.b64decode(part["inlineData"]["data"])
                    png_path = os.path.join(IMG_DIR, filename.replace('.jpg', '.png'))
                    with open(png_path, "wb") as f:
                        f.write(img_bytes)
                    jpg_path = os.path.join(IMG_DIR, filename)
                    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "75",
                                    png_path, "--out", jpg_path], capture_output=True)
                    os.remove(png_path)
                    return True
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code == 403:
                wait = 10 * (attempt + 1)
                print(f" rate limited, waiting {wait}s...", end="", flush=True)
                time.sleep(wait)
            else:
                print(f" HTTP {e.code}", end="", flush=True)
                return False
        except Exception as e:
            print(f" ERR: {e}", end="", flush=True)
            if attempt < 2:
                time.sleep(3)
    return False

# --- Main ---
os.makedirs(IMG_DIR, exist_ok=True)

with open(POSTS_FILE) as f:
    posts = json.load(f)

# Find posts that need regeneration (all of them for brand consistency, or just missing ones)
import sys
regenerate_all = "--all" in sys.argv

needs_gen = []
for i, p in enumerate(posts):
    img = p["featured_image"]
    if regenerate_all:
        needs_gen.append(i)
    elif not img or "wp-content" in (img or "") or "jsdelivr" in (img or ""):
        needs_gen.append(i)
    elif img.startswith("/images/posts/"):
        filepath = os.path.join(IMG_DIR, os.path.basename(img))
        if not os.path.exists(filepath) or os.path.getsize(filepath) < 1000:
            needs_gen.append(i)

print(f"Posts to generate: {len(needs_gen)} / {len(posts)}", flush=True)

generated = 0
failed = 0

for idx in needs_gen:
    p = posts[idx]
    title = decode_entities(p["title"])
    slug = p["slug"][:80]
    filename = f"{slug}.jpg"
    
    print(f"[{generated+failed+1}/{len(needs_gen)}] {title[:55]}...", end="", flush=True)
    
    prompt = make_prompt(title)
    if generate_image(prompt, filename):
        posts[idx]["featured_image"] = f"/images/posts/{filename}"
        generated += 1
        size = os.path.getsize(os.path.join(IMG_DIR, filename))
        print(f" OK ({size//1024}KB)", flush=True)
    else:
        failed += 1
        print(f" FAIL", flush=True)
    
    time.sleep(1.5)
    
    # Save progress every 20
    if generated > 0 and generated % 20 == 0:
        with open(POSTS_FILE, "w") as f:
            json.dump(posts, f, indent=2)
        print(f"  [progress saved: {generated} done]", flush=True)

with open(POSTS_FILE, "w") as f:
    json.dump(posts, f, indent=2)

print(f"\n{'='*50}", flush=True)
print(f"Generated: {generated}, Failed: {failed}", flush=True)
print(f"Run with --all to regenerate ALL images with branded prompts", flush=True)
