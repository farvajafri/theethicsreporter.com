#!/bin/bash
# Send TER Morning Note via Resend API
# Gets all subscribers from Brevo list 17 and sends individually

set -e

RESEND_KEY=$(python3 -c "
content = open('/Users/farvascott/code/theethicsreporter/theethicsreporter.com/.env.local').read()
key = content.split('RESEND_API_KEY=\"')[1].split('\"')[0].replace('\\\\n','').replace('\\n','').strip()
print(key)
")

BREVO_KEY=$(python3 -c "
content = open('/Users/farvascott/code/theethicsreporter/theethicsreporter.com/.env.local').read()
key = content.split('BREVO_API_KEY=\"')[1].split('\"')[0].replace('\\\\n','').replace('\\n','').strip()
print(key)
")

# Get all real subscribers from Brevo list 17
SUBSCRIBERS=$(python3 -c "
import json, urllib.request, sys

key = open('/Users/farvascott/code/theethicsreporter/theethicsreporter.com/.env.local').read().split('BREVO_API_KEY=\"')[1].split('\"')[0].replace('\\\\n','').replace('\\n','').strip()

req = urllib.request.Request(
    'https://api.brevo.com/v3/contacts?listId=17&limit=100',
    headers={'api-key': key}
)
d = json.loads(urllib.request.urlopen(req).read())
contacts = d.get('contacts', [])

real = [(c['email'], (c.get('attributes') or {}).get('FIRSTNAME','Reader'))
        for c in contacts
        if c.get('email') and c.get('email') != '?' and 17 in c.get('listIds',[]) and '@' in c.get('email','')]
for email, name in real:
    print(f'{email}|{name}')
")

if [ -z "$SUBSCRIBERS" ]; then
    echo "No subscribers found in list 17"
    exit 0
fi

SENT=0
FAILED=0

while IFS='|' read -r EMAIL FIRSTNAME; do
    [ -z "$EMAIL" ] && continue
    NAME=${FIRSTNAME:-Reader}
    echo "Sending to: $EMAIL ($NAME)..."

    UNSUB_URL="https://www.theethicsreporter.com/unsubscribe?email=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$EMAIL'))")"

    HTML=$(python3 -c "
import sys
html = open('/Users/farvascott/code/theethicsreporter/theethicsreporter.com/scripts/morning-note.html').read()
html = html.replace('{{FIRSTNAME}}', sys.argv[1])
html = html.replace('{{UNSUBSCRIBE_URL}}', sys.argv[2])
import json
print(json.dumps(html))
" "$NAME" "$UNSUB_URL")

    PAYLOAD=$(python3 -c "
import json, sys
html = json.loads(sys.argv[1])
payload = {
    'from': 'The Ethics Reporter <briefing@theethicsreporter.com>',
    'to': [sys.argv[2]],
    'subject': '35 Judges Just Called It Fraud. Nobody Covered It.',
    'html': html
}
print(json.dumps(payload))
" "$HTML" "$EMAIL")

    RESPONSE=$(curl -s -w "\n%{http_code}" https://api.resend.com/emails \
        -H "Authorization: Bearer $RESEND_KEY" \
        -H "Content-Type: application/json" \
        -d "$PAYLOAD")

    HTTP_CODE=$(echo "$RESPONSE" | tail -1)

    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
        echo "  ✅ Sent to $EMAIL"
        SENT=$((SENT + 1))
    else
        echo "  ❌ Failed: $EMAIL (HTTP $HTTP_CODE)"
        echo "  Response: $(echo "$RESPONSE" | head -1)"
        FAILED=$((FAILED + 1))
    fi

    sleep 1  # avoid rate limits

done <<< "$SUBSCRIBERS"

echo "Done. Sent: $SENT | Failed: $FAILED"
