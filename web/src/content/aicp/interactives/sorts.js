// Sort it (ids start with "sort-"): a deck of short situations, dealt one at a
// time, each sent to one of 2 to 5 piles. Every card carries a one-line
// reason, shown whether the reader gets it right or wrong; a missed card goes
// back to the bottom of the deck, so the round ends with every card placed.
//
//   title, intro
//   piles   [{ id, label }]                 2 to 5
//   cards   [{ text, pile, why }]           at least 6; every pile used
//
// Write original situations that test the idea from a new angle: not the
// lesson's own examples, and never a checkpoint or exam question.

export const SORTS = {
  'sort-levels': {
    title: 'Name the level of measurement',
    intro: 'For each variable, decide what kind of numbers it holds. That decides which statistics you can use.',
    piles: [
      { id: 'nominal', label: 'Nominal' },
      { id: 'ordinal', label: 'Ordinal' },
      { id: 'interval', label: 'Interval' },
      { id: 'ratio', label: 'Ratio' },
    ],
    cards: [
      { text: 'The zoning district of each parcel: R-1, C-2, M-1', pile: 'nominal', why: 'The codes are names for categories. There is no order, so the only center you can report is the mode.' },
      { text: 'How strongly residents agree that the bus is reliable, from "strongly disagree" to "strongly agree"', pile: 'ordinal', why: 'The answers have an order, but nobody knows whether the step from "agree" to "strongly agree" equals the step below it.' },
      { text: 'The year each building in a district was built', pile: 'interval', why: 'The gaps between years are equal, but year zero isn’t "no time," so 2000 isn’t twice 1000.' },
      { text: 'The number of vehicles each household owns', pile: 'ratio', why: 'Zero means none, and two cars really is twice one car, so every statistic works.' },
      { text: 'Whether each household owns or rents its home', pile: 'nominal', why: 'Owner and renter are categories with no order between them.' },
      { text: 'The priority tier a project gets in the capital program: high, medium, or low', pile: 'ordinal', why: 'High outranks medium, but the tiers say nothing about how far apart they are.' },
      { text: 'Surface temperature on a heat-island map, in degrees Celsius', pile: 'interval', why: 'Zero degrees Celsius isn’t an absence of heat, so 30° isn’t "twice as hot" as 15°, even though each degree is the same size.' },
      { text: 'Minutes of travel time to the nearest grocery store', pile: 'ratio', why: 'Time has a true zero: a 20-minute trip takes twice as long as a 10-minute one.' },
      { text: 'Each city’s rank among the state’s 20 largest', pile: 'ordinal', why: 'Ranks put cities in order but hide the gaps: number 1 might be ten times the size of number 2 or barely larger.' },
    ],
  },

  'sort-iap2': {
    title: 'Which promise is the agency making?',
    intro: 'Each statement is a promise to the public. Place it on the IAP2 spectrum by how much influence it gives people.',
    piles: [
      { id: 'inform', label: 'Inform' },
      { id: 'consult', label: 'Consult' },
      { id: 'involve', label: 'Involve' },
      { id: 'collaborate', label: 'Collaborate' },
      { id: 'empower', label: 'Empower' },
    ],
    cards: [
      { text: '"We’ll post the construction schedule and text you the day before your street closes."', pile: 'inform', why: 'Information flows one way. It helps people understand and plan, but gives them no say in the decision.' },
      { text: '"Tell us which of these two draft designs you prefer. We’ll report back on how your comments shaped the final choice."', pile: 'consult', why: 'The agency asks for feedback on options it drew up and promises to explain what it did with that feedback.' },
      { text: '"We’ll work with you at every stage, so the options we develop reflect the concerns you raise."', pile: 'involve', why: 'The public works directly with staff throughout, shaping the alternatives, though the agency still picks among them.' },
      { text: '"A resident working group will develop the options with staff and choose the preferred one together with us."', pile: 'collaborate', why: 'The public shares the work of developing alternatives and choosing the preferred solution. That partnership is what defines collaborate.' },
      { text: '"Residents will vote on how to spend $500,000 of the capital budget, and the city will fund the winning projects."', pile: 'empower', why: 'The public makes the final decision and the agency carries it out.' },
      { text: '"A fact sheet explains why the water main must be replaced this summer and how long the work will take."', pile: 'inform', why: 'A necessary repair with no real options: the right level is to explain it clearly and on time.' },
      { text: '"Staff will hold a workshop at each phase of the plan, and every new draft will show how the workshop ideas changed it."', pile: 'involve', why: 'Repeated, direct work with the public that visibly shapes each draft goes beyond one round of feedback.' },
      { text: '"Take our online survey on three park designs. Staff will explain afterward how the results affected the decision."', pile: 'consult', why: 'A single round of feedback on staff-made options, plus an explanation afterward, is consult.' },
      { text: '"The citizens’ panel’s choice of route is final, and the transit board has agreed to build it."', pile: 'empower', why: 'When the agency commits in advance to carry out the public’s decision, that is empower.' },
    ],
  },

  'sort-goal-objective-policy': {
    title: 'Goal, objective, policy, or action?',
    intro: 'A goal is broad, an objective is measurable, a policy guides decisions, and an action is a task someone owns. Sort these plan statements.',
    piles: [
      { id: 'goal', label: 'Goal' },
      { id: 'objective', label: 'Objective' },
      { id: 'policy', label: 'Policy' },
      { id: 'action', label: 'Action' },
    ],
    cards: [
      { text: 'Neighborhoods are safe and pleasant places to walk.', pile: 'goal', why: 'A broad end state with no number or date: nobody could say exactly when it has been reached.' },
      { text: 'Eliminate traffic deaths on city streets by 2040.', pile: 'objective', why: 'A specific, measurable target with a deadline that moves toward the walkability goal.' },
      { text: 'The city shall require sidewalks on both sides of every new street.', pile: 'policy', why: 'It commits the city to a course of action it will apply every time a new street is approved.' },
      { text: 'Public Works: repaint crosswalks at the 20 highest-crash intersections by March 2027, funded in the capital budget.', pile: 'action', why: 'A specific task with a responsible department, a deadline, and money: the most concrete level.' },
      { text: 'Increase transit’s share of work trips from 8% to 12% by 2035.', pile: 'objective', why: 'It has a starting point, a target, and a date, so progress can be measured. It doesn’t say who does what, which an action would.' },
      { text: 'The community’s air and water are clean and healthy.', pile: 'goal', why: 'An aspiration for the future, too broad to measure directly.' },
      { text: 'New development shall manage its stormwater on site.', pile: 'policy', why: 'A standing rule for decisions: staff will apply it to every development review.' },
      { text: 'Parks Department: apply for a state trail grant in the fall 2026 funding round.', pile: 'action', why: 'One task, one owner, one date. That makes it an implementation action.' },
      { text: 'The city will give sidewalk projects in neighborhoods that lack them priority in the capital budget.', pile: 'policy', why: 'It tells decision-makers how to choose among projects year after year, which is what a policy does.' },
      { text: 'Downtown is a lively center of culture and commerce.', pile: 'goal', why: 'A desired end state in general terms. Objectives would put numbers on it.' },
    ],
  },

  'sort-who-decides': {
    title: 'Who decides?',
    intro: 'Send each zoning request to the body that typically decides it. Details vary by state and city; these follow the usual pattern.',
    piles: [
      { id: 'admin', label: 'Zoning administrator' },
      { id: 'pc', label: 'Planning commission' },
      { id: 'bza', label: 'Board of zoning adjustment' },
      { id: 'council', label: 'Governing body' },
    ],
    cards: [
      { text: 'A homeowner wants a permit for a deck that meets every setback and height rule.', pile: 'admin', why: 'A use or structure the code allows by right needs only a staff check against the rules; no hearing is involved.' },
      { text: 'The final vote to rezone a corridor from industrial to mixed use.', pile: 'council', why: 'Amending the zoning map is legislative, so the governing body that adopted the ordinance makes the final decision.' },
      { text: 'A hearing and a recommendation on that corridor rezoning, before the final vote.', pile: 'pc', why: 'The planning commission typically reviews map and text amendments and sends a recommendation to the governing body.' },
      { text: 'An unusually shallow lot’s owner asks to build 5 feet into the rear setback.', pile: 'bza', why: 'A request to depart from a dimensional standard because of the lot’s shape is a variance, which the board decides.' },
      { text: 'A shop owner believes staff misread the code in classifying her business, and wants that decision overturned.', pile: 'bza', why: 'Appeals of the zoning administrator’s decisions go to the board of zoning adjustment.' },
      { text: 'The code doesn’t say whether a "maker space" is light manufacturing or retail. Someone must decide how to classify it.', pile: 'admin', why: 'When the text is unclear, the zoning administrator issues a formal interpretation, which can then be appealed to the board.' },
      { text: 'A neighbor reports that a house in a residential district is being run as a car repair shop.', pile: 'admin', why: 'Enforcing the code, from inspection to notice of violation, is a staff job.' },
      { text: 'Adopting a new zoning chapter on short-term rentals.', pile: 'council', why: 'New regulations are legislation, so the governing body adopts them.' },
      { text: 'Reviewing a proposed text amendment to raise downtown height limits and advising on it.', pile: 'pc', why: 'Text amendments usually go to the planning commission for review and a recommendation before the governing body acts.' },
    ],
  },
};
