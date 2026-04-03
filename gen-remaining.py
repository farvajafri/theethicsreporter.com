import os
import json
import urllib.request
import base64
import ssl
import time
import re

ctx = ssl.create_default_context()
API_KEY = "AIzaSyABP5c1gwuH2MjzUt3dKksxIxuyT4x-MvM"
POSTS_FILE = "/Users/farvascott/code/theethicsreporter/site/data/posts.json"
IMG_DIR = "/Users/farvascott/code/theethicsreporter/site/public/images/posts"

def decode_entities(text):
    entities = {"&#038;": "&", "&amp;": "&", "&#8217;": "'", "&#8216;": "'",
                "&#8220;": '"', "&#8221;": '"', "&#8211;": "-", "&#8212;": "-"}
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
    try:
        resp = urllib.request.urlopen(req, context=ctx, timeout=60)
        data = json.loads(resp.read())
        for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
            if "inlineData" in part:
                img_bytes = base64.b64decode(part["inlineData"]["data"])
                # Save as PNG first then convert
                png_path = os.path.join(IMG_DIR, filename.replace('.jpg', '.png'))
                with open(png_path, "wb") as f:
                    f.write(img_bytes)
                # Convert to JPEG
                jpg_path = os.path.join(IMG_DIR, filename)
                os.system(f"sips -s format jpeg -s formatOptions 70 '{png_path}' --out '{jpg_path}' 2>/dev/null")
                os.remove(png_path)
                return True
    except Exception as e:
        print(f"  ERR: {e}", flush=True)
    return False

with open(POSTS_FILE) as f:
    posts = json.load(f)

for i, p in enumerate(posts):
    img = p["featured_image"]
    if not img or "theethicsreporter.com/wp-content" not in img:
        continue
    
    title = decode_entities(p["title"])
    slug = p["slug"][:80]
    filename = f"{slug}.jpg"
    
    print(f"Generating: {title[:60]}...", end="", flush=True)
    
    prompt = (f"Create an image: Photorealistic editorial photo for a legal ethics news article "
              f"titled \"{title}\". Professional news publication style with dramatic lighting. "
              f"Include visual elements related to law, justice, courts, or legal documents. "
              f"Cinematic composition. Do not include any text or words in the image.")
    
    if generate_image(prompt, filename):
        cdn_url = f"https://cdn.jsdelivr.net/gh/farvajafri/theethicsreporter@main/site/public/images/posts/{filename}"
        posts[i]["featured_image"] = cdn_url
        print(f" OK", flush=True)
    else:
        print(f" FAIL", flush=True)
    
    time.sleep(1)

with open(POSTS_FILE, "w") as f:
    json.dump(posts, f, indent=2)

# Verify no WP URLs remain
wp_remaining = sum(1 for p in posts if p["featured_image"] and "theethicsreporter.com/wp-content" in p["featured_image"])
print(f"\nDone. WP URLs remaining: {wp_remaining}", flush=True)
