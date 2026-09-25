import { useNavigate } from 'react-router-dom';
import Art from '../components/Art';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="wrap" style={{ maxWidth: 700, padding: '64px 24px 110px', textAlign: 'center' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <Art name="page-lost" w={540} h={310} eager alt="A streetcar marked 'wrong stop' at the torn end of its track, beside a signpost pointing 'this way?' and 'or here?'" />
      </div>
      <div className="hand" style={{ fontSize: 30, marginTop: 20 }}>404</div>
      <h1 className="display" style={{ fontSize: 'clamp(38px,5vw,54px)', margin: '4px 0 0' }}>
        Hmm, this is the <em className="marker">wrong stop.</em>
      </h1>
      <p className="lede" style={{ margin: '16px auto 0', maxWidth: '48ch' }}>
        That page doesn&rsquo;t exist, or the link is out of date. Hop back on and we&rsquo;ll get you where you were headed.
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
        <button className="btn btn--tomato" onClick={() => navigate('/')}>Back to the station</button>
        <button className="btn btn--paper" onClick={() => navigate('/exams')}>Browse practice exams</button>
      </div>
    </section>
  );
}
