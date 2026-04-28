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

message = "NEW OPINION: The Law School Cartel: Selling a Declining Credential in the AI Era.\n\nDespite crushing student debt and a legally protected monopoly, American law schools are systematically overcharging for a credential whose value is being hollowed out by artificial intelligence. As AI eliminates entry-level legal work, the JD is rapidly becoming an overpriced, depreciating asset.\n\nRead the full commentary and analysis on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/28/law-school-cartel-crushing-debt-ai-reality-20260428/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
