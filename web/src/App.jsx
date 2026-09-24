import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoading from './components/PageLoading';
import ScrollManager from './components/ScrollManager';
import { UnlockProvider } from './context/UnlockContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { P } from './lib/paths';
import AicpHome from './pages/aicp/AicpHome';
import CourseOverview from './pages/aicp/CourseOverview';
import LessonPage from './pages/aicp/LessonPage';
import StudyPlan from './pages/aicp/StudyPlan';
import ExamInfo from './pages/aicp/ExamInfo';
import Faq from './pages/aicp/Faq';
import About from './pages/site/About';
import Contact from './pages/site/Contact';
import SignIn from './pages/SignIn';
import ExamsList from './pages/ExamsList';
import Pricing from './pages/Pricing';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';

// Route-split: these three pull in the large bundled question banks
// (~660KB combined) via useExamSession/useDiagnosticSession/the domain
// count on the drills page. Lazy-loading them keeps that weight out of
// the main bundle, which never needs it.
const StudyByDomain = lazy(() => import('./pages/StudyByDomain'));
const ExamRunner = lazy(() => import('./pages/exam/ExamRunner'));
const DiagnosticFlow = lazy(() => import('./pages/diagnostic/DiagnosticFlow'));

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main">Skip to main content</a>
      <ScrollManager />
      <Header />
      <main id="main" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Old top-level URLs (before the prep section moved under /aicp) keep
// working, including their query strings (e.g. /exam/run?aid=e1&mode=timed).
function LegacyRedirect({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={to + search + hash} replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <UnlockProvider>
        <DarkModeProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route element={<Layout />}>
                  {/* Firm level. "/" becomes the consulting homepage later; until
                      then it sends visitors to the prep section. */}
                  <Route path="/" element={<Navigate to={P.aicp} replace />} />
                  <Route path={P.about} element={<About />} />
                  <Route path={P.contact} element={<Contact />} />

                  {/* AICP exam prep section */}
                  <Route path={P.aicp} element={<AicpHome />} />
                  <Route path={P.course} element={<CourseOverview />} />
                  <Route path={`${P.aicp}/lessons/:slug`} element={<LessonPage />} />
                  <Route path={P.studyPlan} element={<StudyPlan />} />
                  <Route path={P.examInfo} element={<ExamInfo />} />
                  <Route path={P.faq} element={<Faq />} />
                  <Route path={P.pricing} element={<Pricing />} />
                  <Route path={P.exams} element={<ExamsList />} />
                  <Route path={P.drills} element={<StudyByDomain />} />
                  <Route path={P.progress} element={<Progress />} />
                  <Route path={P.diagnostic} element={<DiagnosticFlow />} />
                  <Route path={P.run} element={<ExamRunner />} />
                  <Route path={P.signin} element={<SignIn />} />

                  {/* Legacy URLs */}
                  <Route path="/exams" element={<LegacyRedirect to={P.exams} />} />
                  <Route path="/exam/run" element={<LegacyRedirect to={P.run} />} />
                  <Route path="/diagnostic" element={<LegacyRedirect to={P.diagnostic} />} />
                  <Route path="/study" element={<LegacyRedirect to={P.drills} />} />
                  <Route path="/progress" element={<LegacyRedirect to={P.progress} />} />
                  <Route path="/pricing" element={<LegacyRedirect to={P.pricing} />} />
                  <Route path="/signin" element={<LegacyRedirect to={P.signin} />} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </DarkModeProvider>
      </UnlockProvider>
    </ErrorBoundary>
  );
}
