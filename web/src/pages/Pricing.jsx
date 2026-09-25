import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import usePageTitle from '../hooks/usePageTitle';
import useMembership from '../hooks/useMembership';
import { P } from '../lib/paths';
import { PRICE } from '../data/domains';
import { LESSONS } from '../content/aicp/curriculum';
import { PAID_TIER_ENABLED } from '../lib/access';
import useAccess from '../hooks/useAccess';

// PLACEHOLDER PRICES: the owner hasn't set final pricing. Full Access uses
// PRICE from data/domains.js (shared with the rest of the site); the
// Teams tier has no public price.
const FREE_FEATURES = [
  'The 100-item diagnostic with a ranked study list',
  'Two 25-question warm-up quizzes',
  'Free account: the first lesson in each of the nine domains',
  'Free questions from those lessons’ practice sets',
  '8- and 12-week study plans',
];
const FULL_FEATURES = [
  'Everything in Free',
  `All ${LESSONS.length} lessons across the nine domains`,
  'A practice set for every lesson',
  'Three full-length 170-question practice exams, timed or untimed',
  'Progress tracking across attempts',
];
const TEAM_FEATURES = [
  'Full Access for a department, firm, or class',
  'One invoice for the whole group',
  'Help picking a study schedule for your group',
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ flex: 'none', marginTop: 4 }}>
    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FeatureList = ({ items, color }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11, fontSize: 15, color }}>
    {items.map((f) => <li key={f} style={{ display: 'flex', gap: 10 }}><Check />{f}</li>)}
  </ul>
);

// The paid-plans version of this page. Shown only when PAID_TIER_ENABLED
// (lib/access.js) is true. PLACEHOLDER PRICES throughout.
function PaidPricing() {
  usePageTitle('Pricing');
  const navigate = useNavigate();
  const { isMember, demoUnlock } = useMembership();

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Start free. Upgrade when you're ready."
        lead="The free tier uses the same lessons, weighting, and explanations as Full Access, so you can see whether the course fits how you study before you pay."
      />
      <div className="container" style={{ paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: 20, alignItems: 'stretch' }}>
          <section className="card" aria-labelledby="tier-free" style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <h2 id="tier-free" className="eyebrow">Free</h2>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', margin: '4px 0 4px' }}>$0</div>
            <p className="small" style={{ margin: '0 0 22px' }}>No account needed.</p>
            <FeatureList items={FREE_FEATURES} color="var(--text)" />
            <div style={{ marginTop: 'auto', paddingTop: 26 }}><Link className="btn btn-secondary btn-block" to={P.diagnostic}>Take the free diagnostic</Link></div>
          </section>

          <section className="card card-dark" aria-labelledby="tier-full" style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <h2 id="tier-full" className="eyebrow" style={{ color: 'var(--coral-soft)' }}>Full Access</h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '4px 0 4px', flexWrap: 'wrap' }}>
              {/* PLACEHOLDER PRICE */}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>{PRICE}</div>
              <div style={{ fontSize: 14.5, color: 'var(--on-navy-muted)' }}>one time, no renewal</div>
            </div>
            <p style={{ fontSize: 14.5, color: 'var(--on-navy-muted)', margin: '0 0 22px' }}>Access until your test date.</p>
            <FeatureList items={FULL_FEATURES} color="#E8EFF8" />
            <div style={{ marginTop: 'auto', paddingTop: 26 }}>
              {isMember ? (
                <Link className="btn btn-coral btn-block" to={P.course}>You have Full Access: go to the course</Link>
              ) : (
                <button type="button" className="btn btn-coral btn-block" onClick={() => { demoUnlock(); navigate(P.course); }}>
                  Unlock Full Access (demo)
                </button>
              )}
              <p style={{ fontSize: 13, color: '#B8CBE4', textAlign: 'center', margin: '14px 0 0' }}>Refund within 7 days if it isn&rsquo;t useful.</p>
            </div>
          </section>

          <section className="card" aria-labelledby="tier-team" style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <h2 id="tier-team" className="eyebrow">Teams and agencies</h2>
            {/* PLACEHOLDER PRICE: group pricing is quoted on request. */}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', margin: '10px 0 4px' }}>Let&rsquo;s talk</div>
            <p className="small" style={{ margin: '0 0 22px' }}>For planning departments, consulting firms, and university programs.</p>
            <FeatureList items={TEAM_FEATURES} color="var(--text)" />
            <div style={{ marginTop: 'auto', paddingTop: 26 }}><Link className="btn btn-secondary btn-block" to={P.contact}>Contact us</Link></div>
          </section>
        </div>

        <div className="placeholder-box" style={{ marginTop: 28 }}>
          <span className="chip chip-warn">Checkout placeholder</span>
          <p className="body-text" style={{ margin: '10px 0 0' }}>
            Payments and accounts aren&rsquo;t built yet. The <strong>Unlock Full Access (demo)</strong> button unlocks everything
            for this browser session only, so you can preview the full course. It resets when you reload the page.
          </p>
        </div>
      </div>

      <div className="container-narrow" style={{ paddingBottom: 72 }}>
        <h2 className="h3" style={{ marginTop: 24 }}>Questions about pricing</h2>
        <div className="body-text">
          <p><strong>Is this a subscription?</strong> No. Full Access is a one-time purchase.</p>
          <p><strong>Can my employer pay?</strong> Yes. Many agencies cover exam prep as professional development. <Link to={P.contact}>Contact us</Link> for an invoice.</p>
          <p>More answers are on the <Link to={P.faq}>FAQ page</Link>.</p>
        </div>
      </div>
    </>
  );
}

