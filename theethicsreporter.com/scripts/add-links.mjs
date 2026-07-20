import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = join(__dirname, '..', 'data', 'posts.json');

const posts = JSON.parse(readFileSync(postsPath, 'utf-8'));

// ─── External link map: keyword/phrase → URL ───
const externalLinks = {
  'Model Rules of Professional Conduct': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/',
  'American Bar Association': 'https://www.americanbar.org/',
  'Florida Supreme Court': 'https://www.floridasupremecourt.org/',
  'Florida Bar': 'https://www.floridabar.org/',
  'State Bar of California': 'https://www.calbar.ca.gov/',
  'California State Bar': 'https://www.calbar.ca.gov/',
  'California Supreme Court': 'https://www.courts.ca.gov/supremecourt.htm',
  'New York Supreme Court': 'https://www.nycourts.gov/',
  'Appellate Division': 'https://www.nycourts.gov/courts/appellatedivisions.shtml',
  'Illinois Supreme Court': 'https://www.illinoiscourts.gov/supreme-court/',
  'Attorney Registration and Disciplinary Commission': 'https://www.iardc.org/',
  'ARDC': 'https://www.iardc.org/',
  'New Jersey Supreme Court': 'https://www.njcourts.gov/courts/supreme-court',
  'Georgia Supreme Court': 'https://www.gasupreme.us/',
  'State Bar of Georgia': 'https://www.gabar.org/',
  'Tennessee Supreme Court': 'https://www.tncourts.gov/courts/supreme-court',
  'Board of Professional Responsibility': 'https://www.tbpr.org/',
  'Indiana Supreme Court': 'https://www.in.gov/courts/supreme/',
  'Pennsylvania Supreme Court': 'https://www.pacourts.us/courts/supreme-court',
  'Connecticut Supreme Court': 'https://www.jud.ct.gov/supremecourt/',
  'State Bar of Arizona': 'https://www.azbar.org/',
  'Arizona Supreme Court': 'https://www.azcourts.gov/supremecourt/',
  'Colorado Supreme Court': 'https://www.courts.state.co.us/Courts/Supreme_Court/',
  'Oklahoma Supreme Court': 'https://www.oscn.net/oscn/schome.aspx',
  'Massachusetts Supreme Judicial Court': 'https://www.mass.gov/orgs/supreme-judicial-court',
  'Maryland Supreme Court': 'https://www.mdcourts.gov/coa',
  'Washington Supreme Court': 'https://www.courts.wa.gov/appellate_trial_courts/supremecourt/',
  'Washington State Bar': 'https://www.wsba.org/',
  'Texas Supreme Court': 'https://www.txcourts.gov/supreme/',
  'State Bar of Texas': 'https://www.texasbar.com/',
  'North Carolina State Bar': 'https://www.ncbar.gov/',
  'Virginia State Bar': 'https://www.vsb.org/',
  'Rhode Island Supreme Court': 'https://www.courts.ri.gov/courts/supremecourt/',
  'Department of Justice': 'https://www.justice.gov/',
  'DOJ': 'https://www.justice.gov/',
  'Federal Register': 'https://www.federalregister.gov/',
  'U.S. Supreme Court': 'https://www.supremecourt.gov/',
  'Office for Civil Rights': 'https://www.hhs.gov/ocr/',
  'Securities and Exchange Commission': 'https://www.sec.gov/',
  'IOLTA': 'https://www.americanbar.org/groups/interest_lawyers_trust_accounts/',
  'trust account': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_15_safekeeping_property/',
  'attorney-client privilege': 'https://www.law.cornell.edu/wex/attorney-client_privilege',
  'conflict of interest': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_7_conflict_of_interest_current_clients/',
  'duty of competence': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_1_competence/',
  'duty of diligence': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_3_diligence/',
  'professional misconduct': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_8_4_misconduct/',
  'unauthorized practice of law': 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_5_5_unauthorized_practice_of_law_multijurisdictional_practice_of_law/',
};

