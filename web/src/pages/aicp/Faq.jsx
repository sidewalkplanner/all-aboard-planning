import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { LESSONS } from '../../content/aicp/curriculum';

const GROUPS = [
  {
    heading: 'About the course',
    items: [
      {
        q: 'Is All Aboard Planning affiliated with APA or AICP?',
        a: <p>No. All Aboard Planning is an independent study resource. It isn&rsquo;t affiliated with, endorsed by, or sponsored by the American Planning Association or the American Institute of Certified Planners. For official exam information, go to APA.</p>,
      },
      {
        q: 'How is the course organized?',
        a: <p>There are {LESSONS.length} lessons grouped under the nine domains of the AICP exam content outline. Each lesson has learning objectives, plain-language explanations, key terms, real-world examples, a summary, and a practice set of exam-style questions. See the <Link to={P.course}>course overview</Link>.</p>,
      },
      {
        q: 'What\u2019s the best way to use the course?',
        a: (
          <>
            <p>Take the <Link to={P.diagnostic}>diagnostic</Link>, follow a <Link to={P.studyPlan}>study plan</Link>, and for each lesson: read it, answer each checkpoint as you reach it, do the lesson review without scrolling back, mark it complete, and do its practice set. Spend ten minutes a day on <Link to={P.flashcards}>flashcards</Link>.</p>
            <p>Midway through, retake the diagnostic. In the final weeks, take full-length timed exams, reread the lessons your <Link to={P.progress}>dashboard</Link> lists for review, and read the <Link to={P.strategy}>exam strategy guide</Link> and <Link to={P.quickRef}>quick reference</Link>.</p>
          </>
        ),
      },
      {
        q: 'How long should I study?',
        a: <p>Most candidates do well with a steady plan of two to three months. We offer an <Link to={P.studyPlan + '#8-week'}>8-week plan</Link> (8 to 10 hours a week) and a <Link to={P.studyPlan + '#12-week'}>12-week plan</Link> (5 to 7 hours a week). Take the diagnostic first so you can spend extra time on your weakest domains.</p>,
      },
      {
        q: 'Are the practice questions taken from the real exam?',
        a: <p>No. Every question is original, written to the published content outline and in the formats APA uses: single best answer, &ldquo;all of the following EXCEPT,&rdquo; Roman-numeral combinations, scenario sets, calculations, and data exhibits. We never use recalled live-exam content.</p>,
      },
      {
        q: 'Will my practice score tell me whether I will pass?',
        a: <p>No, and be wary of any product that claims it can. The real exam is scaled and APA doesn&rsquo;t publish a passing percentage. Use practice scores to see which domains need work, and full-length timed exams to build pace and stamina.</p>,
      },
      {
        q: 'Does the course cover the current AICP Code of Ethics?',
        a: <p>Yes. Domain 9 has three lessons on the Code: how it&rsquo;s organized, the Rules of Conduct, and how to work through ethics scenarios. Always read the full current Code on APA&rsquo;s site as well; it&rsquo;s short and it&rsquo;s tested directly.</p>,
      },
    ],
  },
  {
    heading: 'Access and accounts',
    items: [
      {
        q: 'Is it really free?',
        a: <p>Yes. Every lesson, lesson practice set, full-length practice exam, domain drill, the diagnostic, and both study plans are free. See <Link to={P.pricing}>pricing</Link> for the details.</p>,
      },
      {
        q: 'Why do I need an account?',
        a: <p>So your scores and progress are saved in one place and the <Link to={P.progress}>progress page</Link> can show which domains need work. Without an account you can take <Link to={P.runExam('q1', 'practice')}>Warm-up Quiz A</Link> and preview each lesson&rsquo;s learning objectives.</p>,
      },
      {
        q: 'Where is my account stored?',
        a: <p>For now, accounts and progress are kept only in the browser you signed up in. An account created on your phone won&rsquo;t appear on your laptop, and clearing your browser data removes it. We plan to move accounts to a secure online service so progress follows you across devices.</p>,
      },
      {
        q: 'I took Warm-up Quiz A before signing up. Is my score lost?',
        a: <p>No. When you create an account in the same browser, results from before you signed up are added to your new account.</p>,
      },
      {
        q: 'Can my team or class use it?',
        a: <p>Yes, and it&rsquo;s free for groups too. Each person creates their own account. <Link to={P.contact}>Get in touch</Link> if you have questions about group use.</p>,
      },
    ],
  },
  {
    heading: 'Using the practice tools',
    items: [
      {
        q: 'What’s the difference between practice mode and timed mode?',
        a: <p>Practice mode has no clock and lets you check each answer and read the explanation as you go. Timed mode runs the real exam&rsquo;s clock and holds all feedback until you submit, the way test day works.</p>,
      },
      {
        q: 'If I close the tab in the middle of an exam, do I lose my progress?',
        a: <p>No. An exam in progress is saved automatically in your browser. Open the same exam in the same mode and you&rsquo;ll pick up where you left off.</p>,
      },
      {
        q: 'Can I study on my phone?',
        a: <p>Yes. Every page, lesson, and exam works on phones and tablets. For full-length timed exams we still suggest a laptop, which is closer to the real testing experience.</p>,
      },
      {
        q: 'I think a question or lesson has an error. How do I report it?',
        a: <p>Please <Link to={P.contact}>contact us</Link> with the lesson or exam name and the question text. We review every report.</p>,
      },
    ],
  },
  {
    heading: 'About the exam',
    items: [
      {
        q: 'Where do I find eligibility rules, fees, and exam dates?',
        a: <p>APA publishes the official details, and they change from year to year. Our <Link to={P.examInfo}>exam info page</Link> gives an overview and links to APA&rsquo;s pages.</p>,
      },
      {
        q: 'Which topics are weighted most heavily?',
        a: <p>Fundamental Planning Knowledge and Plan and Policy Development are the largest domains at about 15% each, followed by Communication and Interaction at about 13%. See the full breakdown on the <Link to={P.examInfo}>exam info page</Link>.</p>,
      },
    ],
  },
];

export default function Faq() {
  usePageTitle('FAQ');
  return (
    <>
      <PageHeader eyebrow="Help" title="Frequently asked questions" lead="Answers about the course, access, the practice tools, and the exam itself." narrow />
      <div className="container-narrow faq" style={{ paddingBottom: 72 }}>
        {GROUPS.map((g) => (
          <section key={g.heading} aria-labelledby={`faq-${g.heading.replace(/\W+/g, '-')}`} style={{ marginTop: 32 }}>
            <h2 id={`faq-${g.heading.replace(/\W+/g, '-')}`} className="h3" style={{ marginBottom: 14 }}>{g.heading}</h2>
            {g.items.map((it) => (
              <details key={it.q}>
                <summary>{it.q}</summary>
                <div className="answer">{it.a}</div>
              </details>
            ))}
          </section>
        ))}
        <div className="callout" style={{ marginTop: 40 }}>
          <p className="body-text" style={{ margin: 0 }}>Still have a question? <Link to={P.contact} className="link-underline">Contact us</Link>.</p>
        </div>
      </div>
    </>
  );
}
