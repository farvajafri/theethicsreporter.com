#!/usr/bin/env python3
"""Generate unique Gemini images for all Ethics Reporter posts that need them."""

import urllib.request
import urllib.error
import base64
import json
import ssl
import os
import time
import hashlib
import re

ctx = ssl.create_default_context()
API_KEY = "AIzaSyABP5c1gwuH2MjzUt3dKksxIxuyT4x-MvM"
POSTS_FILE = "/Users/farvascott/code/theethicsreporter/site/data/posts.json"
IMG_DIR = "/Users/farvascott/code/theethicsreporter/site/public/images/posts"

os.makedirs(IMG_DIR, exist_ok=True)

def decode_entities(text):
    entities = {
        "&#038;": "&", "&amp;": "&",
        "&#8217;": "'", "&rsquo;": "'",
        "&#8216;": "'", "&lsquo;": "'",
        "&#8220;": '"', "&ldquo;": '"',
        "&#8221;": '"', "&rdquo;": '"',
        "&#8211;": "–", "&ndash;": "–",
        "&#8212;": "—", "&mdash;": "—",
        "&quot;": '"', "&#034;": '"',
        "&#039;": "'", "&apos;": "'",
    }
    for ent, char in entities.items():
        text = text.replace(ent, char)
    text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
    return text

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
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                for part in parts:
                    if "inlineData" in part:
                        img_bytes = base64.b64decode(part["inlineData"]["data"])
                        filepath = os.path.join(IMG_DIR, filename)
                        with open(filepath, "wb") as f:
                            f.write(img_bytes)
                        return filepath
            return None
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print(f"    Rate limited, waiting 10s (attempt {attempt+1}/3)")
                time.sleep(10)
            else:
                print(f"    HTTP {e.code}: {e.read().decode()[:200]}")
                return None
        except Exception as e:
            print(f"    Error: {e}")
            if attempt < 2:
                time.sleep(3)
            else:
                return None
    return None

def make_prompt(title):
    title = decode_entities(title)
    # Create a unique editorial prompt based on the article title
    return (
        f"Create an image: Photorealistic editorial photo for a legal ethics news article titled \"{title}\". "
        f"Professional news publication style with dramatic lighting. "
        f"Include visual elements related to law, justice, courts, or legal documents. "
        f"Cinematic composition suitable for a newspaper or magazine header. 16:9 landscape orientation. "
        f"Do not include any text or words in the image."
    )

# Load posts
with open(POSTS_FILE) as f:
    posts = json.load(f)

# Find posts needing images
from collections import Counter
img_counts = Counter(p["featured_image"] for p in posts if p["featured_image"])
seen_images = set()
needs_image = []

for i, p in enumerate(posts):
    img = p["featured_image"]
    if not img:
        needs_image.append(i)
    elif img_counts[img] > 1:
        if img in seen_images:
            # This is a duplicate use
            needs_image.append(i)
        else:
            seen_images.add(img)  # Keep first use

print(f"Total posts: {len(posts)}")
print(f"Posts needing unique images: {len(needs_image)}")
print(f"Starting generation...\n")

generated = 0
failed = 0

for idx in needs_image:
    p = posts[idx]
    slug = p["slug"][:80]
    title = decode_entities(p["title"])
    filename = f"{slug}.png"
    filepath = os.path.join(IMG_DIR, filename)
    
    # Skip if already generated
    if os.path.exists(filepath):
        posts[idx]["featured_image"] = f"/images/posts/{filename}"
        generated += 1
        print(f"[{generated+failed}/{len(needs_image)}] SKIP (exists): {title[:60]}")
        continue
    
    print(f"[{generated+failed+1}/{len(needs_image)}] Generating: {title[:60]}...")
    
    prompt = make_prompt(title)
    result = generate_image(prompt, filename)
    
    if result:
        posts[idx]["featured_image"] = f"/images/posts/{filename}"
        generated += 1
        print(f"  ✓ Saved ({os.path.getsize(result)//1024}KB)")
    else:
        failed += 1
        print(f"  ✗ Failed")
    
    # Small delay to avoid rate limiting
    time.sleep(1)

# Save updated posts
with open(POSTS_FILE, "w") as f:
    json.dump(posts, f, indent=2)

print(f"\n{'='*50}")
print(f"Done! Generated: {generated}, Failed: {failed}")
print(f"Posts JSON updated.")
