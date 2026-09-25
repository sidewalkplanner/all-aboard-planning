import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ASSESSMENTS, DOMAINS } from '../../data/domains';
import { BANK as RAW_EXAM1 } from '../../data/exam1-questions';
import { BANK as RAW_EXAM2 } from '../../data/exam2-questions';
import { BANK as RAW_EXAM3 } from '../../data/exam3-questions';
import { sample } from '../../lib/shuffle';
import useAccess from '../../hooks/useAccess';
import { useDarkMode } from '../../context/DarkModeContext';
import { fmtHoursMinutes, parseExhibit } from '../../lib/format';
import { recordAttempt } from '../../lib/history';
import { P } from '../../lib/paths';
import { lessonBySlug, lessonsToReview, domainByBankName, DOMAINS as CURRICULUM_DOMAINS } from '../../content/aicp/curriculum';
import { accessibleRefs } from '../../content/aicp/freeQuizRefs';
import { scopedKey } from '../../lib/userStorage';

// Tag every question with its ref ("e1:115") so missed items can be mapped
// back to the lessons that teach them (curriculum.js LESSONS_FOR_REF).
const tagged = (bank, b) => bank.map((q) => ({ ...q, ref: `${b}:${q.n}` }));
const EXAM1_BANK = tagged(RAW_EXAM1, 'e1');
const EXAM2_BANK = tagged(RAW_EXAM2, 'e2');
const EXAM3_BANK = tagged(RAW_EXAM3, 'e3');
const BANKS = { e1: EXAM1_BANK, e2: EXAM2_BANK, e3: EXAM3_BANK };
const resolveRef = (ref) => {
  const [b, n] = ref.split(':');
  return (BANKS[b] || []).find((q) => q.n === Number(n)) || null;
};

const ATTEMPTS_KEY = 'aap-exam-attempts';

const loadAttempts = () => {
  try {
    const raw = window.localStorage.getItem(scopedKey(ATTEMPTS_KEY));
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveAttempt = (sessionKey, patch) => {
  try {
    const all = loadAttempts();
    all[sessionKey] = { ...patch, savedAt: Date.now() };
    window.localStorage.setItem(scopedKey(ATTEMPTS_KEY), JSON.stringify(all));
  } catch (e) { /* ignore */ }
};

const clearAttempt = (sessionKey) => {
  try {
    const all = loadAttempts();
    delete all[sessionKey];
    window.localStorage.setItem(scopedKey(ATTEMPTS_KEY), JSON.stringify(all));
  } catch (e) { /* ignore */ }
};

export function useExamSession() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const access = useAccess();
  const { dark, toggleDark } = useDarkMode();

  const aid = params.get('aid') || 'q1';
  const mode = params.get('set') ? 'practice' : (params.get('mode') || 'practice');
  // Domain drills were retired: an old ?drill= link opens that domain's lessons.
  const retiredDrill = params.get('drill');
  // ?set=<lesson slug>: that lesson's practice set (untimed, explained).
  const setLesson = useMemo(() => {
    const slug = params.get('set');
    return slug ? lessonBySlug(slug) : null;
  }, [params]);
  const setRefs = useMemo(() => (setLesson ? accessibleRefs(setLesson, access) : []), [setLesson, access.signedIn, access.fullAccess]); // eslint-disable-line react-hooks/exhaustive-deps
  const sessionKey = setLesson ? `set:${setLesson.slug}|${access.fullAccess ? 'full' : 'free'}` : `${aid}|${mode}|null`;

  const active = useMemo(() => ASSESSMENTS.find((x) => x.id === aid) || ASSESSMENTS[0], [aid]);

  const QS = useMemo(() => {
    if (setLesson) return setRefs.map(resolveRef).filter(Boolean);
    return sample(EXAM1_BANK, active.id, EXAM2_BANK, EXAM3_BANK);
  }, [active.id, setLesson, setRefs]);

  const [view, setView] = useState('question');
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [checked, setChecked] = useState({});
  const [seconds, setSeconds] = useState(active.mins * 60);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  // Guard: gated content requires sign-in (see useAccess). Reset (or restore a saved attempt
  // for) session state whenever the assessment/mode/set identity actually
  // changes (not on every render), so switching between exams — or a
  // reload — never silently drops progress the way it used to.
  const lastKey = useRef(null);
  useEffect(() => {
    // Access rules live in hooks/useAccess.js (sign-in today; sign-in plus
    // membership once paid plans are enabled in lib/access.js).
    if (retiredDrill) {
      const d = domainByBankName(retiredDrill);
      navigate(d ? P.domain(d.id) : P.course, { replace: true });
      return;
    }
    const allowed = setLesson ? setRefs.length > 0 : access.canOpenAssessment(active);
    if (!allowed) {
      navigate(access.blockedTarget(location.pathname + location.search), { replace: true });
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

  // Autosave the in-progress attempt for this exact assessment/mode/set,
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
  const activeTitle = setLesson ? `${setLesson.title}: practice set` : active.title;
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
      kind: 'exam', assessmentId: setLesson ? null : active.id,
      lessonSlug: setLesson ? setLesson.slug : null,
      title: activeTitle, mode, pct, correctCount, total, answeredCount, flagCount, elapsedSeconds,
      missedRefs: QS.filter((qq, idx) => answers[idx] !== qq.correct).map((qq) => qq.ref),
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

  // Where "back" goes from results: the lesson for a practice set, else the exams list.
  const reviewLessons = useMemo(
    () => lessonsToReview(QS.filter((qq, idx) => answers[idx] !== qq.correct).map((qq) => qq.ref), 6),
    [QS, answers]
  );
  const weakDomain = CURRICULUM_DOMAINS.find((d) => d.short === weakestDomain);
  const weakestLink = weakDomain ? P.domain(weakDomain.id) : null;
  const backTo = setLesson ? { to: P.lesson(setLesson.slug), label: 'Back to the lesson' } : { to: P.exams, label: 'Back to exams' };
  const partialSet = !!setLesson && !access.fullAccess && setRefs.length < (setLesson.practice || []).length;

  return {
    aid, mode, setLesson, backTo, partialSet, weakestLink, signedIn: access.signedIn, reviewLessons, active, activeTitle, QS, total, i, q, picked, answeredThis, practice, revealed, canCheck,
    seconds, totalSeconds, dark, toggleDark, view,
    answers, flags, checked, answeredCount, flagCount,
    pick, checkAnswer, toggleFlag, prev, next, goGrid, backToExam, submit, goAnswerReview, goTo,
    domainRows, correctCount, pct, weakestDomain, timeUsed, timeUsedNote, reviewItems,
    navigate
  };
}