// ─── Name extraction ───
// A "name word" is a capitalized word, middle initial, or suffix
const NAME_WORD = /[A-Z][a-z]+/;
const SUFFIX = /^(?:II|III|IV|Jr\.|Sr\.)$/;
const DISCIPLINE_VERBS = /^(?:Disbarred|Suspended|Barred|Removed|Placed|Permanently|Publicly|Stricken|Censured|Reprimanded|Punished|Resigned|Resigns|Faces|Suspends)$/;
const NON_NAME_WORDS = new Set([
  'The', 'From', 'When', 'How', 'Why', 'Inside', 'Eight', 'Two', 'Three',
  'Four', 'Five', 'Six', 'Seven', 'One', 'Recent', 'Formal', 'Permanent',
  'Ethical', 'Legal', 'Attorney', 'Judge', 'Former', 'Florida', 'California',
  'New', 'York', 'Illinois', 'Georgia', 'Tennessee', 'Indiana', 'Jersey',
  'Pennsylvania', 'Connecticut', 'Arizona', 'Colorado', 'Oklahoma',
  'Massachusetts', 'Maryland', 'Washington', 'Texas', 'Virginia', 'North',
  'South', 'Carolina', 'Rhode', 'Island', 'Alabama', 'Michigan', 'Ohio',
  'Oregon', 'Idaho', 'Iowa', 'Minnesota', 'Nevada', 'Wisconsin', 'Kentucky',
  'Delaware', 'Missouri', 'Maine', 'Montana', 'Nebraska', 'Hawaii', 'Alaska',
  'Disbarred', 'Suspended', 'Barred', 'Removed', 'Placed', 'Permanently',
  'Publicly', 'Stricken', 'Misconduct', 'Disciplinary', 'Suspension',
  'Disbarment', 'Client', 'Neglect', 'Trust', 'Breach', 'Betrayal',
  'Abandoning', 'Convicted', 'Dishonored', 'Resignation', 'Complaint',
  'Allegations', 'Against', 'Amid', 'After', 'Following', 'Over', 'For',
  'And', 'With', 'That', 'This', 'Thirty', 'Days', 'Ninety', 'Day',
  'Missteps', 'Loss', 'Verdict', 'Final', 'Career', 'End', 'Fall',
  'Grace', 'Danger', 'Simple', 'Mistake', 'Ambition', 'Outpaces',
  'Ethics', 'Downfall', 'Gavel', 'Falls', 'Harshly', 'Words', 'Cross',
  'Line', 'Bench', 'Suspenders', 'Judges', 'Democracy', 'Sake',
  'Perils', 'Dual', 'Representation', 'Lessons', 'Negligent',
  'Misappropriation', 'Censured', 'Office', 'Public', 'Decision',
  'Cautionary', 'Tale', 'Forgery', 'Ended', 'Director', 'Patent',
  'Disruption', 'Profession', 'Deception', 'Deceit', 'Fees',
  'Vulnerable', 'Clients', 'Campaign', 'Lawyer', 'Shattered',
]);

function cleanTitle(title) {
  return title
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&').replace(/&#\d+;/g, '')
    .replace(/&amp;/g, '&');
}

function extractNameFromTitle(rawTitle) {
  const title = cleanTitle(rawTitle);

  // Strategy 1: Name before colon (most common for this site)
  const colonIdx = title.indexOf(':');
  if (colonIdx > 0) {
    const before = title.substring(0, colonIdx).trim();
    const name = validateAsPersonName(before);
    if (name) return name;
  }

  // Strategy 2: "Attorney/Judge Firstname ... Lastname Verb..."
  const attyMatch = title.match(/(?:Attorney|Judge|Rep\.)\s+((?:[A-Z][a-z]+\.?\s+){1,4}[A-Z][a-z]{2,}(?:\s+(?:II|III|IV|Jr\.|Sr\.))?)\s+(?:Disbarred|Suspended|Barred|Removed|Placed|Permanently|Publicly|Stricken|Censured|Reprimanded|Punished|Resigned|Resigns|Faces|Suspends|Indefinit|Must|Disciplined)/);
  if (attyMatch) {
    const name = validateAsPersonName(attyMatch[1].trim());
    if (name) return name;
  }

  // Strategy 3: "The Case/Disbarment/Downfall of [Attorney|Judge]? Firstname Lastname"
  const ofMatch = title.match(/(?:Case|Disbarment|Downfall|Fall|Disciplinary\s+(?:Case|History))\s+of\s+(?:Attorney\s+|Judge\s+|Former\s+Judge\s+)?([A-Z][a-z]+(?:\s+[A-Z]\.?\s*)*\s+[A-Z][a-z]{2,}(?:\s+(?:II|III|IV|Jr\.|Sr\.))?)/);
  if (ofMatch) {
    const name = validateAsPersonName(ofMatch[1].trim());
    if (name) return name;
  }

  // Strategy 4: Starts with a name followed by discipline verb
  const startMatch = title.match(/^((?:[A-Z][a-z]+\.?\s+){1,4}[A-Z][a-z]{2,}(?:\s+(?:II|III|IV|Jr\.|Sr\.))?)\s+(?:Disbarred|Suspended|Barred|Removed|Placed|Permanently|Publicly|Stricken|Censured|Misappropriation)/);
  if (startMatch) {
    const name = validateAsPersonName(startMatch[1].trim());
    if (name) return name;
  }

  return null;
}

