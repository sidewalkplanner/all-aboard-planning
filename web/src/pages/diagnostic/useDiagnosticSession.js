import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITEMS } from '../../data/diagnostic-items';
import { DIAG_DOMAINS, DIAG_KEY, DIAG_TITLE, EXAM_PACE, FORMAT_LABEL, bandFor } from '../../data/diagDomains';
import { shuffle } from '../../lib/shuffle';
import { parseExhibit } from '../../lib/format';
import { LETTERS } from '../../data/domains';
import { recordAttempt } from '../../lib/history';
import { useDarkMode } from '../../context/DarkModeContext';

const DI = ITEMS;
const dTotal = DI.length;

const diagMap = (items) => {
  const m = {};
  items.forEach((it, idx) => { m[idx] = it.shuffle ? shuffle([0, 1, 2, 3], 4001 + idx * 37) : [0, 1, 2, 3]; });
  return m;
};

const loadSaved = () => {
  try {
    const raw = window.localStorage.getItem(DIAG_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    return saved && saved.map ? saved : null;
  } catch (e) {
    return null;
  }
};

export function useDiagnosticSession() {
  const navigate = useNavigate();
  const { dark, toggleDark } = useDarkMode();
  const [view, setView] = useState('intro');
  const [dSaved, setDSaved] = useState(() => loadSaved());
  const [dMap, setDMap] = useState(null);
  const [dAns, setDAns] = useState({});
  const [dConf, setDConf] = useState({});
  const [dFlags, setDFlags] = useState({});
  const [dChecked, setDChecked] = useState({});
  const [dI, setDI] = useState(0);
  const [dSeconds, setDSeconds] = useState(0);
  const [dReveal, setDReveal] = useState(false);
  const [dRevealUsed, setDRevealUsed] = useState(false);

  // Autosave the attempt in progress (7-day localStorage hold), whenever an
  // attempt is active. Cleared on submit.
  useEffect(() => {
    if (!dMap) return;
    try {
      window.localStorage.setItem(DIAG_KEY, JSON.stringify({
        map: dMap, ans: dAns, conf: dConf, flags: dFlags, checked: dChecked, i: dI, seconds: dSeconds, savedAt: Date.now()
      }));
    } catch (e) { /* ignore */ }
  }, [dMap, dAns, dConf, dFlags, dChecked, dI, dSeconds]);

  // Elapsed-time counter only runs while actively viewing a test item.
  useEffect(() => {
    if (view !== 'test') return undefined;
    const t = setInterval(() => setDSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [view]);

  const startDiag = () => {
    setDMap(diagMap(DI));
    setDAns({}); setDConf({}); setDFlags({}); setDChecked({}); setDI(0); setDSeconds(0);
    setDSaved(null);
    setDRevealUsed((used) => used || dReveal);
    setView('test');
    window.scrollTo(0, 0);
  };

  const resumeDiag = () => {
    if (!dSaved) { startDiag(); return; }
    setDMap(dSaved.map);
    setDAns(dSaved.ans || {});
    setDConf(dSaved.conf || {});
    setDFlags(dSaved.flags || {});
    setDChecked(dSaved.checked || {});
    setDI(dSaved.i || 0);
    setDSeconds(dSaved.seconds || 0);
    setDSaved(null);
    setView('test');
    window.scrollTo(0, 0);
  };

  const submitDiag = () => {
    recordAttempt({
      kind: 'diagnostic', assessmentId: null, drillName: null, title: DIAG_TITLE, mode: null,
      pct: Math.round(dWeighted * 10) / 10, correctCount: null, total: dTotal, answeredCount: dAnsweredCount,
      flagCount: dFlagCount, elapsedSeconds: dSeconds,
      domainBreakdown: dDomainStats.filter((x) => x.n > 0).map((x) => ({ short: x.d.short, got: x.correct, n: x.n }))
    });
    try { window.localStorage.removeItem(DIAG_KEY); } catch (e) { /* ignore */ }
    setView('report');
    window.scrollTo(0, 0);
  };

  const toggleReveal = () => setDReveal((r) => { const next = !r; setDRevealUsed((u) => u || next); return next; });

  const dIdx = Math.min(dI, Math.max(0, dTotal - 1));
  const dItem = DI[dIdx] || null;
  const dOrder = dMap ? (dMap[dIdx] || [0, 1, 2, 3]) : [0, 1, 2, 3];
  const dPickedOrig = dAns[dIdx];
  const dAnsweredCount = Object.keys(dAns).length;
  const dFlagCount = Object.values(dFlags).filter(Boolean).length;
  const dConfTag = dConf[dIdx] || null;
  const dChecked_ = !!dChecked[dIdx];
  const dShown = !!dReveal && dPickedOrig !== undefined && dChecked_;
  const dCanCheck = !!dReveal && dPickedOrig !== undefined && !dChecked_;
  const dRight = dItem ? dPickedOrig === dItem.correct : false;

  const pickOption = (orig) => {
    if (dShown) return;
    setDAns((a) => ({ ...a, [dIdx]: orig }));
  };
  const checkAnswer = () => setDChecked((c) => ({ ...c, [dIdx]: true }));
  const toggleFlag = () => setDFlags((f) => ({ ...f, [dIdx]: !f[dIdx] }));
  const setConfident = () => setDConf((c) => ({ ...c, [dIdx]: c[dIdx] === 'confident' ? null : 'confident' }));
  const setUnsure = () => setDConf((c) => ({ ...c, [dIdx]: c[dIdx] === 'unsure' ? null : 'unsure' }));
  const dPrev = () => setDI((n) => Math.max(0, n - 1));
  const dNext = () => { if (dIdx >= dTotal - 1) setView('grid'); else setDI((n) => n + 1); };
  const dGoTo = (idx) => { setDI(idx); setView('test'); };
  const dGoGrid = () => setView('grid');
  const dBackToTest = () => setView('test');

  const dDomainStats = useMemo(() => DIAG_DOMAINS.map((d) => {
    const mine = DI.map((it, idx) => ({ it, idx })).filter((x) => x.it.dcode === d.code);
    const correct = mine.filter((x) => dAns[x.idx] === x.it.correct).length;
    const n = mine.length || d.items;
    const pctv = n ? (correct / n) * 100 : 0;
    const band = bandFor(pctv);
    const missedTopics = mine.filter((x) => dAns[x.idx] !== x.it.correct).map((x) => x.it.subarea.replace(/^[\d.]+\s*/, ''));
    return { d, mine, correct, n, pctv, band, missed: n - correct, missedTopics };
  }), [dAns]);

  const dWeighted = dDomainStats.reduce((acc, x) => acc + x.pctv * x.d.weight, 0);

  const dPlan = useMemo(() => dDomainStats.slice()
    .sort((a, b) => (b.d.weight * b.missed) - (a.d.weight * a.missed))
    .filter((x) => x.missed > 0)
    .map((x, i) => ({
      rank: String(i + 1), name: x.d.name, band: x.band,
      detail: `${x.missed}${x.missed === 1 ? ' item missed' : ' items missed'} · ${Math.round(x.d.weight * 100)}% of the exam`,
      topics: x.missedTopics.slice(0, 5).join(' · '),
      hasTopics: x.missedTopics.length > 0,
      sampled: x.d.code === 8,
      drill: x.d.drill
    })), [dDomainStats]);

  const dMisinformed = useMemo(() => DI.map((it, idx) => ({ it, idx }))
    .filter((x) => dConf[x.idx] === 'confident' && dAns[x.idx] !== x.it.correct)
    .map((x) => ({
      numLabel: 'Item ' + (x.idx + 1),
      topic: x.it.subarea.replace(/^[\d.]+\s*/, ''),
      domain: x.it.domain,
      yourText: dAns[x.idx] !== undefined ? x.it.options[dAns[x.idx]] : 'Left blank',
      correctText: x.it.options[x.it.correct],
      why: x.it.why
    })), [dConf, dAns]);

  const dAvgSec = dAnsweredCount ? Math.round(dSeconds / dAnsweredCount) : 0;
  const dSkipped = dTotal - dAnsweredCount;

  const dReview = useMemo(() => DI.map((it, idx) => {
    const yours = dAns[idx];
    const right = yours === it.correct;
    const conf = dConf[idx] || null;
    const order = dMap ? (dMap[idx] || [0, 1, 2, 3]) : [0, 1, 2, 3];
    const displayLetter = (orig) => LETTERS[order.indexOf(orig)];
    const exhibit = parseExhibit(it.exhibit);
    return {
      idx,
      sortKey: right ? 1 : 0,
      numLabel: 'Item ' + (idx + 1),
      mark: yours === undefined ? 'Skipped' : right ? 'Correct' : 'Missed',
      domain: it.domain, subarea: it.subarea,
      formatLabel: FORMAT_LABEL[it.format] || it.format,
      misinformed: conf === 'confident' && !right,
      scenario: it.scenario || '', hasScenario: !!it.scenario,
      exhibit, hasExhibit: !!exhibit,
      stem: it.stem,
      correctLine: displayLetter(it.correct) + '. ' + it.options[it.correct],
      showYours: yours !== undefined && !right,
      yourLine: yours !== undefined ? displayLetter(yours) + '. ' + it.options[yours] : '',
      why: it.why,
      distractors: it.options.map((text, oi) => ({ key: 'o' + oi, letter: displayLetter(oi), text, note: it.dist[oi], isKey: oi === it.correct })).filter((o) => !o.isKey),
      source: it.source,
      drill: (DIAG_DOMAINS.find((dd) => dd.code === it.dcode) || {}).drill
    };
  }).sort((a, b) => a.sortKey - b.sortKey), [dAns, dConf, dMap]);

  const dTopTwo = dPlan.slice(0, 2);

  const startDrill = (name) => navigate(`/exam/run?drill=${encodeURIComponent(name)}`);

  return {
    view, setView, navigate, startDrill, dark, toggleDark,
    dTotal, dItem, dIdx, dOrder, dPickedOrig, dAnsweredCount, dFlagCount, dConfTag, dShown, dCanCheck, dRight,
    dAns, dConf, dFlags, dChecked, dI,
    dSaved, dReveal, dRevealUsed,
    startDiag, resumeDiag, submitDiag, toggleReveal, checkAnswer,
    pickOption, toggleFlag, setConfident, setUnsure, dPrev, dNext, dGoTo, dGoGrid, dBackToTest,
    dWeighted, dDomainStats, dPlan, dMisinformed, dReview, dTopTwo,
    dAvgSec, dSkipped, EXAM_PACE
  };
}
