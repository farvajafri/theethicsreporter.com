export interface GuideData {
  slug: string;
  title: string;
  description: string;
  content: string;
  faqs: { q: string; a: string }[];
}

export const guidesData: GuideData[] = [
  {
    slug: "file-bar-complaint",
    title: "How to File a Bar Complaint Against Your Lawyer",
    description: "A step-by-step guide to filing a formal bar complaint against an attorney who has engaged in misconduct, negligence, or unethical behavior.",
    content: `<h2>What Is a Bar Complaint?</h2>
<p>A bar complaint is a formal written complaint submitted to your state's attorney discipline authority alleging that an attorney has violated the professional conduct rules that govern lawyers in your state. Every state has a bar discipline authority — typically administered by the state bar association or the state supreme court — that is responsible for investigating complaints and imposing discipline on attorneys who engage in misconduct.</p>
<p>Bar complaints are distinct from legal malpractice lawsuits. A bar complaint is a disciplinary proceeding that may result in the attorney being publicly censured, suspended, or disbarred. It does not result in monetary compensation for you. If you want compensation for harm caused by attorney misconduct, you may need to pursue a separate legal malpractice claim.</p>

<h2>When Should You File a Bar Complaint?</h2>
<p>Consider filing a bar complaint when an attorney has:</p>
<ul>
<li>Stolen or misappropriated your money or property</li>
<li>Abandoned your case without notice or proper withdrawal</li>
<li>Failed to communicate with you for extended periods despite your attempts to contact them</li>
<li>Lied to you, the court, or opposing counsel</li>
<li>Charged clearly unreasonable fees</li>
<li>Represented you while having an undisclosed conflict of interest</li>
<li>Violated a court order in your case</li>
<li>Engaged in criminal conduct related to your matter</li>
</ul>

<h2>Step-by-Step: How to File a Bar Complaint</h2>
<p><strong>Step 1: Gather your documentation.</strong> Collect every document relevant to your complaint: your retainer agreement, all invoices and billing statements, all written communications (emails, letters, text messages), court filings, and any evidence of the specific misconduct. Organize documents chronologically. The strength of your complaint depends heavily on documentation.</p>
<p><strong>Step 2: Find your state's bar discipline authority.</strong> Each state has its own system. Use our <a href="/state">state-by-state directory</a> to find the correct authority for your state. Most state bars have an online complaint submission system. Some require paper forms.</p>
<p><strong>Step 3: Write your complaint.</strong> Describe the attorney's conduct factually, specifically, and chronologically. Avoid emotional language — focus on what happened, when it happened, and how it violated the attorney's professional obligations. Identify the specific rules of professional conduct you believe were violated (most state bars publish their rules online).</p>
<p><strong>Step 4: Submit your complaint.</strong> Submit your complaint with all supporting documentation. Keep a copy of everything you submit. Note the date of submission and any confirmation number you receive.</p>
<p><strong>Step 5: Cooperate with the investigation.</strong> If your complaint is accepted for investigation, you may be asked to provide additional information, respond to the attorney's answer to your complaint, or participate in proceedings. Respond promptly and completely.</p>
<p><strong>Step 6: Understand the timeline.</strong> Bar discipline proceedings are slow. A full investigation and hearing process can take one to three years. Most complaints are dismissed at intake or after a preliminary review. Do not expect quick results.</p>

<h2>What Happens After You File</h2>
<p>After you submit your complaint, the bar's intake staff will review it to determine whether it falls within their jurisdiction and whether the conduct alleged, if true, would constitute a violation of the professional conduct rules. Many complaints are dismissed at this stage — either because the conduct does not constitute a rule violation or because there is insufficient evidence to proceed.</p>
<p>If your complaint passes intake, it will be assigned to a staff attorney or investigator who will conduct a preliminary investigation. The attorney will be notified and given an opportunity to respond. You may be asked to provide additional information.</p>
<p>If the preliminary investigation finds sufficient cause, the matter may proceed to a formal disciplinary hearing before a hearing panel. Hearings are conducted like abbreviated court proceedings, with witnesses and evidence. The hearing panel issues a recommendation that is reviewed by the full disciplinary board and, ultimately, the state supreme court.</p>`,
    faqs: [
      { q: "Will filing a bar complaint get my money back?", a: "Not directly. Bar discipline proceedings are disciplinary in nature and do not result in monetary compensation. However, some disciplinary orders include restitution requirements, and many states have Client Protection Funds that can compensate victims of attorney theft. For direct compensation, you may need to pursue a legal malpractice lawsuit." },
      { q: "Can I file a bar complaint anonymously?", a: "Most state bars require that complaints be signed and include your contact information. Anonymous complaints are generally not accepted or are given lower priority. The bar needs to be able to contact you for additional information during the investigation." },
      { q: "What if my complaint is dismissed?", a: "A dismissal at the intake or preliminary investigation stage does not necessarily mean the attorney did nothing wrong — it may mean the bar determined the conduct did not rise to the level of a rule violation, the evidence was insufficient, or the matter falls outside their jurisdiction. You can often request reconsideration of a dismissal." },
      { q: "Can I file a complaint against an attorney in another state?", a: "Yes, but you need to file with the bar in the state where the attorney is licensed and where the misconduct occurred. If the attorney is licensed in multiple states, you may be able to file in any of those states." },
    ],
  },
  {
    slug: "file-judicial-complaint",
    title: "How to File a Complaint Against a Judge",
    description: "A step-by-step guide to filing a formal complaint against a judge for misconduct, bias, or conduct unbecoming of the judiciary.",
    content: `<h2>Can You Actually Complain About a Judge?</h2>
<p>Yes — and many people don't realize this. Every state has a judicial conduct commission or similar body that investigates complaints about judges. Federal judges can be complained about to the judicial council of the relevant federal circuit. While judicial accountability remains a significant systemic problem — judicial conduct proceedings are largely confidential, and meaningful discipline is rare — the formal complaint process exists and should be used when judges engage in genuine misconduct.</p>

<h2>What Counts as Judicial Misconduct?</h2>
<p>Judicial misconduct includes conduct that violates the Code of Judicial Conduct, which has been adopted in some form by every state. Common categories include:</p>
<ul>
<li>Bias or the appearance of bias toward a party, attorney, or class of persons</li>
<li>Failure to recuse from a case where the judge has a conflict of interest</li>
<li>Improper ex parte communications (speaking with one party outside the presence of the other)</li>
<li>Harassment or inappropriate conduct toward attorneys, litigants, or court staff</li>
<li>Abuse of contempt power or other procedural mechanisms</li>
<li>Corruption, bribery, or misuse of judicial office</li>
<li>Conduct that brings the judiciary into disrepute</li>
</ul>
<p>Important: Disagreeing with a judge's legal ruling is generally not judicial misconduct. If you believe a judge made a legal error, the appropriate remedy is an appeal, not a conduct complaint.</p>

<h2>Step-by-Step: Filing a Judicial Conduct Complaint</h2>
<p><strong>Step 1: Identify the right body.</strong> Use our <a href="/state">state directory</a> to find the judicial conduct commission for your state. For federal judges, find the judicial council for the relevant circuit at uscourts.gov.</p>
<p><strong>Step 2: Document everything.</strong> Gather court transcripts (if available), written orders, case numbers, dates, and specific quotes or descriptions of the conduct you are reporting. The more specific and documented your complaint, the better.</p>
<p><strong>Step 3: Write your complaint.</strong> Describe the conduct factually and specifically. Identify the case, the date, what happened, who was present, and which provisions of the Code of Judicial Conduct you believe were violated. Avoid emotional language and focus on observable facts.</p>
<p><strong>Step 4: Submit and follow up.</strong> Submit your complaint to the appropriate commission. Keep copies of everything. Note the confirmation you receive.</p>
<p><strong>Step 5: Understand confidentiality.</strong> Unlike bar discipline proceedings, judicial conduct proceedings are almost always confidential until formal charges are filed. You may receive little or no information about the progress of the investigation.</p>`,
    faqs: [
      { q: "What can actually happen to a judge who is found to have engaged in misconduct?", a: "Depending on the state and the severity of the conduct, a judge can receive a private admonishment, a public censure, a suspension, or removal from the bench. Removal is rare but does occur. Federal judges can also be impeached by Congress, though this has happened only a handful of times in American history." },
      { q: "Can I file a complaint about a judge who ruled against me?", a: "You can, but if your complaint is solely based on disagreement with the judge's legal ruling, it is unlikely to be investigated. Conduct commissions investigate violations of the Code of Judicial Conduct, not legal errors. Legal errors are addressed through the appeals process." },
      { q: "Will the judge find out I filed a complaint?", a: "In most cases, yes — the judge will be notified and given an opportunity to respond. However, the commission's proceedings are generally confidential, and the judge is typically prohibited from taking any retaliatory action against you based on a complaint." },
      { q: "Is there a deadline for filing a judicial conduct complaint?", a: "Most states do not have strict statutes of limitations for judicial conduct complaints, but older complaints may be given lower priority or be more difficult to investigate. File as soon as possible after the conduct occurs." },
    ],
  },
  {
    slug: "what-happens-when-lawyer-disbarred",
    title: "What Happens When a Lawyer is Disbarred?",
    description: "A complete explanation of what disbarment means, what happens to the disbarred attorney and their clients, and what rights you have if your lawyer is disbarred.",
    content: `<h2>What Is Disbarment?</h2>
<p>Disbarment is the permanent revocation of an attorney's license to practice law. It is the most severe sanction the legal profession can impose, and it is reserved for the most serious misconduct: theft of client funds, criminal convictions, fraud, or a pattern of serious professional violations that demonstrates an attorney is unfit to continue practicing law.</p>
<p>A disbarred attorney may not represent clients, appear in court, hold themselves out as an attorney, or engage in the practice of law in any capacity. In many states, disbarment is permanent — the attorney may never reapply for admission to the bar. In others, a disbarred attorney may petition for reinstatement after a waiting period, typically five to seven years, but reinstatement is granted only in rare circumstances.</p>

<h2>What Happens to Clients of a Disbarred Attorney?</h2>
<p>If your attorney is disbarred while your matter is pending, you are entitled to:</p>
<ul>
<li><strong>Your complete file.</strong> The disbarred attorney must turn over your file to you within a specified time period. You have the right to all documents, correspondence, and work product related to your matter.</li>
<li><strong>Refund of unearned fees.</strong> Any fees paid for work not yet performed must be returned to you. This is often difficult to recover in practice, particularly if the attorney has already spent the money.</li>
<li><strong>Time to find new counsel.</strong> Courts will generally grant reasonable continuances to clients whose attorneys have been disbarred, providing time to retain new representation.</li>
</ul>
<p>You should act quickly if your attorney is disbarred. Contact the state bar to understand the timeline and your rights. If you have a pending court deadline, contact the court immediately.</p>

<h2>What Happens to the Disbarred Attorney?</h2>
<p>A disbarred attorney must immediately cease practicing law. They must notify all current clients, opposing counsel, and courts where they have pending matters. They must resign from any positions that require bar membership. Their name is removed from the state bar's roll of active attorneys, and the disbarment is typically a matter of public record.</p>
<p>In many cases, disbarment follows or accompanies criminal prosecution — particularly in cases involving theft, fraud, or other criminal conduct. A disbarred attorney may face civil liability as well as bar discipline.</p>`,
    faqs: [
      { q: "Can I get my money back if my lawyer is disbarred?", a: "Disciplinary orders sometimes include restitution requirements, but collecting on them is difficult if the attorney has no money. Most states have Client Protection Funds — programs that compensate victims of attorney theft up to a maximum amount. Contact your state bar to learn about the Client Protection Fund and how to apply." },
      { q: "How do I find out if my lawyer has been disbarred?", a: "Every state bar maintains a public record of attorney discipline, including disbarments. You can search the bar's online directory. The American Bar Association also maintains a National Lawyer Regulatory Data Bank, though it is not publicly accessible." },
      { q: "Can a disbarred lawyer ever practice law again?", a: "In most states, a disbarred attorney can petition for reinstatement after a waiting period, but reinstatement is rarely granted. The attorney must demonstrate rehabilitation, fitness to practice, and that reinstatement is in the public interest. Many states treat disbarment as effectively permanent." },
      { q: "What if my lawyer abandons my case before being officially disbarred?", a: "Attorney abandonment is itself a basis for a bar complaint. If your attorney has stopped responding, missed deadlines, or failed to pursue your case, file a bar complaint immediately. You may also need to take action to protect your legal rights directly — contact the court where your matter is pending." },
    ],
  },
  {
    slug: "attorney-discipline-process",
    title: "How Attorney Discipline Works: A Complete Guide",
    description: "A comprehensive guide to the attorney discipline system — from complaint filing through investigation, hearings, and final disposition.",
    content: `<h2>The Structure of Attorney Discipline in the United States</h2>
<p>Attorney discipline in the United States is administered at the state level. Each state has its own system, governed by its own rules of professional conduct and its own procedural rules. Despite differences in structure, most state discipline systems follow a broadly similar process.</p>
<p>In most states, discipline is administered by the state supreme court, which has inherent authority over the practice of law within the state. The court typically delegates day-to-day disciplinary administration to a board of bar overseers, disciplinary commission, or similar body.</p>

<h2>The Discipline Process: Step by Step</h2>
<p><strong>Stage 1: Complaint Filing.</strong> The process begins when someone files a written complaint with the state's attorney discipline authority. Complaints can be filed by clients, opposing parties, opposing counsel, courts, or other attorneys. In some cases, the discipline authority initiates proceedings on its own based on criminal convictions or other public information.</p>
<p><strong>Stage 2: Intake Review.</strong> Staff attorneys review incoming complaints to determine whether they fall within the discipline authority's jurisdiction and whether the conduct alleged, if true, would constitute a rule violation. A significant percentage of complaints — often the majority — are dismissed at this stage as outside jurisdiction or failing to state a rule violation.</p>
<p><strong>Stage 3: Preliminary Investigation.</strong> Complaints that pass intake are assigned to an investigator. The attorney is notified and given an opportunity to respond. The investigator may interview witnesses, review documents, and gather evidence. At the conclusion of the preliminary investigation, the investigator makes a recommendation: dismiss, issue an admonition, or proceed to formal proceedings.</p>
<p><strong>Stage 4: Formal Proceedings.</strong> If the matter proceeds to formal proceedings, a formal complaint (analogous to an indictment) is filed against the attorney. The attorney has the right to a hearing before a hearing panel, typically composed of attorneys and sometimes lay members. The hearing is conducted like an abbreviated civil trial, with witnesses and documentary evidence.</p>
<p><strong>Stage 5: Sanctions.</strong> The hearing panel issues findings of fact and a recommendation for sanction. The recommendation is reviewed by the full disciplinary board and ultimately by the state supreme court, which issues the final order. Sanctions range from private admonishment to disbarment.</p>`,
    faqs: [
      { q: "How long does the attorney discipline process take?", a: "A full disciplinary proceeding can take anywhere from one to four years, depending on the state and the complexity of the matter. Preliminary review typically takes several months. Formal proceedings, if they occur, take considerably longer." },
      { q: "What percentage of bar complaints result in discipline?", a: "The percentage varies by state, but across most state discipline systems, only a small fraction of complaints — often less than 5% — result in any public discipline. The majority are dismissed at intake or after preliminary investigation." },
      { q: "Are discipline proceedings public?", a: "Most states make the final disposition of discipline cases public, including the attorney's name and the sanctions imposed. Preliminary proceedings are typically confidential. Private admonishments are generally not made public." },
      { q: "What is a private admonishment?", a: "A private admonishment (sometimes called a private reprimand or admonition) is the least serious form of formal discipline. It is issued privately — not made public — and appears on no public record. Critics argue that private admonishments are used too frequently in cases that warrant public discipline." },
    ],
  },
  {
    slug: "lawyer-stole-money",
    title: "What to Do If Your Lawyer Stole Your Money",
    description: "Step-by-step guidance for victims of attorney theft — how to report it, how to recover funds, and how to protect yourself going forward.",
    content: `<h2>You Are Not Alone</h2>
<p>Attorney theft is more common than most people realize. Every year, attorneys across the United States are disciplined, suspended, and disbarred for stealing from clients — taking money from trust accounts, pocketing settlement proceeds, double-billing, charging for work never performed, or simply refusing to return unearned fees. If your lawyer has stolen from you, there are concrete steps you can take.</p>

<h2>Step 1: Secure Your Documentation</h2>
<p>Before doing anything else, gather every document that shows money changed hands: your retainer agreement, every invoice you received, every check you wrote or payment you made, every bank statement showing transfers to the attorney, every settlement document, and all communications about fees. This documentation is critical for every step that follows.</p>

<h2>Step 2: File a Bar Complaint</h2>
<p>File a bar complaint with your state's attorney discipline authority immediately. Theft of client funds — known as misappropriation of client funds or IOLTA violations — is among the most serious misconduct the bar investigates, and complaints involving theft are often prioritized over other types of complaints. See our guide to <a href="/how-to/file-bar-complaint">filing a bar complaint</a> for step-by-step instructions.</p>

<h2>Step 3: Apply to the Client Protection Fund</h2>
<p>Every state has a Client Protection Fund (also called a Lawyers' Fund for Client Protection or similar) that compensates victims of attorney theft. These funds are financed by attorney registration fees and are designed to make victims whole — up to a maximum amount that varies by state (typically $50,000 to $500,000). Contact your state bar to obtain an application and the applicable maximum.</p>

<h2>Step 4: Consider Criminal Reporting</h2>
<p>Attorney theft is a crime. If your lawyer stole money from you, you can report the theft to local law enforcement (police or sheriff), your county district attorney, your state attorney general, or — if wire transfers were involved — the FBI. Criminal prosecution is not guaranteed, but a criminal report creates an official record and may prompt more aggressive action by bar discipline authorities.</p>

<h2>Step 5: Consult a Legal Malpractice Attorney</h2>
<p>A legal malpractice lawsuit may allow you to recover compensation for the theft and any consequential damages. Most legal malpractice attorneys offer free consultations. Be aware that legal malpractice claims have statutes of limitations that vary by state — typically one to three years from when you discovered or should have discovered the misconduct.</p>`,
    faqs: [
      { q: "How much can I recover from a Client Protection Fund?", a: "The maximum varies significantly by state. Some states cap recovery at $50,000; others allow up to $500,000 or more. The fund typically covers direct theft but may not cover consequential damages (e.g., lost business opportunities resulting from the attorney's theft). Contact your state bar for the specific limits." },
      { q: "What if my lawyer says they spent the money on my case?", a: "Attorneys are required to keep detailed records of all funds received and all expenses paid on a client's behalf. If your attorney claims to have spent your money on your case, demand a complete accounting with receipts. An attorney who cannot produce a proper accounting may have violated their professional obligations regardless of where the money actually went." },
      { q: "Can I sue my lawyer even if they are disbarred?", a: "Yes. Disbarment is a disciplinary sanction, not a bar to civil lawsuits. You can pursue a legal malpractice or conversion claim against a disbarred attorney in civil court. Collecting on a judgment may be difficult if the attorney has no assets, but the lawsuit is available to you." },
      { q: "What if my lawyer stole settlement money?", a: "Settlement fund theft is particularly serious. An attorney is required to promptly disburse settlement funds to a client after receiving them. If your attorney received a settlement and did not pay you your share, file a bar complaint immediately and apply to the Client Protection Fund. This is one of the most common and most serious forms of attorney theft." },
    ],
  },
  {
    slug: "legal-malpractice-vs-bar-complaint",
    title: "Legal Malpractice vs. Bar Complaint: Key Differences",
    description: "Understanding the difference between a legal malpractice lawsuit and a bar complaint — when to use each, and what each can accomplish.",
    content: `<h2>Two Different Systems for Attorney Accountability</h2>
<p>When an attorney harms a client through misconduct or negligence, the client has two separate avenues for redress: a bar complaint through the attorney discipline system, and a legal malpractice lawsuit through the civil court system. These are distinct processes with different purposes, different standards, and different outcomes.</p>

<h2>The Bar Complaint: Disciplinary, Not Compensatory</h2>
<p>A bar complaint is a request that the attorney discipline authority investigate an attorney's conduct and impose professional discipline. The purpose is regulatory: to protect the public from bad attorneys by sanctioning or removing attorneys who violate professional conduct rules.</p>
<p>A bar complaint does not result in money for you. Even if the attorney is disciplined, censured, suspended, or disbarred as a result of your complaint, you will not receive compensation through the disciplinary process (with the exception of some disciplinary orders that include restitution requirements, which are often difficult to enforce).</p>
<p>The standard for discipline is whether the attorney violated the rules of professional conduct — a different standard from civil negligence.</p>

<h2>The Malpractice Lawsuit: Civil, Compensatory</h2>
<p>A legal malpractice lawsuit is a civil lawsuit seeking monetary compensation for harm caused by attorney negligence or intentional misconduct. To succeed in a legal malpractice claim, you generally must prove:</p>
<ol>
<li>The attorney owed you a duty of care (typically established by the attorney-client relationship)</li>
<li>The attorney breached that duty by failing to exercise the skill and care that a competent attorney would exercise under similar circumstances</li>
<li>The breach caused you harm (the "case within a case" — you must often prove you would have prevailed in the underlying matter but for the attorney's negligence)</li>
<li>You suffered measurable damages as a result</li>
</ol>

<h2>Which Should You Choose?</h2>
<p>The two processes are not mutually exclusive — you can pursue both simultaneously. In practice:</p>
<ul>
<li>File a <strong>bar complaint</strong> if you want to protect other clients from this attorney, if the misconduct was intentional (theft, fraud, dishonesty), or if you want the attorney held professionally accountable regardless of whether you can prove damages.</li>
<li>File a <strong>malpractice lawsuit</strong> if you suffered financial harm and can demonstrate the attorney's negligence caused that harm. This is the path to monetary compensation.</li>
</ul>`,
    faqs: [
      { q: "Can I use a bar complaint to help my malpractice case?", a: "Possibly. A finding of professional misconduct in a disciplinary proceeding may be admissible in a civil malpractice case as evidence that the attorney violated the applicable standard of care. However, disciplinary proceedings are not binding on civil courts, and a bar complaint dismissal does not preclude a malpractice claim." },
      { q: "What is the statute of limitations for a legal malpractice claim?", a: "Statutes of limitations for legal malpractice vary by state, typically ranging from one to four years. The clock usually starts when the client discovered or should have discovered the malpractice. Some states use the 'continuous representation rule,' which delays the statute of limitations until the attorney's representation ends. Consult a legal malpractice attorney promptly." },
      { q: "Do I need to prove I would have won my case to succeed in a malpractice claim?", a: "In litigation-related malpractice claims, yes — you typically must prove the 'case within a case,' showing that you would have prevailed in the underlying matter but for the attorney's negligence. This is one of the most challenging elements of legal malpractice litigation. In transactional malpractice (e.g., a botched contract), the standard may be different." },
      { q: "Can I represent myself in a bar complaint but hire an attorney for the malpractice claim?", a: "Yes. Bar complaints do not require attorney representation — they are administrative proceedings you can pursue yourself. Legal malpractice lawsuits are complex civil litigation that almost always benefit from attorney representation, though malpractice attorneys who handle these cases typically work on contingency." },
    ],
  },
  {
    slug: "check-lawyer-discipline-record",
    title: "How to Check If Your Lawyer Has Been Disciplined",
    description: "How to look up an attorney's discipline history before hiring them — or to check on your current lawyer's record.",
    content: `<h2>Why You Should Check Before You Hire</h2>
<p>Attorney discipline records are public — and checking them before hiring a lawyer takes less than five minutes. Yet most clients never do it. A quick search of your state bar's online directory can reveal whether an attorney has been disciplined, suspended, disbarred, or the subject of other public sanctions. This information can be critical in choosing representation.</p>

<h2>How to Search Attorney Discipline Records</h2>
<p><strong>Step 1: Find your state bar's attorney search tool.</strong> Every state bar maintains a public directory that allows you to search licensed attorneys by name. Use our <a href="/state">state directory</a> to find the link for your state.</p>
<p><strong>Step 2: Search by name.</strong> Enter the attorney's full name. Note that some attorneys have common names — verify the result matches the attorney you are researching by checking the bar number, address, and law school if listed.</p>
<p><strong>Step 3: Review the discipline history.</strong> The search result will show the attorney's license status (active, inactive, suspended, disbarred) and, in most states, a history of any public discipline. Note that private admonishments are typically not shown in public records.</p>
<p><strong>Step 4: Check multiple states if applicable.</strong> If the attorney has practiced in multiple states, check the bar records in each state. Discipline in one state may not be reported in another, though many states have reciprocal discipline rules.</p>
<p><strong>Step 5: Use the ABA's national resources.</strong> The American Bar Association's Center for Professional Responsibility maintains links to all state bar discipline lookup tools at americanbar.org.</p>

<h2>What to Look For</h2>
<p>Red flags in an attorney's discipline history include:</p>
<ul>
<li>Prior suspension for client fund misappropriation</li>
<li>Multiple public reprimands or censures</li>
<li>Discipline for dishonesty, fraud, or misrepresentation</li>
<li>Prior disbarment (even if reinstated)</li>
<li>Current "inactive" or "administrative suspension" status (may indicate failure to pay dues or complete CLE, or may indicate interim suspension for serious misconduct)</li>
</ul>`,
    faqs: [
      { q: "Are all discipline records public?", a: "Public discipline — censure, suspension, disbarment — is generally a matter of public record. Private admonishments and dismissed complaints are typically not public. The public record may not reflect the full picture of an attorney's disciplinary history." },
      { q: "Can I check if a lawyer is licensed in my state?", a: "Yes. Every state bar's online directory shows whether an attorney is currently licensed and in good standing. An attorney who holds themselves out as licensed but appears in inactive or suspended status may be engaging in the unauthorized practice of law." },
      { q: "What does 'administrative suspension' mean?", a: "Administrative suspension typically means the attorney has been suspended for failure to pay bar dues, failure to complete mandatory continuing legal education, or similar administrative non-compliance. It does not necessarily indicate misconduct, but it does mean the attorney is not currently authorized to practice law." },
      { q: "Is there a national database of disciplined attorneys?", a: "The ABA maintains the National Lawyer Regulatory Data Bank, which tracks attorney discipline across states, but it is not publicly accessible. For public records, you must check each state bar individually. Some states share discipline information with others through reciprocal discipline processes." },
    ],
  },
  {
    slug: "report-judge-misconduct",
    title: "How to Report Judicial Misconduct",
    description: "A practical guide to reporting misconduct by state and federal judges through the appropriate judicial conduct channels.",
    content: `<h2>Judges Are Not Above Accountability</h2>
<p>The American legal system grants judges extraordinary power and significant independence from oversight. But judicial independence is not the same as judicial immunity from accountability. Every state has a judicial conduct commission, and federal courts have judicial councils, specifically to receive and investigate complaints about judicial conduct. These systems are imperfect — proceedings are largely confidential, and meaningful discipline is rare — but they exist, and they should be used.</p>

<h2>State Court Judges</h2>
<p>Complaints about state court judges — including trial judges, appellate judges, magistrates, and commissioners — should be filed with the judicial conduct commission in the state where the judge serves. Use our <a href="/state">state directory</a> to find the correct commission for your state.</p>
<p>Most state judicial conduct commissions accept written complaints. Many have online submission forms. A complaint should include:</p>
<ul>
<li>The judge's full name, title, and court</li>
<li>The case name and number (if applicable)</li>
<li>A factual description of the conduct, with specific dates and quotes where possible</li>
<li>An explanation of which provisions of the Code of Judicial Conduct you believe were violated</li>
<li>Any supporting documentation (transcripts, orders, communications)</li>
</ul>

<h2>Federal Court Judges</h2>
<p>Complaints about federal district court judges and circuit court judges should be filed with the judicial council of the relevant federal circuit. A list of judicial councils and their contact information is available at uscourts.gov. Each judicial council has a clerk's office that receives complaints.</p>
<p>Complaints about Supreme Court justices are handled differently — there is no external body with authority to discipline Supreme Court justices. Impeachment by Congress is the constitutional mechanism for removal, though it has been used only once in American history (Justice Samuel Chase, who was acquitted).</p>

<h2>What Judicial Conduct Commissions Can and Cannot Do</h2>
<p>State judicial conduct commissions can issue private admonishments, public censures, suspensions, and recommend removal from the bench. Removal typically requires action by the legislature or the state supreme court. Federal judicial councils can refer matters to the Judicial Conference, which can recommend impeachment to Congress — a process that is virtually never used.</p>
<p>What judicial conduct commissions cannot do: reverse a judge's legal ruling, award you money, or retry your case. If you believe a judge made a legal error, the appropriate remedy is an appeal.</p>`,
    faqs: [
      { q: "Will filing a judicial conduct complaint affect my pending case?", a: "Technically, a judge is prohibited from retaliating against you for filing a conduct complaint. In practice, if you have a pending case before the same judge, you may want to consider whether the complaint could affect the proceedings. Many attorneys advise waiting until a case is concluded before filing a conduct complaint about the judge." },
      { q: "Can I report a judge for ruling against me?", a: "You can file a complaint, but complaints based solely on disagreement with a legal ruling will generally be dismissed. Judicial conduct commissions investigate violations of the Code of Judicial Conduct, not legal errors. If you believe the judge made a legal error, file an appeal." },
      { q: "How confidential is the judicial complaint process?", a: "Very confidential in most states. Judicial conduct proceedings are typically sealed until formal charges are filed. You may receive little information about the status of your complaint. The judge will usually be informed of the complaint, but proceedings will not be public unless formal discipline is recommended." },
      { q: "Can I complain about a judge's conduct outside the courtroom?", a: "Yes. The Code of Judicial Conduct governs judges' conduct both on and off the bench. Judges can be disciplined for public statements that compromise their impartiality, for engaging in conduct unbecoming a judge, for financial impropriety, or for other off-bench conduct that violates the Code." },
    ],
  },
  {
    slug: "ai-lawyer-risks",
    title: "The Hidden Risks of AI-Generated Legal Work",
    description: "What clients and attorneys need to know about the risks of AI-generated legal research, briefs, and documents — including hallucinated citations and unverified facts.",
    content: `<h2>AI Is Transforming Legal Practice — Not Always for the Better</h2>
<p>Artificial intelligence tools like ChatGPT, Claude, and legal-specific AI platforms are being used by attorneys across the country to draft briefs, conduct research, summarize depositions, and generate contract language. Used carefully, AI can make legal work faster and more accessible. Used carelessly, AI can produce legal filings that contain fabricated case citations, misstatements of law, and hallucinated facts — leading to sanctions, dismissals, and serious harm to clients.</p>

<h2>The Hallucination Problem</h2>
<p>AI language models generate text by predicting what words are likely to follow other words, based on patterns in their training data. They do not "know" facts in the way humans do — they generate plausible-sounding text that may or may not be accurate. When asked to cite legal cases, AI models will sometimes generate citations to cases that do not exist, or accurately cite the case name but fabricate the holding, the facts, or the quotations.</p>
<p>This is known as "hallucination," and it has led to serious consequences in real cases. In the now-famous Mata v. Avianca case (S.D.N.Y. 2023), an attorney submitted a brief containing citations to six nonexistent cases generated by ChatGPT, and was sanctioned $5,000. Similar incidents have followed in courts across the country, with sanctions ranging from monetary fines to bar referrals.</p>

<h2>What Courts Are Doing About It</h2>
<p>Courts have responded to AI-generated hallucinations with a patchwork of standing orders requiring attorneys to disclose AI use and certify the accuracy of all citations. As of 2026, more than 300 federal judges have issued AI-related standing orders. Many state courts have followed. The Ethics Reporter covers all major AI sanctions cases — see our <a href="/topics/ai-sanctions-attorneys">AI Sanctions topic page</a> for the full picture.</p>

<h2>Your Rights as a Client</h2>
<p>As a client, you have the right to competent representation. An attorney who submits AI-generated work without verifying its accuracy may be violating their duty of competence under Rule 1.1 of the Model Rules of Professional Conduct. If you suspect your attorney has submitted inaccurate AI-generated work in your case, you have grounds for a bar complaint and potentially a malpractice claim.</p>`,
    faqs: [
      { q: "Can my lawyer use AI without telling me?", a: "Your lawyer is required to provide competent representation, which includes ensuring the accuracy of all filings. Many courts now require disclosure of AI use in filings. Whether your attorney must proactively inform you about their use of AI tools depends on your jurisdiction and your retainer agreement — but you can always ask." },
      { q: "What should I do if I discover my attorney submitted a brief with fake citations?", a: "Contact your attorney immediately for an explanation. If the explanation is unsatisfactory, file a bar complaint for failure to provide competent representation. Depending on the harm caused to your case, you may also have a legal malpractice claim." },
      { q: "Are AI legal tools inherently unreliable?", a: "Not inherently — but they require careful human verification. Specialized legal AI platforms that are trained on legal databases and include citation verification features are more reliable than general-purpose AI chatbots. The problem is attorneys using general AI tools as a substitute for actual legal research rather than as a starting point." },
      { q: "Is there a difference between AI drafting and AI research?", a: "Yes. AI-assisted drafting (having AI generate a first draft of a brief or contract) carries different risks than AI-assisted research (using AI to identify relevant cases or statutes). Both require human verification, but hallucinated citations in AI research pose a more immediate risk of sanctions." },
    ],
  },
  {
    slug: "find-new-lawyer-after-misconduct",
    title: "How to Find a New Lawyer After Attorney Misconduct",
    description: "Practical guidance for clients who need to find new legal representation after their lawyer has engaged in misconduct, abandoned them, or been disbarred.",
    content: `<h2>You Need a New Lawyer — Now What?</h2>
<p>Discovering that your attorney has engaged in misconduct, been suspended, been disbarred, or simply abandoned your case is disorienting and stressful. You may have deadlines looming, a court date approaching, or a complex legal matter in mid-stream. Here is how to act quickly and protect your rights.</p>

<h2>Step 1: Assess Your Timeline</h2>
<p>Immediately identify any upcoming deadlines in your matter: court dates, filing deadlines, statutes of limitations, response deadlines, or hearing dates. If you have a deadline approaching, contact the court or opposing counsel directly to explain the situation and request an extension. Courts will almost always grant reasonable continuances when an attorney has been disbarred or has abandoned a client — but you must ask.</p>

<h2>Step 2: Get Your File</h2>
<p>You are entitled to your complete file. Contact your former attorney in writing (email creates a paper trail) and request all documents: correspondence, pleadings, contracts, evidence, research, and any other materials related to your matter. Your attorney is ethically required to deliver your file promptly. If they refuse or are unreachable, contact the state bar for assistance.</p>

<h2>Step 3: Find New Counsel</h2>
<p>Resources for finding new legal representation include:</p>
<ul>
<li><strong>State bar referral services.</strong> Most state bars operate lawyer referral services that can connect you with attorneys in the relevant practice area. Initial consultations through referral services are often low-cost or free.</li>
<li><strong>Legal aid organizations.</strong> If you cannot afford private representation, legal aid organizations provide free civil legal services to eligible low-income clients.</li>
<li><strong>Bar association specialty sections.</strong> If your matter involves a specialized area of law, the relevant specialty bar association (e.g., family law, immigration, criminal defense) may have referral resources.</li>
<li><strong>Court self-help centers.</strong> Many courts have self-help centers that can provide guidance to unrepresented parties.</li>
</ul>

<h2>Step 4: Check Your New Attorney's Record</h2>
<p>Before signing a retainer agreement with a new attorney, verify their license status and discipline history through your state bar's online directory. See our guide on <a href="/how-to/check-lawyer-discipline-record">how to check an attorney's discipline record</a>.</p>`,
    faqs: [
      { q: "What if my former attorney has my money?", a: "If your former attorney is holding client funds — settlement proceeds, retainer balance, or other funds — and has been disbarred, suspended, or is unresponsive, contact the state bar immediately. The bar can assist in recovering client funds in certain circumstances. You should also apply to the state's Client Protection Fund." },
      { q: "Can I be held responsible for deadlines my former attorney missed?", a: "Possibly, but courts are generally sympathetic to clients whose attorneys have engaged in misconduct or been disbarred. Courts will often reopen dismissed cases or allow late filings when attorney abandonment or misconduct is demonstrated. Act quickly and explain the situation to the court in writing." },
      { q: "Will a new attorney be willing to take over a partially-completed case?", a: "Some attorneys are reluctant to take over mid-stream matters, particularly those involving prior misconduct, because they inherit an incomplete record and potential complications. Others specialize in substituting into ongoing matters. Be transparent with potential new counsel about the situation and provide complete documentation." },
      { q: "Can I represent myself while I look for a new attorney?", a: "You always have the right to represent yourself (pro se representation). If you have an immediate court date and no attorney, appearing pro se is better than failing to appear. Be transparent with the judge about your situation — courts are generally more accommodating with pro se litigants in genuine emergencies." },
    ],
  },
];
