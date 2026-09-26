import { Link } from 'react-router-dom';
import Art from '../components/Art';
import usePageTitle from '../hooks/usePageTitle';
import { P } from '../lib/paths';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="container" style={{ maxWidth: 700, paddingTop: 56, paddingBottom: 110, textAlign: 'center' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <Art name="page-lost" w={540} h={310} eager alt="A streetcar marked 'wrong stop' at the torn end of its track, beside a signpost pointing 'this way?' and 'or here?'" />
      </div>
      <p className="hand" style={{ fontSize: 30, margin: '20px 0 0' }}>404</p>
      <h1 className="h1" style={{ marginTop: 4 }}>
        Hmm, this is the <em className="marker">wrong stop.</em>
      </h1>
      <p className="lead" style={{ margin: '16px auto 0', maxWidth: '48ch' }}>
        That page doesn&rsquo;t exist, or the link is out of date. Hop back on and we&rsquo;ll get you where you were headed.
      </p>
      <div className="row-wrap" style={{ justifyContent: 'center', marginTop: 30 }}>
        <Link className="btn btn-rust" to={P.aicp}>Back to the station</Link>
        <Link className="btn btn-secondary" to={P.course}>Browse the lessons</Link>
      </div>
    </section>
  );
}
