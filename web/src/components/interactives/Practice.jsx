import { lazy, Suspense, useEffect, useState } from 'react';
import { kindOf, loadDefs } from '../../content/aicp/interactives';

// A practice piece from a lesson's `:::try <id>` line. Each kind's component
// and definitions are fetched only when a lesson uses them, so lessons without
// practice pieces (and the drawing kit behind Try it) cost nothing extra.
const COMPONENTS = {
  calc: lazy(() => import('./TryIt')),
  sort: lazy(() => import('./SortIt')),
};

const Loading = () => <p className="small practice-loading" role="status">Loading the practice&hellip;</p>;

export default function Practice({ id }) {
  const kind = kindOf(id);
  const [def, setDef] = useState(null);
  useEffect(() => {
    let live = true;
    loadDefs[kind]().then((defs) => { if (live) setDef(defs[id] || null); });
    return () => { live = false; };
  }, [id, kind]);
  const Component = COMPONENTS[kind];
  if (!def) return <Loading />;
  return (
    <Suspense fallback={<Loading />}>
      <Component id={id} def={def} />
    </Suspense>
  );
}
