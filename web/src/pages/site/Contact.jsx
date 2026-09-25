import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { CONTACT_EMAIL } from '../../content/site';

const TOPICS = [
  ['Report an error', 'Tell us the lesson or exam, the question text, and what looks wrong. Accuracy matters to us.'],
  ['Group use', 'Using the course with a department, firm, or university class.'],
  ['Account questions', 'Anything about your account or your practice history.'],
  ['Planning consulting', 'All Aboard Planning will offer consulting services. Get in touch if you would like to talk about a project.'],
];

export default function Contact() {
  usePageTitle('Contact');
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" lead="Questions, corrections, and group pricing. We read everything." narrow />
      <div className="container-narrow" style={{ paddingBottom: 72 }}>
        {CONTACT_EMAIL ? (
          <div className="card">
            <h2 className="h3">Email</h2>
            <p className="body-text" style={{ margin: '8px 0 0' }}>
              <a className="link-underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        ) : (
          <div className="placeholder-box">
            <span className="chip chip-warn">Contact placeholder</span>
            <h2 className="h3" style={{ margin: '12px 0 6px' }}>Contact email coming soon</h2>
            <p className="body-text" style={{ margin: 0 }}>
              A contact address hasn&rsquo;t been set up yet. (Site owner: set <code>CONTACT_EMAIL</code> in
              {' '}<code>web/src/content/site.js</code> and this box becomes a mailto link.)
            </p>
          </div>
        )}

        <h2 className="h3" style={{ marginTop: 36 }}>What to write to us about</h2>
        <div className="grid-2" style={{ marginTop: 14 }}>
          {TOPICS.map(([t, b]) => (
            <div key={t} className="card card-sm">
              <h3 style={{ margin: 0, fontSize: 16.5 }}>{t}</h3>
              <p className="body-text" style={{ margin: '6px 0 0', fontSize: 15 }}>{b}</p>
            </div>
          ))}
        </div>

        <div className="callout" style={{ marginTop: 32 }}>
          <p className="body-text" style={{ margin: 0 }}>
            Questions about eligibility, fees, or exam dates? Those are set by APA. See our{' '}
            <Link to={P.examInfo} className="link-underline">exam info page</Link> for links to the official details, or check the{' '}
            <Link to={P.faq} className="link-underline">FAQ</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
