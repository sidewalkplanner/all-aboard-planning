import DECK from 'virtual:aicp-flashcards';
import { LESSONS } from './curriculum';

// Every lesson's key terms as flashcards, in course order. The deck is built
// from each lesson's "## Key terms" bullets by the virtual:aicp-flashcards
// plugin in vite.config.js, so editing a lesson updates its cards.
export const ALL_CARDS = LESSONS.flatMap((l) => (DECK[l.slug] || []).map((c) => ({ ...c, slug: l.slug, domainId: l.domainId })));
