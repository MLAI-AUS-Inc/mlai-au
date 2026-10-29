/** Editorial reading paths, not automatic recommendations or offer eligibility.
 * Keep the next task explicit. Publication order and a shared ICP are not enough.
 * A cross-audience link must explain the different task without changing the CTA.
 */
export type ArticleReadingPath = { href: string; reason: string };
const f = (slug: string) => `/articles/featured/${slug}`;
const issue = (number: number) => `/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates${number === 1 ? '' : `-issue-${number}`}`;
const read = (href: string, reason: string): ArticleReadingPath => ({ href, reason });

export const ARTICLE_READING_PATHS: Record<string, readonly ArticleReadingPath[]> = {
  // Recovered published guides retain their original optional learning offer.
  [f('build-an-ai-personal-assistant-for-one-small-business-task')]: [
    read(f('how-small-business-owners-can-get-started-with-ai-2026'), 'After testing the draft-only assistant, compare full pilot costs and corrections before deciding whether to continue.'),
    read(f('what-are-collaboration-tools'), 'If the next problem is a handoff between tools, check ownership and access before adding integrations to the assistant.'),
  ],
  [f('startups-in-melbourne-for-ai-builders-and-new-founders')]: [
    read(f('where-to-find-ai-events-in-melbourne'), 'For a Melbourne conversation, compare dated listings, format, price and admission conditions before making a shortlist.'),
    read(f('a-practical-guide-for-australian-founders-building-an-ai-startup'), 'For the separate prototype question, inspect a bounded fictional workflow test; attending an event does not establish customer demand.'),
  ],
  // Owners: capability → workflow → design choice → commission → evaluate.
  [f('what-is-artificial-intelligence-used-for-in-everyday-work-and-life')]: [
    read(f('what-is-artificial-intelligence-in-simple-words'), 'Clarify the difference between AI and fixed automation, then check your understanding with everyday examples.'),
    read(f('build-an-ai-personal-assistant-for-one-small-business-task'), 'For a small-business drafting task in an approved existing tool, try the fictional fact sheet and check every output.'),
    read(f('how-to-get-started-with-ai-2026'), 'If you own a business and have selected a possible workflow, compare the workload, review effort and costs before a pilot.'),
  ],
  [f('how-to-get-started-with-ai-2026')]: [
    read(f('how-small-business-owners-can-get-started-with-ai-2026'), 'Turn your selected workflow into a pilot with a baseline, full costs and a stop decision.'),
    read(f('what-is-an-agent-in-artificial-intelligence'), 'Before choosing an agent, compare it with fixed automation and a human-reviewed workflow.'),
  ],
  [f('what-is-an-agent-in-artificial-intelligence')]: [
    read(f('how-to-build-ai-for-real-business-problems'), 'Once you have chosen the simplest suitable approach, describe scope, approvals, acceptance and handover in a commissioning brief.'),
    read(f('how-small-business-owners-can-get-started-with-ai-2026'), 'Check whether the proposed system earns its full pilot costs, including review and corrections.'),
  ],
  [f('how-to-build-ai-for-real-business-problems')]: [
    read(f('how-small-business-owners-can-get-started-with-ai-2026'), 'Use the pilot record to evaluate a scoped proposal against your baseline and genuinely avoidable costs.'),
    read(f('what-are-collaboration-tools'), 'If delivery crosses documents, chat or CRM, define the handoff and source of truth before implementation.'),
  ],
  [f('how-small-business-owners-can-get-started-with-ai-2026')]: [
    read(f('how-to-build-ai-for-real-business-problems'), 'If a build is justified, turn the pilot decision into agreed scope, acceptance tests and ownership.'),
    read(f('what-is-an-agent-in-artificial-intelligence'), 'If the design is still unclear, compare the approval and failure boundaries of an agent with simpler options.'),
    read(f('build-an-ai-personal-assistant-for-one-small-business-task'), 'For a smaller draft-only experiment in an approved existing tool, inspect the fictional opening-hours example and two-week scorecard.'),
  ],
  [f('what-are-collaboration-tools')]: [
    read(f('how-to-build-ai-for-real-business-problems'), 'If the handoff needs custom integration, use a commissioning brief to agree access, acceptance and maintenance.'),
    read(f('how-small-business-owners-can-get-started-with-ai-2026'), 'Evaluate a proposed workflow change against a baseline instead of counting every released minute as cash saved.'),
  ],
  // Builders: learn → deliver → evaluate → hand over, not a promise of work.
  [f('best-way-to-learn-about-ai-2026')]: [
    read(f('a-practical-guide-on-how-to-create-an-artificial-intelligence'), 'Practise a bounded prototype with sample inputs, tests, a known failure and a handover record.'),
    read(f('how-to-get-data-science-job'), 'For a data-career goal, turn checked work into portfolio evidence you can explain in an application.'),
  ],
  [f('a-practical-guide-on-how-to-create-an-artificial-intelligence')]: [
    read(f('what-is-inference-in-artificial-intelligence-and-why-it-matters'), 'Move from the local classifier to an HTTP serving boundary, with request checks and measured limits.'),
    read(issue(8), 'Make the environment and saved evidence reproducible for the person receiving your prototype.'),
  ],
  [f('how-to-get-data-science-job')]: [
    read(f('learn-ai-melbourne'), 'Choose a Melbourne course or learning session to address a specific gap in your target data role.'),
    read(f('where-to-find-ai-events-in-melbourne'), 'Find a relevant local session and bring a specific question about your data project or career path.'),
  ],
  [f('what-is-inference-in-artificial-intelligence-and-why-it-matters')]: [
    read(issue(8), 'Package the environment, versions and evidence so another operator can reproduce the serving setup.'),
    read(issue(4), 'Assess delivery effort as well as request timing; code generation alone does not measure an accepted handover.'),
  ],
  [f('what-is-an-intelligent-agent-in-artificial-intelligence')]: [
    read(issue(5), 'Inspect an agent trace for retries, duplicates and uncertainty without treating activity as proof of intention.'),
    read(issue(8), 'Hand over the agent exercise with pinned files and a reproducible environment record.'),
  ],
  [issue(4)]: [
    read(issue(8), 'Use an environment handover to make the reviewed change reproducible for its recipient.'),
    read(f('how-to-get-data-science-job'), 'If you are preparing a data-career application, show the tests, limitations and contribution behind your delivery claim.'),
  ],
  [issue(5)]: [
    read(f('what-is-an-intelligent-agent-in-artificial-intelligence'), 'Connect trace observations to a bounded PEAS design, permitted actions and refusal tests.'),
    read(issue(4), 'Include the cost of review and correction when describing what your AI-assisted change delivered.'),
  ],
  [issue(8)]: [
    read(issue(4), 'Once someone can reproduce the environment, record the effort and review decision for an accepted change.'),
    read(f('what-is-inference-in-artificial-intelligence-and-why-it-matters'), 'For an HTTP-service task, extend the handover to request validation, model versions and serving measurements.'),
  ],
  [f('how-to-start-a-startup-as-an-ai-builder')]: [
    read(f('a-practical-guide-on-how-to-create-an-artificial-intelligence'), 'Practise the implementation side with a bounded prototype, tests and explicit handover limits.'),
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'For the separate customer-learning task, distinguish a useful build from evidence that someone wants the offer.'),
    read(f('starting-a-company-around-an-ai-idea-from-prototype-to-customers'), 'Already delivering with AI coding tools and considering client work alongside your startup? Check capacity, support limits and the trade-offs of a scoped contract.'),
  ],
  [f('starting-a-company-around-an-ai-idea-from-prototype-to-customers')]: [
    read(f('how-to-start-a-startup-as-an-ai-builder'), 'Check the delivery side of a proposed contract: acceptance, failures and handover are separate from customer demand.'),
    read(f('startup-company-investment-for-ai-founders'), 'If the question is startup financing instead, compare milestone funding and cash commitments rather than assuming contracts are the answer.'),
  ],
  // Learning and research literacy: no contractor assumption from a topic.
  [f('what-is-artificial-intelligence-in-simple-words')]: [
    read(f('what-is-artificial-intelligence-used-for-in-everyday-work-and-life'), 'Compare everyday uses of AI, the input each needs, what can go wrong and what a person should check.'),
    read(f('best-way-to-learn-about-ai-2026'), 'If your next task is learning to build, choose a practical learning route and make work that another person can check.'),
    read(f('what-is-general-artificial-intelligence-and-why-it-matters'), 'If you are wondering about AGI, compare the claim, task and evidence rather than treating all AI as general intelligence.'),
  ],
  [f('how-many-people-use-artificial-intelligence-in-2026')]: [
    read(f('what-is-artificial-intelligence-in-simple-words'), 'Clarify the difference between AI, machine learning and generative AI before comparing adoption figures.'),
    read(issue(2), 'Using or liking an AI tool is different from checking its answers; inspect that distinction in a small study.'),
  ],
  [f('what-is-general-artificial-intelligence-and-why-it-matters')]: [
    read(issue(1), 'Practise reading a narrow image-classification result without turning one benchmark into a general-capability claim.'),
    read(issue(7), 'Examine how robot benchmarks, adaptation and deployment evidence support different conclusions.'),
  ],
  [issue(1)]: [
    read(issue(2), 'Compare a performance score with subjective preference, and ask what each study actually measured.'),
    read(issue(7), 'Apply the same benchmark-reading questions to robotics, where adaptation and physical deployment add constraints.'),
  ],
  [issue(2)]: [
    read(issue(1), 'Compare preference with a classification result whose dataset and missed cases can be inspected.'),
    read(f('what-is-general-artificial-intelligence-and-why-it-matters'), 'Use a claim-evaluation worksheet when a narrow model comparison is presented as evidence of general intelligence.'),
  ],
  [issue(3)]: [
    read(f('how-many-people-use-artificial-intelligence-in-2026'), 'Apply the same boundary and denominator checks to AI-adoption estimates.'),
    read(issue(2), 'Keep environmental estimates separate from whether an answer is useful or correct for a particular task.'),
  ],
  [issue(7)]: [
    read(issue(1), 'Compare the robotics result with another bounded benchmark and inspect what the headline omits.'),
    read(f('what-is-general-artificial-intelligence-and-why-it-matters'), 'Check the extra evidence a general-intelligence claim would require beyond a robot demonstration.'),
  ],
  [f('learn-ai-melbourne')]: [
    read(f('how-to-get-data-science-job'), 'For a data-career goal, connect your learning choice with job requirements, a portfolio and interview preparation.'),
    read(f('where-to-find-ai-events-in-melbourne'), 'For a shorter community learning option, compare dated Melbourne events and check their format and level.'),
    read(f('best-way-to-learn-about-ai-2026'), 'If you specifically want to learn by coding, explore a build-and-test pathway; reading a course comparison does not establish delivery readiness.'),
  ],
  // Founder learning: distinct decisions, not repeated keyword variants.
  [f('a-practical-guide-for-australian-founders-building-an-ai-startup')]: [
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'The workflow example tests behaviour, not demand. Next, plan a customer conversation and distinguish interest, trials and payments.'),
  ],
  [issue(6)]: [
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'Turn the customer-problem question into consent-respecting outreach, recorded answers and a scoped next step.'),
    read(f('go-to-market-for-startups'), 'Once the buyer and offer are clearer, design a bounded channel test with costs and response denominators.'),
  ],
  [f('how-to-get-the-first-customers-for-my-startup-in-2026')]: [
    read(f('go-to-market-for-startups'), 'Use what the conversations reveal to choose one channel test, cost limit and stop rule.'),
    read(f('a-practical-guide-for-australian-founders-building-an-ai-startup'), 'If the next uncertainty is prototype behaviour, inspect a ten-case fictional workflow test. Customer interest and reliable output are different questions.'),
  ],
  [f('go-to-market-for-startups')]: [
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'For the conversation itself, use an outreach draft and evidence record that distinguish interest from payment.'),
    read(f('the-best-startup-pitch-deck-ever'), 'If the next step needs a deck, check that its claims preserve the actual evidence and limits from your test.'),
  ],
  [f('what-an-entrepreneur-does-and-how-to-start-well')]: [
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'Turn the experiment decision into a customer conversation, a scoped offer and explicit evidence of what happened.'),
    read(f('what-constitutes-a-startup-in-practice'), 'If you are still choosing the business model, compare a repeatable product with a service business before planning growth.'),
  ],
  [f('what-constitutes-a-startup-in-practice')]: [
    read(f('what-an-entrepreneur-does-and-how-to-start-well'), 'Move from a business label to a small founder experiment with a recorded decision.'),
    read(f('how-to-startup-a-small-business-in-australia'), 'If a local service business is the better fit, work through customer, cash and official setup questions.'),
  ],
  [f('how-to-startup-a-small-business-in-australia')]: [
    read(f('what-an-entrepreneur-does-and-how-to-start-well'), 'Use a bounded founder experiment to examine the customer and commitment assumptions behind the launch.'),
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'Plan the first customer conversations and record what is interest, a trial or an actual payment.'),
  ],
  [f('how-to-assess-cofounder-values-match-before-you-commit')]: [
    read(f('how-to-test-for-a-cofounder-values-match-before-you-commit'), 'If the conversations justify trying work together, agree a bounded trial and observe behaviour rather than inferring compatibility.'),
    read(f('why-founders-clubs-work-for-early-stage-growth'), 'For the separate peer-support decision, compare participation formats and time commitments; a club is not a cofounder-matching promise.'),
  ],
  [f('how-to-test-for-a-cofounder-values-match-before-you-commit')]: [
    read(f('how-to-assess-cofounder-values-match-before-you-commit'), 'Return to the conversation record when a trial exposes an unresolved value or practical constraint.'),
    read(f('what-an-entrepreneur-does-and-how-to-start-well'), 'Apply the trial lessons to a small founder experiment with explicit evidence and a next decision.'),
  ],
  [f('how-to-pitch-your-idea')]: [
    read(f('the-best-startup-pitch-deck-ever'), 'Turn a clear spoken explanation into deck claims that a reader can inspect and question.'),
    read(f('how-to-get-the-first-customers-for-my-startup-in-2026'), 'For evidence of demand, return to customer conversations; successful rehearsal is a different result.'),
  ],
  [f('the-best-startup-pitch-deck-ever')]: [
    read(f('how-to-pitch-your-idea'), 'Rehearse the spoken explanation and inspect what a listener actually understood.'),
    read(f('startup-company-investment-for-ai-founders'), 'If the deck supports a funding discussion, connect the ask to a milestone and explicit cash assumptions.'),
  ],
  [f('startup-company-investment-for-ai-founders')]: [
    read(f('venture-capital-how-does-it-work'), 'Before choosing a raise, compare capital obligations and the effect of successive rounds on ownership.'),
    read(f('the-best-startup-pitch-deck-ever'), 'Turn the milestone and funding assumptions into evidence-qualified deck claims.'),
  ],
  [f('venture-capital-how-does-it-work')]: [
    read(f('how-vcs-value-startups'), 'Inspect the share arithmetic, valuation and option-pool timing behind a proposed round.'),
    read(f('how-does-a-venture-capital-firm-work'), 'For a prospective meeting, research the particular firm, fund and decision-makers.'),
  ],
  [f('how-does-a-venture-capital-firm-work')]: [
    read(f('how-vcs-value-startups'), 'Prepare to ask how the proposed price, share count and option pool affect ownership.'),
    read(f('venture-capital-how-does-it-work'), 'If you are still choosing whether venture funding fits, compare its obligations with other capital paths.'),
  ],
  [f('how-vcs-value-startups')]: [
    read(f('what-is-a-unicorn-startup-and-why-it-matters'), 'Compare a headline valuation with the dated transaction and simplified ownership calculation behind it.'),
    read(f('how-does-a-venture-capital-firm-work'), 'Separate a valuation calculation from researching a specific fund and its decision process.'),
  ],
  [f('what-is-a-unicorn-startup-and-why-it-matters')]: [
    read(f('how-vcs-value-startups'), 'Go beyond the headline threshold to pre/post-money arithmetic and option-pool timing.'),
    read(f('startup-company-investment-for-ai-founders'), 'For a founder funding decision, start with the milestone and cash need rather than a target unicorn label.'),
  ],
  [f('how-much-venture-capital-was-invested-in-2023')]: [
    read(f('venture-capital-how-does-it-work'), 'Put the historical totals in context by following how venture funding and ownership work.'),
    read(f('how-does-a-venture-capital-firm-work'), 'For a current founder decision, research a specific fund rather than using an aggregate funding total as a fit signal.'),
  ],
  [f('what-is-an-accelerator-and-is-it-right-for-your-ai-startup')]: [
    read(f('startup-accelerator-australia'), 'Use the decision worksheet to compare named Australian programmes, dated evidence and admission limits.'),
    read(f('why-founders-clubs-work-for-early-stage-growth'), 'If your need is peer participation rather than a programme, compare a lower-commitment community format.'),
  ],
  [f('startup-accelerator-australia')]: [
    read(f('what-is-an-accelerator-and-is-it-right-for-your-ai-startup'), 'If programme fit is unclear, compare the actual constraint, founder-time cost and alternatives before applying.'),
    read(f('startup-company-investment-for-ai-founders'), 'Separate programme support from the question of how much cash a specific milestone needs.'),
  ],
  // Participation and discovery: respect location, format and actual next task.
  [f('best-meetup-websites-for-ai-and-startup-communities-in-australia')]: [
    read(f('how-to-find-networking-events'), 'Turn the platform choice into a repeatable search, shortlist and participation plan.'),
    read(f('where-to-find-ai-events-in-melbourne'), 'If Melbourne is your location, compare dated organiser listings and check admission before planning attendance.'),
    read(f('how-to-find-an-ai-and-tech-meetup-in-sydney'), 'If Sydney is your location, compare its dated community directory and explicit online options before making plans.'),
  ],
  [f('how-to-find-networking-events')]: [
    read(f('best-meetup-websites-for-ai-and-startup-communities-in-australia'), 'If a search route is not useful, compare platform filters, account requirements and online-search limits.'),
    read(f('what-community-is-in-ai-and-why-it-is-more-than-a-group'), 'After choosing a session, prepare a small contribution and permission-based follow-up.'),
  ],
  [f('where-to-find-ai-events-in-melbourne')]: [
    read(f('learn-ai-melbourne'), 'If you want a structured course rather than an event, compare Melbourne study options and their commitments.'),
    read(f('what-community-is-in-ai-and-why-it-is-more-than-a-group'), 'Prepare for participation with a useful question and a low-pressure first contribution.'),
    read(f('startups-in-melbourne-for-ai-builders-and-new-founders'), 'If you are exploring a startup in Melbourne, use a customer brief and official setup questions to prepare for the conversation.'),
  ],
  [f('how-to-find-an-ai-and-tech-meetup-in-sydney')]: [
    read(f('how-to-find-networking-events'), 'Use the search-and-shortlist process when you need more Sydney or online options than the dated directory contains.'),
    read(f('what-community-is-in-ai-and-why-it-is-more-than-a-group'), 'Once you choose a suitable session, decide how to take part and ask permission for any follow-up.'),
  ],
  [f('what-community-is-in-ai-and-why-it-is-more-than-a-group')]: [
    read(f('how-to-find-networking-events'), 'Find a session that matches the question, experience level and participation format you have chosen.'),
    read(f('why-australian-startups-need-stronger-ai-communities'), 'If the conversation produces feedback, turn it into a testable next step without mistaking opinion for evidence.'),
  ],
  [f('why-australian-startups-need-stronger-ai-communities')]: [
    read(f('what-an-entrepreneur-does-and-how-to-start-well'), 'Turn the changed question into a small founder experiment with limits and a recorded decision.'),
    read(f('how-to-foster-community-engagement'), 'If you organise the discussion, close the feedback loop with participants rather than only collecting responses.'),
  ],
  [f('why-founders-clubs-work-for-early-stage-growth')]: [
    read(f('how-to-find-networking-events'), 'Use a search and shortlist to try a relevant session before making a larger participation commitment.'),
    read(f('why-australian-startups-need-stronger-ai-communities'), 'After attending, record whether a conversation changed a question you can actually test.'),
    read(f('how-to-assess-cofounder-values-match-before-you-commit'), 'If a peer conversation leads to considering a cofounder, discuss working constraints before proposing a trial; a club does not provide matching.'),
  ],
  [f('how-to-foster-community-engagement')]: [
    read(f('what-community-is-in-ai-and-why-it-is-more-than-a-group'), 'Check the newcomer side of the activity: participation can begin with listening or a small permitted contribution.'),
    read(f('why-australian-startups-need-stronger-ai-communities'), 'Help members distinguish useful feedback from evidence, and turn a conversation into a testable next step.'),
  ],
  // Intentional editorial readers keep their task; no acquisition CTA is added.
  [f('how-modern-technology-affects-education-today-and-in-the-fut')]: [
    read(f('how-technology-affects-education-negatively'), 'Evaluate the potential harms, privacy boundaries and stop conditions alongside a proposed educational benefit.'),
    read(f('how-technology-has-changed-education'), 'Put a current technology claim in historical context without confusing adoption with improved learning.'),
    read(f('how-technology-is-shaping-learning-in-higher-education'), 'For a university decision, check course-specific assessment rules and evidence rather than transferring school guidance unchanged.'),
  ],
  [f('how-technology-affects-education-negatively')]: [
    read(f('how-modern-technology-affects-education-today-and-in-the-fut'), 'Compare the risk record with a source-bounded benefit claim and a small evaluation plan.'),
    read(f('how-technology-is-shaping-learning-in-higher-education'), 'For a university task, check course-specific AI assessment and credit rules rather than applying school guidance unchanged.'),
  ],
  [f('how-technology-has-changed-education')]: [
    read(f('how-modern-technology-affects-education-today-and-in-the-fut'), 'Move from a historical adoption timeline to evaluating a specific current claim and outcome.'),
    read(f('how-technology-affects-education-negatively'), 'Inspect potential harms and limits before treating a newly adopted tool as a learning improvement.'),
  ],
  [f('how-technology-is-shaping-learning-in-higher-education')]: [
    read(f('how-modern-technology-affects-education-today-and-in-the-fut'), 'Compare the higher-education decision with a broader evidence-checking method, retaining the setting of each source.'),
    read(f('how-technology-has-changed-education'), 'Explore selected Australian education changes while keeping institutional adoption separate from learning outcomes.'),
  ],
  [f('invest-in-business-startups-before-you-commit')]: [
    read(f('how-vcs-value-startups'), 'For the separate valuation question, inspect illustrative share and option-pool arithmetic; it is not an investment recommendation.'),
    read(f('how-does-a-venture-capital-firm-work'), 'Understand the distinction between a firm, a fund and its decision-makers without treating a directory entry as diligence.'),
  ],
};
