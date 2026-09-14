import { useDiagnosticSession } from './useDiagnosticSession';
import IntroView from './IntroView';
import TestView from './TestView';
import DiagGridView from './DiagGridView';
import ReportView from './ReportView';

export default function DiagnosticFlow() {
  const session = useDiagnosticSession();

  switch (session.view) {
    case 'test':
      return <TestView {...session} />;
    case 'grid':
      return <DiagGridView {...session} />;
    case 'report':
      return <ReportView {...session} />;
    default:
      return <IntroView {...session} />;
  }
}
