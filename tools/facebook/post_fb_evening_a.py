import json
import requests

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

message = "NEW OPINION: The Protectionist Panic: How the Legal Establishment Uses \"Ethics\" to Gatekeep AI.\n\nCourts and bar associations are weaponizing \"legal ethics\" and the panic over AI hallucinations to protect their monopoly and the billable hour. Their aggressive gatekeeping has nothing to do with protecting the public—it is pure institutional self-preservation against disruptive technology.\n\nRead the full commentary and analysis on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/25/courts-ai-gatekeeping-ethics-sanctions-self-preservation-20260425/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