const FREE_NOW = [
  `All ${LESSONS.length} lessons across the nine exam domains`,
  'A practice set for every lesson',
  'Three full-length 170-question practice exams, timed or untimed',
  'Both 25-question warm-up quizzes',
  'The 100-item diagnostic with a ranked study list',
  '8- and 12-week study plans',
  'Progress tracking across every attempt',
];

function FreeAccess() {
  usePageTitle('Pricing');
  const { signedIn } = useAccess();
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="The whole course is free."
        lead="Every lesson, exam, and the diagnostic, at no cost. All you need is an account, which keeps your scores and progress in one place."
      />
      <div className="container" style={{ paddingBottom: 72 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20, alignItems: 'stretch' }}>
          <section className="card card-dark" aria-labelledby="tier-account" style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <h2 id="tier-account" className="eyebrow" style={{ color: 'var(--coral-soft)' }}>Free account</h2>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', margin: '4px 0 4px' }}>$0</div>
            <p style={{ fontSize: 14.5, color: 'var(--on-navy-muted)', margin: '0 0 22px' }}>No credit card. Just a name, email, and password.</p>
            <FeatureList items={FREE_NOW} color="#E8EFF8" />
            <div style={{ marginTop: 'auto', paddingTop: 26 }}>
              {signedIn
                ? <Link className="btn btn-coral btn-block" to={P.course}>Go to the course</Link>
                : <Link className="btn btn-coral btn-block" to={P.createAccount(P.course)}>Create a free account</Link>}
            </div>
          </section>
          <section className="card" aria-labelledby="tier-guest" style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <h2 id="tier-guest" className="eyebrow">No account</h2>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', margin: '10px 0 4px' }}>Try it first</div>
            <p className="small" style={{ margin: '0 0 22px' }}>See how the questions and explanations work before you sign up.</p>
            <FeatureList items={['Warm-up Quiz A (25 questions)', 'Full explanation on every answer', 'A preview of every lesson\u2019s learning objectives']} color="var(--text)" />
            <div style={{ marginTop: 'auto', paddingTop: 26 }}>
              <Link className="btn btn-secondary btn-block" to={P.runExam('q1', 'practice')}>Take Warm-up Quiz A</Link>
            </div>
          </section>
          <section className="card" aria-labelledby="tier-team" style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <h2 id="tier-team" className="eyebrow">Teams and classes</h2>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', margin: '10px 0 4px' }}>Also free</div>
            <p className="small" style={{ margin: '0 0 22px' }}>Studying as a department, firm, or university class? Everyone just creates their own account.</p>
            <FeatureList items={['Each person tracks their own progress', 'Share the study plans with your group', 'Questions about group use? Get in touch']} color="var(--text)" />
            <div style={{ marginTop: 'auto', paddingTop: 26 }}>
              <Link className="btn btn-secondary btn-block" to={P.contact}>Contact us</Link>
            </div>
          </section>
        </div>
        <p className="small" style={{ margin: '24px 0 0' }}>More answers are on the <Link to={P.faq} className="link-underline">FAQ page</Link>.</p>
      </div>
    </>
  );
}

export default function Pricing() {
  return PAID_TIER_ENABLED ? <PaidPricing /> : <FreeAccess />;
}
