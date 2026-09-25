// Domain 6: Administration and Management. Original checkpoint questions,
// written for the lessons only (none appear in the practice exams).
export default {
  // project-and-contract-management
  'cp:pm-scope-assumptions': {
    text: 'A scope of work states "includes four public meetings" and "traffic counts provided by the city." What part of the scope are these?',
    options: [
      'Deliverables',
      'Assumptions and exclusions',
      'Milestones',
      'Performance measures',
    ],
    correct: 1,
    explanation: 'Assumptions and exclusions spell out what the budget covers and what others provide. When a request goes beyond them, a change order documents the added cost and time before the work proceeds.',
  },
  'cp:pm-float': {
    text: 'Tasks A (3 months) and B (2 months) can run at the same time, and task C (2 months) cannot start until both are done. How much float does task B have?',
    options: ['None', '2 months', '1 month', '3 months'],
    correct: 2,
    explanation: 'C waits on the longer of A and B, which is A at 3 months. B finishes after 2 months, so it can slip 1 month without delaying C. A has no float: it is on the critical path.',
  },
  'cp:pm-ifb': {
    text: 'For a clearly defined construction project, which solicitation awards the contract to the lowest responsive, responsible bidder?',
    options: [
      'Invitation for bids',
      'Request for qualifications',
      'Qualifications-based selection',
      'Request for proposals',
    ],
    correct: 0,
    explanation: 'An invitation for bids suits clearly defined goods or construction and is awarded on price. RFQs and QBS select on qualifications, and RFPs weigh approach, qualifications, and usually price together.',
  },
  'cp:pm-consultant-invoices': {
    text: 'Which contract practice best keeps a consultant’s work on track?',
    options: [
      'Paying the full fee up front to build goodwill',
      'Letting several staff members give the consultant direction',
      'Skipping progress meetings to save the consultant’s time',
      'Tying invoices to progress on defined deliverables and milestones',
    ],
    correct: 3,
    explanation: 'Clear deliverables and milestones, with invoices tied to progress, a single point of contact, and regular progress reports, are the basics of managing a consultant well.',
  },
  'cp:pm-qa-vs-qc': {
    text: 'A planning office adopts report templates, mapping standards, and staff training to keep errors from happening in the first place. This is best described as:',
    options: [
      'Quality control',
      'Scope management',
      'Quality assurance',
      'Critical path analysis',
    ],
    correct: 2,
    explanation: 'Quality assurance is the set of processes that prevent errors. Quality control checks finished work products before release, most reliably through structured peer review.',
  },

  // managing-a-planning-agency
  'cp:agency-strong-mayor': {
    text: 'In a "strong mayor" form of mayor-council government, the planning director typically reports to:',
    options: [
      'The mayor',
      'The planning commission',
      'An appointed city manager',
      'The state planning agency',
    ],
    correct: 0,
    explanation: 'In a strong mayor system, the elected mayor is chief executive and appoints department heads. In the council-manager form, the director typically reports to the appointed manager instead.',
  },
  'cp:agency-efficiency': {
    text: '"Percentage of permits reviewed within 30 days" is which type of performance measure?',
    options: [
      'Input',
      'Efficiency',
      'Outcome',
      'Output',
    ],
    correct: 1,
    explanation: 'Efficiency measures relate output to input or timeliness, such as cost per permit or review within a deadline. A simple count of permits reviewed would be an output measure.',
  },
  'cp:agency-review-times': {
    text: 'A director wants to shorten development review times. What is the best first step?',
    options: [
      'Hire more reviewers immediately',
      'Cut review steps at random until times drop',
      'Announce a new deadline for all reviews',
      'Map the current review process to find where delays actually happen',
    ],
    correct: 3,
    explanation: 'Results-oriented management starts with evidence. Mapping the current process shows where time is actually lost before resources or rules are changed.',
  },
  'cp:agency-first-meeting': {
    text: 'A usually reliable planner has started missing deadlines. What should the supervisor do first?',
    options: [
      'Meet privately to understand the cause and clarify expectations',
      'Issue a written warning',
      'Reassign the planner’s projects without explanation',
      'Raise the issue at the next staff meeting',
    ],
    correct: 0,
    explanation: 'Meeting privately first can reveal a training gap, a workload problem, or a personal issue. Progressive discipline follows only if problems continue.',
  },
  'cp:agency-serial-meeting': {
    text: 'Four of seven planning commissioners trade a chain of emails debating how to vote on a pending application. The main concern is that this:',
    options: [
      'Violates the records retention schedule',
      'Is a conflict of interest',
      'Is allowed because no one met in person',
      'May be a serial meeting that violates the open-meetings law',
    ],
    correct: 3,
    explanation: 'A majority of a body discussing public business outside a noticed meeting, including through a chain of emails, can violate sunshine laws. Those emails are usually public records too.',
  },
};
