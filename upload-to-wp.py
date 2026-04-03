import os
import json
import http.client
import base64
import ssl
import time
from urllib.parse import urlparse

ctx = ssl.create_default_context()
POSTS_FILE = "/Users/farvascott/code/theethicsreporter/site/data/posts.json"
IMG_DIR = "/Users/farvascott/code/theethicsreporter/site/public/images/posts"
AUTH = base64.b64encode(b"henry:xmd1 kN1m 9BNH a5vd M4NJ GvYE").decode()

with open(POSTS_FILE) as f:
    posts = json.load(f)

uploaded = 0
failed = 0
total = sum(1 for p in posts if p["featured_image"] and p["featured_image"].startswith("/images"))

for i, p in enumerate(posts):
    img = p["featured_image"]
    if not img or not img.startswith("/images/posts/"):
        continue

    filename = os.path.basename(img)
    filepath = os.path.join(IMG_DIR, filename)

    if not os.path.exists(filepath):
        print(f"  MISSING: {filepath}", flush=True)
        failed += 1
        continue

    print(f"[{uploaded+failed+1}/{total}] {filename[:55]}...", end="", flush=True)

    with open(filepath, "rb") as f:
        data = f.read()

    headers = {
        "Authorization": f"Basic {AUTH}",
        "Content-Type": "image/jpeg",
        "Content-Disposition": f'attachment; filename="{filename}"',
        "User-Agent": "WordPress/6.0; The Ethics Reporter",
    }

    success = False
    for attempt in range(3):
        try:
            # Use www subdomain to avoid redirect
            conn = http.client.HTTPSConnection("www.theethicsreporter.com", context=ctx, timeout=30)
            conn.request("POST", "/wp-json/wp/v2/media", body=data, headers=headers)
            resp = conn.getresponse()
            body = resp.read().decode()
            conn.close()

            if resp.status == 201:
                result = json.loads(body)
                wp_url = result.get("source_url", "")
                posts[i]["featured_image"] = wp_url
                uploaded += 1
                print(f" OK", flush=True)
                success = True
                break
            elif resp.status in (301, 302, 307, 308):
                location = resp.getheader("Location", "")
                parsed = urlparse(location)
                host = parsed.hostname or "www.theethicsreporter.com"
                path = parsed.path or "/wp-json/wp/v2/media"
                conn2 = http.client.HTTPSConnection(host, context=ctx, timeout=30)
                conn2.request("POST", path, body=data, headers=headers)
                resp2 = conn2.getresponse()
                body2 = resp2.read().decode()
                conn2.close()
                if resp2.status == 201:
                    result = json.loads(body2)
                    wp_url = result.get("source_url", "")
                    posts[i]["featured_image"] = wp_url
                    uploaded += 1
                    print(f" OK (redirect)", flush=True)
                    success = True
                    break
                else:
                    print(f" FAIL {resp2.status} after redirect", flush=True)
                    failed += 1
                    break
            elif resp.status == 429:
                print(f" throttled...", end="", flush=True)
                time.sleep(10)
            elif resp.status == 403:
                print(f" 403 (firewall)", flush=True)
                failed += 1
                break
            else:
                print(f" FAIL {resp.status}", flush=True)
                failed += 1
                break
        except Exception as e:
            print(f" ERR {e}", flush=True)
            if attempt < 2:
                time.sleep(3)
            else:
                failed += 1

    # Slow down to avoid firewall triggers
    time.sleep(1.5)

    # Save progress every 10 uploads
    if uploaded > 0 and uploaded % 10 == 0:
        with open(POSTS_FILE, "w") as f:
            json.dump(posts, f, indent=2)
        print(f"  [saved progress: {uploaded} uploaded]", flush=True)

with open(POSTS_FILE, "w") as f:
    json.dump(posts, f, indent=2)

print(f"\nDone! Uploaded: {uploaded}, Failed: {failed}", flush=True)
