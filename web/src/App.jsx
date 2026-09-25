import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoading from './components/PageLoading';
import ScrollManager from './components/ScrollManager';
import { UnlockProvider } from './context/UnlockContext';
import { AuthProvider } from './context/AuthContext';
import RequireSignIn from './components/RequireSignIn';
import { DarkModeProvider } from './context/DarkModeContext';
import { P } from './lib/paths';
import { PAID_TIER_ENABLED } from './lib/access';
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
import NotFound from './pages/NotFound';
import Review from './pages/aicp/Review';

// Route-split: the exam runner pulls in the large bundled question banks
// via useExamSession. Lazy-loading it
// keeps that weight out of the main bundle, which never needs it.
const ExamRunner = lazy(() => import('./pages/exam/ExamRunner'));
// The dashboard and flashcards carry the full flashcard deck.
const Progress = lazy(() => import('./pages/Progress'));
const Flashcards = lazy(() => import('./pages/aicp/Flashcards'));
const ExamStrategy = lazy(() => import('./pages/aicp/ExamStrategy'));
const QuickReference = lazy(() => import('./pages/aicp/QuickReference'));

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
      <AuthProvider>
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
                  <Route path={P.review} element={<Review />} />
                  <Route path={P.flashcards} element={<RequireSignIn title="Flashcards" what="the flashcards"><Flashcards /></RequireSignIn>} />
                  <Route path={P.quickRef} element={<RequireSignIn title="Quick reference" what="the quick reference"><QuickReference /></RequireSignIn>} />
                  <Route path={P.strategy} element={<RequireSignIn title="Exam strategy guide" what="the exam strategy guide"><ExamStrategy /></RequireSignIn>} />
                  <Route path={P.examInfo} element={<ExamInfo />} />
                  <Route path={P.faq} element={<Faq />} />
                  {/* Everything is free for now: pricing only exists once paid plans launch. */}
                  <Route path={P.pricing} element={PAID_TIER_ENABLED ? <Pricing /> : <Navigate to={P.aicp} replace />} />
                  <Route path={P.exams} element={<ExamsList />} />
                  {/* Domain drills were retired in favour of lessons; old links land on the course. */}
                  <Route path={P.drills} element={<Navigate to={P.course} replace />} />
                  <Route path={P.progress} element={<RequireSignIn title="Dashboard" what="your dashboard"><Progress /></RequireSignIn>} />
                  {/* The diagnostic was retired: every practice exam now ranks the domains to study. */}
                  <Route path={P.diagnostic} element={<Navigate to={P.exams} replace />} />
                  <Route path={P.run} element={<ExamRunner />} />
                  <Route path={P.signin} element={<SignIn />} />

                  {/* Legacy URLs */}
                  <Route path="/exams" element={<LegacyRedirect to={P.exams} />} />
                  <Route path="/exam/run" element={<LegacyRedirect to={P.run} />} />
                  <Route path="/diagnostic" element={<Navigate to={P.exams} replace />} />
                  <Route path="/study" element={<Navigate to={P.course} replace />} />
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
      </AuthProvider>
    </ErrorBoundary>
  );
}
