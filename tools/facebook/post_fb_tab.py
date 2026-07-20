import json
import urllib.request
import urllib.parse
import sys

def post_to_fb():
    with open('/Users/farvascott/.openclaw/workspace/.secrets/facebook-credentials.json', 'r') as f:
        creds = json.load(f)
    
    page_id = '823941747449672'
    access_token = None
    for page in creds.get('pages', []):
        if page.get('id') == page_id:
            access_token = page.get('access_token')
            break
    
    if not access_token:
        print("Could not find access token for page ID", page_id)
        sys.exit(1)
        
    message = "In the Brooklyn Supreme Court, Justice Gerald Garson turned child custody and divorce proceedings into an extortion racket, selling rulings for cash, meals, and cigars. This horrifying scandal proves that the Founders' fears of an unaccountable judicial elite were justified, and exposes a defunct system that requires a desperate parent wearing a wire to police the bench.\n\nRead the full investigation in our Take America Back section: https://theethicsreporter.com/take-america-back/article/gerald-garson-brooklyn-custody-corruption"
    
    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    data = urllib.parse.urlencode({
        'message': message,
        'link': 'https://theethicsreporter.com/take-america-back/article/gerald-garson-brooklyn-custody-corruption',
        'access_token': access_token
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data)
    try:
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode('utf-8'))
        print("Successfully posted to Facebook:", result)
    except Exception as e:
        if hasattr(e, 'read'):
            print("Failed to post to Facebook:", e.read().decode('utf-8'))
        else:
            print("Failed to post to Facebook:", e)

post_to_fb()