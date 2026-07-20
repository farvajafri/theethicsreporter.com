export interface RuleData {
  slug: string;
  shortName: string;
  fullName: string;
  jurisdiction: string;
  text: string;
  description: string;
  consequences: string;
  relatedArticleSlugs: string[];
  keywords: string[];
}

export const rulesData: RuleData[] = [
  {
    slug: "rule-1-1-competence",
    shortName: "Rule 1.1",
    fullName: "Competence",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall provide competent representation to a client. Competent representation requires the legal knowledge, skill, thoroughness and preparation reasonably necessary for the representation.",
    description: "Rule 1.1 violations occur when attorneys take on matters they lack the knowledge, skill, or preparation to handle. Common violations include: newly admitted attorneys handling complex immigration, litigation, or specialized matters without supervision; attorneys who expand into new practice areas without adequate learning; practitioners who fail to research applicable law before filing; and lawyers who make fundamental errors in the governing legal framework for their client's case. The rule is not aspirational — it imposes a binding minimum standard of competence for every representation.",
    consequences: "Rule 1.1 violations can result in sanctions ranging from private admonition to disbarment, depending on severity and harm to clients. When competence violations cause actual client harm — lost cases, incorrect legal advice, missed deadlines — both disciplinary proceedings and malpractice liability may result. Particularly egregious incompetence involving complex matters affecting liberty (criminal cases, immigration) or major financial stakes typically results in more serious sanctions.",
    relatedArticleSlugs: [
      "ernestas-pravilionis-new-york-attorney-ethics-virtual-office-competence-ai-images",
    ],
    keywords: ["Rule 1.1 competence", "attorney competence rule", "lawyer competence ethics", "Rule 1.1 violation", "attorney incompetence discipline"],
  },
  {
    slug: "rule-1-3-diligence",
    shortName: "Rule 1.3",
    fullName: "Diligence",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall act with reasonable diligence and promptness in representing a client.",
    description: "Rule 1.3 violations occur when attorneys neglect client matters, fail to pursue cases with reasonable promptness, or allow matters to stagnate without adequate reason. Common violations include: attorneys who accept cases and then fail to take any action for months or years; lawyers who miss court deadlines due to failure to calendar or monitor; practitioners who fail to follow up on submitted applications or filings; and attorneys who allow statutes of limitations to expire on viable claims. Diligence violations frequently accompany communication failures under Rule 1.4 — attorneys who fail to act often also fail to tell clients what is happening.",
    consequences: "Rule 1.3 violations typically result in sanctions commensurate with the harm caused. Missed deadlines that destroy client claims often result in serious discipline. Prolonged neglect across multiple client matters — the pattern of taking fees and doing nothing — typically results in suspension or disbarment. Rule 1.3 violations are among the most common bases for both bar complaints and malpractice claims.",
    relatedArticleSlugs: [],
    keywords: ["Rule 1.3 diligence", "attorney diligence violations", "lawyer neglect client matter", "attorney negligence ethics", "Rule 1.3 violation"],
  },
  {
    slug: "rule-1-4-communication",
    shortName: "Rule 1.4",
    fullName: "Communication",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall: (a) promptly inform the client of any decision or circumstance with respect to which the client's informed consent is required; (b) reasonably consult with the client about the means by which the client's objectives are to be accomplished; (c) keep the client reasonably informed about the status of the matter; (d) promptly comply with a client's reasonable requests for information; and (e) consult with the client about any relevant limitation on the lawyer's conduct.",
    description: "Rule 1.4 violations are among the most commonly reported in every state bar's annual discipline statistics. Attorneys who do not return phone calls, fail to update clients on case status, neglect to transmit settlement offers, or simply go silent on active matters violate Rule 1.4. The rule applies to all communications, not just those the attorney considers important — clients have the right to know what is happening in their cases. Rule 1.4 violations frequently accompany other misconduct: attorneys who are neglecting matters (Rule 1.3) often also stop communicating, and attorneys who have mishandled client funds (Rule 1.15) may go silent to avoid discovery.",
    consequences: "Rule 1.4 violations alone typically result in lighter sanctions — private admonition or public censure — when no other misconduct is present. However, communication failures that compound other violations, or that leave clients unable to protect their own interests, can contribute to more serious disciplinary outcomes. Communication failures in high-stakes matters (pending criminal trials, immigration hearings, custody proceedings) are treated more seriously.",
    relatedArticleSlugs: [],
    keywords: ["Rule 1.4 communication", "attorney communication rule", "lawyer won't return calls ethics", "attorney communication violation", "Rule 1.4 attorney discipline"],
  },
  {
    slug: "rule-1-15-safekeeping",
    shortName: "Rule 1.15",
    fullName: "Safekeeping Property (Client Funds)",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall hold property of clients or third persons that is in the lawyer's possession in connection with a representation separate from the lawyer's own property. Funds shall be kept in a separate account.",
    description: "Rule 1.15 violations — mishandling client funds — are among the most serious ethics violations in the profession. The rule requires attorneys to maintain client funds in separate IOLTA (Interest on Lawyers Trust Accounts) accounts, to keep accurate records, never to commingle client and personal funds, and to promptly deliver client funds when due. Violations range from technical commingling (keeping client and personal funds in the same account without theft) to outright theft of client funds for personal use. Even technical violations are treated seriously because the rule is designed to protect client funds from any risk of attorney misconduct.",
    consequences: "Rule 1.15 violations, particularly those involving actual misappropriation of client funds, are among the leading causes of disbarment. Even technical commingling without theft typically results in public discipline. Misappropriation — using client funds for personal purposes — almost invariably results in suspension or disbarment and may also result in criminal prosecution. Many states maintain Client Protection Funds to reimburse victims of attorney theft.",
    relatedArticleSlugs: [
      "jianming-shen-new-york-immigration-attorney-publicly-censured-for-commingling-ne",
    ],
    keywords: ["Rule 1.15 safekeeping", "attorney client funds rule", "IOLTA trust account violation", "attorney steal client funds", "client fund misappropriation rule"],
  },
  {
    slug: "rule-7-1-advertising",
    shortName: "Rule 7.1",
    fullName: "Communications Concerning a Lawyer's Services",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall not make or sponsor a false or misleading communication about the lawyer or the lawyer's services. A communication is false or misleading if it contains a material misrepresentation of fact or law, or omits a fact necessary to make the statement considered as a whole not materially misleading.",
    description: "Rule 7.1 governs attorney advertising and all communications about the attorney's services. Violations include: using AI-generated photographs to misrepresent the attorney's appearance; claiming experience, certifications, or case results that are false or misleading; using testimonials without required disclaimers; advertising specialties in states where such claims require certification; and creating the overall false impression of a more established or successful practice than actually exists. In the digital era, Rule 7.1 violations have proliferated through misleading websites, fake reviews on legal directories, and manufactured 'best lawyer' designations. The Ethics Reporter's investigation of Ernestas Pravilionis identified AI-generated attorney photos as a potential Rule 7.1 violation.",
    consequences: "Rule 7.1 violations typically result in discipline commensurate with the egregiousness of the misrepresentation and the harm caused. False advertising that deceives vulnerable clients into retaining an unqualified attorney is treated more seriously. States have taken enforcement action against misleading websites, false credential claims, and deceptive advertising campaigns. Rule 7.1 violations are increasingly common as attorney digital marketing expands into practices that blur the line between promotion and misrepresentation.",
    relatedArticleSlugs: [
      "ernestas-pravilionis-new-york-attorney-ethics-virtual-office-competence-ai-images",
    ],
    keywords: ["Rule 7.1 attorney advertising", "attorney advertising ethics", "false attorney advertising rule", "lawyer marketing ethics rule", "Rule 7.1 violation"],
  },
  {
    slug: "rule-8-4-misconduct",
    shortName: "Rule 8.4",
    fullName: "Misconduct",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "It is professional misconduct for a lawyer to: (a) violate or attempt to violate the Rules of Professional Conduct; (b) engage in illegal conduct that adversely reflects on the lawyer's honesty, trustworthiness or fitness; (c) engage in conduct involving dishonesty, fraud, deceit or misrepresentation; (d) engage in conduct that is prejudicial to the administration of justice.",
    description: "Rule 8.4 is the profession's general misconduct rule — the catchall that covers conduct not addressed by more specific rules. Subsection (b) reaches criminal conduct that reflects on fitness to practice law, even when the conduct is unrelated to law practice. Subsection (c) covers dishonesty and fraud in any context. Subsection (d) applies to conduct that prejudices the administration of justice broadly. Rule 8.4 is frequently charged alongside other rule violations when the underlying conduct involves dishonesty, criminality, or fundamental untrustworthiness. It is also the rule used to discipline attorneys for misconduct in private life that calls their fitness to practice into question.",
    consequences: "Rule 8.4 violations span the full range of sanctions. Criminal convictions that trigger Rule 8.4(b) — particularly for crimes of dishonesty, violence, or moral turpitude — frequently result in immediate suspension or disbarment. Fraud and dishonesty violations under Rule 8.4(c) are treated seriously because they undermine the foundation of trust on which the attorney-client relationship depends. Rule 8.4 charges accompanying other violations contribute to more serious cumulative sanctions.",
    relatedArticleSlugs: [],
    keywords: ["Rule 8.4 misconduct", "attorney general misconduct rule", "attorney dishonesty rule", "Rule 8.4 violation", "attorney criminal conduct discipline"],
  },
  {
    slug: "ny-judiciary-law-470",
    shortName: "Judiciary Law §470",
    fullName: "New York Judiciary Law §470 — Physical Office Requirement",
    jurisdiction: "New York State",
    text: "A person, regularly admitted to practice as an attorney and counsellor, in the courts of record of this state, whose office for the transaction of law business is within the state, may practice as such attorney or counsellor, although he resides in an adjoining state.",
    description: "New York Judiciary Law §470 has been interpreted by the New York Court of Appeals to require that any attorney admitted in New York maintain a genuine, physical office for the transaction of law business in the state — not a virtual mailbox, coworking membership, or shared desk arrangement. The statute was designed to ensure that out-of-state attorneys who practice in New York have a real physical presence accessible to clients and the courts. Violations of §470 may constitute the unauthorized practice of law in New York. The Ethics Reporter's investigation of Ernestas Pravilionis identified three listed New York office addresses that appear to be virtual services, not physical law offices, potentially violating §470.",
    consequences: "Violation of Judiciary Law §470 may constitute the unauthorized practice of law in New York, which is a crime under Judiciary Law §484. Courts have dismissed actions filed by attorneys found to be in violation of §470. Attorneys in violation may also face disciplinary proceedings for conduct prejudicial to the administration of justice. The practical consequences include inability to file papers in New York courts and exposure to malpractice liability for all representations conducted in violation of the statute.",
    relatedArticleSlugs: [
      "ernestas-pravilionis-new-york-attorney-ethics-virtual-office-competence-ai-images",
    ],
    keywords: ["Judiciary Law 470 New York", "NY attorney physical office requirement", "Judiciary Law 470 violation", "virtual office attorney New York law", "New York attorney office requirement"],
  },
  {
    slug: "rule-1-16-declining",
    shortName: "Rule 1.16",
    fullName: "Declining or Terminating Representation",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall not represent a client, or, where representation has commenced, shall withdraw from the representation of a client, if: (1) the representation will result in violation of the Rules of Professional Conduct or other law; (2) the lawyer's physical or mental condition materially impairs the lawyer's ability to represent the client; or (3) the lawyer is discharged.",
    description: "Rule 1.16 governs how attorneys must withdraw from representation when they cannot continue ethically or effectively. Permissive withdrawal is allowed in circumstances including client misconduct, failure to pay fees, and irreconcilable conflict. Mandatory withdrawal is required when continuing would violate the rules. The rule imposes obligations on withdrawing attorneys: they must give reasonable notice, allow time for replacement counsel, return client files promptly, return unearned fees, and take all steps reasonably practicable to protect the client's interests. Violations occur when attorneys abandon clients without notice, fail to return files, refuse to refund unearned fees, or withdraw in circumstances that harm the client.",
    consequences: "Rule 1.16 violations resulting in client harm — abandoned clients who lose rights due to an attorney's improper withdrawal — can result in serious discipline. Failure to return client files and unearned fees are among the most clear-cut violations and result in consistent disciplinary action. Attorneys who withdraw from representations at critical junctures without adequate notice face discipline and potential malpractice liability.",
    relatedArticleSlugs: [],
    keywords: ["Rule 1.16 attorney withdrawal", "attorney abandon client rule", "lawyer quit case ethics", "attorney withdrawal rules", "client abandonment attorney ethics"],
  },
  {
    slug: "rule-3-3-candor",
    shortName: "Rule 3.3",
    fullName: "Candor Toward the Tribunal",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer shall not knowingly: (1) make a false statement of fact or law to a tribunal or fail to correct a false statement of material fact or law previously made to the tribunal by the lawyer; (2) fail to disclose to the tribunal legal authority in the controlling jurisdiction known to the lawyer to be directly adverse to the position of the client; or (3) offer or use evidence that the lawyer knows to be false.",
    description: "Rule 3.3 imposes a duty of candor on attorneys toward courts, arbitrators, and other tribunals. Attorneys cannot make false statements of fact or law to a tribunal, cannot cite cases that do not exist (a now-frequent AI-related violation), must disclose directly adverse controlling authority, and cannot offer evidence they know to be false. The rise of AI-generated legal research has created a new category of Rule 3.3 violations: attorneys citing cases hallucinated by AI tools that do not exist in any legal database. Sanctions for AI-related candor violations have been severe and widely publicized.",
    consequences: "Rule 3.3 violations are treated with particular seriousness because they strike at the integrity of the judicial system itself. Courts have imposed fines, dismissals, referrals to disciplinary authorities, and public sanctions. The AI-related candor violations have resulted in fines ranging from $1,000 to over $10,000, along with referrals to state bars. Pre-AI candor violations involving deliberate misrepresentation to courts have resulted in suspensions and disbarment.",
    relatedArticleSlugs: [
      "ai-hallucination-sanctions-legal-protection-racket",
      "ai-sanctions-attorneys",
    ],
    keywords: ["Rule 3.3 candor tribunal", "attorney candor rule court", "lawyer lie to court ethics", "attorney AI fake citations Rule 3.3", "candor tribunal violation attorney"],
  },
  {
    slug: "rule-8-3-reporting",
    shortName: "Rule 8.3",
    fullName: "Reporting Professional Misconduct",
    jurisdiction: "New York Rules of Professional Conduct / ABA Model Rules",
    text: "A lawyer who knows that another lawyer has committed a violation of the Rules of Professional Conduct that raises a substantial question as to that lawyer's honesty, trustworthiness or fitness as a lawyer in other respects, shall report such knowledge to the appropriate professional authority.",
    description: "Rule 8.3 — sometimes called the 'snitch rule' — imposes a duty on attorneys to report serious misconduct by other attorneys to the appropriate disciplinary authority. The duty applies when the attorney has actual knowledge (not mere suspicion) of a violation that raises substantial questions about the other lawyer's honesty, trustworthiness, or fitness. Rule 8.3 is frequently honored in the breach: lawyers are reluctant to report colleagues, and the rule's enforcement is limited by its knowledge threshold and the professional culture that discourages reporting. The duty does not apply to information protected by the attorney-client privilege.",
    consequences: "Failure to report under Rule 8.3 when the duty applies can itself result in discipline. However, Rule 8.3 is among the least-enforced rules in the profession, in part because it requires actual knowledge of the reportable violation and in part because of the practical difficulties in proving that an attorney knew of misconduct and failed to report. Rule 8.3 prosecutions are rare but do occur in cases where the failure to report was egregious.",
    relatedArticleSlugs: [],
    keywords: ["Rule 8.3 reporting misconduct", "attorney duty report misconduct", "lawyer report other lawyer ethics", "Rule 8.3 violation", "attorney whistleblower rule"],
  },
];

export function getRuleBySlug(slug: string): RuleData | undefined {
  return rulesData.find((r) => r.slug === slug);
}

export function getAllRuleSlugs(): string[] {
  return rulesData.map((r) => r.slug);
}
