import json
import requests

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

message = "NEW OPINION: The Great Legal Credential Deflation.\n\nLaw schools are systematically overcharging students for a credential whose value is precipitously declining in the AI era. With the Class of 2024 anticipating an average of $76,300 in debt—and 17% preparing to owe $150,000+—how can the legal establishment justify its prices when generative AI is automating the entry-level associate role out of existence?\n\nRead the full commentary and analysis on The Ethics Reporter:"
link = "https://theethicsreporter.com/2026/04/23/law-schools-scam-declining-value-ai-era-2026/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
