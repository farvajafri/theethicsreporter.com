#!/usr/bin/env python3
"""Build articles 5-6 (Darryl Hunt, Juan Rivera)."""
import json

DROP = lambda L: f'<span style="font-size:4em;float:left;line-height:0.9;padding:0.1em 0.1em 0 0;font-weight:bold;color:#8B0000;">{L}</span>'
HR = '<hr style="border:none;border-top:3px solid #8B0000;margin:40px 0;">'
def H2(t): return f'<h2 style="font-size:1.6em;border-bottom:2px solid #8B0000;padding-bottom:8px;">{t}</h2>'

articles = []

# ============ ARTICLE 5 — DARRYL HUNT ============
a5_content = f"""<p>{DROP('I')}n 1994, a laboratory in North Carolina performed a DNA test that should have set Darryl Hunt free. The semen recovered from the body of Deborah Sykes, a young copy editor raped and murdered on her way to work a decade earlier, did not match Darryl Hunt. It could not have come from him. The science was clear, and it was the kind of clarity that, in a just system, ends the matter: the man convicted of the rape had been excluded as the rapist. And yet Darryl Hunt would spend nearly another decade in prison after that test, because the District Attorney of Forsyth County, a man named Tom Keith, decided that the science was not enough to overcome his conviction that Hunt was guilty. He constructed a theory to explain the DNA away, and the courts, astonishingly, let him.</p>

<p>The Darryl Hunt case is a portrait of prosecutorial ego triumphing over evidence, of a system so invested in a conviction that it would rather rationalize away the truth than admit it had condemned an innocent man. It is also a portrait of race in the American South, of a Black teenager convicted for the murder of a white woman on the flimsiest of evidence, and of the long, grinding, ultimately successful campaign \u2014 by a dedicated defense lawyer and a persistent local newspaper \u2014 to force a reluctant system to acknowledge what it had done. And it is, finally, a tragedy, because the man at its center, freed at last after nineteen years, could never escape what had been done to him, and ended his own life still carrying the weight of it.</p>

{HR}
{H2('A Murder in Winston-Salem')}

<p>On the morning of August 10, 1984, Deborah Sykes, a twenty-five-year-old copy editor for a Winston-Salem newspaper, was walking to work when she was attacked, raped, and stabbed to death. The crime was brutal and it was public in its horror, and in the Winston-Salem of the mid-1980s, the rape and murder of a young white woman generated enormous pressure to find and punish the perpetrator.</p>

<p>The investigation soon focused on Darryl Hunt, a nineteen-year-old Black man with no prior criminal record. What connected Hunt to the crime was not physical evidence \u2014 there was none tying him to it \u2014 but the identification of a witness and the momentum of an investigation that had settled on him. The witness identification, of the kind that has since been shown to be among the leading causes of wrongful conviction, placed Hunt near the scene. That identification would later be recanted. But in 1984, it was enough, combined with the atmosphere of the case, to bring Darryl Hunt to trial.</p>

<p>He was convicted in 1984 and sentenced to life in prison. There was no physical evidence. The case rested on identification testimony and the suggestive contours of the investigation. A Black teenager with no record had been convicted of raping and killing a white woman, in the South, on evidence that would not have withstood serious scrutiny had anyone in power been inclined to scrutinize it. Few were.</p>

{HR}
{H2('The Identification That Fell Apart')}

<p>From the beginning, the case against Darryl Hunt was troubled. The key identification came from a witness whose account was, on examination, deeply problematic, and who would eventually recant \u2014 acknowledging that the identification could not bear the weight that had been placed on it. Eyewitness misidentification is now understood to be extraordinarily unreliable, particularly across racial lines, where the well-documented phenomenon of cross-racial identification error compounds the ordinary fallibility of human memory. A white witness identifying a Black stranger, under the stress of a horrific crime and the suggestion of a police investigation eager for a suspect, is precisely the scenario in which misidentification is most likely.</p>

<p>But an identification, once made and once presented to a jury, has a power that outstrips its reliability. Juries believe eyewitnesses. They find it difficult to accept that a person who points across a courtroom and says \"that is the man\" could be sincerely, confidently, and completely wrong. Darryl Hunt's jury believed the identification, and Hunt went to prison, and the ordinary appeals ran their course and failed. The conviction acquired the settled quality that convictions acquire, the presumption of correctness that makes them so hard to undo even when they are false.</p>

{HR}
{H2('The Weight of Race')}

<p>It is impossible to tell the story of Darryl Hunt honestly without placing race at its center, because race was at the center of the case from the first hours of the investigation to the last years of Hunt's imprisonment. Deborah Sykes was a young white woman. Darryl Hunt was a young Black man. Winston-Salem in 1984 was a Southern city carrying the full inheritance of the region's racial history, and the rape and murder of a white woman, with a Black suspect in custody, activated every current of that history at once.</p>

<p>The dynamics are grimly familiar to any student of American criminal justice. The pressure to solve the crime of a white victim is more intense. The willingness to credit an identification of a Black suspect is greater. The scrutiny applied to the evidence against him is less. The benefit of the doubt that a defendant is theoretically owed is, in practice, distributed unequally, and a Black man accused of raping a white woman in the South has historically received very little of it. Darryl Hunt walked into a courtroom carrying not only the weight of a specific accusation but the weight of a centuries-old presumption, and that presumption did not lift when the identification was recanted or when the DNA came back.</p>

<p>The Black community of Winston-Salem understood this, and Hunt's case became, over the years, a cause that galvanized local activists and ministers who saw in it a familiar and infuriating pattern. Their sustained attention, alongside the work of Hunt's lawyer and the local newspaper, helped keep the case from disappearing into the silence that swallows so many wrongful convictions. But the fact that it took such sustained pressure — that the recanted identification and the exculpatory DNA were not, by themselves, enough — is itself a measure of how much the presumption of a Black defendant's guilt weighed in the balance, and how hard it had to be pushed against.</p>

{HR}
{H2('The DNA That Should Have Ended It')}

<p>Then came 1994, and the DNA. By the mid-1990s, DNA analysis had matured into a tool of extraordinary discriminating power, and the biological evidence from the Deborah Sykes case \u2014 the semen left by her rapist \u2014 was subjected to it. The result was unequivocal. Darryl Hunt was excluded. The genetic material that the rapist had left in the body of his victim did not come from Darryl Hunt and could not have. The man convicted of raping Deborah Sykes was, by the clearest available scientific measure, not her rapist.</p>

<p>In a system oriented toward truth, this would have been the end. A conviction for rape, obtained without physical evidence and resting on a recanted identification, confronted by DNA that excludes the convicted man as the source of the rapist's semen, is a conviction that cannot stand. But Tom Keith, the District Attorney, did not see it that way. He had a conviction, and he intended to keep it, and so he reached for a theory that would allow the DNA to coexist with Hunt's continued imprisonment.</p>

<p>The theory was this: perhaps Darryl Hunt had participated in the crime without ejaculating \u2014 perhaps he had been an accomplice, present and culpable, while some other, unidentified man had been the one to leave the semen. In this telling, the DNA excluded Hunt only as the source of that particular biological evidence, not as a participant in the murder. It was a theory unsupported by any evidence pointing to an accomplice; it existed for one purpose, which was to preserve the conviction against the science that had demolished its foundation. And the courts accepted it. For years, on the strength of the \"non-ejaculating accomplice\" theory, Darryl Hunt remained in prison, an innocent man kept behind bars by a prosecutor's refusal to accept what the evidence plainly showed.</p>

{HR}
{H2('The Prosecutor Who Would Not Yield')}

<p>It is worth dwelling on what Tom Keith did, because it represents a particular and especially insidious form of injustice. Keith did not, so far as the record shows, frame Darryl Hunt in the first instance; the original conviction was the product of the identification and the investigation. What Keith did was worse in a sense: confronted, years later, with scientific proof that the convicted man was not the rapist, he chose to fight to keep that man imprisoned anyway. He deployed the resources and authority of his office not in the service of truth but in defense of a conviction he was unwilling to relinquish.</p>

<p>The \"non-ejaculating accomplice\" theory is the signature of that choice. It is the kind of argument a prosecutor constructs not because the evidence suggests it but because the desired conclusion requires it. There was no accomplice in the evidence. There was no reason, other than the need to save the conviction, to imagine one. But the theory allowed Keith to tell a story in which the DNA and Hunt's guilt could both be true, and he told it, repeatedly, for years, while Darryl Hunt sat in a cell. This is what it looks like when a prosecutor decides that the prestige and finality of the system \u2014 and, one suspects, his own investment in the case \u2014 matter more than an innocent man's freedom.</p>

<p>Hunt did not fight alone. His defense attorney, Mark Rabil, took up the case and stayed with it for years, refusing to accept the outcome, pressing every available avenue. And the Winston-Salem Journal, the city's newspaper, conducted a sustained investigative examination of the case, publishing coverage that laid bare the weaknesses of the conviction and the implausibility of the state's continued position. This combination \u2014 a dedicated lawyer and a persistent press \u2014 kept the case alive and kept public attention on it during the years when the courts were content to let the non-ejaculating accomplice theory carry the day. Without them, Darryl Hunt would in all likelihood have died in prison.</p>

{HR}
{H2('The Real Killer')}

<p>The theory that Tom Keith had used to keep Hunt imprisoned depended on the identity of the actual rapist remaining unknown. As long as the source of the DNA was a phantom, Keith could posit that the phantom was some accomplice and that Hunt was guilty alongside him. That construction collapsed the moment the phantom acquired a name.</p>

<p>In 2003, the DNA from the Deborah Sykes crime scene was matched to a man named Willard Brown, who was already in prison for another offense. Confronted with the match, Willard Brown eventually confessed to the murder of Deborah Sykes. The killer had been identified, and he was not Darryl Hunt, and there was no accomplice; there was one man, Willard Brown, who had raped and murdered Deborah Sykes, and Darryl Hunt had had nothing to do with it.</p>

<p>With the real killer identified and confessing, the non-ejaculating accomplice theory disintegrated entirely. In December 2003, after nineteen years in prison, Darryl Hunt was exonerated and freed. He had entered prison a nineteen-year-old with no criminal record. He emerged a man in his late thirties, having lost the entirety of his young adulthood to a crime committed by someone else \u2014 and having lost the last decade of it after science had already proven his innocence, held in prison by a prosecutor's refusal to accept the proof.</p>

{HR}
{H2('Freedom and Its Aftermath')}

<p>North Carolina eventually awarded Darryl Hunt compensation \u2014 a sum in the range of one and a half million dollars from the state, along with other settlements. He did something remarkable with his freedom and his standing: he founded the Darryl Hunt Project for Freedom and Justice, an organization devoted to helping others who had been wrongly convicted and to supporting people reentering society after incarceration. He became an advocate, a public figure in the movement against wrongful conviction, a man who had turned his catastrophe into a mission to spare others from the same fate. He spoke widely. He was, for a time, a symbol of resilience and of the possibility of redemption after injustice.</p>

<p>But the symbol and the man were not the same, and the man was carrying wounds that the advocacy could not heal. Nineteen years in prison for a crime he did not commit \u2014 a decade of it after the DNA had exonerated him in all but the formal legal sense \u2014 is a trauma that does not resolve simply because freedom arrives. The years cannot be given back. The fear, the helplessness, the experience of watching a prosecutor construct fictions to keep you caged while the truth sat plainly available \u2014 these leave marks that compensation does not erase and advocacy does not close.</p>

<p>On March 14, 2016, Darryl Hunt died by suicide. He was fifty-one. He had survived nineteen years of wrongful imprisonment, had won his freedom, had built an organization to help others, had become a respected voice \u2014 and still, in the end, could not outrun what had been done to him. His death is part of the case, and it must be counted in any honest accounting of its cost. The state of North Carolina, and Tom Keith in particular, did not merely take nineteen years from Darryl Hunt. They inflicted an injury that helped, in the end, to take his life.</p>

{HR}
{H2('The Accounting')}

<p>Tom Keith was never disciplined for the decade he spent fighting to keep an innocent man in prison after DNA had excluded him. The non-ejaculating accomplice theory, which any honest observer could see for the rationalization it was, was never treated as the abuse of prosecutorial power it represented. Keith's career proceeded. He was not disbarred, not sanctioned, not held to account in any way that touched him personally. As in nearly every wrongful conviction, the cost fell on the innocent man and on the taxpayers who funded his compensation, while the official whose conduct had prolonged the injustice walked away unscathed.</p>

<p>This is the pattern that ought to trouble us most, because it recurs with such reliability. A prosecutor has enormous power and almost total immunity from personal consequence for its abuse. When a prosecutor like Tom Keith decides to defend a conviction against the evidence \u2014 to keep an innocent man imprisoned rather than admit error \u2014 there is, in practice, very little that can be done to him. The doctrine of prosecutorial immunity shields him from civil liability. Bar discipline for such conduct is vanishingly rare. And so the incentive structure that produced the injustice remains intact, waiting for the next case, the next conviction a prosecutor would rather preserve than examine.</p>

<p>The Darryl Hunt case poses a question that the criminal justice system has never satisfactorily answered: what is a conviction <em>for</em>? If it is for the discovery and punishment of the guilty, then DNA excluding the convicted man should end it, and a prosecutor who fights that exclusion is betraying the purpose of his office. But if a conviction is, in practice, a possession \u2014 a thing the state acquires and defends for its own sake, a marker of institutional success that must be protected against embarrassment \u2014 then Tom Keith's conduct makes a grim kind of sense. He was protecting the possession. He was defending the prestige of the outcome. And to do it, he was willing to let Deborah Sykes's actual killer remain unidentified and to let an innocent man rot for another ten years.</p>

<p>Darryl Hunt spent nineteen years paying for that choice, and then, twelve years after his release, he paid the final price. The truth was available in 1994. It took until 2003 for the system to accept it, and only because a defense lawyer refused to quit and a newspaper refused to look away. The system did not free Darryl Hunt. It had to be dragged, over a decade, into freeing him \u2014 and even then, the damage was already done.</p>"""

