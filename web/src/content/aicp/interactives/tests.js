// Walk the test (ids start with "test-"): a fact pattern goes through a legal
// test one stop at a time. At each stop the reader decides, then sees why.
// Each test has two to four cases that end differently, so the reader sees it
// pass and fail.
//
//   title, intro
//   gates   [{ label, cite?, question, yes?, no? }]    the stops, in order
//           (yes/no override the button labels)
//   cases   [{ title, facts, steps, outcome }]
//     steps    [{ answer: true|false, why }]           one per stop reached;
//              the case ends after its last step
//     outcome  { stamp, tone: 'ok'|'err', text }
//
// Keep every rule identical to the lesson's statement of it, and write
// original facts: not the lesson's cases or any checkpoint or exam question.

export const TESTS = {
  'test-variance': {
    title: 'You sit on the board of adjustment',
    intro: 'Three owners ask for variances tonight. Take each request through the typical findings in order. Fail any one and there’s no variance.',
    gates: [
      { label: 'Unique to the lot', question: 'Does the hardship come from conditions unique to this property, not ones shared across the neighborhood?' },
      { label: 'Not self-created', question: 'Did the hardship arise without the owner creating it?' },
      { label: 'Denies reasonable use', question: 'Would the strict rules deny reasonable use of the property (more than a lost chance to earn more)?' },
      { label: 'Keeps the character', question: 'Would the variance keep the area’s essential character and avoid harming neighbors?' },
      { label: 'Minimum needed', question: 'Is this the smallest variance that would relieve the hardship?' },
    ],
    cases: [
      {
        title: 'The triangle lot',
        facts: 'An owner inherited a triangular corner lot. With a 25-foot front setback on both streets, the buildable area is only 12 feet wide. She asks to cut one front setback to 15 feet, just enough for a house of ordinary width. Nearby homes sit 20 to 25 feet back.',
        steps: [
          { answer: true, why: 'The triangle and the two street frontages belong to this lot alone; the neighbors’ rectangular lots don’t share the problem.' },
          { answer: true, why: 'She inherited the lot as it is. Nothing she did created its shape.' },
          { answer: true, why: 'A 12-foot-wide house isn’t reasonable use of a residential lot. This is about basic use, not extra profit.' },
          { answer: true, why: 'Fifteen feet sits close to the 20 to 25 feet on the rest of the street, so the street keeps its character.' },
          { answer: true, why: 'She asks for only what an ordinary-width house needs, and on one frontage, not both.' },
        ],
        outcome: { stamp: 'Variance granted', tone: 'ok', text: 'It passes all five findings.' },
      },
      {
        title: 'The sold-off backyard',
        facts: 'An owner sold the back 30 feet of his deep lot to a neighbor who wanted a bigger garden. The lot that’s left is so shallow that the rear setback leaves no room for the family room he now wants to add, so he asks to build 12 feet into the rear setback.',
        steps: [
          { answer: true, why: 'The lot’s shallowness is now a condition of this property; the deep lots around it don’t have it.' },
          { answer: false, why: 'He created the hardship himself by selling off part of the lot. A self-created hardship doesn’t qualify.' },
        ],
        outcome: { stamp: 'Variance denied', tone: 'err', text: 'It stops at the second finding. The board never needs to reach the other three.' },
      },
      {
        title: 'The hillside house',
        facts: 'Most of a lot is a steep slope that was there when the county platted it, leaving a small flat pad by the street. Under the 35-foot height limit, a house there could have only about 600 square feet; an ordinary three-story house would need about 42 feet. The owner asks for 70 feet, to build five stories. Nearby homes are one and two stories.',
        steps: [
          { answer: true, why: 'The slope is a physical condition of this lot, not something the whole neighborhood shares.' },
          { answer: true, why: 'The slope was there before the owner bought the lot; nothing the owner did created it.' },
          { answer: true, why: 'About 600 square feet is too little for a reasonable home, so strict application does deny reasonable use.' },
          { answer: false, why: 'A five-story, 70-foot house among one- and two-story homes would change the area’s character. The request would fail the fifth finding too: 42 feet would relieve the hardship.' },
        ],
        outcome: { stamp: 'Variance denied', tone: 'err', text: 'It stops at the fourth finding. A smaller request, around 42 feet, might have passed.' },
      },
    ],
  },

  'test-takings': {
    title: 'Is it a taking?',
    intro: 'Run each regulation down the takings route: the two per se questions first, because a yes ends the analysis, then the Penn Central balance.',
    gates: [
      { label: 'Occupation or access', cite: 'Loretto; Cedar Point', question: 'Does the government physically occupy the property, or give others a right to enter it?' },
      { label: 'All economic use gone', cite: 'Lucas', question: 'Does the regulation wipe out all economically beneficial use, where background nuisance law didn’t already bar that use?' },
      { label: 'Penn Central balance', cite: 'Penn Central', question: 'Weighing the economic impact, the investment-backed expectations, and the character of the action, is it likely a taking?', yes: 'Likely a taking', no: 'Likely not' },
    ],
    cases: [
      {
        title: 'The bird counters',
        facts: 'A state rule gives wildlife researchers the right to enter private ranches three days a month to count nesting birds.',
        steps: [
          { answer: true, why: 'The rule gives third parties a right to physically enter private land. Under Cedar Point, that is a per se physical taking, even though the access isn’t continuous.' },
        ],
        outcome: { stamp: 'Per se taking', tone: 'err', text: 'No balancing needed: the state must pay just compensation or drop the rule.' },
      },
      {
        title: 'Conservation only',
        facts: 'A county rezones a 5-acre wooded parcel to "conservation only," allowing no buildings, farming, timber harvest, or any other economic use. State nuisance law never barred building there.',
        steps: [
          { answer: false, why: 'Nothing is occupied and no one gains a right to enter. The county only limits what the owner may do.' },
          { answer: true, why: 'No economically beneficial use is left, and background nuisance law didn’t already bar it. Under Lucas, that is a per se taking.' },
        ],
        outcome: { stamp: 'Per se taking', tone: 'err', text: 'The total wipeout ends the analysis before any balancing.' },
      },
      {
        title: 'The landmark bank',
        facts: 'A town designates a downtown bank building a landmark, which blocks the owner’s plan to add 12 stories on top. The bank keeps operating and earning a reasonable return, and the owner may transfer the unused development rights to nearby sites.',
        steps: [
          { answer: false, why: 'Designation doesn’t occupy the building or open it to anyone.' },
          { answer: false, why: 'The building still earns a reasonable return, so economic use remains.' },
          { answer: false, why: 'Measured against the whole parcel, the impact is modest; the owner’s existing use continues; and the designation adjusts benefits and burdens for the common good. Like Penn Central itself, it’s likely not a taking.' },
        ],
        outcome: { stamp: 'Likely no taking', tone: 'ok', text: 'Most claims end up in the Penn Central balance, and most landmark designations survive it.' },
      },
    ],
  },

  'test-nollan-dolan': {
    title: 'Does the condition hold up?',
    intro: 'Each approval comes with a condition. Take it through the two stops for exactions. Order matters: a condition with no connection to the impact fails at the first stop, however small it is.',
    gates: [
      { label: 'Essential nexus', cite: 'Nollan, 1987', question: 'Is the condition connected to a problem the project itself causes?' },
      { label: 'Rough proportionality', cite: 'Dolan, 1994', question: 'Is the condition roughly proportional to the project’s impact, in nature and extent, based on an individualized determination?' },
    ],
    cases: [
      {
        title: 'The lakeside trail',
        facts: 'To approve a 20-unit apartment building, a city requires the owner to grant a public walking trail across the lot to a lake. The city’s only concern about the project is added traffic on the street.',
        steps: [
          { answer: false, why: 'The concern is traffic, and a lakeside trail does nothing about traffic. There’s no nexus between the condition and the project’s impact.' },
        ],
        outcome: { stamp: 'Condition fails', tone: 'err', text: 'It fails at the first stop, so proportionality never comes up.' },
      },
      {
        title: 'The turn lane',
        facts: 'A new supermarket will add about 400 car trips a day. A traffic study done for this site shows its traffic needs a turn lane at the store’s driveway, and the county requires the developer to build that lane.',
        steps: [
          { answer: true, why: 'The store’s traffic is the problem, and a turn lane at its driveway addresses exactly that.' },
          { answer: true, why: 'A study of this site ties the lane to the store’s own traffic, so the condition is sized to the impact.' },
        ],
        outcome: { stamp: 'Condition stands', tone: 'ok', text: 'Connected to the impact and sized to it.' },
      },
      {
        title: 'The interchange fee',
        facts: 'A county approves a 30,000-square-foot medical office on condition that the developer pay 60% of the cost of a new highway interchange. The county’s own study shows the building would add about 2% of the interchange’s traffic.',
        steps: [
          { answer: true, why: 'The building’s traffic does use the interchange, so the fee is connected to the impact.' },
          { answer: false, why: 'Paying 60% of the cost for 2% of the traffic is far out of proportion. Under Koontz, the tests apply to demands for money, not just land.' },
        ],
        outcome: { stamp: 'Condition fails', tone: 'err', text: 'It passes the first stop and fails the second.' },
      },
    ],
  },

  // VERIFY: the NEPA review levels follow the lesson, which flags that federal NEPA procedures changed substantially in 2025; recheck these cases if the lesson's steps change.
  'test-nepa': {
    title: 'Which level of NEPA review?',
    intro: 'Route each project to the review it needs. The process scales with how significant the effects could be.',
    gates: [
      { label: 'Federal nexus', question: 'Does the project involve federal funding, a federal permit, or federal land?' },
      { label: 'Categorical exclusion', question: 'Is it the kind of action that normally has no significant effects, so it qualifies for a categorical exclusion?' },
      { label: 'Significant effects', question: 'Does the environmental assessment find the effects could be significant?' },
    ],
    cases: [
      {
        title: 'Bike racks',
        facts: 'A city installs bike racks downtown, paid for entirely with city money. No federal permit or land is involved.',
        steps: [
          { answer: false, why: 'NEPA applies only to actions with a federal nexus, and this has none. A state environmental review law might still apply.' },
        ],
        outcome: { stamp: 'NEPA doesn’t apply', tone: 'ok', text: 'No federal funding, permit, or land means no NEPA review.' },
      },
      {
        title: 'Repaving',
        facts: 'A county repaves an existing road within its current footprint, using federal highway funds.',
        steps: [
          { answer: true, why: 'Federal funding gives it a federal nexus.' },
          { answer: true, why: 'Routine repair of an existing road normally has no significant effects, the kind of action a categorical exclusion covers.' },
        ],
        outcome: { stamp: 'Categorical exclusion', tone: 'ok', text: 'It skips detailed review.' },
      },
      {
        title: 'Park-and-ride',
        facts: 'A transit agency uses a federal grant to build a park-and-ride lot on a site that’s already paved. Its environmental assessment finds no significant effects.',
        steps: [
          { answer: true, why: 'The federal grant brings NEPA into play.' },
          { answer: false, why: 'A new facility isn’t routine enough to exclude automatically, so the agency prepares an environmental assessment.' },
          { answer: false, why: 'The assessment finds no significant effects.' },
        ],
        outcome: { stamp: 'EA and FONSI', tone: 'ok', text: 'The assessment ends in a finding of no significant impact.' },
      },
      {
        title: 'New interchange',
        facts: 'A state builds a federally funded highway interchange through a wetland and next to a neighborhood. Its environmental assessment finds the effects could be significant.',
        steps: [
          { answer: true, why: 'Federal funding gives it a federal nexus.' },
          { answer: false, why: 'A major new interchange is nothing like a routine action.' },
          { answer: true, why: 'Effects on a wetland and a neighborhood could be significant.' },
        ],
        outcome: { stamp: 'Full EIS', tone: 'err', text: 'Scoping, a draft EIS with alternatives including no action, public comment, a final EIS, and a record of decision. Even then, NEPA requires study and disclosure, not the least harmful choice.' },
      },
    ],
  },
};