function validateAsPersonName(text) {
  if (!text || text.length < 8) return null;

  // Remove trailing period if present
  text = text.replace(/\.$/, '').trim();

  const words = text.split(/\s+/);
  if (words.length < 2 || words.length > 6) return null;

  // Every word must be capitalized (or a middle initial or suffix)
  for (const w of words) {
    if (SUFFIX.test(w)) continue;
    if (/^[A-Z]\.?$/.test(w)) continue; // middle initial
    if (!/^[A-Z][a-z]+$/.test(w)) return null; // not a name word
  }

  // At least first and last word must NOT be common non-name words
  if (NON_NAME_WORDS.has(words[0])) return null;
  if (NON_NAME_WORDS.has(words[words.length - 1])) return null;

  // The last word (or second-to-last if suffix) must look like a surname
  const lastIdx = SUFFIX.test(words[words.length - 1]) ? words.length - 2 : words.length - 1;
  if (lastIdx < 1) return null;
  const surname = words[lastIdx];
  if (surname.length < 3) return null;

  return text;
}

// ─── Build internal link index ───
const nameToSlug = new Map();
const nameToId = new Map();

for (const p of posts) {
  const name = extractNameFromTitle(p.title);
  if (name && !nameToSlug.has(name)) {
    nameToSlug.set(name, p.slug);
    nameToId.set(name, p.id);
  }
}

console.log(`Extracted ${nameToSlug.size} unique attorney names from ${posts.length} posts`);
const allNames = [...nameToSlug.keys()];
console.log('Sample names:', allNames.slice(0, 20));

// ─── Build topic-based internal link index ───
// Group posts by state (from slug) for state-based cross-linking
const stateNames = ['florida','california','new-york','illinois','georgia','tennessee',
  'indiana','new-jersey','pennsylvania','connecticut','arizona','colorado',
  'massachusetts','maryland','washington','texas','oklahoma','virginia',
  'north-carolina','rhode-island','south-carolina','alabama','michigan',
  'new-hampshire','ohio','oregon','kentucky'];

const statePostMap = new Map(); // state-slug → [{slug, id, title}]
for (const p of posts) {
  for (const s of stateNames) {
    if (p.slug.includes(s)) {
      if (!statePostMap.has(s)) statePostMap.set(s, []);
      statePostMap.get(s).push({ slug: p.slug, id: p.id });
      break; // one state per post
    }
  }
}

// Build keyword→post map for topical internal links
const topicKeywords = [
  { phrase: 'AI-generated', label: 'AI-generated legal brief' },
  { phrase: 'artificial intelligence', label: 'AI in legal practice' },
  { phrase: 'client fund', label: 'client fund misappropriation' },
  { phrase: 'IOLTA', label: 'IOLTA violations' },
  { phrase: 'trust account', label: 'trust account misuse' },
  { phrase: 'January 6', label: 'January 6' },
  { phrase: 'immigration', label: 'immigration law' },
  { phrase: 'domestic violence', label: 'domestic violence conviction' },
  { phrase: 'felony conviction', label: 'felony conviction' },
  { phrase: 'judicial misconduct', label: 'judicial misconduct' },
  { phrase: 'patent attorney', label: 'patent attorney discipline' },
  { phrase: 'grand larceny', label: 'grand larceny' },
];

