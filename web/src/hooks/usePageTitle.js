import { useEffect } from 'react';

const SITE = 'All Aboard Planning';

// Sets document.title for the current page ("Lesson title | All Aboard Planning").
// '' gives the site default; undefined leaves the title alone (for wrappers
// whose child page sets its own).
export default function usePageTitle(title) {
  useEffect(() => {
    if (title === undefined) return;
    document.title = title ? `${title} | ${SITE}` : `${SITE}: AICP Exam Prep`;
  }, [title]);
}
