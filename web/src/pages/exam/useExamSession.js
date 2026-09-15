import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ASSESSMENTS, DOMAINS } from '../../data/domains';
import { BANK as EXAM1_BANK } from '../../data/exam1-questions';
import { BANK as EXAM2_BANK } from '../../data/exam2-questions';
import { BANK as EXAM3_BANK } from '../../data/exam3-questions';
import { sample, shuffle } from '../../lib/shuffle';
import { useUnlock } from '../../context/UnlockContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { fmtHoursMinutes, parseExhibit } from '../../lib/format';
import { recordAttempt } from '../../lib/history';

const DRILLPOOL = EXAM1_BANK.concat(EXAM2_BANK, EXAM3_BANK);

const ATTEMPTS_KEY = 'aap-exam-attempts';

const loadAttempts = () => {
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveAttempt = (sessionKey, patch) => {
  try {
    const all = loadAttempts();
    all[sessionKey] = { ...patch, savedAt: Date.now() };
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
  } catch (e) { /* ignore */ }
};

const clearAttempt = (sessionKey) => {
  try {
    const all = loadAttempts();
    delete all[sessionKey];
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
  } catch (e) { /* ignore */ }
};

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
    return sample(EXAM1_BANK, active.id, EXAM2_BANK, EXAM3_BANK);
  }, [drill, active.id]);

  const [view, setView] = useState('question');
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [checked, setChecked] = useState({});
  const [seconds, setSeconds] = useState(active.mins * 60);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  // Guard: paid content requires unlock. Reset (or restore a saved attempt
  // for) session state whenever the assessment/mode/drill identity actually
  // changes (not on every render), so switching between exams — or a
  // reload — never silently drops progress the way it used to.
  const lastKey = useRef(null);
  useEffect(() => {
    if ((active.tier === 'paid' && !active.soon && !unlocked) || (drill && !unlocked)) {
      navigate('/pricing', { replace: true });
      return;
    }
    if (lastKey.current !== sessionKey) {
      lastKey.current = sessionKey;
      const saved = loadAttempts()[sessionKey];
      setView('question');
      setI(saved ? saved.i || 0 : 0);
      setAnswers(saved ? saved.answers || {} : {});
      setFlags(saved ? saved.flags || {} : {});
      setChecked(saved ? saved.checked || {} : {});
      setSeconds(saved && saved.seconds !== undefined ? saved.seconds : active.mins * 60);
      setStartedAt(saved && saved.startedAt ? saved.startedAt : Date.now());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  // Autosave the in-progress attempt for this exact assessment/mode/drill,
  // so a reload (or switching to a different exam and back) resumes rather
  // than losing progress. Cleared once the attempt is submitted.
  useEffect(() => {
    if (lastKey.current !== sessionKey) return;
    saveAttempt(sessionKey, { i, answers, flags, checked, seconds, startedAt });
  }, [sessionKey, i, answers, flags, checked, seconds, startedAt]);

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
  const revealed = practice && answeredThis && !!checked[i];
  const canCheck = practice && answeredThis && !checked[i];
  const activeTitle = drill ? drill + ' drill' : active.title;
  const totalSeconds = active.mins * 60;

  const pick = (idx) => {
    if (revealed) return;
    setAnswers((a) => ({ ...a, [i]: idx }));
  };
  const checkAnswer = () => setChecked((c) => ({ ...c, [i]: true }));
  const toggleFlag = () => setFlags((f) => ({ ...f, [i]: !f[i] }));
  const prev = () => setI((n) => Math.max(0, n - 1));
  const next = () => { if (i >= total - 1) setView('grid'); else setI((n) => n + 1); };
  const goGrid = () => setView('grid');
  const backToExam = () => setView('question');
  const submit = () => {
    const elapsedSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
    recordAttempt({
      kind: 'exam', assessmentId: drill ? null : active.id, drillName: drill || null,
      title: activeTitle, mode, pct, correctCount, total, answeredCount, flagCount, elapsedSeconds,
      domainBreakdown: domainRows.filter((d) => d.n > 0).map((d) => ({ short: d.short, got: d.got, n: d.n }))
    });
    clearAttempt(sessionKey);
    setView('results');
  };
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
      domain: qq.domain, text: qq.text, scenario: qq.scenario || '', exhibit: parseExhibit(qq.exhibit),
      numLabel: 'Question ' + (idx + 1),
      correctText: qq.options[qq.correct],
      showYours: yours !== undefined && !right,
      yourText: yours !== undefined ? qq.options[yours] : '',
      explanation: qq.explanation
    };
  }).sort((a, b) => (a.mark === 'Missed' ? -1 : 1) - (b.mark === 'Missed' ? -1 : 1)), [QS, answers]);

  return {
    aid, mode, drill, active, activeTitle, QS, total, i, q, picked, answeredThis, practice, revealed, canCheck,
    seconds, totalSeconds, dark, toggleDark, view,
    answers, flags, checked, answeredCount, flagCount,
    pick, checkAnswer, toggleFlag, prev, next, goGrid, backToExam, submit, goAnswerReview, goTo,
    domainRows, correctCount, pct, weakestDomain, timeUsed, timeUsedNote, reviewItems,
    navigate
  };
}
