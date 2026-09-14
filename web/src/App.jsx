import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { UnlockProvider } from './context/UnlockContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import ExamsList from './pages/ExamsList';
import Pricing from './pages/Pricing';
import StudyByDomain from './pages/StudyByDomain';
import Progress from './pages/Progress';
import ExamRunner from './pages/exam/ExamRunner';
import DiagnosticFlow from './pages/diagnostic/DiagnosticFlow';

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
    <UnlockProvider>
      <DarkModeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
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
              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </UnlockProvider>
  );
}
