// You're the planner (ids start with "scene-"): a run of linked situations,
// each with three or four responses. Every response shows what happens next
// and a stamp. The exam rewards the honest, proportionate answer that uses
// proper channels, so most wrong answers are either too passive or too
// aggressive, and the stamps say which.
//
//   title, intro, role
//   steps   [{ tag, title, text, choices }]
//     choices  [{ label, stamp, best: true|false, result, why }]
//              exactly one best; stamps are short ("By the book",
//              "Too passive", "Too aggressive", "Crosses a line")
//
// Write original situations, not the lesson's worked scenarios or any
// checkpoint or exam question, and keep every obligation to what the lesson says.

export const SCENES = {
  'scene-week': {
    title: 'A week at the planning desk',
    intro: 'Five days, five judgment calls. Pick what you would do, see where it leads, and name the obligation behind it using the five-step method.',
    role: 'You’re a senior planner at a city planning department and an AICP member.',
    steps: [
      {
        tag: 'Monday',
        title: 'The paragraph about flooding',
        text: 'Your housing site report finds that the council’s preferred site floods regularly. Your director asks you to cut that paragraph: "The council has already made up its mind."',
        choices: [
          { label: 'Cut it. Where housing goes is the council’s call, and the director has asked.', stamp: 'Too passive', best: false, result: 'The report goes out missing a finding the council needed. If the site floods, the omission is on the record with your name on it.', why: 'Policy choices do belong to elected officials, but you owe them and the public accurate, complete information. Removing an accurate finding misrepresents the analysis.' },
          { label: 'Keep the finding, explain your obligation, and offer to add the council’s reasons beside it.', stamp: 'By the book', best: true, result: 'The director agrees to present the flood finding with context. The council can still choose the site, now knowing the risk.', why: 'You respect the council’s authority to decide while refusing to alter the facts the decision rests on, and you use proper channels. If the pressure continued, you would escalate internally and ask the Ethics Officer for advice.' },
          { label: 'Send the uncut draft to a reporter so the public sees the full story.', stamp: 'Too aggressive', best: false, result: 'The story runs, trust inside the department collapses, and the question of whether the finding belonged in the report was never raised through proper channels.', why: 'Going public first skips every proper channel. Raise the concern with your director, document it, and escalate internally before anything else.' },
        ],
      },
      {
        tag: 'Tuesday',
        title: 'The traffic numbers',
        text: 'Reviewing a colleague’s traffic study for a city project, you notice it used the trip rate for a smaller land use, so it understates the traffic by about half.',
        choices: [
          { label: 'Leave it alone. It isn’t your project, and it isn’t your place to correct it.', stamp: 'Too passive', best: false, result: 'The study goes to the commission with numbers you know are wrong.', why: 'Ignoring misleading figures you’ve found lets inaccurate information reach decision-makers.' },
          { label: 'Tell the colleague and the project manager what you found, and ask for a fix.', stamp: 'By the book', best: true, result: 'Your colleague reruns the numbers with the right rate, and the corrected study goes forward.', why: 'The right first step is to raise the discrepancy through proper channels: say what’s wrong and ask for it to be fixed. Stronger steps come only if a serious error isn’t corrected.' },
          { label: 'Tell the neighborhood association the city is hiding the real traffic numbers.', stamp: 'Too aggressive', best: false, result: 'The neighbors are alarmed, your colleague is blindsided, and the error still isn’t fixed.', why: 'Going public first skips the proper channels. It’s also unfair to a colleague who may simply have made a mistake.' },
        ],
      },
      {
        tag: 'Wednesday',
        title: 'Tagged in a thread',
        text: 'A neighbor tags you in a heated social media thread about a rezoning you’re reviewing and asks, "What will staff recommend?" The staff report isn’t written yet.',
        choices: [
          { label: 'Reply honestly that, from what you’ve seen so far, it will probably be approved.', stamp: 'Crosses a line', best: false, result: 'Your post circulates as "staff has already decided," before the analysis is done.', why: 'A personal post about a pending application looks like prejudgment, even on a private account. Keep comments on pending matters to official channels.' },
          { label: 'Say you can’t discuss it there, and share when the report comes out and how to comment.', stamp: 'By the book', best: true, result: 'The neighbor knows how to be heard, and the record stays clean.', why: 'You keep public business in official channels while treating the resident fairly. Posts about public business can also become public records.' },
          { label: 'Block the neighbor and report the post to the site for harassment.', stamp: 'Too aggressive', best: false, result: 'A resident with a fair question now feels shut out of the process.', why: 'A question about a pending case isn’t harassment. Point people to the official process instead of cutting them off.' },
        ],
      },
      {
        tag: 'Thursday',
        title: 'The survey file',
        text: 'You need to summarize 900 survey responses, and the file includes names and home addresses. Your manager suggests pasting the whole file into a free public AI chatbot to save time.',
        choices: [
          { label: 'Paste it in. It’s fast, and you’ll check the summary for errors afterward.', stamp: 'Crosses a line', best: false, result: 'Residents’ names and addresses now sit in a tool with no protection for them.', why: 'Information people shared in confidence deserves protection. Don’t feed it into tools that don’t protect it.' },
          { label: 'Remove the names and addresses (or use a city-approved tool), then check the summary.', stamp: 'By the book', best: true, result: 'You get the time savings without exposing anyone, and the summary is one you can stand behind.', why: 'You stay responsible for software-assisted work: protect confidential data, check the output for accuracy and bias, and be candid about how the analysis was produced.' },
          { label: 'Refuse to use any software, and report your manager to HR for suggesting it.', stamp: 'Too aggressive', best: false, result: 'The work stalls, and a workable fix was never discussed.', why: 'The obligation isn’t to avoid tools; it’s to use them responsibly. Suggest a safe way to do the work first.' },
        ],
      },
      {
        tag: 'Friday',
        title: 'Your brother’s lot',
        text: 'You’re assigned a rezoning next door to a lot your brother owns. He calls: "Great, you’re on it. Keep me posted on how it’s going."',
        choices: [
          { label: 'Keep the case. You’ll be fair, and you won’t share anything confidential with him.', stamp: 'Too passive', best: false, result: 'Even a fair review looks compromised once the family tie comes out.', why: 'A conflict of interest turns on how it could reasonably appear, not just on your intentions. Good faith doesn’t cure it.' },
          { label: 'Tell your supervisor, step off the case, and tell your brother to wait for the public record.', stamp: 'By the book', best: true, result: 'A colleague takes the case, and nobody can question the review.', why: 'Disclose and step back: that’s the standard response to a conflict of interest. And don’t share information that isn’t public.' },
          { label: 'Quit the department so no one could ever question your independence.', stamp: 'Too aggressive', best: false, result: 'The city loses a planner over a problem one conversation would have solved.', why: 'The response should be proportionate. Disclosing and stepping away from this one case fully resolves the conflict.' },
        ],
      },
    ],
  },
};
