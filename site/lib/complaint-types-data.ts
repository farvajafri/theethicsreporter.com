export interface ComplaintTypeData {
  slug: string;
  name: string;
  title: string; // H1-style human readable title
  category: "attorney" | "medical" | "nursing" | "cpa" | "multi" | "procedure";
  summary: string; // 1-2 sentence intro
  body: string; // 400-600 words of substantive content
  defenses: string[];
  boardFocus: string; // what the board looks for
  responseKey: string; // critical thing to do when responding
}

export const complaintTypesData: ComplaintTypeData[] = [
  {
    slug: "trust-account-violations",
    name: "Trust Account Violations",
    title: "Trust Account Violations",
    category: "attorney",
    summary:
      "Trust account violations — including commingling of client funds and misappropriation — are among the most serious ethics charges an attorney can face. State bar regulators treat them as presumptively disbarrable in many jurisdictions.",
    body: `When a client or former client alleges that an attorney mishandled their funds, state bar investigators move quickly. Trust account (IOLTA) violations encompass a wide range of conduct: commingling personal and client funds in the same account, failing to maintain required records, disbursing funds before they have cleared, unauthorized withdrawals, and outright theft. Even inadvertent accounting errors — a missed ledger entry, a software glitch, an overdraft — can trigger a formal investigation.

Most states require attorneys to maintain detailed trust ledgers, a running account ledger for each client matter, a general ledger, and reconciliation records. Bar investigators will subpoena bank records, compare deposits and withdrawals to your ledger entries, and look for any moment where you used client funds before they were earned or authorized.

The distinction between negligent accounting and intentional misappropriation is legally significant but factually subtle. Investigators rarely take your word for it. The burden is on the attorney to produce clean, contemporaneous records that account for every dollar in and out of the trust account.

**What the Board Looks For**

Investigators examine: Whether your trust account was properly labeled as an IOLTA or escrow account; whether you maintained a client ledger with beginning balance, receipts, disbursements, and running balance for each client; whether monthly bank reconciliations were performed and preserved; whether funds were disbursed only when earned or expressly authorized; and whether any overdraft, NSF event, or bank notification occurred.

**Defenses**

Not every accounting error is a disciplinary violation. Isolated errors without client harm, errors discovered and self-reported before a complaint was filed, systemic software or bank errors outside your control, and prompt remediation can all influence the outcome. Many bar rules distinguish between misappropriation (intentional conversion) and negligent mishandling — and the latter, while still serious, typically carries less severe sanctions.

**How to Respond**

Do not attempt to reconstruct your trust records after the fact without counsel. Any reconstruction must be clearly labeled as such, and any discrepancy between reconstructed records and bank statements will be treated as evidence of concealment. Your response must be precise, must account for every allegation, and must attach supporting documentation. We help attorneys organize their records, identify the true source of any discrepancy, and frame the response to distinguish negligence from the intentional misconduct the bar is likely assuming.`,
    defenses: [
      "Isolated bookkeeping errors without client harm",
      "Software or bank errors beyond attorney control",
      "Self-correction and remediation before complaint was filed",
      "Records that show proper authorization for each disbursement",
      "No client ultimately lost money",
    ],
    boardFocus:
      "Whether the attorney maintained required ledgers, reconciliations, and proper account labeling — and whether any shortage was intentional or negligent.",
    responseKey:
      "Produce clean, complete trust records and distinguish bookkeeping errors from intentional conversion before the bar characterizes the facts.",
  },
  {
    slug: "client-abandonment",
    name: "Client Abandonment",
    title: "Client Abandonment",
    category: "attorney",
    summary:
      "Abandoning a client — by ceasing representation without notice, proper withdrawal, or protection of the client's interests — is a serious ethics violation that can result in suspension or disbarment.",
    body: `Client abandonment complaints arise when an attorney stops working on a matter without properly withdrawing, fails to communicate with the client for extended periods, misses critical deadlines, or disappears entirely. These complaints are among the most common received by state bar disciplinary authorities and are often accompanied by allegations of failure to communicate and failure to return client files.

Abandonment does not require that the attorney formally quit the representation. A prolonged failure to respond to client calls or emails, failure to appear at scheduled hearings, or failure to file documents by known deadlines can all constitute constructive abandonment — the functional equivalent of walking away from the matter.

**What the Board Looks For**

Bar investigators focus on: the timeline of communication (or lack thereof) between attorney and client; whether the client's matter had pending deadlines when communication broke down; whether the attorney provided any notice of withdrawal; whether a Motion to Withdraw was filed with the court; whether the client's original documents, funds, and file were returned; and whether the client suffered actual harm — a missed statute of limitations, a default judgment, a case dismissed — as a result.

**Defenses**

Abandonment allegations often have context: a client who became hostile or uncooperative, a client who failed to pay fees and was in arrears, a health crisis that temporarily impaired the attorney's ability to practice, or a genuine dispute about the scope of the representation. None of these fully excuse abandonment — but they are relevant to the investigation and to sanction mitigation. Evidence that the attorney took steps to protect the client's interests before withdrawing, including giving adequate notice and returning the file promptly, can significantly reduce exposure.

**How to Respond**

Your sworn response to an abandonment complaint must address every allegation of missed communication or missed deadline, explain the reason for any gap in work or communication, document any steps taken to protect the client's interests, and clarify the terms of the original engagement. We help attorneys reconstruct the timeline, collect supporting evidence, and present the response in a way that is candid without being needlessly self-incriminating.`,
    defenses: [
      "Client failed to cooperate or pay fees, triggering permissive withdrawal",
      "Proper notice of withdrawal was given",
      "Client's file and funds were returned promptly",
      "Attorney health or family emergency caused temporary gap",
      "No harm to client occurred as a result of the gap",
    ],
    boardFocus:
      "Whether the attorney gave adequate notice, protected the client's interests, and returned the file — and whether any harm resulted from the cessation of representation.",
    responseKey:
      "Document every step taken to protect the client's interests and every communication made before representation ended.",
  },
  {
    slug: "conflict-of-interest",
    name: "Conflict of Interest",
    title: "Conflict of Interest",
    category: "attorney",
    summary:
      "Conflict of interest complaints — whether involving current clients, former clients, or personal interests adverse to a client — can result in disqualification, fee forfeiture, and serious disciplinary sanctions.",
    body: `Conflict of interest is one of the most complex areas of professional responsibility, and it generates a significant volume of disciplinary complaints. Conflicts arise in three primary contexts: concurrent conflicts (representing two clients with adverse interests at the same time), successive conflicts (representing a new client against a former client in a substantially related matter), and personal conflicts (where the attorney's own financial, romantic, or other interests are adverse to the client's).

Most state rules permit waiver of many — but not all — conflicts after full disclosure and informed written consent. But the consent must be truly informed: the client must understand the nature of the conflict, what information might be shared, and what the attorney would be giving up by representing both sides.

**What the Board Looks For**

Investigators examine: whether an attorney-client relationship existed with the adverse party at the time of the conflict; whether the matters are substantially related (particularly for former-client conflicts); whether the attorney had access to confidential information that is material to the new matter; whether proper conflict screening was done (particularly in larger firms); and whether any consent obtained was truly informed and voluntarily given.

**Defenses**

Many conflict allegations stem from misunderstandings about who the client actually is in a given representation, or about the scope of a prior engagement. Demonstrating that a prior representation was limited in scope, or that no confidential information relevant to the new matter was obtained, can defeat a successive-conflict allegation. For concurrent conflicts, a valid written waiver with full disclosure can be a complete defense.

**How to Respond**

Your response to a conflict complaint must address the nature of the prior representation, what information was exchanged, and what steps — if any — were taken to screen, wall off, or seek consent. We help you analyze which model rule applies, whether the conflict was waivable, and how to document the defense.`,
    defenses: [
      "No substantially related matter — prior representation was limited in scope",
      "No material confidential information was obtained in prior representation",
      "Valid informed written consent was obtained from all affected clients",
      "Effective ethical screen was in place for firm-level conflicts",
      "No attorney-client relationship existed with the allegedly adverse party",
    ],
    boardFocus:
      "Whether the conflict was waivable, whether proper consent was obtained, and whether confidential information was used adversely.",
    responseKey:
      "Precisely identify the scope of every prior representation and what confidential information was actually exchanged.",
  },
  {
    slug: "failure-to-communicate",
    name: "Failure to Communicate",
    title: "Failure to Communicate",
    category: "attorney",
    summary:
      "Failure to keep a client reasonably informed — by not returning calls, not providing status updates, or not explaining settlement offers and key decisions — is one of the most frequently alleged ethics violations nationwide.",
    body: `Rule 1.4 of the Model Rules of Professional Conduct (and its state equivalents) requires attorneys to keep clients reasonably informed about the status of their matters and to promptly respond to reasonable requests for information. Failure-to-communicate complaints are the single most common type of complaint received by state bar disciplinary authorities — and they are often filed alongside abandonment, neglect, and fee-dispute claims.

These complaints arise when clients feel ignored: calls not returned, emails not answered, months passing with no update, settlement offers never relayed, or court dates not communicated. The attorney may have a perfectly reasonable explanation — a heavy caseload, a client who is difficult to reach, or a matter that simply has no new developments — but without documentation, that explanation is hard to prove.

**What the Board Looks For**

Bar investigators focus on: the frequency and nature of the client's attempts to reach the attorney; the attorney's documented responses (call logs, email records, letters); whether key events (court dates, settlement offers, important deadlines) were communicated to the client; and whether the failure to communicate caused the client any harm.

**Defenses**

A well-documented communication file is the single most important defense to a failure-to-communicate allegation. If you can show that you called back, sent status updates, and explained material decisions — even if the client disputes receiving them — the board has a credibility question to resolve rather than an unopposed narrative to accept. Contemporaneous notes, email threads, certified letters, and client portal records are all useful.

**How to Respond**

Gather every record of communication with the client before drafting your response. Your answer should walk through the timeline of the representation, identify every contact (or documented attempt at contact), and address each specific allegation in the complaint. We help attorneys reconstruct the communication record and frame their response to highlight the strongest evidence.`,
    defenses: [
      "Documented call logs and email records showing responsive communication",
      "Client was repeatedly unreachable or requested no updates",
      "All material decisions were communicated in writing",
      "No harm to client's matter resulted from any communication gap",
      "Communication gaps were caused by client's own failure to maintain contact",
    ],
    boardFocus:
      "Whether the attorney made reasonable, documented efforts to keep the client informed and to respond to client inquiries in a timely manner.",
    responseKey:
      "Produce every piece of documentation showing communication — calls, emails, letters, portal access logs — before writing a single word of your response.",
  },
  {
    slug: "fee-disputes",
    name: "Fee Disputes",
    title: "Fee Disputes",
    category: "attorney",
    summary:
      "Fee disputes — including allegations of excessive fees, improper billing, and failure to return an unearned retainer — regularly generate ethics complaints that can escalate into full disciplinary proceedings.",
    body: `Many attorney fee disputes begin as billing disagreements that could be resolved through a fee arbitration program. When clients cannot get satisfaction through normal channels, they file ethics complaints alleging that fees were excessive, that the retainer was not returned when representation ended, that the billing was padded or falsified, or that the attorney's fee agreement was improperly structured.

State ethics rules generally require that attorney fees be reasonable under the circumstances, that fee agreements be communicated to the client clearly (and in writing for most matters), and that unearned retainer funds be held in trust and returned promptly when representation ends. A fee that is technically legal under contract law may still violate professional responsibility rules if it is disproportionate to the services rendered.

**What the Board Looks For**

Investigators review: the fee agreement itself and whether it was communicated clearly; billing records showing time spent and tasks performed; whether fees charged are reasonable relative to the complexity of the matter, the result obtained, and the local market; whether any retainer funds were placed in trust and returned when earned; and whether any contingency fee arrangement complied with applicable rule requirements.

**Defenses**

A well-documented fee agreement and detailed billing records are the first line of defense. If the fee was reasonable under the applicable rule factors, that showing must be made explicitly — with reference to time records, complexity of the work, the outcome achieved, and the experience of the attorney. Fee disputes that escalate to ethics complaints often involve retainer disputes; demonstrating that funds were properly held in trust, that earned fees were properly withdrawn as services were performed, and that any balance was promptly returned is usually dispositive.

**How to Respond**

Your response should attach the fee agreement, all billing records, all trust account entries related to the client's funds, and documentation of any refund that was made. We help attorneys present their billing practices in the light most favorable to the defense while ensuring full transparency with the investigating authority.`,
    defenses: [
      "Clear written fee agreement communicated at outset of representation",
      "Detailed billing records showing time spent and tasks performed",
      "Fees are reasonable under applicable rule factors",
      "Unearned retainer was promptly returned",
      "Any refund dispute can be resolved through fee arbitration rather than discipline",
    ],
    boardFocus:
      "Whether fees were reasonable, clearly communicated, and properly handled through the trust account — and whether any unearned portion was returned.",
    responseKey:
      "Produce the fee agreement, billing records, and trust account entries before drafting your response; show every dollar was earned and properly handled.",
  },
  {
    slug: "misrepresentation",
    name: "Misrepresentation",
    title: "Misrepresentation",
    category: "attorney",
    summary:
      "Misrepresentation to a client, court, opposing party, or tribunal — including false statements of fact or law, deceptive omissions, and fraudulent conduct — is among the most serious ethics violations and can result in suspension or disbarment.",
    body: `Misrepresentation complaints cover a broad range of conduct: lying to a client about the status of a matter, misrepresenting facts to a court, making false statements in discovery responses, submitting fabricated documents, hiding a settlement offer, or making materially misleading statements to opposing counsel. Rule 8.4(c) prohibits conduct involving dishonesty, fraud, deceit, or misrepresentation in any aspect of law practice — not just in the courtroom.

Misrepresentation allegations are treated with particular seriousness by bar disciplinary authorities because they strike at the core of an attorney's integrity. Even a single instance of dishonesty — particularly if it involves a court or opposing party — can result in suspension, and repeated misrepresentations often lead to disbarment.

**What the Board Looks For**

Investigators examine: whether a false statement was made knowingly and intentionally or negligently; whether the false statement was material to the proceeding or transaction; what harm — actual or potential — resulted from the misrepresentation; and whether the attorney took any steps to correct the misrepresentation when discovered.

**Defenses**

Context matters enormously in misrepresentation cases. A statement that was technically incorrect but made in good faith based on then-available information differs from a deliberate lie. Prompt self-correction when an error is discovered can significantly mitigate the consequences. Where the alleged misrepresentation is a matter of legal interpretation rather than factual statement — counsel advocating a position the board considers incorrect — the First Amendment and zealous advocacy principles provide some protection.

**How to Respond**

Never lie to the bar in your response. If a misrepresentation occurred, the question is how to characterize it accurately — as a mistake, a misunderstanding, or an error in judgment — and what remediation was taken. We help attorneys frame the facts honestly while presenting the strongest available defenses to both the underlying conduct and the sanction.`,
    defenses: [
      "Statement was made in good faith based on then-available information",
      "Error was promptly self-corrected before any harm occurred",
      "Statement was a legal position rather than a false statement of fact",
      "Alleged misrepresentation is a matter of disputed interpretation",
      "No client or third party was harmed by the statement",
    ],
    boardFocus:
      "Whether the statement was knowingly false, whether it was material, and what harm resulted — and whether the attorney corrected it when discovered.",
    responseKey:
      "Never compound a misrepresentation allegation with a dishonest response; frame the facts accurately and focus the defense on intent, materiality, and harm.",
  },
  {
    slug: "substance-abuse",
    name: "Substance Abuse",
    title: "Substance Abuse",
    category: "multi",
    summary:
      "Substance abuse complaints against licensed professionals — including attorneys, doctors, nurses, and pharmacists — can result in emergency license suspension, mandatory treatment programs, and long-term monitoring conditions.",
    body: `Substance abuse complaints arise in a wide range of professional contexts. For attorneys, they typically involve allegations of impaired representation, dishonesty connected to addiction, or substance use that led to criminal charges. For physicians and nurses, they more often involve diversion of controlled substances from the workplace, impairment while on duty, or failed drug tests. For pharmacists, controlled substance diversion is the most common trigger.

Regulatory authorities treat substance abuse with a complex mix of enforcement and rehabilitation: most states have diversion programs or lawyer/physician assistance programs (LAP/PAP) that offer confidential treatment pathways and can, in some cases, result in formal discipline being deferred or reduced. However, the availability of these programs does not eliminate the investigation — and participation in a diversion program is not automatically confidential.

**What the Board Looks For**

For attorneys: whether the substance use affected the quality of representation provided to clients, led to neglect or abandonment, or resulted in criminal charges. For healthcare professionals: whether the licensee practiced while impaired, diverted controlled substances, falsified records to cover the diversion, or failed to cooperate with an employer's investigation or drug testing program.

**Defenses**

The defenses in substance abuse cases are rarely about denying the underlying conduct — boards and courts are generally skeptical of denial in the face of a positive drug test, documented diversion, or impairment witnessed by colleagues. The most effective defense strategy typically involves: immediate entry into a recognized treatment program; cooperation with the investigation; a credible plan for ongoing monitoring; and evidence of rehabilitation, sobriety, and fitness to return to practice. Mitigating circumstances — including the depth of recovery and the absence of patient or client harm — are highly relevant to sanction.

**How to Respond**

If you are facing a substance abuse investigation, retain counsel before making any statements to the board. Do not make admissions in your initial response that you are not prepared to see used at a formal hearing. We help professionals navigate both the investigatory process and the available diversion or treatment pathways while protecting their procedural rights.`,
    defenses: [
      "Voluntary entry into a state-approved diversion or assistance program",
      "No patient or client harm occurred as a result of any impairment",
      "Prior spotless professional record and positive colleagues' testimonials",
      "Completion of treatment program and documented sobriety",
      "Cooperation with investigation and board monitoring conditions",
    ],
    boardFocus:
      "Whether the substance use affected professional performance or patient/client safety, and whether the licensee is genuinely committed to treatment and rehabilitation.",
    responseKey:
      "Retain counsel before making any admissions; explore available diversion programs and present a credible treatment and monitoring plan.",
  },
  {
    slug: "criminal-conviction",
    name: "Criminal Conviction",
    title: "Criminal Conviction",
    category: "multi",
    summary:
      "A criminal conviction — even for an offense unrelated to professional duties — can trigger mandatory reporting obligations, automatic license suspension, or formal disciplinary proceedings before every licensing board where you hold a license.",
    body: `Most professional licensing statutes and board rules require licensees to self-report criminal convictions within a specified period — typically 30 to 90 days. Failure to self-report is itself a separate disciplinary violation that is often treated as more serious than the underlying conviction. And in most states, licensing boards also receive independent notification from courts and law enforcement, meaning the failure to self-report is likely to be discovered regardless.

Not every criminal conviction carries the same regulatory weight. Boards distinguish between crimes of moral turpitude or professional relevance — fraud, theft, drug offenses, crimes involving patients or clients — and other offenses. A DUI conviction for a pharmacist or physician triggers different concerns than a DUI conviction for a civil engineer.

**What the Board Looks For**

Boards examine: the nature of the offense and whether it is rationally connected to fitness to practice; whether the conviction resulted from the same conduct that gave rise to the professional complaint (parallel proceedings); whether the conviction was a misdemeanor or felony; whether the licensee self-reported within the required time; and what rehabilitation has occurred since the conviction.

**Defenses**

The strongest defenses in conviction-related proceedings are rehabilitation and isolation of the offense from professional fitness. A single conviction for a non-professional offense, with no victim in the professional context, followed by genuine rehabilitation, is substantially different from a pattern of fraud-related convictions. We also examine whether the conviction is final, whether an appeal is pending, and what the precise criminal record looks like — because many initial notices and investigations rely on inaccurate secondary sources.

**How to Respond**

Do not wait for the board to contact you. In most states, self-reporting a conviction promptly — and framing the self-report with context about the offense and your rehabilitation plan — is vastly better than being discovered. We help professionals navigate both the timing and content of self-reports and defend against formal proceedings that follow.`,
    defenses: [
      "Offense was not rationally connected to fitness to practice",
      "Conviction was promptly self-reported within required timeframe",
      "Genuine rehabilitation — treatment, community service, employment record",
      "Conviction was a misdemeanor with no incarceration",
      "Appeal is pending and conviction is not yet final",
    ],
    boardFocus:
      "Whether the offense relates to professional fitness, whether self-reporting was timely, and the degree of rehabilitation demonstrated.",
    responseKey:
      "Self-report promptly and proactively frame the context of the offense; do not wait to be discovered — late self-reporting is treated as a separate violation.",
  },
  {
    slug: "sexual-misconduct",
    name: "Sexual Misconduct",
    title: "Sexual Misconduct",
    category: "multi",
    summary:
      "Sexual misconduct complaints — whether involving patients, clients, students, or subordinate employees — are among the most serious allegations a licensed professional can face and are treated with particular urgency by every licensing board.",
    body: `Sexual misconduct allegations against licensed professionals cover a wide spectrum: unwanted touching, sexual harassment, non-consensual sexual contact, sexual relationships with patients or clients during the professional relationship, production or transmission of sexual images, and sexual abuse of minors. Regardless of where on that spectrum an allegation falls, licensing boards treat sexual misconduct complaints as high-priority matters that often trigger expedited investigation and interim suspension pending hearing.

For physicians, psychologists, therapists, and other healthcare providers, the fiduciary nature of the patient relationship means that sexual contact with a current patient is nearly always treated as an absolute violation — consent is not a defense because the therapeutic relationship creates an inherently coercive dynamic that the law recognizes. Attorneys face similar rules in most jurisdictions regarding sexual relationships with current clients.

**What the Board Looks For**

Investigators focus on: the nature of the professional relationship (was it active at the time?); whether the conduct occurred in a professional setting or in connection with the professional relationship; corroborating evidence (communications, witnesses, records); whether the complainant is a credible reporter; and whether this is an isolated allegation or part of a pattern.

**Defenses**

Sexual misconduct cases require immediate, aggressive attention to the facts. Many allegations arise from misunderstandings, false accusations motivated by financial disputes or personal grievances, or legitimate therapeutic touch mischaracterized. We engage investigators to gather witness statements, review communications, and examine the credibility of the allegations before any response is filed. Where allegations have criminal exposure, we coordinate the defense strategy across both the regulatory and criminal proceedings.

**How to Respond**

Do not make any statements to investigators — including seemingly innocuous factual confirmations — without counsel. The investigation will move quickly, and your words will be used. We help you understand the full scope of your exposure, identify the strongest available defenses, and decide whether and how to engage with the investigative process.`,
    defenses: [
      "No professional relationship existed at the time of the alleged conduct",
      "Allegations are false and motivated by personal or financial grievance",
      "Conduct was legitimate clinical or professional contact mischaracterized",
      "Complainant's account is inconsistent with documented facts and records",
      "Prior spotless professional record and multiple character witnesses",
    ],
    boardFocus:
      "Whether a professional relationship existed, whether the conduct occurred in that context, and whether there is corroborating evidence beyond the complainant's statement.",
    responseKey:
      "Make no statements to investigators without counsel; gather all communications and records immediately before they are altered or lost.",
  },
  {
    slug: "billing-fraud",
    name: "Billing Fraud",
    title: "Billing Fraud",
    category: "multi",
    summary:
      "Billing fraud allegations — including upcoding, billing for services not rendered, falsifying time records, and insurance fraud — can result in license revocation, federal criminal charges, and exclusion from Medicare and Medicaid.",
    body: `Billing fraud allegations arise across multiple professions: attorneys accused of padding billing records or charging for work not performed; physicians, dentists, and other healthcare providers accused of upcoding procedures, billing for services not rendered, or falsifying diagnoses to support insurance reimbursement; and CPAs accused of billing for services that were not provided. The consequences extend well beyond licensing — billing fraud in the healthcare context triggers False Claims Act liability, potential federal criminal charges, and mandatory exclusion from federal healthcare programs.

For healthcare providers, most billing fraud investigations begin with a payer audit — an insurance company, a PBM, or a government program flags an outlier billing pattern and initiates a review. The results are then reported to the state licensing board and, in serious cases, to the OIG or DOJ. The clinical records are the most critical evidence: if you billed for a service, there needs to be a contemporaneous clinical record justifying it.

**What the Board Looks For**

Investigators examine: billing records compared to clinical or service records; whether services billed were actually ordered and performed; whether documentation supports the level of service billed; whether there is a pattern of billing anomalies; and whether the licensee was personally responsible for the billing or whether billing was delegated to staff.

**Defenses**

Billing errors by staff, coding complexity, and software errors are all genuine sources of billing anomalies that are not intentional fraud. The defense must distinguish between systematic intentional fraud and isolated errors — and must produce documentation supporting the services that were actually rendered. In healthcare contexts, the defense team often includes a medical billing expert who can provide independent review of the coding and documentation.

**How to Respond**

Retain counsel before cooperating with any audit investigation. The payer's audit team is not your friend, and early voluntary production of documents can waive privilege and create evidentiary problems in any parallel criminal proceeding. We help professionals respond to audits and board investigations while protecting their rights in parallel proceedings.`,
    defenses: [
      "Billing errors were made by staff and were not intentional",
      "Coding complexity and documentation standards support the codes billed",
      "No pattern of systematic overbilling — isolated anomalies only",
      "Services were actually rendered and clinical records support the billing",
      "Billing was delegated and licensee did not personally approve the codes",
    ],
    boardFocus:
      "Whether there is a pattern of intentional overbilling or whether anomalies can be explained by documentation gaps, coding complexity, or staff error.",
    responseKey:
      "Retain counsel before responding to any payer audit; do not voluntarily produce records without understanding the scope of the investigation and parallel criminal exposure.",
  },
  {
    slug: "hipaa-violations",
    name: "HIPAA Violations",
    title: "HIPAA Violations",
    category: "medical",
    summary:
      "HIPAA violations — including unauthorized disclosure of patient health information, failure to secure electronic records, and improper access to patient files — can trigger federal investigation, civil penalties, and state licensing board proceedings.",
    body: `HIPAA (Health Insurance Portability and Accountability Act) violations by healthcare professionals can result in both federal civil penalties and state licensing board investigations. When patient health information is improperly disclosed — whether to a family member without authorization, to a payer without proper consent, or through a data breach — the licensing board may investigate alongside the OCR (Office for Civil Rights).

State medical, nursing, dental, and pharmacy boards all have their own standards for patient confidentiality that parallel or exceed HIPAA requirements. A HIPAA violation reported to OCR will often prompt OCR to refer the matter to the state licensing board, and vice versa. The investigations are coordinated in ways that can compound the exposure.

**What the Board Looks For**

Boards examine: what patient information was disclosed, to whom, and under what circumstances; whether the licensee had a valid authorization or legal basis for the disclosure; whether the breach was caused by the licensee personally or by a systems failure; whether the licensee had a current, compliant HIPAA privacy and security policy; and whether patients were harmed by the disclosure.

**Defenses**

Many HIPAA violations arise from good-faith errors — a fax sent to the wrong number, a conversation overheard by a family member, an EHR access that was technically outside a patient's care team. The difference between a violation and a sanctionable violation often turns on whether you had and followed reasonable policies and procedures, and whether you took prompt corrective action when you became aware of the breach. We help healthcare providers document their compliance program and respond to investigations in a way that emphasizes good faith and remediation.

**How to Respond**

Respond to both the OCR and the state board — they are separate proceedings with separate deadlines. Do not assume that a resolution with OCR closes the state licensing matter, or vice versa. We coordinate the response across both tracks and help you understand the scope of your exposure in each.`,
    defenses: [
      "Disclosure was inadvertent and not the result of intentional conduct",
      "A compliant HIPAA policy was in place at the time of the incident",
      "Prompt corrective action was taken upon discovery of the breach",
      "No patient was harmed by the disclosure",
      "Disclosure was technically authorized under HIPAA's treatment, payment, or operations exception",
    ],
    boardFocus:
      "Whether the licensee had adequate privacy policies, whether any disclosure was intentional or inadvertent, and what steps were taken to prevent recurrence.",
    responseKey:
      "Respond to OCR and the state board separately; do not assume one proceeding closes the other, and document your remediation steps in detail.",
  },
  {
    slug: "medical-negligence",
    name: "Medical Negligence",
    title: "Medical Negligence",
    category: "medical",
    summary:
      "Medical negligence complaints before a state medical board — whether arising from a malpractice suit, a hospital report, or a patient complaint — threaten the physician's license and must be defended separately from any parallel civil lawsuit.",
    body: `When a patient suffers a poor outcome — a surgical complication, a missed diagnosis, a medication error — the result is often both a civil malpractice suit and a state medical board complaint. These two proceedings run concurrently but with different rules of evidence, different burdens of proof, and different potential consequences. A malpractice verdict does not automatically result in discipline, but it often triggers a board investigation. And a board finding of unprofessional conduct follows the physician for life in the National Practitioner Data Bank.

State medical boards investigate allegations of medical negligence under a standard of unprofessional conduct or incompetence — not negligence in the civil tort sense. The standard is generally whether the physician's conduct fell below the minimum standard of competent professional practice. Boards rely heavily on expert review of the medical records, and the quality of your documentation is often the most important factor in the outcome.

**What the Board Looks For**

Medical board investigators examine: the clinical records — are they complete, contemporaneous, and consistent with the care described?; whether the care provided met the applicable standard of practice; whether appropriate consultation and referral was made when indicated; whether informed consent was properly obtained and documented; and whether there is a pattern of similar complaints.

**Defenses**

Medicine involves inherent uncertainty and unpredictable outcomes. Not every bad outcome is negligence, and not every negligence allegation will survive peer review. Expert testimony establishing that the treatment decision was within the range of reasonable professional judgment, that the complications were known risks of the procedure, or that the outcome was not caused by the physician's conduct can be decisive. The medical records themselves are the most important piece of evidence — and records that are complete, consistent, and well-organized significantly strengthen the defense.

**How to Respond**

Do not discuss the clinical facts with anyone — including board investigators — without retained counsel present. Your medical records will be subpoenaed. The defense of the board case must be coordinated with the malpractice defense to prevent inconsistencies in your account of events.`,
    defenses: [
      "Care provided was within the range of reasonable professional judgment",
      "Complication was a known risk of a properly performed procedure",
      "Medical records are complete, contemporaneous, and support the care provided",
      "Expert peer review supports the clinical decision-making",
      "Bad outcome was not caused by physician's conduct",
    ],
    boardFocus:
      "Whether the physician's conduct fell below the minimum standard of competent professional practice, based on expert peer review of the clinical record.",
    responseKey:
      "Do not make any statements about the clinical facts without counsel; coordinate the board defense with any parallel malpractice defense to prevent inconsistencies.",
  },
  {
    slug: "prescribing-violations",
    name: "Prescribing Violations",
    title: "Prescribing Violations",
    category: "medical",
    summary:
      "Prescribing violations — including over-prescribing controlled substances, prescribing without a valid patient relationship, and pill mill allegations — are among the most aggressively investigated complaints by state medical boards and the DEA.",
    body: `Prescribing violations are one of the most serious categories of medical board complaints, particularly for physicians, nurse practitioners, and physician assistants who prescribe Schedule II–V controlled substances. Investigations are frequently initiated by the DEA, state Prescription Monitoring Programs (PMPs), insurance auditors, and pharmacists who flag unusual patterns. When a prescribing investigation begins, the DEA and state board often coordinate their investigations simultaneously.

The core legal standard in prescribing investigations is whether the prescriptions were issued in the usual course of professional practice for a legitimate medical purpose, as required by 21 U.S.C. §829 and its state equivalents. Investigators look at the prescriber's overall patient panel, the ratio of controlled substance prescriptions to other prescriptions, patient demographics, whether thorough physical examinations and documentation exist, and whether the prescriber ignored red flags of drug-seeking behavior.

**What the Board Looks For**

Investigators examine: the prescribing patterns as reflected in PMP data; the clinical records for each patient receiving controlled substances (history, physical examination, diagnosis, treatment plan, monitoring notes); whether urine drug screening was used; whether prescription agreements were in place; and whether patients were referred to pain management or addiction specialists when appropriate.

**Defenses**

Not every prescribing anomaly is a violation. Legitimate pain medicine, palliative care, and addiction medicine require prescribing patterns that can look unusual in the aggregate but are clinically appropriate for individual patients. Defense requires clinical records that document the basis for each prescription, evidence that red flags were addressed (or did not exist), and expert testimony from a prescribing specialist who can explain the clinical rationale.

**How to Respond**

The DEA investigation and the state board investigation must be defended simultaneously. Do not make voluntary disclosures to one authority without understanding the impact on the other. We retain a prescribing practices expert early in the process to conduct an independent review of the clinical records before the board does.`,
    defenses: [
      "Prescriptions were issued in the usual course of professional practice with legitimate medical purpose",
      "Clinical records document thorough examination, diagnosis, and treatment plan for each patient",
      "Urine drug screening and prescription agreements were in place",
      "Red flags of drug-seeking behavior were identified and addressed",
      "Expert prescribing specialist supports the clinical decision-making",
    ],
    boardFocus:
      "Whether each controlled substance prescription was issued for a legitimate medical purpose within a valid patient relationship, documented by adequate clinical records.",
    responseKey:
      "Retain a prescribing practices expert before the board does; review all clinical records for completeness and consistency before any investigation interview.",
  },
  {
    slug: "boundary-violations",
    name: "Boundary Violations",
    title: "Boundary Violations",
    category: "medical",
    summary:
      "Boundary violation complaints against healthcare providers — including inappropriate personal relationships with patients, self-disclosure, and dual-relationship conflicts — can result in license suspension and mandatory treatment programs.",
    body: `Professional boundary violations in the healthcare context encompass a wide spectrum of conduct: excessive self-disclosure, gift-giving and gift-receiving, physical contact outside clinical necessity, social media contact with patients, personal relationships that blur the professional role, and sexual contact. All of these share a common thread — they compromise the professional distance and objectivity that patients have a right to expect from their healthcare providers.

For mental health professionals — psychiatrists, psychologists, therapists, and social workers — boundary standards are particularly strict because the therapeutic relationship creates vulnerability that other professional relationships do not. Transference and countertransference are recognized clinical phenomena, and the rules governing therapeutic boundaries reflect an understanding of those dynamics.

**What the Board Looks For**

Boards focus on: the nature of the conduct and how it deviated from standard professional practice; whether there was harm to the patient relationship or to the patient's wellbeing; whether the conduct was part of a pattern; and whether the licensee disclosed the relationship or circumstances to supervisors or colleagues.

**Defenses**

Boundary violation allegations frequently involve situations that are more nuanced than the complaint suggests. What looks like a personal relationship from the outside may be a legitimate therapeutic technique; what looks like inappropriate self-disclosure may have been a clinically appropriate intervention. The defense requires expert testimony about professional standards, detailed review of the clinical record, and examination of whether the complaint itself reflects a distorted understanding of the therapeutic relationship.

**How to Respond**

Your response to a boundary violation complaint must be careful and precise — oversharing clinical information in defense of the allegation can itself create secondary confidentiality issues. We help professionals navigate the tension between defending the allegation and protecting patient confidentiality.`,
    defenses: [
      "Conduct was within the scope of legitimate clinical practice",
      "No harm to the patient relationship or patient wellbeing occurred",
      "Allegation reflects distorted understanding of the therapeutic relationship",
      "Conduct was disclosed to supervisors and handled through proper channels",
      "Expert testimony supports that conduct did not violate professional standards",
    ],
    boardFocus:
      "Whether the conduct deviated from standard professional practice, whether it compromised patient care, and whether there is a pattern of similar behavior.",
    responseKey:
      "Balance the defense of the allegation against patient confidentiality obligations; expert testimony about professional standards is often decisive.",
  },
  {
    slug: "documentation-failures",
    name: "Documentation Failures",
    title: "Documentation Failures",
    category: "medical",
    summary:
      "Inadequate, incomplete, or falsified medical, legal, or professional records can independently constitute a licensing violation — and documentation failures often compound other allegations.",
    body: `Documentation standards are a foundation of every licensed profession. Physicians must maintain contemporaneous medical records that support clinical decision-making. Attorneys must maintain records of client communications and trust account transactions. Nurses must document patient assessments, care provided, and responses to treatment. CPAs must maintain work papers that support their professional opinions.

When documentation is inadequate — missing, incomplete, inconsistent, or altered after the fact — the licensee faces two problems: first, the absence of documentation creates an evidentiary gap that investigators fill with adverse inferences; second, inadequate documentation may be an independent violation of licensing board rules, separate from the underlying conduct it was supposed to document.

**What the Board Looks For**

Investigators examine: whether records are contemporaneous (created at the time of the event) or reconstructed; whether records are internally consistent with each other and with third-party records; whether records have been altered or supplemented after the fact without proper notation; and whether there are gaps in the record that correspond to the period covered by the complaint.

**Defenses**

Documentation deficiencies can be explained by workload, systems issues, and professional judgment about what needs to be recorded. The defense must show that the documentation that exists is accurate, that any gaps do not correspond to the conduct alleged, and that the licensee's records practices are generally consistent with professional norms. Producing expert testimony about documentation standards in the relevant profession can be effective when investigators are applying standards that are stricter than common practice.

**How to Respond**

Do not amend, supplement, or reconstruct records after a complaint is filed without counsel's guidance. Any alterations to records after notice of a complaint are treated as evidence of consciousness of guilt and will be discovered when the metadata is examined. Gather all existing records, identify the gaps, and develop a defensible explanation before your response is filed.`,
    defenses: [
      "Documentation gaps are explained by workload and do not correspond to the alleged conduct",
      "Records that exist are accurate and internally consistent",
      "Documentation practices are consistent with professional norms in the relevant specialty",
      "Any supplementation or correction of records was done with proper notation",
      "Expert testimony establishes that documentation level is within the standard of practice",
    ],
    boardFocus:
      "Whether records are contemporaneous, complete, consistent, and unaltered — and whether any gaps correspond to the period covered by the complaint.",
    responseKey:
      "Never amend records after notice of a complaint without counsel; gather all existing records and develop a defensible explanation for any gaps before responding.",
  },
  {
    slug: "informed-consent",
    name: "Informed Consent",
    title: "Informed Consent",
    category: "medical",
    summary:
      "Failure to obtain informed consent — or failing to document it — before a medical procedure, surgical intervention, or significant treatment decision is both a licensing violation and a source of civil liability.",
    body: `Informed consent is the legal and ethical requirement that patients receive adequate information about a proposed treatment — including its risks, benefits, alternatives, and the consequences of declining treatment — before they agree to it. The patient's consent must be voluntary, knowing, and competent. Most states have specific statutes defining what informed consent requires in the medical context.

Informed consent complaints arise when a patient — or a patient's family — alleges that they were not told about a material risk before a procedure, that the procedure performed was different from what was described, that the consent form was signed under pressure or without adequate explanation, or that the patient was not competent to consent when they signed.

**What the Board Looks For**

Medical boards examine: whether an informed consent discussion is documented in the clinical record; whether the consent form covers the material risks of the procedure; whether there are clinical notes reflecting the substance of the pre-procedure discussion; whether the patient's questions were addressed; and whether the consent was obtained in a language the patient understood.

**Defenses**

The most important defense to an informed consent complaint is a well-documented consent process — notes from the pre-procedure discussion, a signed consent form covering material risks, and evidence that the patient was given an opportunity to ask questions. Where the documentation is adequate but the patient disputes the substance of the conversation, credibility becomes the central question. Expert testimony about standard informed consent practices can be helpful when investigators apply standards that are more demanding than common clinical practice.

**How to Respond**

Gather all consent forms, pre-procedure documentation, and clinical notes that reflect the consent discussion before drafting your response. If the consent documentation has gaps, work with counsel to explain those gaps without altering the record.`,
    defenses: [
      "Contemporaneous documentation of informed consent discussion exists",
      "Consent form covered the specific risk the patient alleges was not disclosed",
      "Patient had adequate opportunity to ask questions and declined procedures",
      "Expert testimony supports that consent process met the applicable standard",
      "Complication was not a material risk required to be disclosed under applicable law",
    ],
    boardFocus:
      "Whether the informed consent discussion was documented, whether it covered the material risks, and whether the patient's comprehension was verified.",
    responseKey:
      "Gather all consent documentation and pre-procedure notes before responding; the strength of the defense turns almost entirely on the quality of the documentation.",
  },
  {
    slug: "controlled-substance",
    name: "Controlled Substance Violations",
    title: "Controlled Substance Violations",
    category: "medical",
    summary:
      "Controlled substance violations — including diversion, theft, prescribing without a valid relationship, and record-keeping failures — can result in DEA registration suspension and state medical or pharmacy license revocation.",
    body: `Controlled substance violations are among the most aggressively investigated and prosecuted categories of healthcare licensing complaints. They span two regulatory systems: state licensing boards (medical, nursing, pharmacy) and the federal Drug Enforcement Administration (DEA), which regulates controlled substance registrations separately from state licenses. An adverse action in either system triggers consequences in the other.

The core federal requirement is that controlled substances may only be dispensed or prescribed pursuant to a valid prescription issued in the usual course of professional practice for a legitimate medical purpose. State laws have parallel requirements. When the DEA or state pharmacy board detects a discrepancy between controlled substance orders received, dispensed, and on hand — or when a PMP flags an unusual prescribing pattern — investigations begin rapidly and often without advance notice.

**What the Board Looks For**

Investigators look at DEA 222 forms and CSOS records; perpetual inventory records; PMP data showing controlled substance prescriptions and dispensing; clinical records for each patient receiving controlled substances; evidence of diversion (discrepancies between ordered and dispensed quantities); and evidence of impairment while in possession of controlled substances.

**Defenses**

The most common defenses in controlled substance cases are: legitimate clinical purpose supported by complete clinical records; inventory discrepancies explained by wasting protocols, theft by other staff, or documentation errors; PMP anomalies explained by the prescriber's patient population (e.g., pain medicine, palliative care); and prompt self-reporting of any discrepancies discovered through internal audit.

**How to Respond**

The DEA investigation runs parallel to the state board investigation but under different legal standards. Do not agree to an administrative inspection or interview without counsel. Emergency suspension of your DEA registration is possible even before formal charges are filed, and you will need counsel to respond to that emergency action quickly.`,
    defenses: [
      "Prescriptions were issued for legitimate medical purpose within valid patient relationships",
      "Inventory discrepancies are explained by wasting, theft by others, or documentation errors",
      "Clinical records support the clinical basis for each controlled substance prescription",
      "PMP anomalies reflect legitimate specialty practice, not diversion",
      "Any discrepancy was self-discovered and self-reported through internal audit",
    ],
    boardFocus:
      "Whether controlled substances were prescribed or dispensed for legitimate purposes, whether inventory records are accurate, and whether discrepancies indicate diversion.",
    responseKey:
      "Do not agree to a DEA inspection or administrative interview without counsel; emergency registration suspension is possible before formal charges, requiring immediate legal response.",
  },
  {
    slug: "reporting-failures",
    name: "Reporting Failures",
    title: "Mandatory Reporting Failures",
    category: "multi",
    summary:
      "Failure to fulfill mandatory reporting obligations — including reporting child abuse, colleague impairment, or hospital privilege actions — is itself a disciplinary violation that can result in license suspension.",
    body: `Licensed professionals operate within a web of mandatory reporting requirements. Physicians, nurses, and mental health professionals are required to report suspected child abuse and elder abuse under state mandatory reporter statutes. Healthcare professionals are required to report known or suspected impairment of colleagues. Hospitals are required to report adverse privilege actions to the NPDB. Attorneys are required (in most states) to report known professional misconduct by other attorneys under Rule 8.3. Teachers are mandatory reporters of child abuse in every state.

Failure to make required reports is treated as an independent ethics or licensing violation — separate from whatever underlying conduct should have been reported. In states with mandatory reporter statutes, failure to report can also result in criminal liability.

**What the Board Looks For**

Investigators examine: whether the licensee had information that triggered a mandatory reporting obligation; whether the licensee made a required report within the applicable time limit; and whether any failure to report was knowing and intentional or the result of good-faith uncertainty about whether the reporting threshold was met.

**Defenses**

Many mandatory reporting failures result from genuine uncertainty about whether the facts known to the professional met the statutory threshold for reporting. A professional who reasonably concluded that the facts did not meet the reporting threshold — and documented that reasoning — is in a stronger position than one who made no assessment at all. We help professionals articulate why a judgment call was made and why it was reasonable under the circumstances.

**How to Respond**

If you are aware that a mandatory report should have been made and was not, consult with counsel about whether a late report can be made and how it will affect the licensing investigation. Late reporting, in some circumstances, can mitigate the consequences even though it does not eliminate the violation.`,
    defenses: [
      "Good-faith uncertainty about whether the statutory reporting threshold was met",
      "Reasonable assessment was made and documented at the time",
      "Late report was made voluntarily upon discovery of the reporting obligation",
      "Report was made through an alternative channel that satisfied the reporting requirement",
      "Professional relied on institution's reporting mechanism which failed independently",
    ],
    boardFocus:
      "Whether the licensee had sufficient information to trigger the reporting obligation, and whether any failure to report was intentional or the result of good-faith judgment.",
    responseKey:
      "If a report should have been made and wasn't, consult counsel about a late voluntary report before the board discovers the failure independently.",
  },
  {
    slug: "false-claims",
    name: "False Claims",
    title: "False Claims",
    category: "multi",
    summary:
      "False claims violations — including submitting false bills to Medicare, Medicaid, or private insurers — expose healthcare providers to federal False Claims Act liability, exclusion from federal programs, and parallel state licensing board proceedings.",
    body: `The False Claims Act (31 U.S.C. §§ 3729–3733) imposes civil and criminal liability on anyone who knowingly submits a false claim to the federal government — including Medicare and Medicaid. Healthcare providers who upcode procedures, bill for services not rendered, or falsify clinical documentation to support reimbursement are subject to treble damages plus civil penalties per false claim. Parallel criminal exposure arises under 18 U.S.C. §287 (false claims) and §1347 (healthcare fraud).

A False Claims Act investigation typically begins with a qui tam complaint filed by a whistleblower — often a billing employee, nurse, or competitor — and proceeds with a Department of Justice investigation before the suit is unsealed. The parallel state Medicaid fraud control unit (MFCU) investigation often runs simultaneously. When the federal settlement or conviction is finalized, the Office of Inspector General (OIG) typically excludes the provider from Medicare and Medicaid — triggering state licensing board proceedings.

**What the Board Looks For**

State licensing boards examine: whether the billing irregularities show a pattern or are isolated; whether clinical records support the services billed; whether the provider personally knew of or directed the false billing; and whether the OIG exclusion or federal conviction is final.

**Defenses**

The defenses in False Claims Act matters require specialized expertise — the intersection of federal healthcare billing rules, criminal law, and professional licensing is complex. The most important distinction is between intentional false claims and billing errors caused by coding complexity, inadequate documentation, or delegation to staff. We work with healthcare billing experts and federal criminal defense counsel to build an integrated defense across all tracks.

**How to Respond**

If you receive a Civil Investigative Demand (CID) from the DOJ, or a subpoena from an MFCU, consult counsel immediately. Voluntary cooperation without counsel in a False Claims Act investigation regularly results in inadvertent admissions that become the foundation of criminal prosecution.`,
    defenses: [
      "Billing errors were caused by coding complexity and were not intentional",
      "Provider did not personally direct or approve the billing conduct",
      "Clinical documentation supports the services that were billed",
      "Provider cooperated with investigation and voluntarily corrected billing errors",
      "Isolated anomalies, not a systematic pattern of false billing",
    ],
    boardFocus:
      "Whether the provider personally directed false billing, whether there is a pattern, and whether clinical records support the services billed.",
    responseKey:
      "Consult counsel immediately upon receipt of any DOJ CID or MFCU subpoena; do not make voluntary admissions without understanding the criminal exposure.",
  },
  {
    slug: "improper-billing",
    name: "Improper Billing",
    title: "Improper Billing",
    category: "multi",
    summary:
      "Improper billing complaints — including upcoding, double-billing, balance billing, and billing for services not rendered — can result in license suspension, civil liability, and federal program exclusion.",
    body: `Improper billing allegations encompass a broad range of billing irregularities that fall short of criminal False Claims Act fraud but still constitute licensing violations. Upcoding (billing a higher-level service code than the service actually warranted), double-billing (submitting the same claim to multiple payers), balance billing Medicare beneficiaries in violation of assignment agreements, and billing for services that were delegated to unlicensed staff are all examples of improper billing that licensing boards regularly investigate.

Many improper billing cases arise from poor documentation practices rather than intentional fraud. A physician who provides a Level 3 office visit but documents it inadequately is exposed to a billing allegation when an audit flags that the documentation does not support the Level 4 code that was billed. The clinical care may have been appropriate, but the failure to document it creates the billing problem.

**What the Board Looks For**

Investigators examine: whether the level of service billed is supported by the clinical documentation; whether the same claim was submitted to multiple payers; whether balance billing occurred in violation of applicable requirements; and whether billing was done by the licensee personally or delegated to staff without adequate oversight.

**Defenses**

The documentation defense is central to most improper billing cases — if the clinical record supports the service level billed, the billing allegation cannot be sustained. Where documentation is inadequate, the defense focuses on whether the documentation failure was intentional or the result of workload and documentation norms in the specialty. Medical billing expert review is often the most effective tool for the defense.

**How to Respond**

Respond to audits proactively and before the billing anomalies are referred to the licensing board or law enforcement. Voluntary self-correction — with repayment where indicated — is treated far more favorably than discovery of the anomaly through external audit.`,
    defenses: [
      "Clinical documentation supports the service level billed",
      "Billing was done by staff without adequate licensee oversight — not personally directed",
      "Any overpayment was voluntarily identified and repaid before the investigation",
      "Billing practices are consistent with the standard in the relevant specialty",
      "Anomalies were isolated rather than systematic",
    ],
    boardFocus:
      "Whether billing anomalies are supported by clinical documentation, whether they are systemic, and whether the licensee personally directed the billing practice.",
    responseKey:
      "Self-correct proactively and repay any identified overpayment before the investigation reaches the licensing board; voluntary correction is treated far more favorably.",
  },
  {
    slug: "nursing-scope-of-practice",
    name: "Nursing Scope of Practice",
    title: "Nursing Scope of Practice Violations",
    category: "nursing",
    summary:
      "Practicing outside the authorized scope of a nursing license — including performing procedures reserved for physicians, prescribing without appropriate authority, or practicing beyond a specialty certification — is a licensing violation in every state.",
    body: `Scope of practice for nurses is defined by state nursing practice acts, nursing board regulations, and in some states, by collaborative practice agreements with supervising or collaborating physicians. Nurse practitioners (NPs), certified nurse-midwives (CNMs), certified registered nurse anesthetists (CRNAs), and clinical nurse specialists (CNSs) have expanded scopes of practice that vary significantly by state — ranging from full practice authority in some states to highly restricted dependent practice in others.

Scope of practice violations arise when a nurse performs a procedure or provides a service that is outside their license level or specialty certification, when an advanced practice nurse prescribes or treats beyond the authority granted by their collaborative practice agreement, or when a registered nurse delegates tasks inappropriately to unlicensed assistive personnel.

**What the Board Looks For**

Nursing boards examine: whether the conduct in question is within the authorized scope of the licensee's license type and specialty; whether the licensee had a current, valid collaborative practice agreement if required; whether supervision or collaboration requirements were met; and whether any patient was harmed as a result of the out-of-scope practice.

**Defenses**

Scope of practice complaints frequently arise in clinical settings where roles are not clearly defined, where staffing shortages create pressure to perform tasks outside one's authorization, or where the nurse genuinely believed the conduct was within scope based on facility policy. The defense must show either that the conduct was within the authorized scope, that the nurse relied in good faith on institution policy, or that any out-of-scope act was a one-time response to a clinical emergency.

**How to Respond**

Your response should identify the specific statute or regulation that defines your scope of practice and explain how your conduct fits within or near that boundary. Institutional policies, job descriptions, and collaborative practice agreement terms are all important exhibits.`,
    defenses: [
      "Conduct was within the authorized scope of the nurse's license level and specialty",
      "Conduct was authorized by a current collaborative practice agreement",
      "Nurse relied in good faith on institutional policy or job description",
      "Out-of-scope act was a one-time emergency response with no patient harm",
      "Confusion about scope arose from institutional role assignment, not intentional violation",
    ],
    boardFocus:
      "Whether the conduct was within the authorized scope for the nurse's license level, and whether any required supervision or collaborative practice agreement was in place.",
    responseKey:
      "Identify the specific scope of practice provision that applies and show how the conduct fits within or is justifiably near that boundary; attach collaborative practice agreements and facility policies.",
  },
  {
    slug: "medication-errors",
    name: "Medication Errors",
    title: "Medication Errors",
    category: "nursing",
    summary:
      "Medication errors — including wrong drug, wrong dose, wrong patient, and failure to monitor — are a leading source of nursing board complaints and can result in license suspension, probation, or mandatory remedial training.",
    body: `Medication errors are a leading cause of patient harm and a major driver of nursing board complaints. Errors range from administering the wrong medication to the wrong patient, to giving the correct medication at the wrong dose or route, to failing to monitor a patient for known adverse effects after administration. In hospital settings, mandatory incident reporting requirements mean that significant medication errors are reported to hospital risk management and, in some states, to the state department of health — triggering a parallel board investigation.

The nursing board investigates medication errors not to assign blame for every human error, but to identify whether the nurse's conduct fell below the standard of safe nursing practice. A single isolated error in an otherwise impeccable practice may result in a letter of concern with no further action. A pattern of errors, or a single error involving gross negligence — like administering a 10-fold overdose — warrants more serious attention.

**What the Board Looks For**

Investigators examine: the nature and severity of the error; whether the nurse followed the five rights of medication administration (right patient, drug, dose, route, time); whether the error was self-reported as required; whether the patient was harmed; and whether there is a pattern of similar errors in the nurse's employment history.

**Defenses**

Many medication errors occur in the context of system failures — poorly labeled medications, distracting work environments, inadequate staffing, malfunctioning technology. The defense must situate the nurse's error within the institutional context and identify what system-level failures contributed to it. Evidence of otherwise exemplary practice, prompt self-reporting of the error, and cooperation with the institution's corrective action plan all strengthen the defense.

**How to Respond**

Self-report the error as required by your employer and state law. Your cooperation with the institutional response — including completing any required training or corrective action — demonstrates professionalism and good faith. We help nurses frame their response to the nursing board in a way that takes responsibility for the error without conceding that the error was the result of gross negligence or incompetence.`,
    defenses: [
      "Error occurred in context of system failure — poor labeling, staffing, or technology",
      "Nurse self-reported the error as required and cooperated with corrective action",
      "Isolated incident with otherwise exemplary practice record",
      "No patient harm resulted from the error",
      "Nurse has completed remedial education and implemented personal safety checks",
    ],
    boardFocus:
      "Whether the error was isolated or part of a pattern, whether it resulted from gross negligence, and whether the nurse self-reported and cooperated with corrective action.",
    responseKey:
      "Self-report as required and cooperate with institutional corrective action; frame the error in its system context and demonstrate commitment to remediation.",
  },
  {
    slug: "patient-abandonment",
    name: "Patient Abandonment",
    title: "Patient Abandonment",
    category: "nursing",
    summary:
      "Patient abandonment — leaving a patient without appropriate handoff, refusing an assignment without timely notice, or walking off a shift — is a serious nursing violation that can result in license suspension.",
    body: `Patient abandonment in nursing is distinct from employment abandonment. It is defined as leaving a patient for whom you have professional responsibility without ensuring that they are transferred to another qualified caregiver. The key element is that a nurse-patient relationship has been established — the nurse has accepted the assignment and assumed professional responsibility for the patient — and then unilaterally terminated that relationship without adequate handoff.

This arises in several contexts: a nurse who walks off a shift in the middle of their assignment without notifying the charge nurse; a nurse who leaves the unit without turning over their patients; a nurse who refuses an assignment during a crisis and leaves without giving adequate notice to allow replacement; or a nurse who abruptly abandons a home health or private duty patient.

**What the Board Looks For**

Nursing boards examine: whether the nurse had accepted professional responsibility for the patient before leaving; whether an adequate handoff was made to another qualified nurse; whether the nurse gave adequate notice to supervisors before leaving; and whether any patient was harmed as a result of the gap in care.

**Defenses**

A nurse who leaves a hostile or unsafe work environment after giving notice to a supervisor and ensuring patient safety has a strong defense to a patient abandonment allegation. Similarly, a nurse who is physically unable to continue working due to illness and who has notified the charge nurse and attempted to arrange coverage has not abandoned their patients. The critical factor is whether the nurse took reasonable steps to protect the patients in their care before leaving.

**How to Respond**

Your response must address exactly what steps you took to ensure continuity of care before leaving the unit or ending the assignment. Identify every supervisor you notified, what you told them, and what the patient status was at the time of handoff. If no handoff was completed, explain why — and what you did instead to protect patient safety.`,
    defenses: [
      "Adequate handoff was made to another qualified nurse before leaving",
      "Supervisor was notified and agreed to arrange coverage",
      "Nurse was unable to continue due to illness and gave as much notice as possible",
      "No patient was harmed as a result of the transition in care",
      "Nurse was leaving an abusive or physically unsafe work environment after notifying management",
    ],
    boardFocus:
      "Whether the nurse made an adequate handoff before leaving, whether supervisors were notified, and whether any patient harm resulted from the gap in care.",
    responseKey:
      "Document every step taken to protect patient safety before leaving — who you notified, what you said, what the patient status was — before drafting your response.",
  },
  {
    slug: "cpa-independence",
    name: "CPA Independence Violations",
    title: "CPA Independence Violations",
    category: "cpa",
    summary:
      "Independence violations — including financial relationships with audit clients, personal relationships that impair objectivity, and prohibited non-audit services — can result in license suspension, SEC action, and PCAOB sanctions.",
    body: `Independence is the cornerstone of the auditor-client relationship. AICPA independence standards, SEC auditor independence rules (for public company auditors), and state board of accountancy requirements all impose varying — and sometimes conflicting — independence standards on CPAs and accounting firms. A CPA who lacks independence from an audit client cannot perform an attestation engagement for that client, and a firm that lacks independence puts every audit opinion it issued in question.

Independence violations arise in many forms: a financial interest in an audit client (stock ownership, loans, investments in close family member accounts); a former employment relationship with the client that is too recent; provision of prohibited non-audit services (bookkeeping, valuation, legal services) that impairs objectivity; a personal or romantic relationship with a client officer or director; or a financial relationship between a firm partner and the audit client.

**What the Board Looks For**

State boards and the AICPA Ethics Division examine: the nature of the relationship that allegedly impairs independence; whether the CPA's firm had adequate independence monitoring policies; whether the impairment was self-discovered and reported, or discovered by the client, a peer reviewer, or regulator; and whether the audit opinions issued during the period of impaired independence are materially affected.

**Defenses**

Independence analysis is complex, and what appears to be an independence violation in the abstract may satisfy the more nuanced analysis required by the specific applicable standard. Many CPA independence cases turn on whether the financial interest was material, whether the relationship was with a covered person under the applicable rule, and whether adequate firm policies could have prevented the issue. Expert analysis of the applicable independence framework is often critical to the defense.

**How to Respond**

Independence violations discovered by peer reviewers or regulators are treated more seriously than those self-discovered and corrected. If you become aware of an independence issue, consult with counsel before attempting to remediate it — the remediation steps can themselves create evidentiary problems if not handled correctly.`,
    defenses: [
      "Relationship or financial interest did not involve a covered person under the applicable rule",
      "Financial interest was immaterial under the applicable standard",
      "Independence issue was self-discovered and corrected before issuance of the audit opinion",
      "Adequate firm independence monitoring policies were in place and followed",
      "Applicable standard is more nuanced than the investigator's analysis suggests",
    ],
    boardFocus:
      "Whether the relationship or financial interest fell within the scope of the applicable independence rule, and whether it was self-discovered or externally identified.",
    responseKey:
      "Independence analysis is standard-specific; engage an expert in the applicable independence framework before drafting any response.",
  },
  {
    slug: "audit-failures",
    name: "Audit Failures",
    title: "Audit Failures",
    category: "cpa",
    summary:
      "Audit failures — including failure to detect material misstatements, inadequate work papers, and violations of GAAS — can result in CPA license revocation, SEC enforcement action, and PCAOB sanctions.",
    body: `An audit failure allegation arises when an auditor issues an unqualified opinion on financial statements that contain material misstatements. These complaints typically reach the state board of accountancy after an accounting restatement, a securities fraud investigation, or a bankruptcy proceeding reveals that the financial statements the auditor blessed were materially incorrect. The SEC and PCAOB investigate public company audit failures; state boards investigate licensed CPAs regardless of whether the client was public or private.

The applicable standard for auditors is GAAS — Generally Accepted Auditing Standards — and for public companies, PCAOB Auditing Standards. An audit failure allegation is essentially an allegation that the auditor failed to design and execute procedures sufficient to detect the material misstatement, or detected it and failed to report it.

**What the Board Looks For**

Investigators and peer reviewers examine: the audit work papers — do they document the planning, risk assessment, internal control evaluation, substantive procedures, and review process?; whether the auditor identified red flags that should have prompted additional procedures; whether the audit scope was adequate; and whether the partner review process functioned properly.

**Defenses**

Not every audit that misses a misstatement is an audit failure under GAAS — the standard is not guaranty but reasonable professional care. An auditor who designed and executed a risk-based audit in accordance with GAAS, documented the work adequately, and was deceived by management fraud is in a very different position than one who failed to perform basic audit procedures. The defense requires a work-paper expert who can demonstrate that the audit was performed in accordance with the applicable standards.

**How to Respond**

The defense of an audit failure allegation is document-intensive and expert-driven. Retain counsel and a forensic accounting expert before responding to any regulatory inquiry. The work papers are the most important evidence — their completeness and quality will determine the outcome more than any other factor.`,
    defenses: [
      "Audit was performed in accordance with GAAS and applicable auditing standards",
      "Work papers adequately document planning, risk assessment, and substantive procedures",
      "Material misstatement was the result of management fraud that was not detectable through reasonable audit procedures",
      "Scope of engagement did not include the procedures that would have detected the error",
      "Red flags identified were investigated and reasonably resolved",
    ],
    boardFocus:
      "Whether the audit was performed in accordance with GAAS, whether work papers adequately document the procedures performed, and whether any audit failure was the result of management deception or inadequate professional care.",
    responseKey:
      "The work papers are the most important evidence; retain a forensic accounting expert to review and opine on the adequacy of audit procedures before the board's expert does.",
  },
  {
    slug: "tax-fraud",
    name: "Tax Fraud",
    title: "Tax Fraud",
    category: "cpa",
    summary:
      "Tax fraud allegations against CPAs — including aiding in preparation of fraudulent returns, willful failure to file, and circular 230 violations — can result in IRS Office of Professional Responsibility sanctions, license revocation, and criminal prosecution.",
    body: `Tax fraud complaints against CPAs arise from multiple sources: IRS criminal investigation referrals, IRS Office of Professional Responsibility (OPR) sanctions under Circular 230, state tax authority investigations, and client complaints that the CPA prepared fraudulent returns or diverted refunds. The intersection of federal and state tax law creates overlapping jurisdiction — and the consequences flow through multiple channels simultaneously.

Circular 230 governs the conduct of CPAs (and other tax practitioners) who practice before the IRS. Violations include signing returns that the practitioner knows or should know are fraudulent; failing to advise clients of penalties to which they are subject; soliciting fees contingent on the outcome of a tax examination; and promoting abusive tax shelters. Sanctions range from censure to disbarment from IRS practice.

**What the Board Looks For**

State boards examine: whether the CPA prepared or assisted in preparing returns that they knew or should have known were fraudulent; whether the CPA exercised appropriate due diligence; whether the CPA relied on client-provided information without performing reasonable verification; and whether there is a pattern of participation in questionable tax schemes.

**Defenses**

The most important defense in tax fraud cases is the distinction between a CPA who knowingly participated in fraud and one who was deceived by a client who provided false information. A CPA who applies reasonable due diligence, asks reasonable questions, and relies in good faith on client representations has a strong defense to a knowing fraud allegation. The adequacy of the due diligence — and what red flags should have prompted additional inquiry — is the central factual issue.

**How to Respond**

IRS OPR proceedings run separately from state board proceedings. Do not respond to one without coordinating the response with the other. We handle CPA licensing defense in coordination with IRS practice defense to ensure consistency across all tracks.`,
    defenses: [
      "CPA relied in good faith on client representations after performing reasonable due diligence",
      "Red flags identified were investigated and resolved before returns were signed",
      "CPA did not know and had no reason to know that returns contained fraudulent information",
      "Circular 230 violation was inadvertent and has been corrected",
      "No client was harmed and any tax deficiency has been corrected",
    ],
    boardFocus:
      "Whether the CPA knew or should have known of the fraudulent nature of the returns, and whether due diligence was adequate under Circular 230.",
    responseKey:
      "Coordinate the IRS OPR response with the state board response; never respond to one without understanding the impact on the other.",
  },
  {
    slug: "financial-misrepresentation",
    name: "Financial Misrepresentation",
    title: "Financial Misrepresentation",
    category: "cpa",
    summary:
      "Financial misrepresentation — including issuing misleading financial statements, failing to disclose material information, and participating in financial fraud — can result in license revocation, SEC enforcement, and criminal prosecution.",
    body: `Financial misrepresentation complaints against CPAs arise when financial statements reviewed, compiled, or audited by a CPA are found to contain material misstatements or omissions. In the audit context, this overlaps with audit failure allegations. In the review and compilation context, the applicable standards are less demanding than audit standards — but CPAs still have duties of due care and are prohibited from issuing reports they know to be false.

The most serious form of financial misrepresentation allegation involves a CPA who participates directly in the misrepresentation — doctoring work papers, inflating asset values, or certifying financial statements they know to be false. These cases often proceed simultaneously with SEC enforcement, DOJ criminal investigation, and civil litigation.

**What the Board Looks For**

Boards examine: whether the CPA's engagement was an audit, review, or compilation — and whether the applicable standards were followed; whether the CPA's report accurately characterized the scope and limitations of the engagement; whether the CPA took steps to investigate apparent discrepancies before issuing a report; and whether the CPA participated in or facilitated the misrepresentation.

**Defenses**

The key distinction is between a CPA who was deceived and a CPA who participated. An engagement-level defense requires showing that the CPA performed procedures appropriate for the engagement type, exercised reasonable care, and did not have information that should have prompted additional inquiry or refusal to issue the report. Expert testimony from a standards expert can be critical.

**How to Respond**

Cases involving potential SEC investigation or criminal referral require coordination with specialized securities defense counsel in addition to licensing defense counsel. The licensing board investigation timeline may be the least of your immediate concerns in a serious financial misrepresentation matter.`,
    defenses: [
      "Engagement was performed in accordance with applicable SSARS or GAAS standards",
      "CPA was deceived by the client and had no knowledge of the misrepresentation",
      "Any apparent discrepancies were investigated and resolved before the report was issued",
      "Report accurately characterized the scope and limitations of the engagement",
      "CPA did not participate in or facilitate the misrepresentation",
    ],
    boardFocus:
      "Whether the CPA participated in the misrepresentation, whether procedures performed were adequate for the engagement type, and whether the CPA had knowledge of the falsity.",
    responseKey:
      "In serious financial misrepresentation cases, coordinate immediately with securities defense counsel in addition to licensing counsel; SEC and criminal timelines may dominate.",
  },
  {
    slug: "unauthorized-practice",
    name: "Unauthorized Practice",
    title: "Unauthorized Practice",
    category: "attorney",
    summary:
      "Unauthorized practice of law — practicing in a jurisdiction without a valid license, holding oneself out as an attorney while unlicensed, or assisting a suspended attorney in continuing to practice — is a serious violation that can result in disbarment.",
    body: `Unauthorized practice of law (UPL) complaints arise in several contexts: an attorney who is suspended or disbarred but continues to represent clients; an attorney who is licensed in one state but practices in another without pro hac vice admission or local counsel; a non-attorney who holds themselves out as an attorney or provides legal services for compensation; or an attorney who assists a disbarred colleague in continuing to practice law through the attorney's firm.

Many UPL complaints arise from transitions — an attorney whose license lapsed due to CLE or registration failures but who continued to practice, or an attorney who moved to a new state and began handling matters there before completing the admission process. These may be less culpable than deliberate practice while disbarred, but they are still disciplinary violations.

**What the Board Looks For**

Investigators examine: the dates of the attorney's active license status; the dates of any representation for which fees were charged; whether the attorney represented themselves to clients as licensed; and whether any harm to the client resulted from reliance on the attorney's representation of their licensure status.

**Defenses**

Good-faith reliance on a mistaken belief about license status — particularly when the lapse was caused by administrative error — is a mitigating factor even if it is not a complete defense. Prompt remediation — completing the admission requirements, making restitution to affected clients, self-reporting to the bar — significantly affects the sanction in most cases.

**How to Respond**

If you discover that you were not in active status during a period of representation, consult with counsel before taking any remediation steps. The order in which you remediate, notify clients, and self-report can significantly affect the outcome.`,
    defenses: [
      "License lapse was caused by administrative error, not intentional failure to renew",
      "Practice in another jurisdiction was within the scope of pro hac vice admission",
      "Prompt self-report and remediation upon discovery of the lapse",
      "No client was harmed by reliance on the erroneous representation of licensure",
      "Attorney was admitted pro hac vice or under a recognized temporary practice rule",
    ],
    boardFocus:
      "Whether the attorney knowingly practiced while unlicensed, and whether clients were harmed by reliance on the representation of licensure.",
    responseKey:
      "Consult counsel before taking remediation steps — the sequence of self-report, client notification, and remediation significantly affects the outcome.",
  },
  {
    slug: "solicitation-violations",
    name: "Solicitation Violations",
    title: "Solicitation Violations",
    category: "attorney",
    summary:
      "Attorney solicitation violations — including in-person solicitation of prospective clients, targeted direct-mail solicitation that is misleading, and payment of fees for referrals — can result in suspension and public reprimand.",
    body: `Attorney solicitation rules regulate how attorneys can seek new clients, particularly after accidents, disasters, or other events that create a potential client pool. Rule 7.3 of the Model Rules (and its state equivalents) generally prohibits in-person, live telephone, or real-time electronic contact with a prospective client for the purpose of seeking professional employment when the lawyer's significant motive is pecuniary gain — unless the prospective client is a lawyer or is already known to the lawyer.

Solicitation complaints most commonly arise from: lawyers who show up at hospitals, accident scenes, or disaster sites to solicit clients; lawyers who send targeted direct-mail solicitations that are misleading about the lawyer's identity, fee, or ability to handle the matter; and lawyers who pay non-attorney runners, cappers, or lead-generation services in ways that violate the prohibition on fees for referrals.

**What the Board Looks For**

Investigators examine: whether the contact was in-person, by live telephone, or by real-time electronic means; whether the prospective client was under distress; whether the solicitation was misleading in any way; and whether the attorney paid any fee, directly or indirectly, to a referral source.

**Defenses**

Many solicitation complaints arise from misidentification — the target of a complaint may have been referred through a legitimate lawyer referral service, rather than directly solicited. Clear documentation of referral sources and compliance with applicable safe harbors (written direct mail, targeted advertising) is the core defense. For runner/capper allegations, the attorney must demonstrate that any payment was for legitimate services, not a referral fee.

**How to Respond**

Document every referral source for the client in question. If the matter came from a lawyer referral service, a legitimate marketing relationship, or a friend of the client, that documentation needs to be attached to your response.`,
    defenses: [
      "Client was obtained through a legitimate lawyer referral service, not direct solicitation",
      "All client development activities were through written, non-real-time communications",
      "Any payment to a referral source was for legitimate services, not a prohibited referral fee",
      "Solicitation was directed to a former client or personal acquaintance within an exception",
      "Written direct-mail solicitation was properly labeled and not misleading",
    ],
    boardFocus:
      "Whether the contact was in-person or real-time, whether the client was under distress, and whether any payment was made for a prohibited referral.",
    responseKey:
      "Document every referral source for the client — clean referral documentation is the most effective defense to a solicitation allegation.",
  },
  {
    slug: "advertising-violations",
    name: "Advertising Violations",
    title: "Advertising Violations",
    category: "attorney",
    summary:
      "Attorney advertising violations — including misleading claims, failure to include required disclaimers, and improper use of testimonials or endorsements — can result in public reprimand and suspension.",
    body: `Attorney advertising is one of the most heavily regulated aspects of law practice — and the rules vary significantly by state. What is compliant in Texas may violate the advertising rules in Florida or New York. Advertising violations arise from website content, social media, television and radio ads, billboards, and directory listings that contain misleading claims, fail to include required disclaimers, or cross lines drawn by state-specific advertising rules.

Common advertising violations include: claiming to be a specialist or expert without holding the required certification; using client testimonials in states where they are prohibited or without required disclaimers; failing to include required language about past results not guaranteeing future outcomes; using the phrase "no fee unless you recover" in states where that disclaimer requires additional language; and using another attorney's name in a firm name in ways that are prohibited.

**What the Board Looks For**

Investigators examine: the specific content of the advertisement; whether any claim is false or misleading; whether required disclaimers are included; whether testimonials comply with applicable rules; and whether the advertisement implies results that cannot be guaranteed.

**Defenses**

Most advertising violations are technical compliance failures rather than intentional misconduct. A clear compliance review process, prompt correction of any identified violation, and good-faith reliance on legal counsel's review of advertising content are all mitigating factors. In states with mandatory pre-filing review of advertising materials (such as Florida), compliance with the review process and approval by bar staff can be a complete defense.

**How to Respond**

Produce the complete advertisement at issue and identify every disclaimer that was or was not included. If you can show that the omission was inadvertent and has been corrected, and that no client was misled, the case for serious discipline is significantly weakened.`,
    defenses: [
      "Advertisement complied with applicable state advertising rules",
      "Any non-compliance was a technical omission that has been corrected",
      "Bar's pre-filing review approved the advertising materials at issue",
      "No client was misled by any arguably non-compliant statement",
      "Good-faith reliance on counsel's review of advertising content",
    ],
    boardFocus:
      "Whether the advertisement contains false or misleading statements, whether required disclaimers are included, and whether any non-compliance was intentional.",
    responseKey:
      "Produce the complete advertisement and show that any omission has been corrected; compliance history and good-faith review process are effective mitigating evidence.",
  },
  {
    slug: "social-media-violations",
    name: "Social Media Violations",
    title: "Social Media Violations",
    category: "multi",
    summary:
      "Social media violations — including inappropriate contact with patients or clients on social media, disclosure of confidential information online, and misleading advertising on social platforms — can result in disciplinary action across multiple professional categories.",
    body: `Social media has created a new frontier for professional ethics violations across every licensed profession. Attorneys face risks from: advertising on social media without required disclaimers; friending jurors, witnesses, or opposing parties during litigation; posting client information without consent; and responding to negative reviews in ways that disclose confidential information. Healthcare providers face risks from: social media contact with patients that crosses professional boundaries; posting patient information or photos without HIPAA-compliant authorization; and making statements online that undermine patient trust.

Licensing boards are increasingly sophisticated in their review of social media conduct. Public social media posts are fair game for investigation, and complaints are frequently initiated by competing attorneys, former clients, or patients who screenshot and preserve social media content.

**What the Board Looks For**

Investigators examine: the content of the social media post or contact; whether confidential information was disclosed; whether the post was directed at a client, patient, or party in a pending matter; whether the post constitutes attorney advertising that requires a disclaimer; and whether the contact violated applicable rules about communication with represented parties, jurors, or witnesses.

**Defenses**

Social media violations frequently involve ambiguity about what was actually communicated and to whom. Privacy settings, audience restrictions, and the distinction between public and private posts matter. Good-faith deletion of an offending post, upon becoming aware of the concern, can mitigate consequences — though it can also create spoliation issues in parallel proceedings. We help professionals understand the full scope of their social media exposure before drafting any response.

**How to Respond**

Preserve everything — screenshot every relevant social media post before it is deleted or the account is modified. Then consult with counsel about what to preserve, what to remove, and how to frame the response.`,
    defenses: [
      "Post was not directed at the client, patient, or party in a pending matter",
      "Information shared did not constitute confidential client or patient information",
      "Post complied with applicable advertising rules for the jurisdiction",
      "Social media contact with patient was within a legitimate clinical context",
      "Post was promptly removed upon becoming aware of the concern",
    ],
    boardFocus:
      "Whether confidential information was disclosed, whether a professional relationship was compromised, and whether any advertising on social media complied with applicable rules.",
    responseKey:
      "Preserve screenshots of all relevant social media content before responding; understand spoliation implications before deleting anything.",
  },
  {
    slug: "candor-to-tribunal",
    name: "Candor to Tribunal",
    title: "Candor to Tribunal",
    category: "attorney",
    summary:
      "Violations of the duty of candor to a tribunal — including making false statements of fact or law to a court, failing to disclose controlling adverse authority, and introducing false evidence — can result in suspension or disbarment.",
    body: `Rule 3.3 of the Model Rules of Professional Conduct (Candor Toward the Tribunal) imposes specific affirmative obligations on attorneys in litigation that go beyond the general prohibition on misrepresentation. Attorneys must not make false statements of fact or law to a court; must not fail to disclose directly adverse controlling legal authority in the jurisdiction; must not offer evidence the lawyer knows to be false; and must take remedial measures when they later discover that evidence or a statement they made was false.

Candor complaints arise from a wide range of conduct: citing cases that do not exist, misrepresenting the facts of cited cases, submitting declarations with material inaccuracies, failing to disclose adverse controlling authority, coaching witnesses to give false testimony, or submitting fabricated documents.

**What the Board Looks For**

Investigators examine: whether the false statement was knowing or inadvertent; whether the attorney took remedial measures when the error was discovered; whether the court or opposing party was prejudiced; and whether the conduct was part of a pattern of deceptive conduct in litigation.

**Defenses**

The most important distinction in candor cases is between inadvertent error and knowing false statement. An attorney who cites a case for a proposition the case does not actually support — through careless Westlaw or ChatGPT research — may have made an error, but whether it constitutes a knowing false statement depends on the circumstances. Prompt disclosure and remediation upon discovering any error is critical and often the difference between a citation in discipline and a minor admonishment.

**How to Respond**

If the error was inadvertent and you have already corrected it — by filing a supplemental submission with the court or otherwise — that should be the first thing in your response. The bar treats voluntary correction very differently from concealment until discovered.`,
    defenses: [
      "Statement was inadvertent error, not knowing false statement",
      "Error was discovered and voluntarily disclosed and corrected before discovery by the court or opposing party",
      "Adverse authority was disclosed in a subsequent filing upon discovery",
      "Statement was a matter of advocacy, not a statement of fact",
      "No prejudice resulted from the error before it was corrected",
    ],
    boardFocus:
      "Whether the statement was knowingly false, whether the attorney took remedial action upon discovery, and whether the court or opposing party was prejudiced.",
    responseKey:
      "Voluntary disclosure and correction upon discovery is the most effective mitigation — document every step taken to correct the record before the bar asks.",
  },
  {
    slug: "ex-parte-communications",
    name: "Ex Parte Communications",
    title: "Ex Parte Communications",
    category: "attorney",
    summary:
      "Improper ex parte communications with a judge — communicating directly with a court about a pending matter without notice to opposing counsel — is a serious procedural violation that can result in disciplinary action.",
    body: `Ex parte communications are communications with a judge or judicial officer about a pending matter that occur outside the presence of opposing counsel and without prior notice. Rule 3.5 of the Model Rules generally prohibits ex parte communications with judges except as permitted by law (emergency ex parte applications, ex parte hearings on specific motions, and other explicitly authorized circumstances).

Ex parte communication complaints arise most often from: an attorney who phones chambers to discuss a pending matter without notifying opposing counsel; an attorney who submits a written communication to a judge in a pending case without serving opposing counsel; and attorneys who develop social relationships with judges that result in substantive communications about pending matters.

**What the Board Looks For**

Investigators examine: whether the communication was about a pending matter; whether opposing counsel received notice; whether the communication was authorized by court rule or statute; and what, if any, advantage the attorney sought or gained from the communication.

**Defenses**

Many ex parte communication complaints arise from misunderstandings about what constitutes a pending matter, or from administrative communications with court staff that did not reach the judge. Communications about scheduling, administrative matters, or emergencies explicitly authorized by the court's local rules are not improper ex parte communications. The defense must establish exactly what was said, to whom, and whether there was a legitimate procedural basis for the communication.

**How to Respond**

Your response should describe in precise detail the communication at issue — what was said, to whom, in what context — and explain why the communication was either authorized or did not concern a substantive aspect of the pending matter. Declarations from the recipient, if available, can be powerful evidence.`,
    defenses: [
      "Communication was with court staff, not the judge, about administrative matters",
      "Communication was expressly authorized by court rule or local rule of the jurisdiction",
      "Communication was an authorized emergency application with appropriate notice given afterward",
      "No pending matter was discussed — communication was purely social or administrative",
      "Communication was made with the consent or at the invitation of the court",
    ],
    boardFocus:
      "Whether the communication concerned a pending matter, whether it was authorized, and what advantage the attorney sought or gained.",
    responseKey:
      "Describe the communication in precise detail and identify the specific procedural authorization for any ex parte contact; declarations from the recipient are powerful evidence.",
  },
  {
    slug: "witness-tampering",
    name: "Witness Tampering",
    title: "Witness Tampering",
    category: "attorney",
    summary:
      "Witness tampering — including improperly coaching witnesses, offering inducements for favorable testimony, or advising witnesses to avoid service — is both a criminal offense and a serious ethics violation that can result in disbarment.",
    body: `Witness tampering is both a criminal offense (18 U.S.C. §1512) and a serious violation of professional responsibility. Attorney witness tampering complaints arise from: coaching a witness to give false or misleading testimony; offering a witness money or other benefit in exchange for favorable testimony; advising a fact witness (as opposed to the attorney's own client) to avoid service or not to cooperate with the opposing party; and communicating with a represented party's witness in violation of the no-contact rule.

The distinction between permissible witness preparation and impermissible witness coaching is not always obvious in practice. An attorney may properly review expected testimony with a witness, point out inconsistencies, and discuss areas where the witness may be questioned — but may not instruct the witness to conceal information, misrepresent facts, or give evasive answers designed to frustrate legitimate inquiry.

**What the Board Looks For**

Investigators examine: the nature and content of the communications with the witness; whether the attorney instructed the witness to give false testimony or conceal information; whether any benefit was offered in connection with the testimony; whether the witness was represented by counsel and whether the no-contact rule applied; and whether criminal charges have been or may be filed.

**Defenses**

Witness preparation is a legitimate and necessary part of litigation practice. The defense of a witness tampering allegation must articulate clearly what occurred and why it falls within the permissible scope of witness preparation — not coaching. Recordings, notes, and witness statements can be critical evidence in both directions.

**How to Respond**

If criminal charges are pending or possible, do not respond to the bar without coordinating with criminal defense counsel. The bar investigation and any criminal proceeding must be carefully coordinated to prevent inconsistencies and self-incriminating admissions.`,
    defenses: [
      "Communications with witness were permissible preparation, not coaching to give false testimony",
      "No benefit was offered in connection with the witness's testimony",
      "Witness was not represented and no-contact rule did not apply",
      "Allegation is based on witness's distorted characterization of a legitimate preparation session",
      "No instruction was given to conceal or misrepresent any fact",
    ],
    boardFocus:
      "Whether the attorney instructed the witness to give false testimony, whether any benefit was offered for favorable testimony, and whether the no-contact rule was violated.",
    responseKey:
      "Coordinate with criminal defense counsel before responding to the bar if criminal charges are pending; preserve all records of communications with the witness.",
  },
  {
    slug: "contempt",
    name: "Contempt",
    title: "Contempt",
    category: "attorney",
    summary:
      "A contempt citation against an attorney — for violating court orders, disrupting proceedings, or failing to comply with discovery obligations — frequently triggers a parallel ethics investigation by the state bar.",
    body: `A finding of contempt by a court is often a predicate for a state bar ethics complaint. Courts have inherent authority to sanction attorney misconduct through contempt proceedings, and most state bars require attorneys to self-report any finding of contempt involving unprofessional conduct. Contempt findings that reflect on an attorney's fitness to practice — as opposed to purely procedural delays — are treated as potential Rule 8.4(d) violations (conduct prejudicial to the administration of justice).

Contempt of court arises from: failure to comply with court orders, including discovery orders and scheduling orders; disruption of court proceedings; abusive conduct toward the court, witnesses, or opposing parties; and failure to appear. Not every contempt citation results in an ethics referral, but any contempt that involves dishonesty, disrespect for the court, or harm to a client's interests is likely to.

**What the Board Looks For**

Investigators review the contempt order itself (the court's findings are significant evidence), the underlying conduct that prompted the contempt, whether the attorney has a pattern of contempt citations, and whether the attorney self-reported the contempt finding to the bar.

**Defenses**

Contempt citations that are appealed and reversed are strong evidence against a parallel disciplinary finding. Even where the contempt stands, the defense must establish the context: was the conduct a single heated courtroom exchange that escalated, or a pattern of deliberate disregard for court orders? The former is more easily mitigated. Self-reporting the contempt finding and demonstrating subsequent compliance with court orders is important mitigation evidence.

**How to Respond**

If you have not yet self-reported the contempt finding to the bar, consult with counsel about whether you are required to do so and on what timeline. Late self-reporting is treated as an additional violation in most states.`,
    defenses: [
      "Contempt finding has been appealed and is not yet final",
      "Contempt was for a technical procedural failure, not dishonesty or misconduct",
      "Single incident with no pattern of contempt or disrespect for the court",
      "Contempt was later vacated or modified by the court",
      "Self-reported finding promptly and has complied with all subsequent court orders",
    ],
    boardFocus:
      "Whether the contempt reflects on the attorney's fitness to practice, whether it was self-reported, and whether there is a pattern of similar conduct.",
    responseKey:
      "Self-report the contempt finding within the required timeframe and document subsequent compliance with all court orders; late self-reporting is itself a violation.",
  },
  {
    slug: "mental-competency",
    name: "Mental Competency",
    title: "Mental Competency",
    category: "multi",
    summary:
      "Mental health conditions that impair a professional's ability to practice safely can result in emergency license suspension, mandatory evaluation, and fitness-for-duty proceedings before any licensing board.",
    body: `Mental health and cognitive impairment can affect licensed professionals across all fields, and licensing boards have the authority to initiate fitness-for-duty evaluations, require mental health treatment as a condition of continued licensure, and suspend licenses on an emergency basis when impairment poses an immediate threat to the public. These proceedings are distinct from — and can run parallel to — ethics complaints arising from the same impairment.

Mental competency proceedings arise from: erratic behavior noticed by colleagues or clients; complaints from multiple clients or patients that show a pattern consistent with cognitive decline; a diagnosis of a condition that impairs judgment or memory; a mental health crisis that becomes public; or a colleague's mandatory report of suspected impairment.

**What the Board Looks For**

Boards examine: whether the licensee's conduct raises a genuine concern about their fitness to practice; whether independent evaluation by a board-approved mental health professional supports the concern; and whether the licensee is willing to cooperate with evaluation and treatment.

**Defenses**

Many mental competency complaints are based on exaggerated or inaccurate reports by disgruntled colleagues or clients. An independent evaluation by a qualified mental health professional that finds no impairment is the most effective defense. Where impairment exists, the defense focuses on demonstrating that the licensee is receiving appropriate treatment, that the impairment is managed, and that they are fit to return to or continue practice with appropriate monitoring conditions.

**How to Respond**

Do not agree to a board-ordered evaluation without first consulting counsel about the examiner's independence, the scope of the evaluation, and how the results will be used. We help professionals navigate the evaluation process in a way that protects their rights while demonstrating good faith cooperation.`,
    defenses: [
      "Independent evaluation by qualified mental health professional confirms no impairment",
      "Complaint is based on exaggerated or inaccurate reporting by a disgruntled party",
      "Licensee is receiving appropriate treatment and impairment is well managed",
      "Prior professional record shows no pattern of impairment-related conduct",
      "Licensee cooperated with evaluation and treatment voluntarily",
    ],
    boardFocus:
      "Whether the licensee's condition impairs their ability to practice safely, and whether they are receiving adequate treatment and willing to cooperate with monitoring.",
    responseKey:
      "Consult counsel about the scope and independence of any board-ordered evaluation before agreeing to it; independent evaluation that supports fitness is the most effective defense.",
  },
  {
    slug: "reinstatement",
    name: "Reinstatement After Suspension",
    title: "Reinstatement After Suspension",
    category: "procedure",
    summary:
      "Reinstating a suspended or revoked professional license requires a formal petition demonstrating rehabilitation, fitness to practice, and compliance with all conditions of the prior disciplinary order.",
    body: `Reinstatement after license suspension or revocation is a formal proceeding that requires more than simply serving the suspension period. Most state licensing boards require a formal petition for reinstatement supported by evidence that the licensee has: complied with all conditions of the disciplinary order; addressed the underlying conduct that led to discipline; demonstrated rehabilitation and fitness to return to practice; completed any required continuing education, treatment, or probation; and satisfied any restitution obligations.

For attorneys, the reinstatement burden is particularly high after disbarment — most states require a petitioner to show by clear and convincing evidence that they have the moral character and fitness to resume practice. For healthcare professionals, reinstatement petitions typically require independent mental health and/or substance abuse evaluations, letters from treatment providers, and sometimes an initial period of supervised practice.

**What the Board Looks For**

Boards examine: whether the licensee has complied fully with all conditions of the prior disciplinary order; what changes in conduct, attitude, or circumstance have occurred since the discipline; whether any complaints have been filed since the suspension; whether the licensee is current on all CLE, fee, and registration requirements; and whether the licensee can demonstrate genuine rehabilitation and remorse.

**What to Prepare**

The reinstatement petition should include: a detailed personal statement about the conduct that led to discipline and what has changed; letters from supervisors, colleagues, treatment providers, and community members; documentation of compliance with all disciplinary conditions; evidence of continuing professional development during the suspension period; and a realistic plan for monitored return to practice.

**How to File**

The reinstatement process begins with a formal petition to the licensing board. Timing is important — many boards have minimum periods before reinstatement can be sought after disbarment or revocation, and premature filing is treated adversely. We help professionals time their petitions strategically and build the strongest possible reinstatement record.`,
    defenses: [
      "Full compliance with all conditions of the prior disciplinary order",
      "Genuine rehabilitation demonstrated by treatment records, sobriety, and community involvement",
      "No new complaints or adverse actions since the suspension",
      "Strong letters from supervisors, colleagues, and treatment providers",
      "Realistic, detailed plan for monitored return to practice",
    ],
    boardFocus:
      "Whether the petitioner has genuinely rehabilitated, complied with all disciplinary conditions, and poses no risk to the public upon reinstatement.",
    responseKey:
      "File only when genuinely ready — premature petitions are treated adversely and can extend the rehabilitation period; build an extensive documented record before filing.",
  },
  {
    slug: "reciprocal-discipline",
    name: "Reciprocal Discipline",
    title: "Reciprocal Discipline",
    category: "procedure",
    summary:
      "Reciprocal discipline proceedings — triggered by discipline imposed by another state or court — can result in automatic suspension in every state where you hold a license unless you challenge the imposition.",
    body: `When a licensed professional is disciplined by one licensing authority — a state bar, medical board, or other regulatory body — most other states where that professional holds a license will initiate reciprocal discipline proceedings. Most states have rules providing that discipline imposed elsewhere should be given effect without a full independent investigation, unless the professional can demonstrate specific grounds for challenging the imposition.

For attorneys, the grounds for challenging reciprocal discipline are generally limited: the prior proceeding lacked due process, the imposed discipline would result in a grave injustice, or the conduct involved does not constitute misconduct under the rules of the reciprocal state. The burden is on the attorney to demonstrate that one of these grounds applies.

**What the Board Looks For**

The reciprocal state examines: whether the prior proceeding afforded due process; whether the discipline imposed is consistent with what the reciprocal state would impose for similar conduct under its own rules; and whether there are grounds to deviate from the reciprocal discipline.

**Defenses**

Reciprocal discipline is one of the areas where early, proactive engagement is most important. If discipline is imposed in one state and you hold licenses in multiple states, you must immediately assess the exposure in each reciprocal state and develop a coordinated response strategy. Arguing that the imposing jurisdiction's proceeding lacked due process, or that its rules differ materially from the reciprocal state's rules, requires a sophisticated argument that must be made before the reciprocal proceeding is finalized.

**How to Respond**

You will typically receive notice of a reciprocal discipline proceeding with a short deadline to submit grounds for challenging imposition. Do not miss this deadline — missing it typically results in automatic entry of reciprocal discipline without further proceedings.`,
    defenses: [
      "Prior proceeding in the imposing state lacked due process",
      "Conduct at issue would not constitute misconduct under the reciprocal state's rules",
      "Discipline imposed by the other state is substantially greater than what the reciprocal state would impose",
      "Imposition would result in grave injustice on the specific facts",
      "Licensee has already addressed the underlying issues through rehabilitation and remediation",
    ],
    boardFocus:
      "Whether the prior proceeding afforded due process, whether the discipline is consistent with the reciprocal state's own rules, and whether any grounds for deviation exist.",
    responseKey:
      "Never miss the response deadline in a reciprocal discipline proceeding — missing it results in automatic entry of discipline without further opportunity to be heard.",
  },
  {
    slug: "interim-suspension",
    name: "Interim Suspension",
    title: "Interim Suspension",
    category: "procedure",
    summary:
      "An interim suspension — imposed before a full disciplinary hearing — can remove a professional from practice immediately, and responding effectively requires urgent legal intervention.",
    body: `Most licensing boards have the authority to impose an interim or temporary suspension before a full disciplinary hearing when they conclude that there is an immediate threat to the public. For attorneys, interim suspensions typically require a showing of imminent harm — ongoing depletion of trust accounts, a criminal conviction for a serious crime, or an incapacity that makes continued practice an immediate risk. For healthcare professionals, interim suspensions often follow emergency situations: an allegation of impaired practice, a catastrophic patient outcome, or a criminal arrest.

Interim suspensions are among the most urgent situations in licensing defense because they take effect immediately — often within days of the order — and because the standards for granting them differ from the standards for final discipline. Many professionals who fight interim suspensions successfully are later vindicated in the full proceeding, because the evidence available at the interim stage is often incomplete.

**What the Board Looks For**

At the interim stage, the board looks for: whether there is probable cause to believe that the licensee poses an immediate threat to the public; whether waiting for a full hearing before imposing restrictions would create an unacceptable risk; and whether there are conditions short of suspension — such as practice restrictions or monitoring — that could adequately protect the public in the interim.

**Defenses**

The most important defense to an interim suspension is speed. Most boards provide an opportunity for a response before the suspension takes effect, and that response window — often 24 to 72 hours — is the critical moment for the defense. We have handled emergency interim suspension responses and know what it takes to move quickly. Arguments that the evidence does not meet the imminent threat standard, or that practice restrictions short of suspension are adequate protection, are the core of most interim suspension defenses.

**How to Respond**

Contact counsel immediately upon receiving notice of an interim suspension proceeding. Do not wait. Every hour matters in an interim suspension response.`,
    defenses: [
      "Evidence does not meet the imminent public threat standard required for interim suspension",
      "Practice restrictions short of suspension would adequately protect the public",
      "Allegations are unverified and the case against the licensee is not yet proven",
      "Licensee voluntarily agreed to interim practice restrictions pending full hearing",
      "Interim suspension would cause severe economic harm disproportionate to the identified risk",
    ],
    boardFocus:
      "Whether the licensee poses an immediate, not merely speculative, threat to the public that cannot be adequately addressed by conditions short of suspension.",
    responseKey:
      "Contact counsel immediately — the response window is typically 24–72 hours and missing it results in automatic interim suspension without further hearing.",
  },
  {
    slug: "emergency-suspension",
    name: "Emergency Suspension",
    title: "Emergency Suspension",
    category: "procedure",
    summary:
      "An emergency suspension imposed without prior notice — typically following a criminal arrest, a catastrophic patient event, or evidence of immediate public danger — requires an emergency legal response within hours.",
    body: `Some licensing boards have the authority to impose emergency suspensions without prior notice when they determine that the immediate protection of the public requires it. These ex parte emergency orders can go into effect the moment they are signed — stripping the licensee of their ability to practice before they have had any opportunity to respond. Virtually all boards that use emergency suspensions are required to provide a post-suspension hearing within a short period (typically 10 to 30 days).

Emergency suspensions most commonly follow: criminal arrests for serious offenses (drug crimes, violence, fraud, sexual offenses); catastrophic patient events that generate immediate media attention; discovery of ongoing trust account depletion; and situations where the licensee's impairment is so apparent that waiting for a full hearing would itself be dangerous.

**What the Board Looks For**

The board's emergency suspension order will identify the specific basis for the emergency finding. At the post-suspension hearing, the board must establish: that the emergency conditions identified in the order actually exist; that the emergency suspension is the minimum restriction necessary to protect the public; and that the proceeding leading to the emergency order complied with applicable procedural requirements.

**Defenses**

The defense of an emergency suspension focuses primarily on the post-emergency hearing, where the full record can be developed. At that hearing, the licensee has the opportunity to present evidence challenging both the factual basis for the suspension and the board's conclusion that emergency action was warranted. We request the post-hearing immediately upon notice of an emergency suspension.

**How to Respond**

The moment you receive an emergency suspension order, contact counsel. The post-suspension hearing request must typically be filed within a very short window — often 5 to 15 days — and must be accompanied by the licensee's full response to the emergency suspension's factual basis.`,
    defenses: [
      "Factual basis for the emergency suspension is inaccurate or incomplete",
      "Emergency suspension standard — immediate public danger — is not met on the actual facts",
      "Less restrictive conditions would adequately protect the public pending full hearing",
      "Emergency order did not comply with procedural requirements of applicable law",
      "Criminal arrest that triggered suspension is being contested and charges may not be sustained",
    ],
    boardFocus:
      "Whether the emergency conditions actually exist and whether emergency suspension — rather than conditions — was the minimum necessary action.",
    responseKey:
      "Request a post-suspension hearing immediately upon receipt of the emergency order — the request window is typically 5–15 days and missing it can waive the right to contest.",
  },
];
