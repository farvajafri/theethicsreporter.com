import json
import re
from datetime import datetime, timezone

json_path = '/Users/farvascott/code/theethicsreporter/theethicsreporter.com/data/posts.json'
with open(json_path, 'r') as f:
    posts = json.load(f)

slug = 'self-preservation-sanction-courts-gatekeep-ai-20260428'
title = 'The Self-Preservation Sanction: How Courts Use "Ethics" to Gatekeep AI'
now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S')

content = """<div style="background:#f4f4f4;border-left:4px solid #c0392b;padding:16px 20px;margin-bottom:28px;">
<strong>&#9889; QUICK FACTS</strong>
<ul>
<li><strong>The Panic:</strong> In recent years, federal courts have aggressively sanctioned law firms—such as Morgan & Morgan—for submitting AI-generated filings that contained "hallucinated" cases.</li>
<li><strong>The Regulatory Rush:</strong> Bar associations nationwide are frantically passing new ethics rules, as highlighted in comprehensive 50-state surveys, aimed specifically at restricting the use of generative AI in legal practice.</li>
<li><strong>The Real Motive:</strong> While framed as consumer protection, these sanctions and rules function as institutional self-preservation to protect the legal monopoly from technological disruption that could democratize access to the law.</li>
</ul>
</div>

<p>The legal profession is engaged in a desperate, rear-guard action against the most significant technological disruption in its history. If you read the headlines from legal trade publications over the past year, the narrative is uniform and alarmist: "Lawyers Sanctioned for Citing AI-Generated Fake Cases," and "AI Hallucinations in Court Papers Spell Trouble." The recent high-profile federal court sanctions against lawyers—including attorneys at the behemoth firm Morgan & Morgan—for relying on generative AI tools have been gleefully championed by the old guard. They point to these blunders as definitive proof that AI has no place in the serious, intellectual work of the law.</p>

<p>But this narrative is a smokescreen. The aggressive weaponization of Rule 11 sanctions and the frantic rewriting of state bar ethics codes are not genuinely about protecting the integrity of the judicial system. They are acts of institutional self-preservation. The courts and the legal academy are using the pretext of "ethics" and "competence" to build a regulatory moat against a technology that threatens their absolute monopoly on legal knowledge.</p>

<h2>The Weaponization of Judicial Sanctions</h2>

<p>To be clear: submitting fake case law to a federal judge is a grievous error. Competence requires verification. However, lawyers have been submitting sloppy, inaccurate, and aggressively misrepresented case law since the invention of the printing press. Before ChatGPT, exhausted junior associates routinely miscited precedents, failed to Shepardize cases, and completely misinterpreted holdings. Historically, when a lawyer submitted a poorly researched brief, the opposing counsel would simply point out the error in their reply brief, the judge would ignore the bad citation, and the system would function as intended. Sometimes, a judge might issue a mild bench slap.</p>

<p>But when artificial intelligence is involved, the judicial response becomes wildly disproportionate. Judges are not merely correcting the record; they are issuing blazing, public rebukes, ordering mandatory continuing legal education on technology, and levying heavy financial sanctions. The vitriol in these orders reveals a deeper anxiety. The courts are not punishing the <em>mistake</em>—they are punishing the <em>mechanism</em>.</p>

<p>By heavily sanctioning early adopters who stumble, the judiciary is sending a chilling message to the entire profession: <em>Do not use these tools.</em> The goal is to make the perceived risk of using generative AI so catastrophically high that practitioners retreat to the safety of legacy systems like LexisNexis and Westlaw—systems that charge astronomical fees and thus reinforce the economic barrier to entry for legal research.</p>

<h2>The Ethics Rules Charade</h2>

<p>Following the lead of the courts, state bar associations are rushing to erect their own barricades. A recent 50-state survey of attorney ethics rules reveals a frantic, coordinated effort to specifically regulate AI. Committees, such as the Vermont Judiciary Committee on Artificial Intelligence and the Courts, are releasing annual reports and guidelines that emphasize the "dangers" of generative AI. </p>

<p>These new rules are consistently framed around the lawyer's "duty of competence" and the "duty of confidentiality." They mandate that lawyers must rigorously understand the technology they are using, vet every output, and ensure that client data is not absorbed into public language models. On their face, these requirements seem reasonable. But in practice, they are a double standard.</p>

<p>Do state bars require lawyers to possess a deep, algorithmic understanding of how the Westlaw search engine ranks cases? Do they demand that lawyers audit the security architecture of their Microsoft Office 365 cloud storage before saving a client document? Of course not. The legal profession has always accepted the use of "black box" technology—provided that technology is expensive and exclusively tailored to lawyers. </p>

<p>Generative AI is different because it is cheap, ubiquitous, and available to the general public. The ethics rules are not designed to ensure competence; they are designed to impose a regulatory tax on efficiency. By demanding impossible standards of technological fluency only for AI, the bar associations are trying to legally mandate the continued reliance on human labor for tasks that machines can now do better and faster.</p>

<h2>Protecting the Guild at the Expense of the Public</h2>

<p>The tragedy of this self-preservation campaign is the collateral damage it inflicts on the public. We are living through an access-to-justice crisis. According to the Legal Services Corporation, low-income Americans do not receive any or enough legal help for 92% of their civil legal problems. Middle-class families are entirely priced out of the legal market, unable to afford $400 an hour for basic representation in family court, eviction proceedings, or debt collection defense.</p>

<p>Generative AI is the first technology in history that possesses the potential to bridge this gap. An AI model can review a lease, draft a legally competent answer to an eviction complaint, and synthesize relevant local ordinances in seconds. For solo practitioners and small firms—the lawyers who actually serve normal people—AI is an equalizer, allowing them to punch above their weight and handle more cases at a lower cost.</p>

<p>By gatekeeping this technology, the legal cartel is ensuring that justice remains a luxury product. When courts sanction lawyers for using AI, and when ethics committees threaten the licenses of those who experiment with it, they are actively suppressing the very innovation that could democratize the law. They are protecting the billable hour at the direct expense of the unrepresented.</p>

<h2>The Inevitable Collapse of the Moat</h2>

<p>This protectionist strategy is ultimately doomed. You cannot regulate away a technological paradigm shift. The economic incentives are simply too massive. Corporate clients are already demanding that their outside counsel use AI to reduce bloated legal bills. As the models improve—and they are improving at a breathtaking pace—the "hallucinations" that courts currently use to justify their sanctions will become a relic of the past.</p>

<p>When an AI can draft a perfectly accurate, highly persuasive, flawlessly cited motion for summary judgment in ten seconds, the ethical argument against using it will evaporate. In fact, within a decade, it will likely be considered ethical malpractice <em>not</em> to use AI, just as it would be malpractice today to rely exclusively on a physical law library.</p>

<p>The legal profession has a choice. It can continue this embarrassing, futile game of regulatory whack-a-mole, punishing practitioners and alienating the public in a desperate bid to protect an obsolete economic model. Or, it can accept the inevitable, dismantle the protectionist rules, and figure out how to use this technology to finally deliver on the constitutional promise of equal justice under the law.</p>

<p>Right now, the courts and the bar associations are choosing the former. They are choosing self-preservation. But the tide of history is against them, and no amount of Rule 11 sanctions will be able to hold back the water forever.</p>
"""

excerpt = '<p>The aggressive sanctions against lawyers using AI and the frantic rewriting of ethics rules aren’t about protecting the public from "hallucinations"—they are acts of institutional self-preservation by a legal monopoly desperate to maintain its gatekeeping power and protect the billable hour.</p>'

max_id = 0
for post in posts:
    pid = post.get('id', 0)
    if isinstance(pid, int):
        max_id = max(max_id, pid)
    elif isinstance(pid, str) and pid.isdigit():
        max_id = max(max_id, int(pid))

new_id = max_id + 1

new_post = {
    'id': new_id,
    'title': title,
    'slug': slug,
    'date': now,
    'modified': now,
    'content': content,
    'excerpt': excerpt,
    'link': f'https://theethicsreporter.com/2026/04/28/{slug}/',
    'status': 'publish',
    'featured_image': f'/images/posts/{slug}.jpg',
    'categories': [1, 2],
    'tags': ['AI', 'Legal Ethics', 'Sanctions', 'Access to Justice', 'Opinion', 'Commentary']
}

posts.insert(0, new_post)

with open(json_path, 'w') as f:
    json.dump(posts, f, indent=2)

print(f"Added post {new_id} - {title}")
