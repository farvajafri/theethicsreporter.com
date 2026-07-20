export interface AttorneyProfile {
  slug: string;
  name: string;
  state: string;
  barNumber?: string;
  admittedYear?: number;
  articleSlugs: string[];
  violations: string[];
  status: "Under Investigation" | "Disciplined" | "Disbarred" | "Active" | "Suspended" | "Censured" | "Resigned";
  description: string;
  city?: string;
  firm?: string;
}

export const attorneysData: AttorneyProfile[] = [
  {
    slug: "ernestas-pravilionis",
    name: "Ernestas Pravilionis",
    state: "New York",
    barNumber: "6080097",
    admittedYear: 2024,
    firm: "EPRA Legal PLLC",
    city: "New York",
    articleSlugs: [
      "ernestas-pravilionis-new-york-attorney-ethics-virtual-office-competence-ai-images",
    ],
    violations: [
      "New York Judiciary Law §470 — virtual office addresses, no physical law office",
      "Rule 1.1 — Competence — practicing across 12+ areas after 2 years at bar",
      "Rule 7.1 — Attorney Advertising — AI-generated photos misrepresenting attorney",
    ],
    status: "Under Investigation",
    description:
      "New York attorney Ernestas Pravilionis, admitted in 2024, operates EPRA Legal PLLC. The Ethics Reporter found all three listed office addresses appear to be virtual mailbox services, potentially violating New York Judiciary Law §470. His website also uses AI-generated images to depict the attorney, raising Rule 7.1 advertising concerns.",
  },
  {
    slug: "spencer-michael-hecht",
    name: "Spencer Michael Hecht",
    state: "Maryland",
    articleSlugs: ["spencer-michael-hecht-maryland-divorce-attorney-disbarred-intentional-dishonesty"],
    violations: ["Intentional dishonesty", "Misrepresentation to tribunal"],
    status: "Disbarred",
    description:
      "Maryland divorce attorney Spencer Michael Hecht was disbarred for intentional dishonesty.",
  },
  {
    slug: "ariel-mitchell",
    name: "Ariel Mitchell",
    state: "Florida",
    city: "Miami",
    articleSlugs: ["ariel-mitchell-miami-attorney-suspended-75-days-for-lying-to-the-florida-bar-the"],
    violations: ["Lying to the Florida Bar", "Misrepresentation"],
    status: "Suspended",
    description:
      "Miami attorney Ariel Mitchell was suspended 75 days for lying to the Florida Bar during a disciplinary investigation.",
  },
  {
    slug: "jianming-shen",
    name: "Jianming Shen",
    state: "New York",
    articleSlugs: ["jianming-shen-new-york-immigration-attorney-publicly-censured-for-commingling-ne"],
    violations: ["Commingling client funds", "Rule 1.15 — Safekeeping Property"],
    status: "Censured",
    description:
      "New York immigration attorney Jianming Shen was publicly censured for commingling client funds with personal funds.",
  },
  {
    slug: "omid-zareh",
    name: "Omid Zareh",
    state: "New York",
    articleSlugs: ["omid-zareh-new-york-attorney-publicly-censured-after-federal-court-finds-legal-b"],
    violations: ["Legal malpractice findings by federal court"],
    status: "Censured",
    description:
      "New York attorney Omid Zareh was publicly censured after a federal court made findings of legal malpractice in his representation.",
  },
  {
    slug: "simone-gold",
    name: "Simone Melissa Gold",
    state: "Florida",
    articleSlugs: ["simone-melissa-gold-doctor-lawyer-and-january-6-capitol-participant-suspended-fi"],
    violations: ["Felony conviction — January 6 Capitol participation"],
    status: "Suspended",
    description:
      "Attorney and physician Simone Melissa Gold was suspended from the Florida Bar following her felony conviction related to January 6 Capitol events.",
  },
  {
    slug: "evie-jeang",
    name: "Evie P. Jeang",
    state: "California",
    articleSlugs: ["from-trusted-counsel-to-disbarred-the-fall-of-evie-p-jeang"],
    violations: ["Multiple misconduct violations leading to disbarment"],
    status: "Disbarred",
    description:
      "California attorney Evie P. Jeang went from trusted counsel to disbarment after a series of serious misconduct violations.",
  },
  {
    slug: "jamie-ferrara",
    name: "Jamie T. Ferrara",
    state: "New York",
    articleSlugs: ["jamie-t-ferrara-new-york-attorney-disbarred-for-refusing-to-cooperate-with-disci"],
    violations: ["Failure to cooperate with disciplinary investigation"],
    status: "Disbarred",
    description:
      "New York attorney Jamie T. Ferrara was disbarred for refusing to cooperate with a disciplinary investigation.",
  },
  {
    slug: "terrance-dougherty",
    name: "Terrance J. Dougherty",
    state: "New York",
    articleSlugs: ["terrance-j-dougherty-new-york-real-estate-attorney-disbarred-after-pleading-guil"],
    violations: ["Criminal guilty plea", "Real estate fraud"],
    status: "Disbarred",
    description:
      "New York real estate attorney Terrance J. Dougherty was disbarred after pleading guilty to criminal charges related to his practice.",
  },
  {
    slug: "lamon-bland",
    name: "Lamon Darrell Bland",
    state: "New York",
    articleSlugs: ["lamon-darrell-bland-new-york-attorney-disbarred-after-refusing-to-cooperate-with"],
    violations: ["Failure to cooperate with disciplinary investigation"],
    status: "Disbarred",
    description:
      "New York attorney Lamon Darrell Bland was disbarred after refusing to cooperate with the disciplinary investigation.",
  },
  {
    slug: "anthony-pastel",
    name: "Anthony Michael Pastel",
    state: "New York",
    articleSlugs: ["anthony-michael-pastel-new-york-public-defender-disbarred-after-pleading-guilty-"],
    violations: ["Criminal guilty plea"],
    status: "Disbarred",
    description:
      "New York public defender Anthony Michael Pastel was disbarred after pleading guilty to criminal charges.",
  },
  {
    slug: "teresa-roper",
    name: "Teresa Schiele Roper",
    state: "Florida",
    city: "Apopka",
    articleSlugs: ["teresa-schiele-roper-apopka-workers-compensation-attorney-suspended-after-felony"],
    violations: ["Felony conviction"],
    status: "Suspended",
    description:
      "Florida workers' compensation attorney Teresa Schiele Roper was suspended after a felony conviction.",
  },
  {
    slug: "emelike-nwosuocha",
    name: "Emelike Nwosuocha",
    state: "Florida",
    city: "Miami",
    articleSlugs: ["emelike-nwosuocha-florida-bar-suspended-miami-attorney-508-days-after-his-death"],
    violations: ["Multiple professional misconduct violations"],
    status: "Suspended",
    description:
      "Miami attorney Emelike Nwosuocha was suspended by the Florida Bar for 508 days in a case notable for its timing after his death.",
  },
  {
    slug: "lisa-jacobs",
    name: "Lisa Jacobs",
    state: "Florida",
    city: "Aventura",
    articleSlugs: ["lisa-jacobs-florida-attorney-disbarred-after-third-contempt-aventura-lawyer-refu"],
    violations: ["Contempt of court — multiple counts", "Refusal to comply with court orders"],
    status: "Disbarred",
    description:
      "Aventura, Florida attorney Lisa Jacobs was disbarred after her third contempt citation for refusing to comply with court orders.",
  },
  {
    slug: "augustus-sol-invictus",
    name: "Augustus Sol Invictus",
    state: "Florida",
    articleSlugs: ["augustus-sol-invictus-florida-attorney-suspended-after-felony-conviction-tied-to"],
    violations: ["Felony conviction"],
    status: "Suspended",
    description:
      "Florida attorney Augustus Sol Invictus was suspended after a felony conviction.",
  },
  {
    slug: "robert-fojo",
    name: "Robert Michael Fojo",
    state: "Florida",
    articleSlugs: ["florida-attorney-robert-michael-fojo-disbarred-after-multi-state-client-fund-mis"],
    violations: ["Client fund misappropriation — multiple states"],
    status: "Disbarred",
    description:
      "Florida attorney Robert Michael Fojo was disbarred after client fund misappropriation violations across multiple states.",
  },
  {
    slug: "jeffrey-siskind",
    name: "Jeffrey Marc Siskind",
    state: "Florida",
    city: "Wellington",
    articleSlugs: ["permanent-disbarment-the-case-of-wellington-attorney-jeffrey-marc-siskind"],
    violations: ["Multiple misconduct violations", "Permanent disbarment"],
    status: "Disbarred",
    description:
      "Wellington, Florida attorney Jeffrey Marc Siskind received permanent disbarment for serious and repeated misconduct violations.",
  },
  {
    slug: "nickola-cunha",
    name: "Nickola J. Cunha",
    state: "Florida",
    articleSlugs: ["permanent-disbarment-and-new-sanctions-the-case-of-nickola-j-cunha"],
    violations: ["Multiple misconduct violations", "Repeated disciplinary action", "Permanent disbarment"],
    status: "Disbarred",
    description:
      "Florida attorney Nickola J. Cunha received permanent disbarment and additional sanctions for repeated and serious professional misconduct.",
  },
  {
    slug: "raymond-trebisacci",
    name: "Raymond Trebisacci",
    state: "Connecticut",
    city: "Pawcatuck",
    articleSlugs: ["misconduct-allegations-against-pawcatuck-attorney-raymond-trebisacci"],
    violations: ["Misconduct allegations under investigation"],
    status: "Under Investigation",
    description:
      "Pawcatuck, Connecticut attorney Raymond Trebisacci faces misconduct allegations investigated by The Ethics Reporter.",
  },
  {
    slug: "madison-miller",
    name: "Madison R. Miller",
    state: "Illinois",
    articleSlugs: ["ethical-boundaries-in-illinois-estate-planning-a-closer-look-at-madison-r-miller"],
    violations: ["Estate planning ethics violations"],
    status: "Under Investigation",
    description:
      "Illinois estate planning attorney Madison R. Miller is the subject of an Ethics Reporter examination of ethical boundaries in estate planning practice.",
  },
  {
    slug: "hunter-biden",
    name: "Hunter Biden",
    state: "Connecticut",
    articleSlugs: ["permanent-disbarment-the-end-of-hunter-bidens-connecticut-legal-career"],
    violations: ["Criminal convictions", "Bar admission misrepresentation"],
    status: "Disbarred",
    description:
      "Hunter Biden's Connecticut law license was permanently revoked following his criminal convictions, ending his legal career in the state.",
  },
  {
    slug: "robert-turner",
    name: "Robert Joseph Turner",
    state: "Tennessee",
    city: "Nashville",
    articleSlugs: ["nashville-attorney-robert-joseph-turner-suspended"],
    violations: ["Professional misconduct"],
    status: "Suspended",
    description:
      "Nashville attorney Robert Joseph Turner was suspended from the practice of law for professional misconduct.",
  },
  {
    slug: "perry-stout",
    name: "Perry Lee Stout",
    state: "Tennessee",
    articleSlugs: ["the-fall-of-former-judge-perry-lee-stout"],
    violations: ["Judicial misconduct", "Professional misconduct"],
    status: "Disbarred",
    description:
      "Former Tennessee judge Perry Lee Stout fell from the bench and ultimately lost his law license for serious professional misconduct.",
  },
  {
    slug: "sheila-robinson-beasley",
    name: "Sheila L. Robinson-Beasley",
    state: "Tennessee",
    city: "Memphis",
    articleSlugs: ["the-case-of-memphis-attorney-sheila-l-robinson-beasley"],
    violations: ["Professional misconduct"],
    status: "Disciplined",
    description:
      "Memphis attorney Sheila L. Robinson-Beasley is the subject of an Ethics Reporter investigation into her professional conduct.",
  },
  {
    slug: "christopher-roberts",
    name: "Christopher Shawn Roberts",
    state: "Tennessee",
    articleSlugs: ["permanent-disbarment-the-case-of-roane-county-attorney-christopher-shawn-roberts"],
    violations: ["Serious professional misconduct — permanent disbarment"],
    status: "Disbarred",
    description:
      "Roane County, Tennessee attorney Christopher Shawn Roberts received permanent disbarment for serious professional misconduct.",
  },
  {
    slug: "melvin-werner",
    name: "Melvin Jacob Werner",
    state: "Tennessee",
    city: "Knoxville",
    articleSlugs: ["the-case-of-knoxville-attorney-melvin-jacob-werner"],
    violations: ["Professional misconduct"],
    status: "Disciplined",
    description:
      "Knoxville attorney Melvin Jacob Werner is the subject of a professional misconduct case examined by The Ethics Reporter.",
  },
  {
    slug: "jocelyn-mims",
    name: "Jocelyn Doria Mims",
    state: "Tennessee",
    articleSlugs: ["the-professional-downfall-of-jocelyn-doria-mims"],
    violations: ["Professional misconduct leading to disbarment"],
    status: "Disbarred",
    description:
      "Attorney Jocelyn Doria Mims experienced a professional downfall documented by The Ethics Reporter, resulting in loss of her law license.",
  },
  {
    slug: "charlotte-leibrock",
    name: "Charlotte Ann Leibrock",
    state: "Tennessee",
    articleSlugs: ["the-case-of-cocke-county-attorney-charlotte-ann-leibrock"],
    violations: ["Professional misconduct"],
    status: "Disciplined",
    description:
      "Cocke County, Tennessee attorney Charlotte Ann Leibrock is the subject of a disciplinary case covered by The Ethics Reporter.",
  },
  {
    slug: "susan-yellen",
    name: "Susan G. Yellen",
    state: "New York",
    articleSlugs: [
      "formal-complaint-susan-g-yellen-and-amy-m-eisenberg-new-york-attorneys-accused-o",
      "susan-g-yellen",
      "the-fox-guarding-the-henhouse-how-susan-yellens-law-partner-amy-eisenberg-helped",
    ],
    violations: ["Formal complaint — professional misconduct", "Conflict of interest allegations"],
    status: "Under Investigation",
    description:
      "New York attorney Susan G. Yellen, and her partner Amy Eisenberg, are the subjects of formal complaints investigated by The Ethics Reporter regarding alleged professional misconduct and conflicts of interest.",
  },
  {
    slug: "amy-eisenberg",
    name: "Amy M. Eisenberg",
    state: "New York",
    articleSlugs: [
      "formal-complaint-susan-g-yellen-and-amy-m-eisenberg-new-york-attorneys-accused-o",
      "the-fox-guarding-the-henhouse-how-susan-yellens-law-partner-amy-eisenberg-helped",
      "inside-the-inner-circle-how-judge-david-fried-and-justice-sherri-eisenpress-buil",
    ],
    violations: ["Formal complaint — professional misconduct", "Conflict of interest allegations"],
    status: "Under Investigation",
    description:
      "New York attorney Amy M. Eisenberg, partner of Susan G. Yellen, is subject to formal complaints for alleged misconduct and conflict of interest as documented by The Ethics Reporter.",
  },
  {
    slug: "ronald-durbin",
    name: "Ronald Edward Durbin II",
    state: "Oklahoma",
    articleSlugs: ["ronald-edward-durbin-ii-oklahoma-attorney-disbarred-after-115-rule-violations-fi"],
    violations: ["115 rule violations", "Multiple counts of professional misconduct"],
    status: "Disbarred",
    description:
      "Oklahoma attorney Ronald Edward Durbin II was disbarred after being found to have committed 115 separate rule violations.",
  },
  {
    slug: "stacey-wilson",
    name: "Stacey Dawn Wilson",
    state: "Pennsylvania",
    articleSlugs: ["multiple-disbarments-for-attorney-stacey-dawn-wilson"],
    violations: ["Multiple disbarments across jurisdictions"],
    status: "Disbarred",
    description:
      "Attorney Stacey Dawn Wilson has been disbarred in multiple jurisdictions for serious professional misconduct.",
  },
  {
    slug: "james-bailey",
    name: "James Charles Bailey",
    state: "Unknown",
    articleSlugs: ["the-downfall-of-attorney-james-charles-bailey"],
    violations: ["Professional misconduct — disbarment"],
    status: "Disbarred",
    description:
      "Attorney James Charles Bailey is the subject of an Ethics Reporter investigation into his professional downfall and eventual disbarment.",
  },
  {
    slug: "paul-rubin",
    name: "Paul C. Rubin",
    state: "Unknown",
    articleSlugs: ["the-career-conclusion-of-attorney-paul-c-rubin"],
    violations: ["Professional misconduct"],
    status: "Disbarred",
    description:
      "Attorney Paul C. Rubin's legal career came to a conclusion through professional misconduct proceedings documented by The Ethics Reporter.",
  },
  {
    slug: "albulena-uka",
    name: "Albulena Uka",
    state: "New York",
    admittedYear: 2026,
    articleSlugs: ["albulena-uka-brooklyn-law-attorney-billing-fraud-overbilling-ethics"],
    violations: [
      "Rule 1.5(a) - Excessive Fees",
      "Rule 8.4(c) - Dishonesty/Misrepresentation",
      "Rule 8.4(h) - Conduct Reflecting on Fitness",
    ],
    status: "Active",
    description:
      "Albulena Uka is a newly admitted New York attorney and doctoral candidate at Brooklyn Law School who is the subject of a tip received by The Ethics Reporter alleging a pattern of billing fraud, including overbilling on template motions and misrepresenting hours worked to her supervising firm.",
  },
];

export function getAttorneyBySlug(slug: string): AttorneyProfile | undefined {
  return attorneysData.find((a) => a.slug === slug);
}

export function getAllAttorneySlugs(): string[] {
  return attorneysData.map((a) => a.slug);
}
