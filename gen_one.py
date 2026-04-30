import os
import urllib.request
import json
import base64
import ssl
import subprocess

ctx = ssl.create_default_context()
API_KEY = "AIzaSyABP5c1gwuH2MjzUt3dKksxIxuyT4x-MvM"
IMG_DIR = "/Users/farvascott/code/theethicsreporter/site/public/images/posts"

prompt = "Create an image: Photorealistic editorial photograph in the style of a legal affairs magazine cover. Scene: a closed law book and brass gavel on a dark wood surface, with a single shaft of light. Style: Dark, moody color palette dominated by deep navy, charcoal grays, and warm mahogany tones. A single accent of deep maroon (#8B0000) appears subtly — in a book spine, ribbon, wax seal, or fabric. Lighting: Dramatic chiaroscuro — strong directional light from one side creating deep shadows. Atmosphere: Somber, weighty, institutional. The mood of consequences and accountability. Composition: Cinematic 16:9 landscape. Shallow depth of field. Professional editorial photography. IMPORTANT: Do not include any text, words, letters, or numbers anywhere in the image."

filename = "self-preservation-sanction-courts-gatekeep-ai-20260428-evening.jpg"

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={API_KEY}"
payload = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
}).encode()
req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})

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
        print(f"Generated {jpg_path}")
        break
