import json
import requests
import sys

try:
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)

    page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
    page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
except Exception as e:
    print(f"Failed to load credentials: {e}")
    sys.exit(1)

message = "NEW OPINION: The Great Law School Grift: Charging $300k for a Credential Made Obsolete by AI\n\nAmerican law schools are operating an institutional grift, aggressively marketing a $200,000 credential whose value is being vaporized by AI. With average debt above $130k and generative AI eliminating the entry-level jobs that pay it off, the JD is becoming a depreciating asset protected only by a cartel-like monopoly.\n\nRead the full commentary and analysis on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/29/the-great-law-school-grift-tuition-debt-and-ai-obsolescence-2026/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
