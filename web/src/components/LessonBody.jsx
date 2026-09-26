import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Checkpoint from './Checkpoint';
import Calculator from './Calculator';

const BASE = import.meta.env.BASE_URL;

// Renders build-time HTML from a lesson's Markdown (our own authored content,
// not user input). Clicks on internal links become client-side navigation so
// the app doesn't reload. When `slug` is given, every
// <div class="checkpoint-slot" data-refs="…"> in the HTML (from a
// `:::checkpoint` line) gets an interactive Checkpoint rendered into it, and
// every <div class="calc-slot"> (from `:::calc`) gets a Calculator.
export default function LessonBody({ html, slug }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [slots, setSlots] = useState([]);
  const [calcSlots, setCalcSlots] = useState([]);

  useLayoutEffect(() => {
    if (!slug || !ref.current) { setSlots([]); setCalcSlots([]); return; } // eslint-disable-line react-hooks/set-state-in-effect
    const found = [...ref.current.querySelectorAll('.checkpoint-slot')].map((el) => ({ el, refs: el.dataset.refs.split(' ') }));
    setSlots(found); // eslint-disable-line react-hooks/set-state-in-effect -- the slots only exist after the HTML is in the DOM
    setCalcSlots([...ref.current.querySelectorAll('.calc-slot')].map((el) => ({ el, id: el.dataset.calc }))); // eslint-disable-line react-hooks/set-state-in-effect
  }, [html, slug]);

  const onClick = (e) => {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href') || '';
    // Links that open a new tab (a figure's full-size image) aren't routes.
    if (href.startsWith(BASE) && a.target !== '_blank') {
      e.preventDefault();
      navigate('/' + href.slice(BASE.length));
    }
  };
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <div ref={ref} className="prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
      {slots.map((s, i) => createPortal(<Checkpoint slug={slug} refs={s.refs} number={i + 1} total={slots.length} />, s.el, `cp-${i}`))}
      {calcSlots.map((s, i) => createPortal(<Calculator id={s.id} />, s.el, `calc-${slug}-${i}`))}
    </>
  );
}
