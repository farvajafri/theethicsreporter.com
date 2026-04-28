import json
import requests

with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_token = next(page['access_token'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')
page_id = next(page['id'] for page in creds['pages'] if page['name'] == 'The Ethics Reporter')

message = "NEW OPINION: The Law School Trap.\n\nLaw schools are systematically overcharging students for a credential whose value is precipitously declining in the AI era. With average cumulative law school debt sitting at $140,870 and entering classes shrinking rapidly, how can the legal establishment justify its luxury prices when generative AI is automating the entry-level associate role out of existence?\n\nRead the full commentary and analysis on The Ethics Reporter:"
link = "https://theethicsreporter.com/2026/04/27/law-school-trap-overpaying-declining-credential-ai-20260427/"

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
payload = {
    'message': message,
    'link': link,
    'access_token': page_token
}

response = requests.post(url, data=payload)
print(response.json())
