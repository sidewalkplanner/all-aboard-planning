import { useExamSession } from './useExamSession';
import QuestionView from './QuestionView';
import GridView from './GridView';
import ResultsView from './ResultsView';
import AnswerReviewView from './AnswerReviewView';

export default function ExamRunner() {
  const session = useExamSession();
  if (!session.q) return null;

  switch (session.view) {
    case 'grid':
      return <GridView {...session} />;
    case 'results':
      return <ResultsView {...session} />;
    case 'review':
      return <AnswerReviewView {...session} />;
    default:
      return <QuestionView {...session} />;
  }
}
