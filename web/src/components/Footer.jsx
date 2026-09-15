import { LIGHT } from '../lib/theme';

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${LIGHT.line}`, marginTop: 'auto' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px', display: 'flex', gap: 20, justifyContent: 'space-between', flexWrap: 'wrap', fontSize: 13.5, color: '#636987' }}>
        <span>All Aboard Planning &mdash; practice exams and study drills. Not affiliated with the American Planning Association.</span>
        <span style={{ display: 'flex', gap: 18 }}><a href="#about">About the exam</a><a href="#contact">Contact</a></span>
      </div>
    </footer>
  );
}
