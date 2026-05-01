const fs = require('fs');
const path = './site/data/tab-articles.json';

const articleContent = `
<p><span style="font-size:1.4em; font-family:Georgia,serif; font-weight:bold; float:left; margin-right:4px; line-height:1;">T</span>he arithmetic of the American judicial system is the arithmetic of an oligarchy. When an ordinary citizen commits an infraction against the state, the mathematics of punishment are brutal, exacting, and absolute: decades in concrete cages, lives permanently destroyed, families irrevocably shattered. But when a member of the legal elite—a prosecutor, a judge, an officer of the court—commits a deliberate, calculating crime that destroys the life of an innocent citizen, the mathematics undergo a miraculous and horrifying transformation. Decades become days. Absolute accountability becomes an \"administrative proceeding.\" The crushing weight of the state vanishes, replaced by the protective, sympathetic embrace of the professional guild.</p>

<p>There is no case in modern American jurisprudence that illustrates this grotesque mathematical disparity more clearly than the tragedy of Michael Morton and the prosecutor-turned-judge who framed him, Ken Anderson. For the deliberate concealment of exculpatory evidence—an act of profound, calculated malice that resulted in an innocent man spending twenty-five years in a maximum-security Texas prison—Anderson was ultimately sentenced to just ten days in the county jail. He served five.</p>

<p>Five days for twenty-five years. This is not a failure of the American justice system. It is the purest expression of how the system is designed to operate. It is the terrifying realization of the Founding Fathers' deepest anxieties: the emergence of an unaccountable legal aristocracy that places the \"privilege of its corps\" above the fundamental mandates of the United States Constitution.</p>

<div style="background:#f9f9f9; border-left:4px solid #8B0000; padding:16px 20px; margin:24px 0; font-family:Georgia,serif;">
  <strong style="color:#8B0000; font-size:1.05em;">⚖️ Quick Facts: The Ken Anderson / Michael Morton Scandal</strong>
  <ul style="margin-top:10px; line-height:1.8;">
    <li><strong>The Victim:</strong> Michael Morton, wrongfully convicted in 1987 for the murder of his wife, Christine. Spent 25 years in prison.</li>
    <li><strong>The Perpetrator:</strong> Ken Anderson, Williamson County (Texas) District Attorney, later appointed as a District Judge.</li>
    <li><strong>The Crime:</strong> Anderson deliberately hid exculpatory evidence from the defense and the trial judge, including a transcript where the victim's three-year-old son said a \"monster\" (not his father) killed his mother, and reports of a suspicious man in a green van casing the house.</li>
    <li><strong>The Exoneration:</strong> DNA evidence finally cleared Morton in 2011, identifying the real killer (Mark Norwood), who had murdered another woman while Morton was in prison.</li>
    <li><strong>The \"Punishment\":</strong> After an agonizing legal fight to hold him accountable, former Judge Ken Anderson resigned his law license and was sentenced to <strong>10 days in jail</strong>. He was released after serving 5 days for \"good behavior.\"</li>
  </ul>
</div>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">The Crime and the Fabrication of Guilt</h2>

<p>On August 13, 1986, Christine Morton was brutally bludgeoned to death in her bed in Williamson County, Texas. Her husband, Michael, had left for work early that morning. There was no physical evidence linking Michael to the crime. There was no history of domestic violence. There was no credible motive. But the local sheriff's department and the District Attorney, Ken Anderson, immediately locked onto Michael Morton as their sole suspect.</p>

<p>To secure a conviction without evidence, Anderson had to cheat. The cheating was not a matter of sloppy police work or an unintentional oversight; it was a deliberate, premeditated subversion of the Fifth Amendment right to due process. During the investigation, Anderson came into possession of absolute, explosive exculpatory evidence. </p>

<p>First, Christine's mother told lead investigator Sergeant Don Wood that the Mortons' three-year-old son, Eric, who was present during the murder, had described the killer. The boy explicitly stated that his father was not home and that a \"monster\" with a big mustache had attacked his mother. Second, neighbors reported seeing a strange man in a green van repeatedly casing the Morton home in the days leading up to the murder. Third, there was evidence of a forged check cashed by a woman matching the description of someone associated with the real killer.</p>

<p>Under the Supreme Court's ruling in <em>Brady v. Maryland</em>, Anderson was constitutionally obligated to turn this evidence over to the defense. Furthermore, the trial judge explicitly ordered Anderson to submit the lead investigator's reports for a private judicial review to determine if there was anything the defense should see. Anderson intentionally withheld the reports containing the son's statements and the green van. He looked the trial judge in the eye and lied by omission.</p>

<p>Michael Morton was convicted of murder and sentenced to life in prison. He lost his wife, his freedom, and ultimately, his relationship with his son, who was raised by relatives and grew up believing his father was a monstrous murderer. Ken Anderson, meanwhile, secured a high-profile win. In the American legal system, convictions are the currency of career advancement. Justice is entirely secondary.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">The Judge-Made Shield of Prosecutorial Immunity</h2>

<p>To comprehend how Ken Anderson could act with such brazen disregard for human life and constitutional law, one must examine the legal architecture that protects American prosecutors. The Founding Fathers drafted a Constitution deeply suspicious of state power. The Fifth Amendment explicitly guarantees that no person shall be \"deprived of life, liberty, or property, without due process of law.\" The entire framing of the Bill of Rights is a fortress designed to protect the citizen from the overreach of the state.</p>

<p>Nowhere in the United States Constitution is there a provision granting prosecutors immunity from the consequences of their actions.</p>

<p>Yet, in 1976, in the case of <em>Imbler v. Pachtman</em>, the United States Supreme Court simply invented it. In a breathtaking act of judicial legislation, the Court declared that prosecutors possess <em>absolute immunity</em> from civil lawsuits for actions taken in their official role as advocates for the state—even if they intentionally withhold exculpatory evidence, suborn perjury, or maliciously frame an innocent person.</p>

<p>The Court's rationale was that if prosecutors could be sued for misconduct, they would be \"harassed\" by litigation and might lack the \"courage and independence\" to prosecute cases aggressively. To protect the comfort and career trajectory of the prosecutor, the Supreme Court completely annihilated the civil rights of the wrongfully convicted. They built an impenetrable shield around the prosecutorial class, placing them entirely above the law they are sworn to enforce.</p>

<p>Ken Anderson operated behind this impenetrable shield. He knew that even if he were caught hiding evidence, the worst that could happen was that the conviction might be overturned on appeal years later. He could not be sued. He was functionally untouchable. The legal guild had rewritten the Constitution to ensure its own members faced zero personal risk for destroying the lives of the citizenry.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">Madison's Nightmare: The Elevation of a Tyrant</h2>

<p>James Madison, the primary architect of the Constitution, warned in <em>Federalist No. 51</em> that \"ambition must be made to counteract ambition.\" He believed that institutions must be structured so that the personal ambitions of government officials are tied to the constitutional rights of the people. If power is left unchecked, Madison argued, tyranny is inevitable, because men are not angels.</p>

<p>The tragedy of Ken Anderson is a direct result of the legal system abandoning Madison's framework. In the prosecutorial guild, ambition does not counteract tyranny; it requires it. Prosecutors are rewarded for convictions, not for the ethical administration of justice. They run for higher office on their \"win records.\" They are praised by police unions for putting people in cages.</p>

<p>For his work in destroying Michael Morton, Ken Anderson was heavily rewarded by the political and legal establishment. He was named \"Prosecutor of the Year\" by the State Bar of Texas. He authored a book on the criminal justice system. And in 2001, Governor Rick Perry appointed Anderson to be a District Judge in Williamson County.</p>

<p>The man who had deliberately framed an innocent father was handed a black robe and the power of life and death over the citizens of Texas. For a decade, Judge Ken Anderson sat on a raised dais, demanding deference, lecturing defendants on morality, and dispensing sentences, all while harboring the dark, criminal secret of what he had done to Michael Morton. He was the living embodiment of institutional decay—a predator cloaked in the absolute authority of the state.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">The Unraveling: 25 Years in a Cage</h2>

<p>While Judge Anderson enjoyed his country club memberships and his judicial pension, Michael Morton survived in the hellish environment of a maximum-security Texas penitentiary. He missed his son's entire childhood. He watched his reputation rot.</p>

<p>But Morton never stopped fighting. With the assistance of the Innocence Project, Morton spent years begging the state of Texas to perform DNA testing on a bloody bandana found near the crime scene. The Williamson County District Attorney's office—the office Ken Anderson had built—fought the DNA testing relentlessly. They spent years litigating to prevent the truth from coming out, fighting tooth and nail to keep an innocent man in prison simply to protect the finality of their \"win.\"</p>

<p>Finally, in 2011, a court ordered the testing. The DNA on the bandana did not match Michael Morton. It matched a known felon named Mark Norwood—a man with a history of violence who had lived in the area at the time. Worse still, because Anderson had hidden the evidence that could have pointed to Norwood in 1986, Norwood remained free and went on to murder another woman, Debra Baker, in 1988. </p>

<p>Anderson's corruption did not just destroy Michael Morton; it enabled a serial killer.</p>

<p>Morton was exonerated and released. But as his legal team poured through the state's files, the true horror emerged. They found the withheld reports. They found the child's statement about the \"monster.\" They found the notes detailing the green van. The paper trail of Ken Anderson's malice was finally exposed to the light of day.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">Jefferson and the Privilege of the Corps</h2>

<p>Thomas Jefferson viewed the legal establishment with a hostility that history has thoroughly vindicated. He recognized that lawyers and judges, if permitted to consolidate power, would inevitably form an oligarchy that elevated its own interests above the Constitution.</p>

<p>In a prophetic 1820 letter, Jefferson diagnosed the exact pathology that would eventually dictate the fate of Ken Anderson:</p>

<blockquote style="border-left:3px solid #8B0000; padding:12px 20px; margin:24px 0; font-style:italic; font-family:Georgia,serif; color:#333;">
  \"Our judges are as honest as other men, and not more so. They have, with others, the same passions for party, for power, and the privilege of their corps.\"
</blockquote>

<p>When the evidence of Anderson's crimes became undeniable, the system was forced to act. But the \"privilege of their corps\" immediately asserted itself. If an ordinary citizen had conspired to kidnap a man and lock him in a cage for 25 years, the state would seek a life sentence, or perhaps the death penalty.</p>

<p>But Ken Anderson was a judge. He was a former prosecutor. He was a member of the guild. And the guild protects its own.</p>

<p>Following a rare Court of Inquiry, Anderson was charged with criminal contempt and tampering with evidence. The statute of limitations was invoked to shield him from more serious charges. In a plea deal negotiated with special prosecutors, Anderson agreed to resign his judgeship, surrender his law license, perform 500 hours of community service, and serve 10 days in the county jail.</p>

<p>Ten days.</p>

<p>He was processed into the jail, kept segregated from the general population for his own safety, and released after serving just five days due to \"good behavior.\" As he walked free, Michael Morton, the man whose life he had destroyed, watched. Morton had served 9,135 days in prison. Anderson served five.</p>

<p>This is not justice. It is the public codification of an aristocracy. It is the system telling the American public, in clear mathematical terms, that the life of an ordinary citizen is worth exactly nothing when weighed against the comfort and freedom of a member of the legal elite.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">Hamilton's Failed Promise in Federalist 78</h2>

<p>When Alexander Hamilton argued for the independence of the judiciary in <em>Federalist No. 78</em>, he insisted that the courts would be the \"least dangerous\" branch of government. He argued that the judiciary possessed \"neither force nor will, but merely judgment.\" Hamilton believed that the inherent gravity of the office would naturally attract men of \"integrity and moderation.\"</p>

<p>Hamilton’s optimism was a fatal miscalculation. He failed to anticipate what happens when the judiciary is staffed by men completely devoid of integrity, men whose judgment is entirely corrupted by ambition and a complete lack of accountability.</p>

<p>Ken Anderson sat on a bench and judged others for ten years. Every sentence he handed down, every moral lecture he delivered to a defendant, was an obscenity. How many men did Judge Anderson sentence to decades in prison for non-violent drug offenses, while he himself was guilty of a crime far more devastating than any narcotics transaction? Hamilton’s defense of the judiciary has been twisted into a doctrine of absolute judicial and prosecutorial immunity, shielding monsters from the consequences of their actions while they weaponize the law against the public.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">John Adams and the Subversion of a Government of Laws</h2>

<p>John Adams famously enshrined the principle that the American republic must be \"a government of laws, and not of men\" in the Massachusetts Constitution of 1780. It is a foundational tenet of American liberty: the law must apply equally to all, regardless of birth, wealth, or professional title.</p>

<p>The outcome of the Ken Anderson case subverts this entire philosophy. We do not have a government of laws. We have a government of lawyers. The legal establishment has created a parallel justice system: a draconian, unforgiving meat-grinder for the working class, and a polite, administrative, wrist-slapping club for the prosecutors and judges who run the machine.</p>

<p>When the law fails to punish the very people entrusted with enforcing it, the law ceases to be a social contract and becomes a mere instrument of oppression. The five days Ken Anderson spent in a county jail cell was not an act of accountability; it was an act of profound disrespect to the Constitution and to Michael Morton.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">The Illusion of Reform and the Necessity of Reconstruction</h2>

<p>In the aftermath of the Morton exoneration, the Texas legislature passed the \"Michael Morton Act,\" which requires more open discovery processes in criminal cases. It was heralded as a massive reform.</p>

<p>It is not enough. Passing a law telling prosecutors that they really, truly have to follow the Constitution this time is meaningless if there are no catastrophic personal consequences when they refuse. The American judicial system does not require mild reform; it requires immediate, systemic reconstruction to tear down the \"privilege of the corps.\"</p>

<h3 style="color:#8B0000; font-family:Georgia,serif;">1. Abolish Absolute Prosecutorial Immunity</h3>
<p>The doctrine of absolute immunity created in <em>Imbler v. Pachtman</em> must be legislatively annihilated by Congress. Prosecutors who intentionally hide evidence, suborn perjury, or fabricate charges must be stripped of all immunity and subjected to crushing civil liability. If a prosecutor destroys a life, the victim must have the right to seize the prosecutor's pension, their home, and their assets. The risk of misconduct must be personal and devastating.</p>

<h3 style="color:#8B0000; font-family:Georgia,serif;">2. Equal Retributive Sentencing</h3>
<p>The criminal code must be rewritten to establish absolute parity in punishment for officers of the court. If a prosecutor or a police officer intentionally conceals exculpatory evidence that results in a citizen serving 25 years in prison, the mandatory minimum sentence for that prosecutor must be 25 years in a maximum-security penitentiary. No plea deals. No country club prisons. The people who wield the power of the state must be terrified of abusing it.</p>

<h3 style="color:#8B0000; font-family:Georgia,serif;">3. Eradicate State Bar Monopolies over Discipline</h3>
<p>The discipline of attorneys and prosecutors cannot remain in the hands of the legal guild. State bar associations have proven for a century that they will protect their own members at the expense of the public. Disciplinary authority must be transferred to independent civilian oversight boards with absolute subpoena power and mandatory public reporting. Lawyers can no longer be permitted to judge lawyers.</p>

<h3 style="color:#8B0000; font-family:Georgia,serif;">4. Retroactive Judicial Audits</h3>
<p>When an official like Ken Anderson is found to have engaged in egregious misconduct, every single case they ever touched—both as a prosecutor and as a judge—must be subjected to a mandatory, independent retroactive audit funded by the state. The assumption of regularity must be stripped away. If they lied once to secure a murder conviction, we must assume they lied repeatedly.</p>

<h2 style="color:#8B0000; font-family:Georgia,serif; margin-top:32px;">Conclusion: The Arrogance of the Guild</h2>

<p>As Ken Anderson walked out of the Williamson County jail after serving his five days, he released a statement apologizing for the \"system's failure.\" It was the ultimate, cowardly evasion. The system did not fail. Ken Anderson chose to hide evidence. Ken Anderson chose to lie to a judge. Ken Anderson chose to let a murderer go free so he could win a high-profile case.</p>

<p>The true \"system failure\" was the one that allowed Anderson to spend the next twenty-five years living a life of privilege, prestige, and judicial power while Michael Morton withered in a cell. The true failure is a legal architecture that views five days in jail as appropriate compensation for twenty-five years of stolen life.</p>

<p>The Founding Fathers warned us that any institution permitted to police itself will inevitably descend into tyranny. They warned us that an aristocracy of lawyers would subvert the republic. The tragedy of Michael Morton, and the grotesque leniency afforded to Ken Anderson, proves that the Founders were absolutely right. It is time to take America back from the oligarchy of the robes, tear down the fortress of immunity, and demand a government of laws, not a guild of protected predators.</p>
`;

const newArticle = {
  title: "Ten Days for Twenty-Five Years: Judge Ken Anderson, the Michael Morton Tragedy, and the Monstrous Shield of Prosecutorial Immunity",
  slug: "ken-anderson-michael-morton-prosecutorial-immunity-corruption",
  date: new Date().toISOString(),
  excerpt: "Prosecutor Ken Anderson deliberately hid exculpatory evidence, sending innocent Michael Morton to prison for 25 years while the real killer went free. Anderson was rewarded with a judgeship. When finally caught, the legal system protected its own, sentencing him to just 10 days in jail. This grotesque mathematical disparity exposes an American legal system operating as a protective oligarchy, fundamentally betraying the Constitution's core promises of due process and equal justice.",
  content: articleContent,
  featured_image: "/images/tab/ken-anderson-michael-morton-prosecutorial-immunity-corruption.jpg",
  status: "publish",
  category: "Ethics",
  tags: [
    "Prosecutorial Immunity",
    "Judicial Corruption",
    "Michael Morton",
    "Ken Anderson",
    "Due Process",
    "Founding Fathers"
  ]
};

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
data.unshift(newArticle); // Put it at the top
fs.writeFileSync(path, JSON.stringify(data, null, 2));

console.log("Article successfully added to JSON.");
