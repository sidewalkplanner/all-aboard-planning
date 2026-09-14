import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ASSESSMENTS, DOMAINS } from '../../data/domains';
import { BANK as EXAM1_BANK } from '../../data/exam1-questions';
import { BANK as EXAM2_BANK } from '../../data/exam2-questions';
import { sample, shuffle } from '../../lib/shuffle';
import { useUnlock } from '../../context/UnlockContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { fmtHoursMinutes } from '../../lib/format';

const DRILLPOOL = EXAM1_BANK.concat(EXAM2_BANK);

export function useExamSession() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { unlocked } = useUnlock();
  const { dark, toggleDark } = useDarkMode();

  const aid = params.get('aid') || 'q1';
  const mode = params.get('mode') || 'practice';
  const drill = params.get('drill') || null;
  const sessionKey = `${aid}|${mode}|${drill}`;

  const active = useMemo(() => ASSESSMENTS.find((x) => x.id === aid) || ASSESSMENTS[0], [aid]);

  const QS = useMemo(() => {
    if (drill) return shuffle(DRILLPOOL.filter((qq) => qq.domain === drill), 7717).slice(0, 25);
    return sample(EXAM1_BANK, active.id, EXAM2_BANK);
  }, [drill, active.id]);

  const [view, setView] = useState('question');
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [seconds, setSeconds] = useState(active.mins * 60);

  // Guard: paid content requires unlock. Reset session state whenever the
  // assessment/mode/drill identity actually changes (not on every render).
  const lastKey = useRef(null);
  useEffect(() => {
    if ((active.tier === 'paid' && !active.soon && !unlocked) || (drill && !unlocked)) {
      navigate('/pricing', { replace: true });
      return;
    }
    if (lastKey.current !== sessionKey) {
      lastKey.current = sessionKey;
      setView('question');
      setI(0);
      setAnswers({});
      setFlags({});
      setSeconds(active.mins * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  // Countdown only runs while viewing a question, in timed mode — mirrors
  // the prototype pausing the clock on the review grid.
  useEffect(() => {
    if (mode !== 'timed' || view !== 'question') return undefined;
    const t = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [mode, view]);

  const total = QS.length;
  const q = QS[i] || QS[0];
  const picked = answers[i];
  const answeredThis = picked !== undefined;
  const practice = mode === 'practice';
  const revealed = practice && answeredThis;
  const activeTitle = drill ? drill + ' drill' : active.title;
  const totalSeconds = active.mins * 60;

  const pick = (idx) => {
    if (revealed) return;
    setAnswers((a) => ({ ...a, [i]: idx }));
  };
  const toggleFlag = () => setFlags((f) => ({ ...f, [i]: !f[i] }));
  const prev = () => setI((n) => Math.max(0, n - 1));
  const next = () => { if (i >= total - 1) setView('grid'); else setI((n) => n + 1); };
  const goGrid = () => setView('grid');
  const backToExam = () => setView('question');
  const submit = () => setView('results');
  const goAnswerReview = () => setView('review');
  const goTo = (idx) => { setI(idx); setView('question'); };

  const answeredCount = Object.keys(answers).length;
  const flagCount = Object.values(flags).filter(Boolean).length;

  const domainRows = useMemo(() => DOMAINS.map((d) => {
    const inDomain = QS.map((qq, idx) => ({ qq, idx })).filter((x) => x.qq.domain === d.name);
    const got = inDomain.filter((x) => answers[x.idx] === x.qq.correct).length;
    const sessionPct = inDomain.length ? Math.round((got / inDomain.length) * 100) : 0;
    return { ...d, n: inDomain.length, got, sessionPct };
  }), [QS, answers]);

  const correctCount = QS.filter((qq, idx) => answers[idx] === qq.correct).length;
  const pct = total ? Math.round((correctCount / total) * 100) : 0;

  const weakestDomain = (() => {
    let worst = null, worstPct = 2;
    domainRows.forEach((d) => {
      if (!d.n) return;
      const p = d.got / d.n;
      if (p < worstPct) { worstPct = p; worst = d.short; }
    });
    return worst || '—';
  })();

  const timeUsed = practice ? 'Untimed' : (() => {
    const e = totalSeconds - seconds;
    return Math.floor(e / 3600) + 'h ' + String(Math.floor((e % 3600) / 60)).padStart(2, '0') + 'm';
  })();
  const timeUsedNote = practice ? 'Practice mode has no clock' : 'Time used of ' + fmtHoursMinutes(active.mins);

  const reviewItems = useMemo(() => QS.map((qq, idx) => {
    const yours = answers[idx];
    const right = yours === qq.correct;
    return {
      idx, right,
      mark: right ? 'Correct' : 'Missed',
      domain: qq.domain, difficulty: qq.difficulty, text: qq.text, scenario: qq.scenario || '',
      numLabel: 'Question ' + (idx + 1),
      correctText: qq.options[qq.correct],
      showYours: yours !== undefined && !right,
      yourText: yours !== undefined ? qq.options[yours] : '',
      explanation: qq.explanation
    };
  }).sort((a, b) => (a.mark === 'Missed' ? -1 : 1) - (b.mark === 'Missed' ? -1 : 1)), [QS, answers]);

  return {
    aid, mode, drill, active, activeTitle, QS, total, i, q, picked, answeredThis, practice, revealed,
    seconds, totalSeconds, dark, toggleDark, view,
    answers, flags, answeredCount, flagCount,
    pick, toggleFlag, prev, next, goGrid, backToExam, submit, goAnswerReview, goTo,
    domainRows, correctCount, pct, weakestDomain, timeUsed, timeUsedNote, reviewItems,
    navigate
  };
}