articles.append({
    "title": "The DNA That Wasn't Enough: How Winston-Salem DA Tom Keith Kept Darryl Hunt in Prison for a Decade After Science Proved He Didn't Do It",
    "slug": "darryl-hunt-winston-salem-north-carolina-dna-exclusion-tom-keith-da-fought-19-years-wrongful-conviction",
    "date": "2026-07-04T10:00:00-04:00",
    "excerpt": "DNA excluded Darryl Hunt as the rapist of Deborah Sykes in 1994 — but Forsyth County DA Tom Keith invented a 'non-ejaculating accomplice' theory to keep the innocent man imprisoned for another decade. Only when the real killer confessed in 2003 was Hunt freed after 19 years. He died by suicide in 2016, unable to escape what the system had done to him.",
    "tags": ["Darryl Hunt", "North Carolina", "Winston-Salem", "Tom Keith", "DNA Evidence", "Wrongful Conviction", "Racial Injustice", "Prosecutorial Misconduct"],
    "status": "publish",
    "featured_image": "/images/tab/darryl-hunt-winston-salem-north-carolina-dna-exclusion-tom-keith-da-fought-19-years-wrongful-conviction.jpg",
    "content": a5_content,
})

# ============ ARTICLE 6 — JUAN RIVERA ============
a6_content = f"""<p>{DROP('T')}hree times the state of Illinois convicted Juan Rivera of the rape and murder of an eleven-year-old girl named Holly Staker. Three times a jury found him guilty. And by the time of the third conviction, the state possessed DNA evidence that excluded Juan Rivera as the source of the semen recovered from the child's body \u2014 evidence that had existed, and pointed away from him, for more than a decade. Rather than accept what the DNA said, the prosecutors of Lake County constructed one of the most grotesque arguments in the annals of American criminal law to explain it away: they suggested to a jury that the semen might have come from a consensual sexual encounter the eleven-year-old victim had had with a young boy before her murder. It was an argument so shocking that it stunned even hardened observers of the criminal courts. And it worked, at least for a while.</p>

<p>The case of Juan Rivera is a study in tunnel vision so complete that no quantity of exculpatory evidence could dislodge it. It is a study in the coercive power of interrogation applied to a mentally ill young man over the course of days. And it is a study in what prosecutors will say, and what juries will believe, when a system has committed itself to a conclusion and cannot bear to be wrong. Rivera spent nearly twenty years in prison for a crime the DNA said he did not commit, and he was convicted not once but three times along the way.</p>

{HR}
{H2('A Babysitter Murdered')}

<p>On August 17, 1992, in Waukegan, Illinois, eleven-year-old Holly Staker was babysitting two young children when she was raped and stabbed to death. The crime was ferocious and it was, as such crimes always are, the subject of intense public demand for a resolution. A child had been murdered while performing an act of ordinary responsibility, in a home, in a community that expected its authorities to find whoever had done it.</p>

<p>The investigation eventually turned to Juan Rivera, a nineteen-year-old who had a history of mental illness. Rivera was not connected to the crime by physical evidence. He was connected to it by the process of interrogation \u2014 a process that, applied to a young man in psychological distress over an extended period, produced the confession that would anchor the case against him for two decades.</p>

{HR}
{H2('Ninety-Six Hours')}

<p>The interrogation of Juan Rivera was, by the accounts that emerged, extraordinarily prolonged \u2014 reportedly stretching across roughly ninety-six hours, four days, of questioning. Rivera, who suffered from mental illness, was subjected to this over a period during which, he would later say, he was fed the details of the crime and pressed relentlessly toward a confession. He described entering a dissociative state under the pressure. At the end of it, he signed a confession.</p>

<p>The confession contained details of the crime, and the prosecution would present those details as proof of its authenticity \u2014 the classic argument that only the true perpetrator could have known such things. But this argument has a fatal circularity when the details may have been supplied to the suspect during interrogation, which is precisely what Rivera contended had happened. If investigators, over ninety-six hours, communicate the facts of the crime to a suggestible, mentally ill suspect \u2014 whether deliberately or through the ordinary leakage of a long interrogation \u2014 then the presence of those facts in the resulting confession proves nothing about guilt. It proves only that the suspect absorbed what he was told. Rivera recanted the confession, insisting it had been extracted from him in a state of psychological crisis and built from details he had been given.</p>

<p>On the strength of that confession, Juan Rivera was convicted of the murder of Holly Staker in 1993. It was the first of three convictions, and it set the pattern: a case with no physical evidence connecting Rivera to the crime, resting entirely on a confession of deeply questionable reliability, sustained by a prosecutorial certainty that would prove impervious to contradiction.</p>

{HR}
{H2('The DNA Says No')}

<p>In 1996, DNA testing was performed on the semen recovered from Holly Staker's body. The result excluded Juan Rivera. The genetic material left by the child's rapist did not come from him. This should have been decisive. A rape-murder in which the convicted man is excluded as the source of the rapist's semen, and in which there is no other physical evidence tying him to the crime, is a conviction with nothing left to stand on but a contested confession.</p>

<p>But the confession had become, for the Lake County prosecutors, an article of faith, and they would not surrender it to the DNA. Rivera's first conviction had already been overturned on other grounds, and he was retried. In 1998, he was convicted a second time. The DNA exclusion, rather than ending the case, was absorbed into it \u2014 explained, minimized, worked around. The prosecution's commitment to Rivera's guilt had achieved the quality of an unfalsifiable belief, one that no evidence could disturb because any contrary evidence was simply reinterpreted to fit the conclusion.</p>

<p>The DNA exclusion was confirmed again through subsequent testing. The science did not waver. Across the years and the retesting, the answer remained the same: the semen was not Rivera's. And still the case ground forward, because the people prosecuting it had decided, against the evidence, that they were right.</p>

{HR}
{H2('The Argument That Shocked the Courts')}

<p>The third trial, in 2009, produced the argument that would come to define the case's infamy. By then, the DNA exclusion was undeniable and had been confirmed repeatedly. The prosecution needed some way to reconcile the semen that was not Rivera's with the theory that Rivera was the rapist and murderer. The explanation they offered a jury was breathtaking in its willingness to defame a murdered child.</p>

<p>The prosecutors suggested that the semen recovered from eleven-year-old Holly Staker might not have come from her killer at all \u2014 that it might have been the product of some prior sexual contact, and specifically, in the version that most horrified observers, that it could have originated from a young boy with whom the victim had supposedly had contact. In essence, to preserve their theory of Rivera's guilt, the prosecutors were prepared to suggest that a murdered eleven-year-old had been sexually active before her death, so that the presence of another male's semen could be attributed to something other than her rapist. It was an argument constructed entirely backward from the desired conclusion, indifferent to the dignity of the dead child, and unmoored from any evidence.</p>

<p>Legal observers were appalled. It is the kind of argument that reveals, with terrible clarity, what happens when a prosecutorial office cannot admit error: there is no fact too grotesque to assert, no theory too degrading to advance, if it serves to preserve the conviction. The jury, presented with this reconstruction, convicted Juan Rivera a third time. The DNA that excluded him had been transmuted, through prosecutorial ingenuity, into something that did not have to matter.</p>

{HR}
{H2('The Reckoning')}

<p>The third conviction did not survive appellate scrutiny. The Illinois Appellate Court reviewed the case and found the conviction unsupported by the evidence \u2014 a strong and relatively unusual finding, reflecting how far the prosecution had strayed from what the record could bear. The court's decision recognized what should have been apparent for more than a decade: that the case against Juan Rivera, stripped of the discredited confession and confronted with the DNA that excluded him, simply did not hold together.</p>

<p>In January 2012, after nearly twenty years of imprisonment and three separate convictions, the charges against Juan Rivera were finally dropped. He was freed. He had been nineteen when the interrogation broke him; he was in his late thirties when he walked out. Two decades of a man's life had been consumed by a confession extracted over ninety-six hours from someone in mental health crisis, and sustained across three trials by prosecutors who would not let the DNA change their minds.</p>

<p>Rivera later obtained a significant civil settlement, but Illinois's statutory compensation for the wrongfully convicted is capped, and the caps bear little relationship to what two decades of a stolen life are worth. No amount of money, in any case, restores what was taken. He had to rebuild from nothing \u2014 to reconstruct a life, an identity, a place in the world, after twenty years defined by a crime he had not committed and a system that had convicted him of it three times over.</p>

{HR}
{H2('The Pattern of Lake County')}

<p>The Juan Rivera case did not emerge from nowhere. The prosecutors' office of Lake County, Illinois, developed over these years a reputation for exactly the kind of tunnel vision that Rivera's case exemplified \u2014 a pattern of pursuing suspects with a tenacity that outran the evidence, of leaning heavily on confessions of doubtful reliability, of resisting exculpatory science. Rivera's was among the most notorious cases, but it was part of a broader picture of an office that seemed, in case after case, to prize conviction over correctness.</p>

<p>This is the institutional dimension of wrongful conviction, and it is at least as important as any individual act of misconduct. When an office develops a culture in which admitting error is unthinkable, in which the confession is treated as sacrosanct and contrary evidence as a puzzle to be explained away, then wrongful convictions are not aberrations but outputs \u2014 the natural product of the culture. The grotesque argument at Rivera's third trial was not the invention of a single rogue prosecutor; it was the logical endpoint of an institutional commitment to a conclusion that the evidence had long since destroyed. Change the culture and you prevent the argument. Leave the culture intact and you guarantee the next one.</p>

{HR}
{H2('The Accounting')}

<p>As in so many of these cases, the individuals responsible for the injustice done to Juan Rivera faced little in the way of personal consequence. Prosecutors enjoy broad immunity for their conduct in the courtroom, and the doctrines that shield them meant that the men who pursued Rivera through three trials, who advanced the argument about the murdered child, who kept an innocent man imprisoned for twenty years against the DNA, were largely insulated from accountability. The civil settlement was paid, as always, from public funds. The careers of those responsible proceeded.</p>

<p>Consider what the case required to reach its just conclusion. It required Juan Rivera to endure nearly twenty years and three convictions. It required DNA testing, confirmed and reconfirmed, to establish his innocence beyond scientific doubt. It required the Illinois Appellate Court to take the extraordinary step of finding a conviction unsupported. And even after all of that, the correction came late, and incomplete, and at a cost to Rivera that no settlement could repay. The system did not readily admit its error. It had to be forced, over two decades and across three trials, to acknowledge what the DNA had said in 1996.</p>

<p>The deepest lesson of the Juan Rivera case is about the danger of certainty untethered from evidence. Every actor who wronged Rivera \u2014 the interrogators who extracted the confession, the prosecutors who defended it, the juries who accepted it \u2014 was operating from a conviction of his guilt so firm that it could absorb any contradiction. The confession seemed to prove guilt, so the DNA that contradicted it had to be explained away. The theory required an alternative source for the semen, so one was invented, however monstrous. This is how tunnel vision works: not through a single decision to convict an innocent man, but through a thousand small refusals to let the evidence change one's mind. Juan Rivera spent twenty years inside that tunnel. He got out only because the science was patient enough, and a court honest enough, to finally look at what the prosecutors had spent two decades refusing to see.</p>"""