// For each keyword, find posts that are primarily about that topic (in title)
const topicPostMap = new Map(); // phrase → [{slug, id}]
for (const { phrase } of topicKeywords) {
  const matching = posts.filter(p => {
    const t = cleanTitle(p.title).toLowerCase();
    const plain = p.content.replace(/<[^>]+>/g, ' ').toLowerCase();
    // Must appear in title OR first 500 chars of content
    return t.includes(phrase.toLowerCase()) || plain.substring(0, 500).includes(phrase.toLowerCase());
  });
  if (matching.length >= 2) {
    topicPostMap.set(phrase, matching.map(p => ({ slug: p.slug, id: p.id })));
  }
}

// ─── Helpers ───
function isInsideLink(html, matchIndex) {
  const before = html.substring(Math.max(0, matchIndex - 3000), matchIndex);
  const lastOpenA = Math.max(before.lastIndexOf('<a '), before.lastIndexOf('<a\n'));
  if (lastOpenA === -1) return false;
  return lastOpenA > before.lastIndexOf('</a>');
}

function isInsideTag(html, matchIndex) {
  const before = html.substring(Math.max(0, matchIndex - 500), matchIndex);
  return before.lastIndexOf('<') > before.lastIndexOf('>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findValidMatch(content, regex) {
  let searchContent = content;
  let offset = 0;
  while (true) {
    const m = regex.exec(searchContent);
    if (!m) return null;
    const absoluteIndex = offset + m.index;
    if (!isInsideLink(content, absoluteIndex) && !isInsideTag(content, absoluteIndex)) {
      return { index: absoluteIndex, text: m[0] };
    }
    offset += m.index + m[0].length;
    searchContent = content.substring(offset);
  }
}

// ─── Process each post ───
let modifiedCount = 0;
const linkStats = { internal: 0, external: 0 };
const examples = [];

const knownExternalUrls = new Set(Object.values(externalLinks));

for (const post of posts) {
  let content = post.content;
  const linkedUrls = new Set();

  // Collect URLs already in the content and count script-added links
  let existingScriptInternal = 0;
  let existingScriptExternal = 0;
  for (const m of content.matchAll(/href="([^"]+)"/g)) {
    linkedUrls.add(m[1]);
    if (m[1].startsWith('/article/')) existingScriptInternal++;
    if (knownExternalUrls.has(m[1])) existingScriptExternal++;
  }

  // Cap counts include links already added by this script (for idempotency)
  let internalAdded = existingScriptInternal;
  let externalAdded = existingScriptExternal;

  const plainContent = content.replace(/<[^>]+>/g, ' ');

  // --- Internal links: match attorney names from other posts ---
  for (const [name, slug] of nameToSlug) {
    if (internalAdded >= 3) break;
    if (slug === post.slug) continue;
    if (nameToId.get(name) === post.id) continue;
    if (linkedUrls.has(`/article/${slug}`)) continue;

    // Case-sensitive full name match in plain text
    if (!plainContent.includes(name)) continue;

    // Find in HTML with word boundaries, case-sensitive
    const match = findValidMatch(content, new RegExp(`\\b${escapeRegex(name)}\\b`));
    if (!match) continue;

    const anchor = `<a href="/article/${slug}">${match.text}</a>`;
    content = content.substring(0, match.index) + anchor + content.substring(match.index + match.text.length);
    internalAdded++;
    linkStats.internal++;
    linkedUrls.add(`/article/${slug}`);

    if (examples.length < 25) {
      examples.push({
        post: cleanTitle(post.title).substring(0, 70),
        type: 'internal',
        anchor: match.text,
        target: `/article/${slug}`,
      });
    }
  }

  // --- Internal links: state-based cross-links ---
  // For posts about attorney discipline in a specific state, link to
  // other discipline cases in the same state using descriptive anchor text
  if (internalAdded < 3) {
    let postState = null;
    for (const s of stateNames) {
      if (post.slug.includes(s)) { postState = s; break; }
    }

    if (postState && statePostMap.has(postState)) {
      const stateDisplay = postState.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const samePosts = statePostMap.get(postState).filter(p => p.id !== post.id);

      for (const target of samePosts) {
        if (internalAdded >= 3) break;
        if (linkedUrls.has(`/article/${target.slug}`)) continue;

        // Try to find the target attorney's name in this post's content
        const targetName = extractNameFromTitle(
          posts.find(p => p.slug === target.slug)?.title || ''
        );
        if (targetName && plainContent.includes(targetName)) {
          const match = findValidMatch(content, new RegExp(`\\b${escapeRegex(targetName)}\\b`));
          if (match) {
            const anchor = `<a href="/article/${target.slug}">${match.text}</a>`;
            content = content.substring(0, match.index) + anchor + content.substring(match.index + match.text.length);
            internalAdded++;
            linkStats.internal++;
            linkedUrls.add(`/article/${target.slug}`);

            if (examples.length < 25) {
              examples.push({
                post: cleanTitle(post.title).substring(0, 70),
                type: 'internal-state',
                anchor: match.text,
                target: `/article/${target.slug}`,
              });
            }
          }
        }
      }

      // If still under limit, try linking descriptive state-specific phrases
      // like "Florida attorney discipline" to a related Florida article
      if (internalAdded < 1 && samePosts.length > 0) {
        const descriptivePhrases = [
          `${stateDisplay} attorney discipline`,
          `${stateDisplay} disciplinary action`,
          `${stateDisplay} Bar discipline`,
          `disciplined by the ${stateDisplay}`,
          `${stateDisplay} attorney misconduct`,
        ];
        for (const phrase of descriptivePhrases) {
          if (internalAdded >= 1) break;
          const match = findValidMatch(content, new RegExp(escapeRegex(phrase), 'i'));
          if (!match) continue;
          const target = samePosts.find(p => !linkedUrls.has(`/article/${p.slug}`));
          if (!target) break;

          const anchor = `<a href="/article/${target.slug}">${match.text}</a>`;
          content = content.substring(0, match.index) + anchor + content.substring(match.index + match.text.length);
          internalAdded++;
          linkStats.internal++;
          linkedUrls.add(`/article/${target.slug}`);
        }
      }
    }
  }

  // --- External links ---
  const sortedExternal = Object.entries(externalLinks)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [phrase, url] of sortedExternal) {
    if (externalAdded >= 3) break;
    if (linkedUrls.has(url)) continue;

    // Check if a more-specific phrase has already been linked to this same URL
    // (e.g., don't link "DOJ" if "Department of Justice" was already linked)
    if ([...linkedUrls].some(u => u === url)) continue;

    const phraseEscaped = escapeRegex(phrase);
    // Also skip if this URL is already anywhere in the content
    if (content.includes(url)) continue;

    const isShort = phrase.length <= 5;
    const flags = isShort ? '' : 'i';
    const regex = new RegExp(`\\b${phraseEscaped}\\b`, flags);

    const match = findValidMatch(content, regex);
    if (!match) continue;

    const anchor = `<a href="${url}" target="_blank" rel="noopener">${match.text}</a>`;
    content = content.substring(0, match.index) + anchor + content.substring(match.index + match.text.length);
    externalAdded++;
    linkStats.external++;
    linkedUrls.add(url);

    if (examples.length < 25) {
      examples.push({
        post: cleanTitle(post.title).substring(0, 70),
        type: 'external',
        anchor: match.text,
        target: url,
      });
    }
  }

  if (content !== post.content) {
    post.content = content;
    modifiedCount++;
  }
}

// Write back
writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');

console.log(`\n=== Link Addition Complete ===`);
console.log(`Posts modified: ${modifiedCount} / ${posts.length}`);
console.log(`Internal links added: ${linkStats.internal}`);
console.log(`External links added: ${linkStats.external}`);
console.log(`\nExample links added:`);
for (const ex of examples) {
  console.log(`  [${ex.type}] "${ex.post}" → "${ex.anchor}" → ${ex.target}`);
}
