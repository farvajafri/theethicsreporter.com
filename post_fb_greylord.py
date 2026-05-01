import json
import urllib.request
import urllib.parse
import sys

# Load FB credentials
with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
    creds = json.load(f)

page_id = '823941747449672'
access_token = None

for page in creds.get('pages', []):
    if page['id'] == page_id:
        access_token = page['access_token']
        break

if not access_token:
    print("Could not find access token for page ID", page_id)
    sys.exit(1)

message = """The mythological architecture of the American republic relies on the unquestioned sanctity of the courtroom. But what happens when the judge is the criminal?

In the early 1980s, the FBI's Operation Greylord shattered the illusion of the impartial bench, indicting 17 judges in Chicago for selling justice to the highest bidder. It proved the Founding Fathers right: a self-policing legal establishment functions exactly like a cartel.

We traded a King for a Cartel. It's time to dismantle it. Read the full investigation in our new 'Take America Back' series.

Read the article here: https://theethicsreporter.com/take-america-back/article/operation-greylord-chicago-judicial-corruption-fbi"""

url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
data = urllib.parse.urlencode({
    'message': message,
    'access_token': access_token
}).encode('utf-8')

req = urllib.request.Request(url, data=data)
try:
    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode('utf-8'))
    print("Successfully posted to Facebook:", result)
except urllib.error.HTTPError as e:
    print(f"Error posting to Facebook: {e.code} - {e.read().decode('utf-8')}")

