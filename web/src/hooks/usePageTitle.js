import { useEffect } from 'react';

const SITE = 'All Aboard Planning';

// Sets document.title for the current page ("Lesson title | All Aboard Planning").
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE}: AICP Exam Prep`;
  }, [title]);
}
