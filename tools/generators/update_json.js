const fs = require('fs');
const path = './theethicsreporter.com/data/tab-articles.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newArticle = {
  id: Math.max(...data.map(d => d.id)) + 1,
  title: "The Salary of a Predator: How Federal Judge Samuel Kent Drew Pay From Prison—and the Collapse of the Founders' Vision",
  slug: "samuel-kent-federal-judge-impeachment",
  date: new Date().toISOString(),
  excerpt: "In 2009, U.S. District Judge Samuel Kent was sitting in a federal prison cell for obstructing justice regarding the sexual abuse of his employees. Yet, every month, he continued to collect his $174,000 taxpayer-funded salary. The American legal system had warped the Founders' concept of judicial independence so severely that a convicted felon remained an Article III judge while behind bars. This is the definition of a defunct system.",
  content: `<p><span style="font-size:1.4em; font-family:Georgia,serif; font-weight:bold; float:left; margin-right:4px; line-height:1;">I</span>n the summer of 2009, Samuel B. Kent was an inmate at the Federal Medical Center in Devens, Massachusetts. He wore a prison uniform. He was assigned an inmate number. He was serving a 33-month sentence for obstruction of justice, stemming from his repeated sexual assaults of female court employees and his subsequent lies to federal investigators.</p>

<p>He was also, simultaneously, a sitting United States District Judge. And because the American judicial system has perverted the Founding Fathers’ design into a mechanism of absolute protection for the legal elite, Inmate Kent continued to draw his full $174,000 annual taxpayer-funded salary while sitting in his cell.</p>

<p>The case of Samuel Kent is not merely a story about a predatory man who abused his power. It is a terrifying indictment of the institutional architecture that protected him. It reveals a judicial system so insulated from common sense and democratic accountability that it required an Act of Congress to stop paying a convicted felon for a job he could not perform because he was incarcerated.</p>

<div style="background:#f9f9f9; border-left:4px solid #8B0000; padding:16px 20px; margin:24px 0; font-family:Georgia,serif;">
  <strong style="color:#8B0000; font-size:1.05em;">⚖ Quick Facts: The Samuel Kent Scandal</strong>
  <ul style="margin-top:10px; line-height:1.8;">
    <li><strong>Judge:</strong> Samuel B. Kent, U.S. District Court for the Southern District of Texas (appointed 1990 by President George H.W. Bush)</li>
    <li><strong>Misconduct:</strong> Repeated, egregious sexual abuse of his female case manager and his secretary over a period of years.</li>
    <li><strong>Initial "Discipline":</strong> The Fifth Circuit Judicial Council initially just reprimanded him and transferred him to another courthouse, keeping him on the bench.</li>
    <li><strong>Criminal Conviction:</strong> Pleaded guilty in 2009 to obstruction of justice for lying to investigators about the abuse.</li>
    <li><strong>The Absurdity:</strong> Refused to resign after conviction, legally retaining his Article III judgeship and salary while in federal prison.</li>
    <li><strong>Resolution:</strong> Impeached by the House and convicted by the Senate in 2009, finally terminating his salary.</li>
  </ul>
</div>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">The Guild Protects Its Own</h2>
<p>Long before Samuel Kent was an inmate, he was a tyrant. Operating out of the federal courthouse in Galveston, Texas, Kent treated his chambers as a personal fiefdom. He ruthlessly abused his staff, subjecting two female employees to severe, non-consensual sexual contact. When the victims finally came forward, the response of the judicial system was perfectly aligned with what Thomas Jefferson warned about over two centuries ago.</p>

<p>When the complaints reached the Fifth Circuit Court of Appeals—the body responsible for policing judges in that region—their initial response was not to demand his resignation. It was to protect the "privilege of their corps." The Fifth Circuit Judicial Council issued a secret reprimand, ordered him to take a leave of absence, and then simply transferred him to a courthouse in Houston so he could continue ruling on cases.</p>

<p>They knew what he was. They knew what he had done to his staff. And their instinct was administrative reshuffling. The self-policing mechanism of the judiciary operated exactly as it was designed to: it insulated the judge from the public and protected the reputation of the institution at the expense of the victims.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif;">The Warping of "Good Behavior"</h2>
<p>Article III, Section 1 of the U.S. Constitution states that federal judges "shall hold their Offices during good Behaviour." The Founding Fathers, students of history and human nature, included this clause to ensure judges were free from political retaliation. Alexander Hamilton celebrated this in Federalist No. 78 as the "best expedient which can be devised in any government, to secure a steady, upright, and impartial administration of the laws."</p>

<p>But Hamilton's defense relied on a critical assumption: that "good Behaviour" was an actual, enforceable standard. He assumed the republic would be governed by men of "integrity and moderation." He did not foresee that the legal profession would eventually twist the concept of judicial independence into a shield of absolute immunity.</p>

<p>By 2009, the American legal establishment had interpreted the Constitution to mean that a federal judge could only be removed, and their salary stopped, by a full impeachment trial in the United States Senate. Thus, when Samuel Kent finally pleaded guilty to a felony and was shipped to a federal medical prison, the system threw its hands up. The Administrative Office of the U.S. Courts dutifully continued cutting his checks. The taxpayers of the United States were effectively funding the commissary account of a convicted sexual predator.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif;">Jefferson's Nightmare Realized</h2>
<p>Thomas Jefferson warned us that the judiciary, if left to its own devices, would slowly and silently consolidate power until it became completely untethered from the people it was meant to serve. In his 1820 letter to William Jarvis, Jefferson wrote:</p>

<blockquote style="border-left:3px solid #8B0000; padding:12px 20px; margin:24px 0; font-style:italic; font-family:Georgia,serif; color:#333;">
  "Our judges are as honest as other men, and not more so. They have, with others, the same passions for party, for power, and the privilege of their corps. Their power being the most dangerous, ought therefore to be the most strictly guarded against by the Constitution..."
</blockquote>

<p>Samuel Kent weaponized the "privilege of his corps." He knew that the Constitution’s impeachment process was designed for the 18th century—a slow, agonizingly political procedure that requires the attention of the entire House of Representatives and a two-thirds vote in the Senate. Kent wagered that he could extort a plea deal or simply keep his salary for a year while the sluggish machinery of Congress tried to catch up with him.</p>

<p>And he was right. For months while in prison, Kent received his pay. It took an unprecedented level of public outrage to force Congress to act. In June 2009, the House impeached him. Only when faced with a guaranteed conviction in the Senate did Kent finally submit his resignation, which was rejected in favor of a formal removal to ensure he could never hold office or receive a pension again.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif;">A System Defunct Beyond Repair</h2>
<p>The establishment view of the Samuel Kent saga is that "the system worked." The judge went to prison, and Congress impeached him. But this is the logic of an oligarchy defending its own dysfunction.</p>

<p>A system that initially covers up sexual abuse by transferring the abuser to a different courthouse is not working. A system that requires the full mobilization of the United States Congress to stop paying a convicted felon in a prison cell is fundamentally broken.</p>

<p>The Founders gave us a republic, but the legal profession built an aristocracy. We must structurally reconstruct the American judiciary before it entirely consumes the rule of law. We must institute the following baseline changes:</p>

<p><strong>1. Automatic Salary Forfeiture.</strong> Congress must pass legislation establishing that any Article III judge indicted for a felony has their salary escrowed, and any judge convicted of a felony immediately forfeits their salary. The Constitution protects judicial pay from being "diminished" to prevent political coercion; it does not require taxpayers to fund incarcerated criminals.</p>

<p><strong>2. Eradicate Judicial Self-Policing.</strong> The Fifth Circuit's handling of Kent's initial abuse is a textbook example of the failure of self-regulation. Judicial conduct investigations must be stripped from the appellate courts and handed to independent civilian oversight boards with subpoena power and mandatory public reporting.</p>

<p><strong>3. Term Limits to Replace the "Good Behavior" Loophole.</strong> The lifetime appointment has failed. It emboldens tyrants and protects the corrupt. We must reconstruct the federal courts with mandatory 18-year term limits, ensuring that no individual can treat the bench as a lifelong, untouchable fiefdom.</p>

<p>Samuel Kent was a disgrace to the bench, but he was a product of the system. The judicial branch has spent two centuries building walls to protect its independence, only to trap the American people inside a system with monsters. Until we tear down those walls and rebuild, the ghost of Samuel Kent will haunt every federal courthouse in the nation.</p>`,
  featured_image: "/images/tab/samuel-kent-federal-judge-impeachment.jpg",
  status: "publish"
};

data.push(newArticle);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
