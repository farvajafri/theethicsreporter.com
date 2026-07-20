import json
import requests

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

message = "NEW OPINION: The Great Legal Credential Deflation: Why Law Schools Are Overcharging for a Declining Product in the AI Era.\n\nDespite record-high tuition and crushing student debt, NALP and ABA data reveal a shrinking job market for new lawyers. With AI rapidly automating the entry-level work that traditionally justified hiring green associates, the traditional law degree is becoming an overvalued, cartel-protected asset.\n\nRead the full commentary and analysis on The Ethics Reporter."
link = "https://theethicsreporter.com/2026/04/24/law-schools-scam-declining-value-ai-era-2026-april/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())