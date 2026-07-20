import json
import requests
from datetime import datetime, timezone

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

message = "NEW OPINION: The Cartel's Last Stand.\n\nCourts continue to impose staggering sanctions on attorneys for AI-related errors. But this sudden enforcement surge isn't about protecting the legal record—it's a desperate act of institutional self-preservation by a legal cartel terrified of technological obsolescence. Why does the profession tolerate human error but ruthlessly punish AI efficiency? \n\nRead the full commentary on The Ethics Reporter:"
date_path = datetime.now(timezone.utc).strftime('%Y/%m/%d')
link = f"https://theethicsreporter.com/{date_path}/courts-weaponizing-sanctions-gatekeep-ai-2026-april/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
