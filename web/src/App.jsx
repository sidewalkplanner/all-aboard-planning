import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoading from './components/PageLoading';
import { UnlockProvider } from './context/UnlockContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import ExamsList from './pages/ExamsList';
import Pricing from './pages/Pricing';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';

// Route-split: these three pull in the large bundled question banks
// (~660KB combined) via useExamSession/useDiagnosticSession/the domain
// count on Study by domain. Lazy-loading them keeps that weight out of
// the landing-page bundle, which never needs it.
const StudyByDomain = lazy(() => import('./pages/StudyByDomain'));
const ExamRunner = lazy(() => import('./pages/exam/ExamRunner'));
const DiagnosticFlow = lazy(() => import('./pages/diagnostic/DiagnosticFlow'));

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
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
                  <Route path="/" element={<Landing />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/exams" element={<ExamsList />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/study" element={<StudyByDomain />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/diagnostic" element={<DiagnosticFlow />} />
                  <Route path="/exam/run" element={<ExamRunner />} />
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
