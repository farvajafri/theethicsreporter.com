// SEO data + helpers for programmatic merch pages.

export const US_STATES: { name: string; slug: string; abbr: string }[] = [
  { name: "Alabama", slug: "alabama", abbr: "AL" }, { name: "Alaska", slug: "alaska", abbr: "AK" },
  { name: "Arizona", slug: "arizona", abbr: "AZ" }, { name: "Arkansas", slug: "arkansas", abbr: "AR" },
  { name: "California", slug: "california", abbr: "CA" }, { name: "Colorado", slug: "colorado", abbr: "CO" },
  { name: "Connecticut", slug: "connecticut", abbr: "CT" }, { name: "Delaware", slug: "delaware", abbr: "DE" },
  { name: "Florida", slug: "florida", abbr: "FL" }, { name: "Georgia", slug: "georgia", abbr: "GA" },
  { name: "Hawaii", slug: "hawaii", abbr: "HI" }, { name: "Idaho", slug: "idaho", abbr: "ID" },
  { name: "Illinois", slug: "illinois", abbr: "IL" }, { name: "Indiana", slug: "indiana", abbr: "IN" },
  { name: "Iowa", slug: "iowa", abbr: "IA" }, { name: "Kansas", slug: "kansas", abbr: "KS" },
  { name: "Kentucky", slug: "kentucky", abbr: "KY" }, { name: "Louisiana", slug: "louisiana", abbr: "LA" },
  { name: "Maine", slug: "maine", abbr: "ME" }, { name: "Maryland", slug: "maryland", abbr: "MD" },
  { name: "Massachusetts", slug: "massachusetts", abbr: "MA" }, { name: "Michigan", slug: "michigan", abbr: "MI" },
  { name: "Minnesota", slug: "minnesota", abbr: "MN" }, { name: "Mississippi", slug: "mississippi", abbr: "MS" },
  { name: "Missouri", slug: "missouri", abbr: "MO" }, { name: "Montana", slug: "montana", abbr: "MT" },
  { name: "Nebraska", slug: "nebraska", abbr: "NE" }, { name: "Nevada", slug: "nevada", abbr: "NV" },
  { name: "New Hampshire", slug: "new-hampshire", abbr: "NH" }, { name: "New Jersey", slug: "new-jersey", abbr: "NJ" },
  { name: "New Mexico", slug: "new-mexico", abbr: "NM" }, { name: "New York", slug: "new-york", abbr: "NY" },
  { name: "North Carolina", slug: "north-carolina", abbr: "NC" }, { name: "North Dakota", slug: "north-dakota", abbr: "ND" },
  { name: "Ohio", slug: "ohio", abbr: "OH" }, { name: "Oklahoma", slug: "oklahoma", abbr: "OK" },
  { name: "Oregon", slug: "oregon", abbr: "OR" }, { name: "Pennsylvania", slug: "pennsylvania", abbr: "PA" },
  { name: "Rhode Island", slug: "rhode-island", abbr: "RI" }, { name: "South Carolina", slug: "south-carolina", abbr: "SC" },
  { name: "South Dakota", slug: "south-dakota", abbr: "SD" }, { name: "Tennessee", slug: "tennessee", abbr: "TN" },
  { name: "Texas", slug: "texas", abbr: "TX" }, { name: "Utah", slug: "utah", abbr: "UT" },
  { name: "Vermont", slug: "vermont", abbr: "VT" }, { name: "Virginia", slug: "virginia", abbr: "VA" },
  { name: "Washington", slug: "washington", abbr: "WA" }, { name: "West Virginia", slug: "west-virginia", abbr: "WV" },
  { name: "Wisconsin", slug: "wisconsin", abbr: "WI" }, { name: "Wyoming", slug: "wyoming", abbr: "WY" },
];

export function stateBySlug(slug: string) {
  return US_STATES.find((s) => s.slug === slug);
}

export const FOUNDERS: { id: string; name: string; slug: string; years: string; bio: string; keyword: string }[] = [
  { id: "jefferson", name: "Thomas Jefferson", slug: "thomas-jefferson", years: "1743–1826", keyword: "Thomas Jefferson quotes",
    bio: "Author of the Declaration of Independence and third President, Jefferson gave us the language of liberty, self-government, and the right to resist tyranny." },
  { id: "franklin", name: "Benjamin Franklin", slug: "benjamin-franklin", years: "1706–1790", keyword: "Benjamin Franklin quotes",
    bio: "Printer, diplomat, and founding sage, Franklin warned against trading essential liberty for temporary safety and championed free speech as the bedrock of a free nation." },
  { id: "washington", name: "George Washington", slug: "george-washington", years: "1732–1799", keyword: "George Washington quotes",
    bio: "Commander of the Continental Army and first President, Washington pledged himself to the Constitution as the guide he would never abandon." },
  { id: "adams", name: "John Adams", slug: "john-adams", years: "1735–1826", keyword: "John Adams quotes",
    bio: "Revolutionary lawyer and second President, Adams defended the primacy of facts and evidence and warned that liberty, once lost, is lost forever." },
  { id: "henry", name: "Patrick Henry", slug: "patrick-henry", years: "1736–1799", keyword: "Patrick Henry quotes",
    bio: "The voice of the Revolution, Henry's cry of 'Give me liberty, or give me death!' lit the fuse of American independence." },
  { id: "paine", name: "Thomas Paine", slug: "thomas-paine", years: "1737–1809", keyword: "Thomas Paine quotes",
    bio: "Pamphleteer of the Revolution, Paine rallied a freezing army with 'These are the times that try men's souls' and made the case for common-sense independence." },
];

export function founderBySlug(slug: string) {
  return FOUNDERS.find((f) => f.slug === slug);
}

// Map founders to the attribution strings used in merch data.
export function founderMatchesAttribution(founderName: string, attribution: string): boolean {
  const last = founderName.split(" ").pop() || founderName;
  return attribution.toLowerCase().includes(last.toLowerCase());
}

export const GIFT_OCCASIONS: { id: string; name: string; slug: string; blurb: string }[] = [
  { id: "july-4th", name: "Fourth of July", slug: "fourth-of-july", blurb: "Independence Day gifts for the patriot who never forgot what 1776 meant." },
  { id: "fathers-day", name: "Father's Day", slug: "fathers-day", blurb: "For the dad who taught you the Constitution before they taught you to drive." },
  { id: "veterans", name: "Veterans", slug: "veterans-gifts", blurb: "Honor the ones who defended the freedoms these founders described." },
  { id: "memorial-day", name: "Memorial Day", slug: "memorial-day", blurb: "Remember the cost of liberty this Memorial Day." },
  { id: "christmas", name: "Christmas", slug: "christmas", blurb: "Patriot Christmas gifts that mean something more than another gadget." },
  { id: "birthday", name: "Birthday", slug: "birthday-gifts", blurb: "A birthday gift for the freedom-lover in your life." },
  { id: "conservative", name: "Conservatives", slug: "gifts-for-conservatives", blurb: "Gifts for the conservative who values the founding principles." },
  { id: "gun-owners", name: "Gun Owners", slug: "gifts-for-gun-owners", blurb: "Don't Tread On Me gear for the Second Amendment believer." },
];

export function giftBySlug(slug: string) {
  return GIFT_OCCASIONS.find((g) => g.slug === slug);
}
