import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';
import { P } from '../../lib/paths';
import { CONTACT_EMAIL } from '../../content/site';

const TOPICS = [
  ['Report an error', 'Tell me the lesson or exam, the question text, and what looks wrong. Accuracy matters to me.'],
  ['Group use', 'Using the course with a department, firm, or university class.'],
  ['Account questions', 'Anything about your account or your practice history.'],
  ['Just to chat', 'Studying for the exam, planning in general, or ideas for the course. I\u2019m always happy to talk shop.'],
];

export default function Contact() {
  usePageTitle('Contact');
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" lead="Questions, corrections, or just want to chat? I’d love to hear from you." art="page-postcard" artW={500} artH={320} artTilt={-1} artAlt="A postcard reading Hello from the station, with a streetcar stamp" narrow />
      <div className="container-narrow" style={{ paddingBottom: 72 }}>
        <div className="card">
          <h2 className="h3">Email</h2>
          <p className="body-text" style={{ margin: '8px 0 0' }}>
            <a className="link-underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p className="small" style={{ margin: '8px 0 0' }}>That&rsquo;s me, Bobby Sells. I read every message.</p>
        </div>

        <h2 className="h3" style={{ marginTop: 36 }}>What to write about</h2>
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
            Questions about eligibility, fees, or exam dates? Those are set by APA. See the{' '}
            <Link to={P.examInfo} className="link-underline">exam info page</Link> for links to the official details, or check the{' '}
            <Link to={P.faq} className="link-underline">FAQ</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
