// Domain 9: AICP Code of Ethics. Original checkpoint questions, written for
// the lessons only (none appear in the practice exams).
export default {
  // aicp-code-of-ethics
  'cp:code-which-rule': {
    text: 'Which of these is an enforceable Rule of Conduct rather than an aspirational principle?',
    options: [
      'Seek social justice by expanding choice and opportunity for everyone',
      'Protect the integrity of the natural and built environment',
      'Do not accept gifts that could reasonably appear intended to influence your judgment',
      'Contribute time to professional activities',
    ],
    correct: 2,
    explanation: 'The gift prohibition is a Rule of Conduct and can support a charge of misconduct. The other three are aspirational principles that describe the conduct planners strive for.',
  },
  'cp:code-first-relationship': {
    text: 'The Code groups its aspirational principles by three relationships. Which comes first and is treated as most important?',
    options: [
      'Responsibility to clients and employers',
      'Overall responsibility to the public',
      'Responsibility to the profession and colleagues',
      'Responsibility to elected officials',
    ],
    correct: 1,
    explanation: 'Responsibility to the public comes first. Planners accept a client’s or employer’s decisions unless the course of action is illegal or plainly inconsistent with that primary obligation.',
  },
  'cp:code-informal-advice': {
    text: 'How does informal advice from the AICP Ethics Officer differ from a formal advisory opinion?',
    options: [
      'Informal advice is quick and not binding; a formal opinion is requested in writing and may be published without naming the member',
      'Informal advice is binding; formal opinions are only suggestions',
      'Informal advice must be requested through the Ethics Committee',
      'Only formal opinions can be requested before acting',
    ],
    correct: 0,
    explanation: 'Both routes are available before acting. Informal advice is fast and non-binding, while formal opinions are written and may be published anonymously to guide other members.',
  },
  'cp:code-who-files': {
    text: 'Who may file a charge of misconduct against an AICP member?',
    options: [
      'Only another AICP member',
      'Only the member’s employer',
      'Only APA staff',
      'Any person, whether or not they are a planner',
    ],
    correct: 3,
    explanation: 'Any person may file a charge alleging a violation of the Rules of Conduct. Filing a charge known to be frivolous is itself a violation.',
  },

  // conflicts-of-interest-and-rules-of-conduct
  'cp:coi-disclose-not-enough': {
    text: 'A city planner owns a share of a property that is the subject of a rezoning application under review by the planner’s department. What should the planner do?',
    options: [
      'Disclose the interest in writing and withdraw from any role in the matter',
      'Disclose the interest and then prepare the staff report as usual',
      'Say nothing, as long as the recommendation is fair',
      'Ask a colleague to sign the report the planner writes',
    ],
    correct: 0,
    explanation: 'Disclosure alone is not enough when the planner has a real financial interest. The planner must disclose and also refrain from any analysis, recommendation, or influence on colleagues.',
  },
  'cp:coi-improper-means': {
    text: 'A consultant tells a prospective client, "I’m close with two commissioners, so I can get your project approved." Under the Rules, this is:',
    options: [
      'Acceptable marketing, since relationships matter',
      'Acceptable if the statement is true',
      'A violation, because it suggests the ability to influence decisions by improper means',
      'Only a violation if the project is approved',
    ],
    correct: 2,
    explanation: 'The Rules prohibit suggesting you can influence decisions by improper means to win clients or work, and using the power of an office to seek special advantage.',
  },
  'cp:coi-confidential-after': {
    text: 'A consultant is retained to testify against a former client. What must the consultant do with information learned in confidence from that former client?',
    options: [
      'Use it freely, since the relationship has ended',
      'Continue to protect it, because the duty of confidentiality outlasts the relationship',
      'Share it only with the new client',
      'Disclose it if it would help win the case',
    ],
    correct: 1,
    explanation: 'The duty to protect confidential information continues after a relationship ends. Disclosure is allowed only when required by law or in the narrow circumstances the Code permits.',
  },
  'cp:coi-competent-team': {
    text: 'A small firm wins a contract that includes a fiscal impact model no one on staff has built before. Which approach complies with the Rules?',
    options: [
      'Build the model without supervision and learn along the way',
      'Tell the client the firm has done many such models',
      'Drop the modeling task without telling the client',
      'Team with a qualified subconsultant who directs the modeling work',
    ],
    correct: 3,
    explanation: 'Planners may accept work they are competent to perform or that is done under the direction of someone who is. Learning on the client’s dime without supervision, or misrepresenting experience, would violate the Rules.',
  },
  'cp:coi-project-credit': {
    text: 'A planner’s résumé lists a downtown plan as "my project," although the planner only attended two meetings as a junior staffer. This most directly violates the Rule against:',
    options: [
      'Accepting gifts',
      'False or exaggerated claims about one’s qualifications or project roles',
      'Disclosing confidential information',
      'Ex parte communication',
    ],
    correct: 1,
    explanation: 'Claiming credit for projects you did not do, like listing a certification you have not earned, is a false claim about your qualifications.',
  },

  // solving-ethics-questions
  'cp:solve-policy-vs-facts': {
    text: 'Which of the following is acceptable under the Code?',
    options: [
      'The council adopts a policy different from the planner’s recommendation',
      'The planner changes the numbers so they support the council’s preference',
      'The planner omits a finding because the mayor dislikes it',
      'The planner rewrites the analysis to remove unfavorable data',
    ],
    correct: 0,
    explanation: 'Policy choices belong to elected officials, and they may decide differently from staff. What the planner may not do is falsify or omit the facts those choices rest on.',
  },
  'cp:solve-identify-client': {
    text: 'A consultant speaks at a public hearing in support of a client’s project. What does the Code require?',
    options: [
      'Speaking as a neutral resident to add credibility',
      'Keeping the client’s identity confidential',
      'Identifying the client and not misrepresenting facts',
      'Declining to speak, since consultants may not advocate',
    ],
    correct: 2,
    explanation: 'Planners in private practice may advocate for clients, but they must identify whom they represent and must not misrepresent facts.',
  },
  'cp:solve-escalate': {
    text: 'A planner told a colleague that the colleague’s study understates a project’s impacts, but the colleague refuses to correct it and the error is serious. What may now be warranted?',
    options: [
      'Nothing further; raising it once is enough',
      'Quietly correcting the numbers without telling anyone',
      'Posting the study online with a critique before doing anything else',
      'Escalating through appropriate channels, which may include a charge of misconduct',
    ],
    correct: 3,
    explanation: 'The first step is to raise the discrepancy directly. If a serious problem is not corrected, further steps through appropriate channels, including a charge of misconduct, may be warranted.',
  },
  'cp:solve-commissioner-call': {
    text: 'A planning commissioner privately calls the staff planner to ask how to vote on a pending quasi-judicial application. What should the planner do?',
    options: [
      'Explain the applicable standards and point to the record, without advising on the outcome',
      'Tell the commissioner how staff would vote',
      'Refuse to speak to the commissioner about anything',
      'Share the applicant’s private concerns to help the commissioner decide',
    ],
    correct: 0,
    explanation: 'Private conversations about pending quasi-judicial matters raise ex parte concerns. The planner can explain the standards and direct the commissioner to the record, but should not advise privately on the outcome.',
  },
  'cp:coi-stricter-rule': {
    text: 'A city’s ethics ordinance lets staff accept meals worth up to $50, but the gift comes from an applicant with a matter pending before the planner. What should the planner do?',
    options: [
      'Accept it, because local law allows it',
      'Accept it and disclose it in the staff report',
      'Decline it, following the stricter standard',
      'Ask the applicant to wait until the decision is made',
    ],
    correct: 2,
    explanation: 'The Code and local ethics law apply together, and the stricter standard governs. A gift from someone with a pending matter should be declined whatever the local limit.',
  },
  'cp:solve-ai-tools': {
    text: 'A planner uses a generative AI tool to draft part of a housing needs assessment. Which approach is consistent with the planner’s ethical obligations?',
    options: [
      'Paste in confidential survey responses so the tool can summarize them',
      'Check the output for accuracy and bias and take responsibility for the final analysis',
      'Present the analysis as the planner’s own expert judgment without reviewing it',
      'Avoid mentioning the tool, since only the results matter',
    ],
    correct: 1,
    explanation: 'The planner remains responsible for accuracy and competence, must protect confidential information, and should be candid about how an analysis was produced.',
  },
};
