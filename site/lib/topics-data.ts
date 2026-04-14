export interface TopicData {
  slug: string;
  title: string;
  description: string;
  intro: string;
  keywords: string[];
}

export const topicsData: TopicData[] = [
  {
    slug: "ai-in-legal-practice",
    title: "AI in Legal Practice: Sanctions, Risks & the Future of Law",
    description: "How courts are sanctioning attorneys for AI hallucinations, the growing crackdown on artificial intelligence in legal filings, and what it means for the future of the legal profession.",
    intro: "Artificial intelligence has arrived in the courtroom — and the legal profession is in crisis over how to respond. Courts across the country are imposing heavy sanctions on attorneys who submit AI-generated legal work containing fabricated citations, nonexistent cases, and hallucinated statutes. The Ethics Reporter covers every major AI sanctions case, exploring not just the individual attorney misconduct but the broader institutional question: is the legal profession using AI sanctions as a tool to protect its gatekeeping power against technological disruption? Our coverage examines the real costs of AI hallucinations in legal filings, the growing patchwork of court AI disclosure rules, and the fundamental question of whether the legal profession will adapt to artificial intelligence or try to regulate it out of existence.",
    keywords: ["AI in legal practice", "attorney AI sanctions", "AI hallucinations law", "ChatGPT legal citations", "lawyer artificial intelligence"],
  },
  {
    slug: "client-fund-misappropriation",
    title: "Client Fund Misappropriation: When Lawyers Steal",
    description: "Coverage of attorney theft, IOLTA trust account violations, and the cases where lawyers steal from the very clients who trusted them.",
    intro: "Among the most serious violations of the attorney-client relationship is the theft of client funds. Attorneys hold client money in trust — in IOLTA (Interest on Lawyers Trust Accounts) accounts specifically designed to separate client funds from attorney funds. When lawyers dip into those accounts for personal use, the consequences range from disbarment to criminal prosecution. The Ethics Reporter investigates client fund misappropriation cases across the country, tracking the attorneys who steal from vulnerable clients, the disciplinary systems that are supposed to catch them, and the Client Protection Funds that attempt to make victims whole. Our coverage asks why so many attorneys steal client money, why the discipline system often catches them too late, and what victims can do when their lawyer has stolen from them.",
    keywords: ["lawyer stole money", "attorney client fund theft", "IOLTA misappropriation", "attorney disbarred stealing", "client fund misappropriation"],
  },
  {
    slug: "judicial-misconduct",
    title: "Judicial Misconduct: When Judges Break the Rules",
    description: "Investigations into judicial misconduct, bias, corruption, and the largely secretive system that is supposed to hold judges accountable.",
    intro: "Judges occupy a position of extraordinary power in American society. They decide cases involving life, liberty, and property with enormous discretion and minimal oversight. When judges abuse that power — through bias, corruption, improper conduct, or simple incompetence — the consequences for the litigants before them can be catastrophic. The Ethics Reporter investigates judicial misconduct cases across the country, examining the conduct itself, the often-inadequate disciplinary response, and the systemic failures that allow bad judges to remain on the bench for years. Our coverage is informed by the Founders' vision of an accountable judiciary — a vision that has been steadily undermined by a self-policing system that prioritizes judicial independence over public accountability.",
    keywords: ["judicial misconduct", "judge discipline", "judge removed from bench", "corrupt judge", "judicial conduct commission"],
  },
  {
    slug: "disbarment",
    title: "Disbarment: The Ultimate Attorney Discipline",
    description: "Coverage of attorney disbarment cases across the country — the most serious sanction the legal profession can impose on its own members.",
    intro: "Disbarment is the permanent revocation of an attorney's license to practice law. It is the most serious sanction the legal profession can impose, reserved for the most egregious misconduct: stealing from clients, committing fraud, engaging in criminal conduct, or demonstrating repeated and willful disregard for professional obligations. The Ethics Reporter tracks disbarment cases across all 50 states, examining the conduct that led to disbarment, the disciplinary proceedings that produced it, and what disbarment actually means for the attorneys and the clients they harmed. We also examine the cases where disbarment should have happened sooner — where gradual escalation through lesser sanctions allowed attorneys to continue harming clients long after the writing was on the wall.",
    keywords: ["attorney disbarred", "disbarment cases", "lawyer disbarred", "attorney license revoked", "permanent disbarment"],
  },
  {
    slug: "attorney-suspension",
    title: "Attorney Suspension: Cases & Consequences",
    description: "Coverage of attorney suspension cases — the temporary removal of law licenses for professional misconduct across the United States.",
    intro: "Attorney suspension — the temporary removal of a lawyer's license to practice law — is the middle ground of attorney discipline, more serious than a public censure but less permanent than disbarment. Suspension periods range from 30 days to several years, and they carry serious consequences: the attorney cannot represent clients, must notify existing clients, and must apply for reinstatement after the suspension period ends. The Ethics Reporter covers suspension cases across the country, examining the conduct that prompted discipline, the proportionality of the sanction, and what happens to the clients whose lawyers are suspended mid-representation. We also track patterns in suspension cases — which types of misconduct most commonly lead to suspension, and whether the discipline system uses suspension appropriately or too sparingly.",
    keywords: ["attorney suspended", "lawyer suspension", "law license suspended", "attorney discipline", "suspended from practice"],
  },
  {
    slug: "law-school-debt-crisis",
    title: "The Law School Debt Crisis: A Profession in Decline",
    description: "Investigating the law school industrial complex — the institutions charging $300,000 for degrees that lead to unemployment, debt, and a profession being automated out of existence.",
    intro: "Law school has become one of the most expensive professional degrees in the United States, with total costs at many institutions exceeding $300,000. Yet the legal job market has struggled to absorb the number of graduates law schools produce, bar passage rates are declining, and artificial intelligence is beginning to automate the work that entry-level lawyers have historically performed. The Ethics Reporter investigates the law school debt crisis through the lens of institutional accountability: who is responsible for selling students on a credential that may not deliver the promised career? We examine law school enrollment numbers, employment statistics, bar passage rates, and the uncomfortable reality that AI is making significant portions of legal work — research, document review, contract drafting — increasingly automated. The question we ask is one that law schools are not: are these institutions selling a credential they know to be declining in value?",
    keywords: ["law school debt", "law school cost", "law school employment", "JD degree worth it", "law school AI disruption"],
  },
  {
    slug: "legal-ethics-reform",
    title: "Legal Ethics Reform: Fixing a Broken System",
    description: "The case for reforming attorney discipline, judicial accountability, and the self-policing systems that protect the legal profession at the expense of the public.",
    intro: "The American legal profession regulates itself — a privilege granted on the assumption that the profession will use regulatory power to protect the public rather than its own interests. That assumption is increasingly difficult to defend. State bar discipline systems dismiss the overwhelming majority of complaints without investigation. Judicial conduct commissions conduct proceedings in secret and rarely impose meaningful sanctions. The legal profession's response to AI is to impose disclosure requirements on attorneys while exempting judges from the same requirements. The Ethics Reporter covers the growing movement for legal ethics reform — the academics, advocates, and policymakers pushing for structural changes to attorney discipline, judicial accountability, and access to justice. We examine reform proposals through the lens of the public interest, asking whether the changes being proposed would actually make the legal system more accountable, more accessible, and more just.",
    keywords: ["legal ethics reform", "attorney discipline reform", "judicial accountability", "bar complaint reform", "legal profession regulation"],
  },
  {
    slug: "founding-fathers-judiciary",
    title: "The Founders vs. Today's Judiciary: A Constitutional Crisis",
    description: "How the American judiciary has drifted from the vision of the Founding Fathers — and what the Founders' own words tell us about the crisis in our legal system today.",
    intro: "The Founding Fathers were acutely aware of the dangers of an unaccountable judiciary. Jefferson warned that federal judges would work 'like gravity by night and by day' to expand their power. Madison insisted that no branch of government could be trusted to police itself. Hamilton promised that the judiciary would be staffed by men of 'integrity and moderation' — a promise that the intervening centuries have put to the test. The Ethics Reporter's Take America Back series examines the American legal system through the lens of the Founders' vision — asking not just what is happening in our courts today, but whether it comports with the constitutional design the Founders intended. We draw on primary sources: the Federalist Papers, Jefferson's letters, Madison's notes from the Constitutional Convention, and the text of the Constitution itself. The case we make is not partisan: the Founders' concerns about judicial overreach, professional self-dealing, and the corruption of institutions apply equally regardless of political affiliation.",
    keywords: ["founding fathers judiciary", "constitutional crisis courts", "judicial accountability founding", "Hamilton judiciary", "Jefferson courts"],
  },
  {
    slug: "attorney-discipline-explained",
    title: "How Attorney Discipline Works: A Complete Guide",
    description: "A comprehensive guide to the attorney discipline system — how complaints are filed, investigated, and resolved, and what the process actually looks like for complainants.",
    intro: "Most people who have been harmed by an attorney's misconduct do not know how the discipline system works, what to expect from a bar complaint, or whether the process will result in any meaningful accountability. The Ethics Reporter provides comprehensive coverage of the attorney discipline system — how it is structured, how it actually functions in practice, and what complainants can realistically expect. We cover the intake process, the investigation stage, the hearing process, and the range of sanctions available. We also cover the system's significant limitations: the high dismissal rate, the slow pace of proceedings, the confidentiality that shields much of the process from public view, and the ways that well-resourced attorneys can use procedural mechanisms to delay or avoid accountability. Our goal is to inform complainants about what they are getting into — and to hold the system accountable for the gap between its stated purpose and its actual performance.",
    keywords: ["how attorney discipline works", "bar complaint process", "attorney discipline system", "file complaint against lawyer", "attorney misconduct reporting"],
  },
  {
    slug: "ai-sanctions-attorneys",
    title: "AI Sanctions Against Attorneys: The Growing Crackdown",
    description: "Tracking every major court sanction imposed on attorneys for using AI to generate fake legal citations — and asking whether the crackdown is really about accuracy or professional gatekeeping.",
    intro: "Courts across the United States are imposing sanctions on attorneys who submit legal filings containing citations to cases that do not exist — fabrications generated by AI language models like ChatGPT and Claude. The sanctions have been severe: fines reaching $10,000 or more, orders to show cause, dismissal of cases, referrals to state bar disciplinary authorities, and in some cases suspension proceedings. The Ethics Reporter tracks every major AI sanctions case, from the first high-profile incident in the Mata v. Avianca case to the growing wave of sanctions in 2025 and 2026. We examine the cases in detail — who the attorneys were, what AI tools they used, what fabrications appeared in their filings, and what sanctions resulted. But we also ask the harder question: are these sanctions proportionate, or are courts using AI misconduct as an opportunity to make an example of attorneys in ways that serve institutional interests rather than justice?",
    keywords: ["AI sanctions lawyer", "ChatGPT fake citations attorney", "AI hallucination legal filing", "attorney sanctioned AI", "fake case citations lawyer"],
  },
];