articles.append({
    "title": "Convicted Three Times After DNA Said No: How Lake County, Illinois Prosecutors Pursued Juan Rivera for 20 Years Despite Evidence That Exonerated Him",
    "slug": "juan-rivera-iii-illinois-holly-staker-three-convictions-dna-exclusion-lake-county-prosecutors-wrongful-conviction-2012",
    "date": "2026-07-05T10:00:00-04:00",
    "excerpt": "Juan Rivera was convicted three separate times for the 1992 rape and murder of 11-year-old Holly Staker — even after DNA excluded him as the source of the semen. To explain the science away, Lake County prosecutors suggested the child had prior sexual contact, an argument that shocked legal observers. Rivera was freed in 2012 after nearly 20 years.",
    "tags": ["Juan Rivera", "Illinois", "Holly Staker", "Lake County", "DNA Exclusion", "Wrongful Conviction", "Three Trials", "Prosecutorial Misconduct"],
    "status": "publish",
    "featured_image": "/images/tab/juan-rivera-iii-illinois-holly-staker-three-convictions-dna-exclusion-lake-county-prosecutors-wrongful-conviction-2012.jpg",
    "content": a6_content,
})

with open('/tmp/tab_pieces_3.json', 'w') as f:
    json.dump(articles, f)
print("Wrote", len(articles), "articles")
for a in articles:
    print(a['slug'][:45], "words:", len(a['content'].split()))
